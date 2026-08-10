import express from 'express'
import { body, validationResult } from 'express-validator'
import Job from '../models/Job.js'
import { protect, admin } from '../middleware/auth.js'

const router = express.Router()

// @route   GET /api/jobs
// @desc    Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email')
    res.json(jobs)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route   GET /api/jobs/:id
// @desc    Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email')

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' })
    }

    res.json(job)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' })
    }
    res.status(500).send('Server error')
  }
})

// @route   POST /api/jobs
// @desc    Create a job
router.post(
  '/',
  [
    protect,
    admin,
    [
      body('title', 'Title is required').not().isEmpty(),
      body('company', 'Company is required').not().isEmpty(),
      body('location', 'Location is required').not().isEmpty(),
      body('type', 'Type is required').not().isEmpty(),
      body('salary', 'Salary is required').not().isEmpty(),
      body('description', 'Description is required').not().isEmpty(),
      body('requirements', 'Requirements is required').isArray(),
      body('responsibilities', 'Responsibilities is required').isArray(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const newJob = new Job({
        ...req.body,
        postedBy: req.user.id,
      })

      const job = await newJob.save()
      res.json(job)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// @route   PUT /api/jobs/:id
// @desc    Update a job
router.put(
  '/:id',
  [
    protect,
    admin,
    [
      body('title', 'Title is required').not().isEmpty(),
      body('company', 'Company is required').not().isEmpty(),
      body('location', 'Location is required').not().isEmpty(),
      body('type', 'Type is required').not().isEmpty(),
      body('salary', 'Salary is required').not().isEmpty(),
      body('description', 'Description is required').not().isEmpty(),
      body('requirements', 'Requirements is required').isArray(),
      body('responsibilities', 'Responsibilities is required').isArray(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      let job = await Job.findById(req.params.id)

      if (!job) {
        return res.status(404).json({ msg: 'Job not found' })
      }

      // Check if user is the job poster
      if (job.postedBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' })
      }

      job = await Job.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      )

      res.json(job)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
router.delete('/:id', [protect, admin], async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' })
    }

    // Check if user is the job poster
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    await job.remove()
    res.json({ msg: 'Job removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

export default router 