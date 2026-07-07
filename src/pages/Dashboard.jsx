import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/analytics/dashboard')
            .then(res => setStats(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const statCards = [
        { label: 'Resumes Uploaded', value: stats?.totalResumes ?? 0, icon: '📄', color: '#6366f1' },
        { label: 'Chat Sessions', value: stats?.totalChats ?? 0, icon: '💬', color: '#06b6d4' },
        { label: 'Total Messages', value: stats?.totalMessages ?? 0, icon: '🗨️', color: '#10b981' },
        { label: 'Avg ATS Score', value: stats?.avgAtsScore ? `${stats.avgAtsScore}%` : '—', icon: '🎯', color: '#f59e0b' },
    ];

    return (
        <div className="page-body animate-in">
            {/* Welcome */}
            <div style={{ marginBottom: 'clamp(28px, 5vw, 48px)', animationDelay: '0.1s' }} className="animate-in">
                <h2 className="page-title text-gradient">
                    Welcome back, {user?.name?.split(' ')[0]} 👋
                </h2>
                <p className="page-subtitle">
                    Here's your placement preparation summary
                </p>
            </div>

            {/* Stats */}
            <div className="grid-cols-4 animate-in stagger-1" style={{ marginBottom: 'clamp(28px, 5vw, 48px)' }}>
                {statCards.map(({ label, value, icon, color }) => (
                    <div key={label} className="glass-card stat-card">
                        <div style={{
                            width: 'clamp(40px, 8vw, 48px)', height: 'clamp(40px, 8vw, 48px)', borderRadius: 'clamp(10px, 2vw, 14px)', marginBottom: 'clamp(12px, 2vw, 16px)',
                            background: `${color}15`, border: `1px solid ${color}30`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(20px, 5vw, 24px)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>{icon}</div>
                        <div className="stat-value">{loading ? '…' : value}</div>
                        <div className="stat-label">{label}</div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="animate-in stagger-2" style={{ marginBottom: 'clamp(28px, 5vw, 48px)' }}>
                <h3 style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 700, marginBottom: 'clamp(14px, 3vw, 24px)', fontFamily: 'Outfit, sans-serif' }}>Quick Actions</h3>
                <div className="grid-cols-3">
                    {[
                        { to: '/chat', icon: '🤖', title: 'Ask PlacementBot', desc: 'Get placement guidance, interview tips, and career advice from AI.', color: 'var(--accent-1)' },
                        { to: '/resume', icon: '📄', title: 'Analyze Resume', desc: 'Upload your resume to get an ATS score and skill extraction.', color: 'var(--accent-3)' },
                        { to: '/analytics', icon: '📊', title: 'View Analytics', desc: 'See your top skills, keyword insights, and improvement areas.', color: 'var(--green)' },
                    ].map(({ to, icon, title, desc, color }) => (
                        <Link key={to} to={to} style={{ textDecoration: 'none' }}>
                            <div className="glass-card" style={{ padding: 'clamp(20px, 4vw, 32px) clamp(18px, 3vw, 28px)', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: 'clamp(32px, 8vw, 40px)', marginBottom: 'clamp(12px, 2vw, 16px)', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>{icon}</div>
                                <h4 style={{ fontWeight: 700, fontSize: 'clamp(16px, 3vw, 18px)', marginBottom: 'clamp(6px, 1vw, 10px)', color }}>{title}</h4>
                                <p style={{ fontSize: 'clamp(13px, 2vw, 14px)', color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1 }}>{desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="grid-cols-2 animate-in stagger-3">
                {/* Top Skills */}
                {stats?.topSkills?.length > 0 && (
                    <div className="glass-card" style={{ padding: 'clamp(20px, 4vw, 32px)' }}>
                        <h3 style={{ fontSize: 'clamp(17px, 3.5vw, 20px)', fontWeight: 700, marginBottom: 'clamp(14px, 3vw, 20px)', fontFamily: 'Outfit, sans-serif' }}>🏆 Your Top Skills</h3>
                        <div className="skill-tags">
                            {stats.topSkills.map(({ skill, count }) => (
                                <span key={skill} className="skill-tag">
                                    {skill} <span style={{ opacity: 0.6, fontSize: 11, marginLeft: 4 }}>{count}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tips */}
                <div className="glass-card" style={{ padding: 'clamp(20px, 4vw, 32px)' }}>
                    <h3 style={{ fontSize: 'clamp(17px, 3.5vw, 20px)', fontWeight: 700, marginBottom: 'clamp(14px, 3vw, 20px)', fontFamily: 'Outfit, sans-serif' }}>💡 Placement Tips</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            'Start DSA practice early — top companies prioritize it.',
                            'Tailor your resume for each company using JD keywords.',
                            'Apply for internships in your pre-final year.',
                            'Structure your project explanations using the STAR method.',
                        ].map((tip, i) => (
                            <div key={i} style={{
                                padding: '14px 18px', borderRadius: '12px',
                                background: 'var(--glass)', border: '1px solid var(--glass-border)',
                                fontSize: 14, color: 'var(--text-secondary)',
                                display: 'flex', gap: 12, alignItems: 'center',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                <span style={{ color: 'var(--accent-2)', fontSize: 16 }}>✨</span>
                                {tip}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
