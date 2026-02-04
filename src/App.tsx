import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { HomePage } from './pages/Home'
import { StudentsPage } from './pages/Students'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
