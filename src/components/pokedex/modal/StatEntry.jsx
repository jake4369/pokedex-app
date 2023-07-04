const StatEntry = ({ title, value }) => {
  return (
    <li className="stat-entry__container">
      <span className="stat-title">{title}</span>
      <span className="stat-entry">{value}</span>
    </li>
  );
};

export default StatEntry;
