import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const pageTitles = {
    '/': { title: 'Dashboard', sub: 'Your placement overview' },
    '/chat': { title: 'AI Placement Chatbot', sub: 'Ask anything about placements' },
    '/resume': { title: 'Resume Analyzer', sub: 'Upload and analyze your resume' },
    '/analytics': { title: 'Analytics', sub: 'Skills & placement insights' },
    '/profile': { title: 'Profile', sub: 'Your personal details' },
};

export default function Navbar({ onMenuToggle }) {
    const { pathname } = useLocation();
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { title, sub } = pageTitles[pathname] || { title: 'PlacementBot', sub: '' };

    return (
        <header className="topbar" style={{
            background: theme === 'dark' ? 'rgba(5, 5, 15, 0.72)' : 'rgba(255, 255, 255, 0.72)',
        }}>
            <div>
                <h1>{title}</h1>
                <p>{sub}</p>
            </div>
            <div className="topbar-actions">
                <button
                    className="mobile-menu-toggle"
                    onClick={onMenuToggle}
                    aria-label="Toggle navigation"
                    type="button"
                >
                    ☰
                </button>

                <button
                    onClick={toggleTheme}
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    className="topbar-icon"
                    type="button"
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>

                <div className="topbar-user">
                    <span>{user?.name}</span>
                    <small>{user?.role || 'Student'}</small>
                </div>
                <div className="topbar-avatar">
                    {user?.profilePhoto
                        ? <img src={user.profilePhoto} alt="Avatar" />
                        : (user?.name?.[0]?.toUpperCase() || 'U')
                    }
                </div>
            </div>
        </header>
    );
}
