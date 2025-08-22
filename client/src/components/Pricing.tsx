import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { Link } from 'wouter';

export default function Pricing() {
  const { t } = useTranslation();

  const plans = [
    {
      name: t('pricing.starter.name'),
      description: t('pricing.starter.description'),
      price: t('pricing.starter.price'),
      features: t('pricing.starter.features', { returnObjects: true }) as string[],
      isPopular: false,
      buttonStyle: 'border border-silicon-blue text-silicon-blue hover:bg-silicon-blue hover:text-white',
      plan: 'starter'
    },
    {
      name: t('pricing.professional.name'),
      description: t('pricing.professional.description'),
      price: t('pricing.professional.price'),
      features: t('pricing.professional.features', { returnObjects: true }) as string[],
      isPopular: true,
      buttonStyle: 'bg-white text-silicon-blue hover:bg-gray-100',
      plan: 'professional'
    },
    {
      name: t('pricing.annual.name'),
      description: t('pricing.annual.description'),
      price: t('pricing.annual.price'),
      features: t('pricing.annual.features', { returnObjects: true }) as string[],
      isPopular: false,
      buttonStyle: 'border border-silicon-blue text-silicon-blue hover:bg-silicon-blue hover:text-white',
      plan: 'annual'
    },
    {
      name: t('pricing.enterprise.name'),
      description: t('pricing.enterprise.description'),
      price: t('pricing.enterprise.price'),
      features: t('pricing.enterprise.features', { returnObjects: true }) as string[],
      isPopular: false,
      buttonStyle: 'border border-silicon-blue text-silicon-blue hover:bg-silicon-blue hover:text-white',
      plan: 'enterprise'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white" data-testid="section-pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-silicon-slate mb-6" data-testid="text-pricing-title">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-gray-600" data-testid="text-pricing-subtitle">
            {t('pricing.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-2xl p-8 relative ${
                plan.isPopular 
                  ? 'bg-silicon-blue text-white transform scale-105' 
                  : 'bg-slate-50'
              }`}
              data-testid={`card-pricing-${plan.plan}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-silicon-emerald text-white px-4 py-1 rounded-full text-sm font-medium">
                    {t('pricing.professional.popular')}
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${plan.isPopular ? 'text-white' : 'text-silicon-slate'}`} data-testid={`text-pricing-name-${plan.plan}`}>
                  {plan.name}
                </h3>
                <p className={plan.isPopular ? 'text-blue-100' : 'text-gray-600'} data-testid={`text-pricing-description-${plan.plan}`}>
                  {plan.description}
                </p>
              </div>
              
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.isPopular ? 'text-white' : 'text-silicon-slate'}`} data-testid={`text-pricing-price-${plan.plan}`}>
                  {plan.price}
                </span>
                {plan.price !== 'Custom' && plan.price !== 'カスタム' && plan.price !== '定制' && (
                  <span className={plan.isPopular ? 'text-blue-100' : 'text-gray-600'}>
                    {plan.plan === 'annual' ? '/year' : '/month'}
                  </span>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3" data-testid={`feature-pricing-${plan.plan}-${featureIndex}`}>
                    <Check className="w-5 h-5 text-silicon-emerald" />
                    <span className={plan.isPopular ? 'text-white' : 'text-gray-600'}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {plan.plan === 'enterprise' ? (
                <Link
                  href="/contact"
                  className={`w-full ${plan.buttonStyle} px-6 py-3 rounded-lg font-semibold transition duration-200 text-center block`}
                  data-testid={`button-pricing-contact-${plan.plan}`}
                >
                  {t('pricing.contactSales')}
                </Link>
              ) : (
                <Link
                  href={`/checkout?plan=${plan.plan}`}
                  className={`w-full ${plan.buttonStyle} px-6 py-3 rounded-lg font-semibold transition duration-200 text-center block`}
                  data-testid={`button-pricing-select-${plan.plan}`}
                >
                  {plan.isPopular ? t('pricing.professional.name') : t('nav.getStarted')}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
