import { useEffect, useState } from 'react';
import { ArrowDown, Download, Github, Linkedin } from 'lucide-react';
import { ParticleNetwork } from '@/components/ParticleNetwork';

export function Hero() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Cloud DevOps Engineer';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 60);

    return () => clearInterval(timer);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Network Background */}
      <ParticleNetwork />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" style={{ zIndex: 2 }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <span className="text-white">Joseph</span>{' '}
          <span className="text-gradient">Gavidia</span>
        </h1>

        {/* Typed Subtitle */}
        <div className="h-12 flex items-center justify-center mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <p className="text-xl md:text-2xl text-slate-400 font-light">
            {typedText}
            <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 animate-pulse align-middle" />
          </p>
        </div>

        {/* Description */}
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          Infrastructure & Automation Specialist
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <button
            onClick={() => scrollTo('#contacto')}
            className="group px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all duration-300 shadow-glow hover:shadow-glow-strong flex items-center gap-2"
          >
            Contactame
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('#experiencia')}
            className="px-8 py-4 glass hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2"
          >
            Ver Experiencia
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <a
            href="https://linkedin.com/in/soporte-infraestructura-joseph-gavidia"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/Josephuu"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="./CV_Joseph_Gavidia_2026.docx"
            download
            className="w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
            title="Descargar CV"
          >
            <Download className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-cyan-400 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
