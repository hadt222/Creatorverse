import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

export default function AddCreator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    if (!form.name.trim() || !form.url.trim() || !form.description.trim()) {
      setErrorMsg('Name, URL, and description are required.');
      setSaving(false);
      return;
    }

    const { error } = await supabase.from('creators').insert({
      name: form.name.trim(),
      url: form.url.trim(),
      description: form.description.trim(),
      imageURL: form.imageURL.trim() || null,
    });

    if (error) {
      setErrorMsg(error.message);
      setSaving(false);
      return;
    }

    navigate('/');
  };

  return (
    <main className="container">
      <h1>Add Creator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Creator or channel name"
          required
        />
        <label htmlFor="url">URL</label>
        <input
          id="url"
          name="url"
          type="url"
          value={form.url}
          onChange={handleChange}
          placeholder="https://..."
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Short description of their content"
          rows={3}
        />
        <label htmlFor="imageURL">Image URL (optional)</label>
        <input
          id="imageURL"
          name="imageURL"
          type="url"
          value={form.imageURL}
          onChange={handleChange}
          placeholder="https://..."
        />
        {errorMsg && <p role="alert">Error: {errorMsg}</p>}
        <div className="form-actions">
          <button type="submit" disabled={saving} aria-busy={saving}>
            {saving ? 'Saving…' : 'Create'}
          </button>
          <Link to="/" role="button" className="secondary">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
