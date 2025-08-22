import { useTranslation } from 'react-i18next';
import { 
  SiGoogle, 
  SiAmazon, 
  SiSalesforce, 
  SiOracle 
} from 'react-icons/si';
import { Building2, Monitor, Database } from 'lucide-react';

export default function CompanyLogos() {
  const { t } = useTranslation();

  const companies = [
    { name: 'MICROSOFT', icon: Monitor },
    { name: 'GOOGLE', icon: SiGoogle },
    { name: 'AMAZON', icon: SiAmazon },
    { name: 'SALESFORCE', icon: SiSalesforce },
    { name: 'IBM', icon: Building2 },
    { name: 'ORACLE', icon: SiOracle }
  ];

  return (
    <section className="bg-white py-16" data-testid="section-companies">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-gray-500 mb-8 font-medium" data-testid="text-companies-trusted">
          {t('companies.trusted')}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
          {companies.map((company, index) => {
            const IconComponent = company.icon;
            return (
              <div key={company.name} className="flex justify-center" data-testid={`logo-company-${index}`}>
                <div className="w-24 h-12 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-gray-600 hover:text-silicon-blue transition-colors duration-200" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
