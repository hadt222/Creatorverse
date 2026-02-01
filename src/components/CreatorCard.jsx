import { Link } from 'react-router-dom';

export default function CreatorCard({ creator }) {
  const { id, name, url, description, imageURL } = creator;
  const imgUrl = imageURL;

  return (
    <article className="creator-card">
      {imgUrl && (
        <div className="creator-card-image">
          <img src={imgUrl} alt={name} loading="lazy" />
        </div>
      )}
      <div className="creator-card-body">
        <h3>{name}</h3>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="creator-url">
            Visit channel
          </a>
        )}
        <p>{description}</p>
        <div className="creator-card-actions">
          <Link to={`/creator/${id}`} className="secondary" role="button">
            Details
          </Link>
          <Link to={`/edit/${id}`} className="secondary" role="button">
            Edit
          </Link>
        </div>
      </div>
    </article>
  );
}
