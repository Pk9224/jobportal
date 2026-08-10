import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { useAuthRedirect } from '../utils/auth'

const JobDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { requireAuth } = useAuthRedirect()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // In a real application, you would fetch from your API
        // const response = await fetch(`/api/jobs/${id}`)
        // const data = await response.json()
        
        // For now, we'll use mock data
        const mockJob = {
          _id: id,
          title: 'Senior Frontend Developer',
          company: 'Tech Company Inc.',
          location: 'Remote',
          type: 'Full-time',
          experience: 'Senior Level',
          description: 'We are looking for an experienced Frontend Developer to join our team. The ideal candidate will have strong skills in React, JavaScript, and modern frontend development practices.',
          requirements: [
            '5+ years of experience in frontend development',
            'Strong proficiency in React and JavaScript',
            'Experience with modern frontend build tools',
            'Excellent problem-solving skills',
            'Good communication and teamwork abilities'
          ],
          responsibilities: [
            'Develop and maintain user-facing features',
            'Build reusable components and frontend libraries',
            'Optimize applications for maximum performance',
            'Collaborate with backend developers and designers',
            'Write clean, maintainable code'
          ],
          salary: '$100,000 - $150,000',
          createdAt: new Date().toISOString(),
          benefits: [
            'Competitive salary',
            'Health insurance',
            'Remote work options',
            'Professional development opportunities',
            'Flexible working hours'
          ]
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setJob(mockJob)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJobDetails()
  }, [id])

  const handleApply = () => {
    requireAuth(() => {
      navigate(`/jobs/${id}/apply`)
    }, id)
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-red-500 text-center">
            <p className="text-xl font-semibold">Error loading job details</p>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!job) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-gray-500 text-lg">Job not found</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                <p className="mt-1 text-lg text-gray-600">{job.company}</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                {job.type}
              </span>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span className="flex items-center">
                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
              <span className="mx-2">•</span>
              <span>{job.experience}</span>
              <span className="mx-2">•</span>
              <span>{new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Salary</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{job.salary}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{job.description}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Requirements</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="list-disc pl-5 space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Responsibilities</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="list-disc pl-5 space-y-1">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Benefits</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="list-disc pl-5 space-y-1">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <button
              onClick={handleApply}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default JobDetails 