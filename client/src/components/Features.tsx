import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      iconColor: 'bg-silicon-blue',
      titleKey: 'features.cloud.title',
      descriptionKey: 'features.cloud.description'
    },
    {
      iconColor: 'bg-silicon-emerald',
      titleKey: 'features.integration.title',
      descriptionKey: 'features.integration.description'
    },
    {
      iconColor: 'bg-purple-500',
      titleKey: 'features.visibility.title',
      descriptionKey: 'features.visibility.description'
    }
  ];

  return (
    <section className="py-20 bg-slate-50" data-testid="section-features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-silicon-slate mb-6" data-testid="text-features-title">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8" data-testid="text-features-subtitle">
              {t('features.subtitle')}
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4" data-testid={`feature-item-${index}`}>
                  <div className={`w-8 h-8 ${feature.iconColor} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-silicon-slate mb-2" data-testid={`text-feature-title-${index}`}>
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-600" data-testid={`text-feature-description-${index}`}>
                      {t(feature.descriptionKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-8 bg-silicon-blue text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold transition duration-200" data-testid="button-features-trial">
              {t('hero.startTrial')}
            </button>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Advanced business automation dashboard showing real-time analytics and AI-driven insights" 
              className="rounded-2xl shadow-2xl w-full"
              data-testid="img-features-dashboard"
            />
            
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs" data-testid="card-features-agents">
              <div className="text-sm text-gray-600 mb-1">Active Agents</div>
              <div className="text-2xl font-bold text-silicon-slate">1,247</div>
              <div className="text-xs text-silicon-emerald">+15% this hour</div>
            </div>
            
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs" data-testid="card-features-processing">
              <div className="text-sm text-gray-600 mb-2">Processing Status</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Data Analysis</span>
                  <span>94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-silicon-blue h-1.5 rounded-full w-[94%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
