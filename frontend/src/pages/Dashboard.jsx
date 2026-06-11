import { useEffect, useState } from 'react';
import api from '../api/apiClient';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/analytics/dashboard')
      .then((res) => setStats(res.data))
      .catch(console.error);
  }, []);

  return (
    <section className="page dashboard-page">
      <h1>Sales Performance Dashboard</h1>
      {!stats ? (
        <p>Loading metrics...</p>
      ) : (
        <div className="dashboard-grid">
          <div className="card"> <h2>Total Leads</h2><p>{stats.totalLeads}</p> </div>
          <div className="card"> <h2>Total Customers</h2><p>{stats.totalCustomers}</p> </div>
          <div className="card"> <h2>Lead Stages</h2>
            <ul>{stats.stageCounts.map((item) => <li key={item._id}>{item._id}: {item.count}</li>)}</ul>
          </div>
        </div>
      )}
    </section>
  );
}
