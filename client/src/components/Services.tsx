import { useTranslation } from 'react-i18next';
import { Zap, Cloud, BarChart3, RotateCcw } from 'lucide-react';

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      icon: Zap,
      color: 'text-silicon-blue',
      bgColor: 'bg-silicon-blue/10',
      titleKey: 'services.build.title',
      descriptionKey: 'services.build.description'
    },
    {
      icon: Cloud,
      color: 'text-silicon-emerald',
      bgColor: 'bg-silicon-emerald/10',
      titleKey: 'services.deploy.title',
      descriptionKey: 'services.deploy.description'
    },
    {
      icon: BarChart3,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      titleKey: 'services.track.title',
      descriptionKey: 'services.track.description'
    },
    {
      icon: RotateCcw,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      titleKey: 'services.iterate.title',
      descriptionKey: 'services.iterate.description'
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-silicon-slate mb-6" data-testid="text-services-title">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-services-subtitle">
            {t('services.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition duration-300"
                data-testid={`card-service-${index}`}
              >
                <div className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                  <IconComponent className={`w-6 h-6 ${service.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-silicon-slate mb-4" data-testid={`text-service-title-${index}`}>
                  {t(service.titleKey)}
                </h3>
                <p className="text-gray-600 mb-4" data-testid={`text-service-description-${index}`}>
                  {t(service.descriptionKey)}
                </p>
                <a href="#" className="text-silicon-blue hover:text-blue-700 font-medium" data-testid={`link-service-learn-${index}`}>
                  Learn more →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
