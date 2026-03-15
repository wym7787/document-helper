import { useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import PdfMergePage from './components/PdfMergePage'
import PdfSplitPage from './components/PdfSplitPage'
import Footer from './components/Footer'

type Page = 'home' | 'pdf-merge' | 'pdf-split'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [isDark, setIsDark] = useState(false)

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page)
  }

  return (
    <div className={`min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#111827] transition-colors duration-200${isDark ? ' dark' : ''}`}>
      <Navbar onNavigate={handleNavigate} isDark={isDark} onToggleDark={() => setIsDark(!isDark)} />

      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'pdf-merge' && <PdfMergePage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'pdf-split' && <PdfSplitPage onBack={() => setCurrentPage('home')} />}

      <Footer />
    </div>
  )
}

export default App
