import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  Cloud,
  Server,
  Monitor,
  Database,
  Bot,
  Globe,
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    skills: [
      { name: 'Microsoft Azure', level: 90 },
      { name: 'Kubernetes (AKS)', level: 88 },
      { name: 'Docker', level: 88 },
      { name: 'Ansible + SemaphoreUI', level: 90 },
      { name: 'Azure DevOps', level: 88 },
      { name: 'ArgoCD / GitOps', level: 72 },
      { name: 'Terraform', level: 65 },
      { name: 'Git / GitHub', level: 88 },
    ],
  },
  {
    title: 'Sistemas & Infraestructura',
    icon: Server,
    skills: [
      { name: 'Windows Server', level: 90 },
      { name: 'Active Directory / Entra ID', level: 88 },
      { name: 'Linux', level: 72 },
      { name: 'VMware ESXi', level: 70 },
      { name: 'Networking (TCP/IP, DNS, DHCP)', level: 72 },
      { name: 'Seguridad (Sophos, pfSense)', level: 70 },
      { name: 'IIS / Azure App Service', level: 80 },
    ],
  },
  {
    title: 'Monitoreo & Observabilidad',
    icon: Monitor,
    skills: [
      { name: 'Grafana', level: 88 },
      { name: 'UptimeRobot', level: 88 },
      { name: 'Prometheus', level: 72 },
      { name: 'Checkmk', level: 70 },
    ],
  },
  {
    title: 'Bases de Datos',
    icon: Database,
    skills: [
      { name: 'ProxySQL + MyRocks + Percona', level: 72 },
      { name: 'Orchestrator', level: 70 },
      { name: 'SQL', level: 72 },
    ],
  },
  {
    title: 'Automatización & IA',
    icon: Bot,
    skills: [
      { name: 'n8n', level: 72 },
      { name: 'Azure Functions', level: 68 },
      { name: 'MCP (Model Context Protocol)', level: 55 },
      { name: 'Agentes de IA (Claude, Goose, etc)', level: 88 },
    ],
  },
  {
    title: 'Desarrollo Web',
    icon: Globe,
    skills: [
      { name: 'HTML5 / CSS3', level: 88 },
      { name: 'JavaScript', level: 72 },
    ],
  },
];

export function Skills() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  return (
    <section id="skills" ref={ref} className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-3 block">
            Habilidades Técnicas
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stack{' '}
            <span className="text-gradient">Tecnológico</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Tecnologías que manejo en mi día a día como SysAdmin especializado en cloud.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className={`glass rounded-2xl p-6 transition-all duration-700 hover:bg-white/[0.07] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${catIndex * 100 + 200}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-slate-300">{skill.name}</span>
                      <span className="text-sm text-cyan-400 font-medium">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${catIndex * 100 + 400}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
