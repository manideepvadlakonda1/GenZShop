import './dashboard.css'

const StatCard = ({ icon, value, label }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon"><i className={`fa-solid ${icon}`} /></div>
      <div className="stat-meta">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
      <div className="stat-change">+100%</div>
    </div>
  )
}

export default StatCard
