import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Cloud, Server, Code, TrendingUp } from 'lucide-react';

const highlights = [
  {
    icon: Cloud,
    title: 'Cloud Computing',
    description: 'Especializado en Azure, Kubernetes y arquitecturas cloud-native escalables.',
  },
  {
    icon: Server,
    title: 'Infraestructura',
    description: 'Administración de servidores Windows/Linux, virtualización y redes.',
  },
  {
    icon: Code,
    title: 'Automatización',
    description: 'GitOps, Infraestructura como Código con Terraform y Ansible, pipelines CI/CD.',
  },
  {
    icon: TrendingUp,
    title: 'Evolución',
    description: 'De soporte técnico a SysAdmin especializado en cloud, crecimiento continuo.',
  },
];

export function About() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section id="sobre-mi" ref={ref} className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-3 block">
            Sobre Mi
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Perfil{' '}
            <span className="text-gradient">Profesional</span>
          </h2>
          <div className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed space-y-4">
            <p>
              Técnico en Informática con <strong className="text-slate-300">6+ años de experiencia</strong> en soporte técnico, 
              administración de sistemas y automatización de infraestructura. Actualmente especializado en{' '}
              <strong className="text-cyan-400">Cloud Computing (Azure), Kubernetes, GitOps e Infraestructura como Código</strong>.
            </p>
            <p>
              Evolucioné desde roles de soporte hasta posiciones de SysAdmin especializado en cloud, 
              administrando tecnologías enterprise como <strong className="text-slate-300">Azure AKS, Ansible, Terraform, ArgoCD y Azure DevOps</strong>. 
              Apasionado por la automatización, el monitoreo proactivo y la implementación de prácticas modernas de CI/CD.
            </p>
            <p>
              Sólidos fundamentos en <strong className="text-slate-300">Inteligencia Artificial aplicada a operaciones de TI</strong>, utilizando 
              agentes de IA y metodología <strong className="text-slate-300">SDD (Software Development Driven)</strong> para optimizar flujos de trabajo y automatización.
            </p>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className={`group glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 cursor-default ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-4 group-hover:bg-cyan-400/20 transition-colors">
                <item.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {[
            { value: '6+', label: 'Años de Experiencia' },
            { value: '5', label: 'Empresas' },
            { value: '15+', label: 'Tecnologías Enterprise' },
            { value: 'Sop→DevOps', label: 'Evolución de Carrera' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-gradient mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
