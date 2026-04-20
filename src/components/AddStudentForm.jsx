function AddStudentForm({ form, errors, isSubmitting, onChange, onSubmit }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <span className="eyebrow">Add Student</span>
        <h2>Enter student details</h2>
        <p>Names are required and marks must stay between 0 and 100.</p>
      </div>

      <form className="student-form" onSubmit={onSubmit}>
        <label htmlFor="name">
          Student Name
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={onChange}
            placeholder="Enter student name"
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </label>

        <label htmlFor="marks">
          Marks
          <input
            id="marks"
            name="marks"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={form.marks}
            onChange={onChange}
            placeholder="Enter marks"
          />
          {errors.marks && <span className="field-error">{errors.marks}</span>}
        </label>

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Add Student"}
        </button>
      </form>
    </section>
  );
}

export default AddStudentForm;
