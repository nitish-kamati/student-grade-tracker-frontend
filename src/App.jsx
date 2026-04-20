import { useEffect, useMemo, useState } from "react";
import AddStudentForm from "./components/AddStudentForm";
import Dashboard from "./components/Dashboard";
import StudentList from "./components/StudentList";
import {
  createStudent,
  deleteStudent,
  fetchStudentStats,
  fetchStudents,
} from "./services/studentApi";
import "./styles.css";

const initialForm = {
  name: "",
  marks: "",
};

function App() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    averageMarks: 0,
    highestMarks: 0,
    lowestMarks: 0,
  });
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const hasStudents = useMemo(() => students.length > 0, [students]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const [studentResponse, statsResponse] = await Promise.all([
          fetchStudents(),
          fetchStudentStats(),
        ]);
        setStudents(studentResponse);
        setStats(statsResponse);
      } catch (error) {
        setErrorMessage(error.message || "Unable to load student data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const validateForm = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Student name is required.";
    }

    if (form.marks === "") {
      nextErrors.marks = "Marks are required.";
    } else {
      const numericMarks = Number(form.marks);

      if (Number.isNaN(numericMarks)) {
        nextErrors.marks = "Marks must be a number.";
      } else if (numericMarks < 0 || numericMarks > 100) {
        nextErrors.marks = "Marks must be between 0 and 100.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const refreshData = async () => {
    const [studentResponse, statsResponse] = await Promise.all([
      fetchStudents(),
      fetchStudentStats(),
    ]);
    setStudents(studentResponse);
    setStats(statsResponse);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setActionMessage("");
    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await createStudent({
        name: form.name.trim(),
        marks: Number(form.marks),
      });
      await refreshData();
      setForm(initialForm);
      setActionMessage("Student added successfully.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to add student.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      setDeletingId(studentId);
      setActionMessage("");
      setErrorMessage("");
      await deleteStudent(studentId);
      await refreshData();
      setActionMessage("Student removed successfully.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to delete student.");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="app-shell">
      <div className="app-background app-background-left" />
      <div className="app-background app-background-right" />

      <main className="container">
        <section className="hero-panel">
          <div className="hero-copy">
            <span className="eyebrow">Student Grade Tracker</span>
            <h1>Track marks, view performance, and spot class trends instantly.</h1>
            <p>
              A compact full-stack dashboard for managing student scores with live
              summary metrics, grade calculation, and quick record cleanup.
            </p>
          </div>

          <div className="hero-metrics">
            <div>
              <strong>{stats.totalStudents}</strong>
              <span>Students tracked</span>
            </div>
            <div>
              <strong>{stats.averageMarks.toFixed(1)}</strong>
              <span>Average score</span>
            </div>
          </div>
        </section>

        <Dashboard stats={stats} isLoading={isLoading} />

        <section className="content-grid">
          <AddStudentForm
            form={form}
            errors={errors}
            isSubmitting={isSubmitting}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

          <StudentList
            students={students}
            isLoading={isLoading}
            deletingId={deletingId}
            hasStudents={hasStudents}
            onDelete={handleDelete}
          />
        </section>

        {(actionMessage || errorMessage) && (
          <section
            className={`message-banner ${errorMessage ? "message-banner-error" : "message-banner-success"}`}
          >
            {errorMessage || actionMessage}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
