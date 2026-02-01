import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      setErrorMsg('');

      const { data, error } = await supabase
        .from('creators')
        .select('id, name, url, description, imageURL')
        .order('id', { ascending: true });

      if (error) {
        setErrorMsg(error.message);
        setCreators([]);
      } else {
        setCreators(data ?? []);
      }

      setLoading(false);
    };

    fetchCreators();
  }, []);

  if (loading) return <main className="container"><p aria-busy="true">Loading creators…</p></main>;
  if (errorMsg) return <main className="container"><p role="alert">Error: {errorMsg}</p></main>;

  return (
    <main className="container">
      <h1>Top Creators</h1>
      {creators.length === 0 ? (
        <p>No creators yet. <Link to="/new">Click &quot;Add Creator&quot;</Link>.</p>
      ) : (
        <div className="creator-grid">
          {creators.map((c) => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>
      )}
    </main>
  );
}
