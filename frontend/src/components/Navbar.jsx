import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('crm_token');
    navigate('/login');
  };

  return (
    <nav className="app-nav">
      <div className="brand">Enterprise CRM</div>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/leads">Leads</Link>
        <Link to="/customers">Customers</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
