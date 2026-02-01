import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const loadCreator = async () => {
      setLoading(true);
      setErrorMsg('');

      const { data, error } = await supabase
        .from('creators')
        .select('id, name, url, description, imageURL')
        .eq('id', id)
        .single();

      if (error) {
        setErrorMsg(error.message);
      } else if (data) {
        setForm({
          name: data.name ?? '',
          url: data.url ?? '',
          description: data.description ?? '',
          imageURL: data.imageURL ?? '',
        });
      }

      setLoading(false);
    };

    loadCreator();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    const { error } = await supabase
      .from('creators')
      .update({
        name: form.name.trim(),
        url: form.url.trim() || null,
        description: form.description.trim() || null,
        imageURL: form.imageURL.trim() || null,
      })
      .eq('id', id);

    if (error) {
      setErrorMsg(error.message);
      setSaving(false);
      return;
    }

    navigate(`/creator/${id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this creator?')) return;

    setSaving(true);
    setErrorMsg('');

    const { error } = await supabase.from('creators').delete().eq('id', id);

    if (error) {
      setErrorMsg(error.message);
      setSaving(false);
      return;
    }

    navigate('/');
  };

  if (loading) return <main className="container"><p aria-busy="true">Loading…</p></main>;

  return (
    <main className="container">
      <h1>Edit Creator</h1>
      <form onSubmit={handleUpdate}>
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
            {saving ? 'Saving…' : 'Update'}
          </button>
          <button
            type="button"
            className="secondary outline"
            onClick={handleDelete}
            disabled={saving}
          >
            Delete
          </button>
          <Link to={`/creator/${id}`} role="button" className="secondary">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
