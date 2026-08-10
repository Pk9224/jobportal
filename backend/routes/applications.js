import express from 'express'
import { body, validationResult } from 'express-validator'
import Application from '../models/Application.js'
import Job from '../models/Job.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// @route   GET /api/applications
// @desc    Get all applications for a user
router.get('/', protect, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', 'title company location type salary')
      .sort({ createdAt: -1 })
    res.json(applications)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route   GET /api/applications/:id
// @desc    Get application by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('job', 'title company location type salary')
      .populate('applicant', 'name email')

    if (!application) {
      return res.status(404).json({ msg: 'Application not found' })
    }

    // Check if user is the applicant or the job poster
    if (
      application.applicant.toString() !== req.user.id &&
      application.job.postedBy.toString() !== req.user.id
    ) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    res.json(application)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Application not found' })
    }
    res.status(500).send('Server error')
  }
})

// @route   POST /api/applications
// @desc    Create an application
router.post(
  '/',
  [
    protect,
    [
      body('job', 'Job ID is required').not().isEmpty(),
      body('resume', 'Resume is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const job = await Job.findById(req.body.job)

      if (!job) {
        return res.status(404).json({ msg: 'Job not found' })
      }

      // Check if user has already applied
      const existingApplication = await Application.findOne({
        job: req.body.job,
        applicant: req.user.id,
      })

      if (existingApplication) {
        return res.status(400).json({ msg: 'You have already applied for this job' })
      }

      const newApplication = new Application({
        job: req.body.job,
        applicant: req.user.id,
        resume: req.body.resume,
        coverLetter: req.body.coverLetter,
      })

      const application = await newApplication.save()
      res.json(application)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// @route   PUT /api/applications/:id
// @desc    Update application status (for job posters)
router.put(
  '/:id',
  [
    protect,
    [body('status', 'Status is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const application = await Application.findById(req.params.id).populate(
        'job',
        'postedBy'
      )

      if (!application) {
        return res.status(404).json({ msg: 'Application not found' })
      }

      // Check if user is the job poster
      if (application.job.postedBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' })
      }

      application.status = req.body.status
      await application.save()

      res.json(application)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

export default router 