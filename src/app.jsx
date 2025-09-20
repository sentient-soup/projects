import { useEffect, useState } from 'preact/hooks';
import './app.css';

function SiteCard({ site }) {
  return (
    <div className='site-card'>
      <a
        href={site.url}
        target='_blank'
        rel='noopener noreferrer'
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src={`https://api.microlink.io/?url=${site.url}&screenshot=true&embed=screenshot.url`}
            alt={site.name + ' preview'}
            className='site-image'
          />
          <div className='card-topbar'>
            {site.year && <span className='site-year'>{site.year}</span>}
            {site.activity && (
              <span
                className={`site-chip activity-badge ${
                  site.activity === 'Archive' ? 'archived' : 'active'
                }`}
              >
                {site.activity}
              </span>
            )}
          </div>
        </div>
        <div className='site-info' style={{ position: 'relative' }}>
          <div className='site-title'>{site.name}</div>
          <div className='site-desc'>{site.description}</div>
          {site.repo && (
            <a
              className='github-link'
              href={site.repo}
              target='_blank'
              rel='noopener noreferrer'
              title='View GitHub repository'
            >
              <svg className='github-icon' viewBox='0 0 24 24'>
                <path d='M12 2C6.477 2 2 6.484 2 12.021c0 4.418 2.867 8.167 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.135 20.184 22 16.436 22 12.021 22 6.484 17.523 2 12 2Z' />
              </svg>
            </a>
          )}
          <div className='site-meta'>
            {Array.isArray(site.technologies) &&
              site.technologies.length > 0 && (
                <div className='site-chips'>
                  {site.technologies.map((tech) => (
                    <span className='site-chip' key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
          </div>
        </div>
      </a>
    </div>
  );
}

export function App() {
  const [sites, setSites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('sites.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load config');
        return res.json();
      })
      .then(setSites)
      .catch((err) => setError(err.message));
  }, []);

  const year = new Date().getFullYear();

  return (
    <>
      <div className='explorer-container'>
        <h1>Projects</h1>
        <span className='title-divider'></span>
        {error && <div className='error'>{error}</div>}
        <div className='site-grid'>
          {sites.map((site) => (
            <SiteCard key={site.url} site={site} />
          ))}
        </div>
      </div>
      <footer className='footer'>&copy; Josh H {year}</footer>
    </>
  );
}
