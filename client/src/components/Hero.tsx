import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-silicon-blue/10 to-silicon-emerald/10"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-silicon-slate leading-tight mb-6" data-testid="text-hero-title">
              {t('hero.title')}{' '}
              <span className="bg-gradient-to-r from-silicon-blue to-silicon-emerald bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>{' '}
              {t('hero.titleEnd')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed" data-testid="text-hero-subtitle">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/checkout"
                className="bg-silicon-blue text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg transition duration-200 text-center"
                data-testid="button-hero-trial"
              >
                {t('hero.startTrial')}
              </Link>
              <Link
                href="/contact"
                className="border border-silicon-blue text-silicon-blue px-8 py-4 rounded-lg hover:bg-silicon-blue hover:text-white font-semibold text-lg transition duration-200 text-center"
                data-testid="button-hero-demo"
              >
                {t('hero.requestDemo')}
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-6" data-testid="stats-container">
              <div>
                <div className="text-3xl font-bold text-silicon-slate" data-testid="stat-workflows">500M+</div>
                <div className="text-gray-600 text-sm">{t('hero.stats.workflows')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-silicon-slate" data-testid="stat-efficiency">75%</div>
                <div className="text-gray-600 text-sm">{t('hero.stats.efficiency')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-silicon-slate" data-testid="stat-countries">150+</div>
                <div className="text-gray-600 text-sm">{t('hero.stats.countries')}</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Advanced AI and technology dashboard interface" 
              className="rounded-2xl shadow-2xl w-full"
              data-testid="img-hero-dashboard"
            />
            
            <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 max-w-xs" data-testid="card-hero-status">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-silicon-emerald rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-silicon-slate">Agent Deployed</div>
                  <div className="text-sm text-gray-600">Marketing Analysis Complete</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 max-w-xs" data-testid="card-hero-metrics">
              <div className="text-sm text-gray-600 mb-2">Processing Rate</div>
              <div className="text-2xl font-bold text-silicon-slate">2,847/min</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-silicon-blue h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
