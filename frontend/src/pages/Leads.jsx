import { useEffect, useState } from 'react';
import api from '../api/apiClient';

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', stage: 'new' });

  useEffect(() => {
    api.get('/leads').then((res) => setLeads(res.data)).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post('/leads', form);
    setLeads((prev) => [response.data, ...prev]);
    setForm({ name: '', company: '', email: '', phone: '', stage: 'new' });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section className="page leads-page">
      <h1>Lead Tracker</h1>
      <form className="entity-form" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Lead name" required />
        <input name="company" value={form.company} onChange={handleChange} placeholder="Company" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <select name="stage" value={form.stage} onChange={handleChange}>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="proposal">Proposal</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
        <button type="submit">Add Lead</button>
      </form>
      <div className="entity-list">
        {leads.map((lead) => (
          <article key={lead._id} className="entity-card">
            <h2>{lead.name}</h2>
            <p>{lead.company}</p>
            <p>{lead.stage}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
