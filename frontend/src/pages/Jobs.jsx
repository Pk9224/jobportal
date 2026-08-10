import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { useAuthRedirect } from '../utils/auth'

const Jobs = () => {
  const { requireAuth } = useAuthRedirect()
  const [allJobs, setAllJobs] = useState([])
  const [displayedJobs, setDisplayedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 15
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    experience: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Generate 100 mock jobs
        const jobTitles = [
          'Senior Frontend Developer', 'Backend Engineer', 'Full Stack Developer',
          'DevOps Engineer', 'Data Scientist', 'Machine Learning Engineer',
          'Product Manager', 'UX/UI Designer', 'Mobile App Developer',
          'QA Engineer', 'Technical Writer', 'Cloud Architect',
          'Security Engineer', 'Database Administrator', 'Business Analyst',
          'Project Manager', 'Scrum Master', 'System Administrator',
          'Network Engineer', 'AI Engineer', 'Blockchain Developer',
          'Game Developer', 'Embedded Systems Engineer', 'IT Support Specialist',
          'Digital Marketing Manager', 'Content Writer', 'SEO Specialist',
          'Social Media Manager', 'Graphic Designer', 'Video Editor'
        ]

        const companies = [
          'Tech Company Inc.', 'Startup XYZ', 'Innovation Corp',
          'Design Studio', 'Analytics Pro', 'Cloud Solutions',
          'Digital Agency', 'Software House', 'Tech Giant',
          'E-commerce Platform', 'FinTech Solutions', 'HealthTech',
          'EdTech Startup', 'AI Research Lab', 'Cybersecurity Firm'
        ]

        const locations = [
          'Remote', 'San Francisco', 'New York', 'Los Angeles',
          'Chicago', 'Austin', 'Seattle', 'Boston', 'Denver',
          'Miami', 'Atlanta', 'Portland', 'Toronto', 'London',
          'Berlin', 'Singapore', 'Sydney', 'Tokyo'
        ]

        const types = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
        const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level']
        const salaries = [
          '$60,000 - $90,000', '$80,000 - $120,000', '$100,000 - $150,000',
          '$120,000 - $180,000', '$150,000 - $200,000'
        ]

        const mockJobs = Array.from({ length: 100 }, (_, index) => ({
          _id: (index + 1).toString(),
          title: jobTitles[index % jobTitles.length],
          company: companies[index % companies.length],
          location: locations[index % locations.length],
          type: types[index % types.length],
          experience: experienceLevels[index % experienceLevels.length],
          description: `We are looking for a ${jobTitles[index % jobTitles.length]} to join our team at ${companies[index % companies.length]}. This is a ${types[index % types.length]} position based in ${locations[index % locations.length]}.`,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
          salary: salaries[index % salaries.length]
        }))

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setAllJobs(mockJobs)
        setDisplayedJobs(mockJobs.slice(0, jobsPerPage))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  useEffect(() => {
    // Update displayed jobs when filters change
    const filtered = allJobs.filter(job => {
      return (
        job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
        (filters.type === '' || job.type === filters.type) &&
        (filters.experience === '' || job.experience === filters.experience)
      )
    })
    setDisplayedJobs(filtered.slice(0, jobsPerPage * currentPage))
  }, [filters, currentPage, allJobs])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  const handleApplyNow = (jobId) => {
    requireAuth(() => {
      // If authenticated, navigate to the application page
      navigate(`/jobs/${jobId}/apply`)
    }, jobId)
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
            <p className="text-xl font-semibold">Error loading jobs</p>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Next Opportunity</h1>
          <p className="mt-2 text-gray-600">Browse through our latest job openings</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
              <input
                type="text"
                name="search"
                id="search"
                value={filters.search}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Job title or keywords"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="City or country"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Job Type</label>
              <select
                name="type"
                id="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
              <select
                name="experience"
                id="experience"
                value={filters.experience}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="">All Levels</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {displayedJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No jobs found matching your criteria</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedJobs.map(job => (
                  <div key={job._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">
                            <Link to={`/jobs/${job._id}`} className="hover:text-primary">
                              {job.title}
                            </Link>
                          </h2>
                          <p className="mt-1 text-gray-600">{job.company}</p>
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
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span>{job.experience}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="mt-4">
                        <p className="text-gray-600 line-clamp-3">{job.description}</p>
                      </div>
                      <div className="mt-4">
                        <span className="text-sm font-medium text-gray-900">{job.salary}</span>
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <button
                        onClick={() => handleApplyNow(job._id)}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {displayedJobs.length < allJobs.length && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    View More Jobs
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Jobs 