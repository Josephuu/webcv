import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Download } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'joseph.gavidiaa@gmail.com',
    href: 'mailto:joseph.gavidiaa@gmail.com',
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+54 1138884481',
    href: 'tel:+541138884481',
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Greater Buenos Aires, Argentina',
    href: '#',
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/soporte-infraestructura-joseph-gavidia',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/Josephuu',
  },
  {
    icon: Globe,
    label: 'Web',
    href: 'https://Akumasoftware.com',
  },
];

export function Contact() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section id="contacto" ref={ref} className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-3 block">
            Contacto
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Conectemos{' '}
            <span className="text-gradient">Profesionalmente</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Si querés charlar sobre tecnología, infraestructura o posibilidades de colaboración, no dudes en escribirme.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Info Cards */}
          {contactInfo.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className={`group flex items-center gap-5 glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-cyan-400/10 flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors shrink-0">
                <item.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-0.5">{item.label}</div>
                <div className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                  {item.value}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Social & CV */}
        <div
          className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
                title={link.label}
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* Download CV Button */}
          <a
            href="./CV_Joseph_Gavidia_2026.docx"
            download
            className="group px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all duration-300 shadow-glow hover:shadow-glow-strong flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Descargar CV
          </a>
        </div>
      </div>
    </section>
  );
}
