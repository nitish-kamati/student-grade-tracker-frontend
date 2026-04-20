import StatCard from "./StatCard";

function Dashboard({ stats, isLoading }) {
  const statItems = [
    {
      label: "Total Students",
      value: stats.totalStudents,
      accent: "accent-primary",
    },
    {
      label: "Average Score",
      value: stats.averageMarks.toFixed(1),
      accent: "accent-secondary",
    },
    {
      label: "Highest Score",
      value: stats.highestMarks.toFixed(1),
      accent: "accent-tertiary",
    },
    {
      label: "Lowest Score",
      value: stats.lowestMarks.toFixed(1),
      accent: "accent-muted",
    },
  ];

  return (
    <section className="dashboard-grid">
      {statItems.map((item) => (
        <StatCard
          key={item.label}
          label={item.label}
          value={isLoading ? "..." : item.value}
          accent={item.accent}
        />
      ))}
    </section>
  );
}

export default Dashboard;
