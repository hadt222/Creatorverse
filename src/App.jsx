import { useRoutes, Link, useLocation } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import './App.css';
import './animations.css';

export default function App() {
  const location = useLocation();
  const element = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/new', element: <AddCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
  ]);

  return (
    <>
      <nav className="container">
        <ul>
          <li>
            <strong>
              <Link to="/">Creatorverse</Link>
            </strong>
          </li>
        </ul>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/new" role="button" className="primary">Add Creator</Link></li>
        </ul>
      </nav>
      <div key={location.pathname} className="page-content">
        {element}
      </div>
      <footer className="app-footer">
        <div className="container">
          <p>
            Created by: <strong>ThaiHa Dang</strong> · {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </footer>
    </>
  );
}
