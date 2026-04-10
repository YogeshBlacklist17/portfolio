import Navbar from './components/Navbar'
import Education from './components/Education'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            Full Stack Developer
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-4 pt-16 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            A passionate developer with expertise in building modern web applications.
            I love creating clean, efficient, and user-friendly solutions.
          </p>
        </div>
      </section>

      {/* Education Section */}
      <Education />

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center px-4 pt-16 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Skills
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your skills and technologies will go here
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-4 pt-16 pb-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your project showcase will go here
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-4 pt-16 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Contact
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get in touch with me
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
