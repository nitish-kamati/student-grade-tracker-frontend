import { getGrade } from "../utils/grade";

function StudentList({
  students,
  isLoading,
  deletingId,
  hasStudents,
  onDelete,
}) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <span className="eyebrow">Student List</span>
        <h2>Current records</h2>
        <p>Each entry shows marks and the calculated letter grade.</p>
      </div>

      {isLoading ? (
        <div className="empty-state">Loading student records...</div>
      ) : !hasStudents ? (
        <div className="empty-state">
          No students added yet. Use the form to create the first record.
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.marks.toFixed(1)}</td>
                  <td>
                    <span className="grade-chip">{student.grade || getGrade(student.marks)}</span>
                  </td>
                  <td>
                    <button
                      className="ghost-button"
                      type="button"
                      onClick={() => onDelete(student.id)}
                      disabled={deletingId === student.id}
                    >
                      {deletingId === student.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default StudentList;
