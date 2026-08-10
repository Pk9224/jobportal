import { useState } from 'react'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile')

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    applications: [
      {
        id: 1,
        jobTitle: 'Senior Frontend Developer',
        company: 'Tech Company Inc.',
        status: 'Applied',
        date: '2024-04-15',
      },
      {
        id: 2,
        jobTitle: 'Backend Engineer',
        company: 'Startup XYZ',
        status: 'Interview',
        date: '2024-04-10',
      },
    ],
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Applications
            </button>
          </nav>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1">{user.email}</p>
              </div>
              <button className="btn btn-primary">
                Edit Profile
              </button>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Applications</h2>
            <div className="space-y-4">
              {user.applications.map((application) => (
                <div key={application.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{application.jobTitle}</h3>
                  <p className="text-gray-600">{application.company}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      Applied on {application.date}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      application.status === 'Applied'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {application.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard 