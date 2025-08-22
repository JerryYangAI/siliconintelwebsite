import { useTranslation } from 'react-i18next';

export default function CompanyLogos() {
  const { t } = useTranslation();

  const companies = [
    'MICROSOFT',
    'GOOGLE',
    'AMAZON',
    'SALESFORCE',
    'IBM',
    'ORACLE'
  ];

  return (
    <section className="bg-white py-16" data-testid="section-companies">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-gray-500 mb-8 font-medium" data-testid="text-companies-trusted">
          {t('companies.trusted')}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
          {companies.map((company, index) => (
            <div key={company} className="flex justify-center" data-testid={`logo-company-${index}`}>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-500">{company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
