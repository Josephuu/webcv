import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Briefcase, ChevronRight, Calendar } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'SysAdmin',
    company: 'YOIZEN',
    period: 'Octubre 2024 – Actualidad',
    description:
      'Administración y operación de infraestructura cloud, automatización y despliegues en entornos Kubernetes para múltiples clientes enterprise.',
    technologies: ['Azure', 'AKS', 'Ansible', 'ArgoCD', 'Terraform', 'Azure DevOps', 'GitOps'],
    details: [
      'Administración de clusters Kubernetes (AKS) en Azure: operación, monitoreo y troubleshooting de aplicaciones containerizadas desplegadas con Helm.',
      'Operación de flujos GitOps con ArgoCD: sincronización de aplicaciones, gestión de despliegues declarativos y resolución de conflictos de sync.',
      'Automatización de infraestructura con Ansible + SemaphoreUI: ejecución de playbooks para provisioning de servidores, configuraciones y tareas repetitivas.',
      'Creación y mantenimiento de pipelines CI/CD en Azure DevOps para builds, tests y despliegues automatizados.',
      'Despliegue y operación de aplicaciones en AKS: Semaphore, n8n y servicios internos.',
      'Administración de Azure Entra ID (Azure AD) para gestión de identidades, acceso condicional y SSO.',
      'Configuración y administración de IIS en Windows Server 2019/2022 y Azure App Service para aplicaciones .NET.',
      'Creación y configuración de clusters de base de datos ProxySQL + MyRocks + Percona + Orchestrator, automatizados con Ansible/SemaphoreUI.',
      'Administración de monitoreo con Grafana, Prometheus y UptimeRobot: dashboards, alertas y métricas de infraestructura.',
      'Administración de Sophos AV desde Sophos Central y pfSense para firewalling y VPN.',
      'Uso de Azure Functions y Azure Resource Graph para automatizaciones serverless y queries de recursos.',
      'Desarrollo de MCPs (Model Context Protocols) básicos para integración de herramientas con agentes de IA.',
      'Implementación de n8n para automatización de flujos de trabajo no-code/low-code.',
      'Gestión de Google Workspace para administración de identidades y colaboración.',
      'Uso de GLPI para gestión de tickets e inventario de activos IT.',
      'Terraform básico: creación de Key Vaults y recursos Azure mediante módulos simples.',
    ],
  },
  {
    id: 2,
    role: 'SysAdmin Jr',
    company: 'INTERTIC',
    period: 'Octubre 2023 – Octubre 2024',
    description:
      'Administración de infraestructura on-premise y servicios de TI para clientes corporativos.',
    technologies: ['VMware ESXi', 'Windows Server', 'Active Directory', 'Veeam', 'Checkmk', 'Grafana', 'Netbox'],
    details: [
      'Relevamiento y documentación de activos de red con Netbox.',
      'Creación y gestión de máquinas virtuales con VMware ESXi.',
      'Administración de Active Directory: alta/baja de usuarios, grupos y políticas.',
      'Gestión de licencias Microsoft 365 / Office 365.',
      'Migración de servidores Windows Server 2012/2016/2019.',
      'Monitoreo de infraestructura con Checkmk y Grafana.',
      'Gestión de backups con Veeam Backup & Replication.',
      'Configuración de Domain Controllers y File Servers.',
      'Scripting básico en Bash/PowerShell para automatización de tareas.',
    ],
  },
  {
    id: 3,
    role: 'Soporte Técnico Infraestructura',
    company: 'EPIDATA / Nucleoeléctrica Argentina / TELEFE',
    period: 'Septiembre 2021 – Octubre 2023',
    description:
      'Soporte técnico nivel 1 y 2 para infraestructura crítica de empresas del sector energético y medios.',
    technologies: ['Windows', 'Linux', 'Docker', 'Monitoreo'],
    details: [
      'Mantenimiento preventivo y correctivo de activos de hardware.',
      'Monitoreo de servidores y servicios críticos.',
      'Relevamiento e inventario de equipamiento IT.',
      'Capacitación de nuevos ingresos al equipo.',
      'Administración de servidor Discord: roles, bots, webhooks y automatizaciones.',
      'Preparación de estaciones de trabajo Windows y Linux.',
      'Gestión logística de equipos e insumos.',
      'Primeros pasos con Docker para contenerización de servicios.',
    ],
  },
  {
    id: 4,
    role: 'Soporte Técnico N1 & N2',
    company: 'YEL Informática / Swiss Medical',
    period: 'Octubre 2020 – Septiembre 2021',
    description:
      'Soporte técnico en sitio para empresa de salud y proveedor de servicios IT.',
    technologies: ['OCS Inventory', 'Invgate', 'Soporte Técnico'],
    details: [
      'Gestión de inventarios de equipamiento con OCS Inventory.',
      'Atención de tickets de soporte con Invgate.',
      'Preparación e instalación de máquinas y activos.',
      'Relevamiento de activos y documentación técnica.',
      'Coordinación con múltiples sectores para resolución de incidentes.',
    ],
  },
  {
    id: 5,
    role: 'Fundador & Web Developer',
    company: 'Akumasoftware',
    period: 'Diciembre 2019 – Actualidad',
    description:
      'Emprendimiento personal de desarrollo web, diseño y community management.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Community Management'],
    details: [
      'Diseño y maquetado web con HTML, CSS y JavaScript.',
      'Gestión de redes sociales y community management.',
      'Contacto directo con clientes y preparación de presupuestos.',
      'Liderazgo de equipo y capacitación de colaboradores.',
    ],
  },
];

export function Experience() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.05 });
  const [activeExp, setActiveExp] = useState<number | null>(1);

  return (
    <section id="experiencia" ref={ref} className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-3 block">
            Experiencia Laboral
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trayectoria{' '}
            <span className="text-gradient">Profesional</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            6+ años de evolución desde soporte técnico hasta SysAdmin especializado en cloud.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((exp, index) => {
            const isActive = activeExp === exp.id;

            return (
              <div
                key={exp.id}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div
                  className={`glass rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.07] cursor-pointer ${
                    isActive ? 'ring-1 ring-cyan-400/40' : ''
                  }`}
                  onClick={() => setActiveExp(isActive ? null : exp.id)}
                >
                  {/* Header */}
                  <div className="p-6 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="inline-flex items-center gap-1 text-cyan-400 text-sm font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                        {index === 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 text-xs font-medium border border-cyan-400/20">
                            Actual
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Briefcase className="w-4 h-4 text-slate-500" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-slate-500 shrink-0 mt-1 transition-transform duration-300 ${
                        isActive ? 'rotate-90' : ''
                      }`}
                    />
                  </div>

                  {/* Description */}
                  <div className="px-6 pb-4">
                    <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                  </div>

                  {/* Expanded Content */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isActive ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-4 border-t border-white/5 pt-4">
                      {exp.details.length > 0 && (
                        <>
                          <h4 className="text-sm font-semibold text-white mb-3">Responsabilidades:</h4>
                          <ul className="space-y-2 mb-5">
                            {exp.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
