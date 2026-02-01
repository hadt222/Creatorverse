import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../client';

export default function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true);
      setErrorMsg('');

      const { data, error } = await supabase
        .from('creators')
        .select('id, name, url, description, imageURL')
        .eq('id', id)
        .single();

      if (error) {
        setErrorMsg(error.message);
        setCreator(null);
      } else {
        setCreator(data);
      }

      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  if (loading) return <main className="container"><p aria-busy="true">Loading creator…</p></main>;
  if (errorMsg) return <main className="container"><p role="alert">Error: {errorMsg}</p></main>;
  if (!creator) return <main className="container"><p>Creator not found.</p></main>;

  const imgUrl = creator.imageURL;

  return (
    <main className="container">
      <h1>{creator.name}</h1>
      {imgUrl && (
        <div className="view-creator-image">
          <img src={imgUrl} alt={creator.name} />
        </div>
      )}
      <p>{creator.description}</p>
      {creator.url && (
        <p>
          <a href={creator.url} target="_blank" rel="noopener noreferrer">
            {creator.url}
          </a>
        </p>
      )}
      <div className="view-creator-actions">
        <Link to={`/edit/${id}`} role="button" className="secondary">
          Edit
        </Link>
        <Link to="/" role="button" className="secondary">
          Back
        </Link>
      </div>
    </main>
  );
}
