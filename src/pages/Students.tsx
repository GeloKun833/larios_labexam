import { useEffect, useState } from 'react'
import { StudentCard, type Student } from '../components/StudentCard'

type ApiStudent = {
  id: number
  name: string
  email: string
}

function createRandomLocalStudents(count: number): Student[] {
  const firstNames = ['Alex', 'Jamie', 'Micah', 'Taylor', 'Jordan', 'Riley', 'Sky']
  const lastNames = ['Rivera', 'Cruz', 'Santos', 'Garcia', 'Lopez', 'Reyes', 'Martinez']
  const courses = [
    'BS Information Technology',
    'BS Computer Science',
    'BS Information Systems',
    'BS Computer Engineering',
  ]
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']

  const students: Student[] = []

  for (let i = 0; i < count; i += 1) {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)]
    const last = lastNames[Math.floor(Math.random() * lastNames.length)]
    const course = courses[Math.floor(Math.random() * courses.length)]
    const year = years[Math.floor(Math.random() * years.length)]

    students.push({
      id: i + 1,
      name: `${first} ${last}`,
      course,
      year,
      status: 'Random local record',
    })
  }

  return students
}

export function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(() => createRandomLocalStudents(4))

  const [filterYear, setFilterYear] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showEntryLoading, setShowEntryLoading] = useState(true)

  function fetchApiStudents() {
    setIsLoading(true)
    setError(null)

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch students.')
        }
        const data: ApiStudent[] = await res.json()

        const apiStudents: Student[] = data.slice(0, 6).map((user) => ({
          id: user.id + 100,
          name: user.name,
          course: 'Sample course via API',
          year: 'API record',
          status: 'API data',
        }))

        setStudents((prev) => {
          const withoutPreviousApi = prev.filter((student) => student.year !== 'API record')
          return [...withoutPreviousApi, ...apiStudents]
        })
        setIsLoading(false)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error occurred.')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowEntryLoading(false)
    }, 3000)

    fetchApiStudents()

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  const visibleStudents =
    filterYear === 'all'
      ? students
      : students.filter((student) => student.year === filterYear)

  return (
    <section className="students-section">
      {showEntryLoading && (
        <div className="loading-modal" role="status" aria-live="polite">
          <div className="loading-modal-backdrop" />
          <div className="loading-modal-content">
            <span className="spinner spinner-lg" aria-hidden="true" />
            <p className="loading-modal-text">Loading students…</p>
          </div>
        </div>
      )}
      <div className="students-header">
        <h1 className="page-title">Students</h1>
        <p className="page-subtitle">
          Local sample records combined with live data from JSONPlaceholder. Use
          the filters to explore.
        </p>
      </div>

      <div className="students-toolbar">
        <div className="toolbar-group">
          <span className="toolbar-label">Filter by year</span>
          <div className="toolbar-pills" role="radiogroup" aria-label="Filter by year level">
            <button
              type="button"
              className={`pill ${filterYear === 'all' ? 'pill-active' : ''}`}
              onClick={() => setFilterYear('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`pill ${filterYear === '3rd Year' ? 'pill-active' : ''}`}
              onClick={() => setFilterYear('3rd Year')}
            >
              3rd Year
            </button>
            <button
              type="button"
              className={`pill ${filterYear === '2nd Year' ? 'pill-active' : ''}`}
              onClick={() => setFilterYear('2nd Year')}
            >
              2nd Year
            </button>
            <button
              type="button"
              className={`pill ${filterYear === 'API record' ? 'pill-active' : ''}`}
              onClick={() => setFilterYear('API record')}
            >
              API records
            </button>
          </div>
        </div>
        <p className="toolbar-hint">
          Loading and errors are handled gracefully to keep the experience smooth.
        </p>
      </div>

      {isLoading && (
        <div className="status-banner status-banner-loading">
          <span className="spinner" aria-hidden="true" />
          <span>Fetching students from the API…</span>
        </div>
      )}

      {error && !isLoading && (
        <div className="status-banner status-banner-error" role="alert">
          <span>Unable to reach the API: {error}</span>
          <button type="button" className="pill pill-soft" onClick={fetchApiStudents}>
            Retry loading students
          </button>
        </div>
      )}

      <div className="students-grid" aria-live="polite">
        {visibleStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </section>
  )
}

