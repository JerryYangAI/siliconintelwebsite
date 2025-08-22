import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

export default function CTA() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-r from-silicon-blue to-silicon-emerald" data-testid="section-cta">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6" data-testid="text-cta-title">
          {t('cta.title')}
        </h2>
        <p className="text-xl text-blue-100 mb-8" data-testid="text-cta-subtitle">
          {t('cta.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/checkout"
            className="bg-white text-silicon-blue px-8 py-4 rounded-lg hover:bg-gray-100 font-semibold text-lg transition duration-200"
            data-testid="button-cta-trial"
          >
            {t('cta.startTrial')}
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-silicon-blue font-semibold text-lg transition duration-200"
            data-testid="button-cta-demo"
          >
            {t('cta.scheduleDemo')}
          </Link>
        </div>
        
        <p className="text-sm text-blue-100 mt-6" data-testid="text-cta-note">
          {t('cta.note')}
        </p>
      </div>
    </section>
  );
}
