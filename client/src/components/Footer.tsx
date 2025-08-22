import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  const platformLinks = ['Features', 'Pricing', 'Security', 'Integrations'];
  const resourceLinks = ['Documentation', 'API Reference', 'Tutorials', 'Community'];
  const companyLinks = ['About', 'Careers', 'Contact', 'Press'];
  const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'];

  return (
    <footer className="bg-silicon-slate text-white py-16" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6" data-testid="link-footer-logo">
              <div className="w-10 h-10 bg-gradient-to-r from-silicon-blue to-silicon-emerald rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SI</span>
              </div>
              <span className="text-2xl font-bold">Silicon-Intelligence</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md" data-testid="text-footer-description">
              {t('footer.description')}
            </p>
            <div className="text-sm text-gray-400">
              <p data-testid="text-footer-visit">{t('footer.visit')}</p>
              <p data-testid="text-footer-copyright">{t('footer.copyright')}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-platform-title">{t('footer.platform')}</h4>
            <ul className="space-y-2 text-gray-300">
              {platformLinks.map((link, index) => (
                <li key={link}>
                  <a href="#" className="hover:text-white" data-testid={`link-footer-platform-${index}`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-resources-title">{t('footer.resources')}</h4>
            <ul className="space-y-2 text-gray-300">
              {resourceLinks.map((link, index) => (
                <li key={link}>
                  <a href="#" className="hover:text-white" data-testid={`link-footer-resource-${index}`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-company-title">{t('footer.company')}</h4>
            <ul className="space-y-2 text-gray-300">
              {companyLinks.map((link, index) => (
                <li key={link}>
                  <a href="#" className="hover:text-white" data-testid={`link-footer-company-${index}`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 text-gray-300 mb-4 md:mb-0">
              {legalLinks.map((link, index) => (
                <a key={link} href="#" className="hover:text-white" data-testid={`link-footer-legal-${index}`}>
                  {link}
                </a>
              ))}
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white" data-testid="link-footer-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" data-testid="link-footer-twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" data-testid="link-footer-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
