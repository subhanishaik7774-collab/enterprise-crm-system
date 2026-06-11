import { useEffect, useState } from 'react';
import api from '../api/apiClient';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', status: 'prospect' });

  useEffect(() => {
    api.get('/customers').then((res) => setCustomers(res.data)).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post('/customers', form);
    setCustomers((prev) => [response.data, ...prev]);
    setForm({ name: '', company: '', email: '', phone: '', status: 'prospect' });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section className="page customers-page">
      <h1>Customer Management</h1>
      <form className="entity-form" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Customer name" required />
        <input name="company" value={form.company} onChange={handleChange} placeholder="Company" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="prospect">Prospect</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button type="submit">Add Customer</button>
      </form>
      <div className="entity-list">
        {customers.map((customer) => (
          <article key={customer._id} className="entity-card">
            <h2>{customer.name}</h2>
            <p>{customer.company}</p>
            <p>{customer.status}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
