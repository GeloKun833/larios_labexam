export type Student = {
  id: number
  name: string
  course: string
  year: string
  status?: string
}

type StudentCardProps = {
  student: Student
}

export function StudentCard({ student }: StudentCardProps) {
  return (
    <article className="student-card">
      <div className="student-card-accent" />
      <div className="student-card-header">
        <h3 className="student-name">{student.name}</h3>
        <span className="student-year">{student.year}</span>
      </div>
      <p className="student-course">{student.course}</p>
      {student.status && (
        <p className="student-status">
          <span className="pill pill-soft">{student.status}</span>
        </p>
      )}
    </article>
  )
}

