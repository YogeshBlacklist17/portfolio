import Navbar from './components/Navbar'
import Education from './components/Education'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import { useTranslation } from 'react-i18next'

function App() {
  const { t } = useTranslation()
  return (
    <>
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#f6f8f6] dark:bg-gray-900 transition-colors duration-300">
        <Navbar />

        {/* Home Section */}
        <section id="home" className="h-screen snap-start flex items-center justify-center px-4 pt-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.welcome')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              {t('home.title')}
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="h-screen snap-start flex items-center justify-center px-4 pt-16 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              {t('about.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('about.description')}
            </p>
          </div>
        </section>

        {/* Education Section */}
        <Education />

        {/* Skills Section */}
        <section id="skills" className="h-screen snap-start flex items-center justify-center px-4 pt-16 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              {t('skills.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('skills.description')}
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="h-screen snap-start flex items-center justify-center px-4 pt-16 pb-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              {t('projects.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('projects.description')}
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="snap-start">
          <FAQ />
        </section>

        {/* Contact Section */}
        {/* Contact Section — min-h-screen so content isn't clipped by snap */}
<section id="contact" className="min-h-screen snap-start">
  <Contact />
</section>
      </div>
    </>
  )
}

export default App
