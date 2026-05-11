import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ChevronRight, GitBranch, Database, Play, BarChart3, Cpu } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Operación GitOps con ArgoCD',
    description:
      'Administración y operación de flujos GitOps para despliegues en AKS, garantizando sincronización correcta de aplicaciones y resolución de conflictos.',
    technologies: ['ArgoCD', 'GitOps', 'AKS', 'Kubernetes'],
    icon: GitBranch,
    color: 'from-cyan-500 to-blue-500',
    featured: true,
  },
  {
    id: 2,
    title: 'Cluster de Bases de Datos Alta Disponibilidad',
    description:
      'Creación y configuración de clusters ProxySQL + MyRocks + Percona + Orchestrator, automatizados con Ansible/SemaphoreUI para failover automático y balanceo de carga.',
    technologies: ['ProxySQL', 'MyRocks', 'Percona', 'Orchestrator', 'Ansible', 'SemaphoreUI'],
    icon: Database,
    color: 'from-emerald-500 to-cyan-500',
    featured: true,
  },
  {
    id: 3,
    title: 'Automatización con SemaphoreUI + Ansible',
    description:
      'Ejecución y mantenimiento de playbooks Ansible para provisioning automatizado de servidores Windows/Linux, gestionados desde SemaphoreUI con aprobaciones y auditoría.',
    technologies: ['Ansible', 'SemaphoreUI', 'Automation', 'Windows', 'Linux'],
    icon: Play,
    color: 'from-orange-500 to-red-500',
    featured: false,
  },
  {
    id: 4,
    title: 'Dashboard unificado de monitoreo',
    description:
      'Administración de stack Grafana + Prometheus para monitoreo de clusters AKS, servidores Windows y servicios críticos, con alertas por múltiples canales.',
    technologies: ['Grafana', 'Prometheus', 'AKS', 'Windows Server'],
    icon: BarChart3,
    color: 'from-purple-500 to-pink-500',
    featured: false,
  },
  {
    id: 5,
    title: 'MCPs para integración de herramientas',
    description:
      'Desarrollo de Model Context Protocols básicos para integrar herramientas internas con agentes de IA, mejorando la productividad del equipo.',
    technologies: ['MCP', 'Python', 'APIs', 'AI Integration'],
    icon: Cpu,
    color: 'from-blue-500 to-indigo-500',
    featured: false,
  },
];

export function Projects() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.05 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="proyectos" ref={ref} className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-3 block">
            Portafolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Proyectos{' '}
            <span className="text-gradient">Destacados</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Implementaciones reales de soluciones cloud, automatización e integración de sistemas.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative glass rounded-2xl p-8 overflow-hidden transition-all duration-700 hover:bg-white/[0.07] cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <project.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs font-medium border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-cyan-400 text-sm font-medium">
                  <span>Ver detalles</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      hoveredProject === project.id ? 'translate-x-1' : ''
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group glass rounded-2xl p-6 transition-all duration-700 hover:bg-white/[0.07] cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 2) * 150 + 200}ms` }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-4 shadow-lg`}
              >
                <project.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-400 text-xs font-medium border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
