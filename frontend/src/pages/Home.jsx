import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const Home = () => {
  const features = [
    {
      title: 'Find Your Dream Job',
      description: 'Browse through thousands of job listings from top companies worldwide.',
      icon: '🔍',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Easy Application Process',
      description: 'Apply to jobs with just a few clicks using our streamlined application system.',
      icon: '📝',
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Career Resources',
      description: 'Access valuable resources and tips to help you advance your career.',
      icon: '📚',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Job Alerts',
      description: 'Get notified about new job opportunities matching your preferences.',
      icon: '🔔',
      color: 'bg-yellow-50 text-yellow-600',
    },
  ]

  const stats = [
    { number: '10,000+', label: 'Active Jobs' },
    { number: '5,000+', label: 'Companies' },
    { number: '50,000+', label: 'Successful Hires' },
    { number: '100+', label: 'Countries' },
  ]

  const steps = [
    {
      number: '1',
      title: 'Create Your Profile',
      description: 'Sign up and create your professional profile in minutes.',
      icon: '👤',
    },
    {
      number: '2',
      title: 'Search Jobs',
      description: 'Browse through our extensive job listings and find your perfect match.',
      icon: '🔎',
    },
    {
      number: '3',
      title: 'Apply',
      description: 'Submit your application with just a few clicks.',
      icon: '📨',
    },
    {
      number: '4',
      title: 'Get Hired',
      description: 'Connect with employers and start your new career journey.',
      icon: '🎉',
    },
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Your Career Journey Starts Here
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Join thousands of professionals who found their perfect career match through our platform.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 space-x-4">
              <div className="rounded-md shadow">
                <Link
                  to="/jobs"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Browse Jobs
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary/20 hover:bg-primary/30 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.number}</div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Our Platform?
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              We provide the best platform for both job seekers and employers.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className={`inline-flex items-center justify-center p-3 ${feature.color} rounded-md shadow-lg text-3xl`}>
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Start your job search journey in just four simple steps
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 h-full">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start your journey?</span>
            <span className="block text-secondary">Create your profile today!</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50"
              >
                Sign Up Now
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary/20 hover:bg-primary/30"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home 