import { useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import PdfMergePage from './components/PdfMergePage'
import Footer from './components/Footer'

type Page = 'home' | 'pdf-merge'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [isDark, setIsDark] = useState(false)

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page)
  }

  return (
    <div className={`min-h-screen flex flex-col bg-[#f8fafc] dark:bg-gray-900 transition-colors duration-200${isDark ? ' dark' : ''}`}>
      <Navbar onNavigate={handleNavigate} isDark={isDark} onToggleDark={() => setIsDark(!isDark)} />

      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'pdf-merge' && <PdfMergePage />}

      <Footer />
    </div>
  )
}

export default App
