export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-center py-10 border-t border-slate-700/50">
            <div className="mb-4">
                <a href="mailto:your.email@example.com" className="social-icon"><i className="fas fa-envelope"></i></a>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-github"></i></a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-linkedin"></i></a>
                <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-telegram-plane"></i></a>
            </div>
            <p className="text-gray-500 text-sm">&copy; {currentYear} Volodia. All rights reserved.</p>
            <p className="text-xs text-gray-600 mt-1">Designed & Built with <i className="fas fa-heart text-pink-500"></i> by Volodia</p>
        </footer>
    );
}
