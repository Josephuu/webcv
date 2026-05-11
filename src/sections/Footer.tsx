import { Terminal } from 'lucide-react';

const footerLinks = [
  { label: 'Sobre Mí', href: '#sobre-mi' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Skills', href: '#skills' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

export function Footer() {
  const scrollTo = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-glow group-hover:shadow-glow-strong transition-shadow">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              JG<span className="text-cyan-400">.</span>
            </span>
          </button>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-slate-500 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>SysAdmin @ YOIZEN</span>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-slate-700">
            &copy; {new Date().getFullYear()} Joseph Gavidia - Cloud DevOps Engineer
          </p>
        </div>
      </div>
    </footer>
  );
}
