import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (location !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" data-testid="header-main">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3" data-testid="link-logo">
            <div className="w-10 h-10 bg-gradient-to-r from-silicon-blue to-silicon-emerald rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SI</span>
            </div>
            <span className="text-2xl font-bold text-silicon-slate">Silicon-Intelligence</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-600 hover:text-silicon-blue font-medium"
              data-testid="button-nav-services"
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollToSection('use-cases')}
              className="text-gray-600 hover:text-silicon-blue font-medium"
              data-testid="button-nav-usecases"
            >
              {t('nav.useCases')}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-600 hover:text-silicon-blue font-medium"
              data-testid="button-nav-pricing"
            >
              {t('nav.pricing')}
            </button>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-silicon-blue font-medium"
              data-testid="link-nav-contact"
            >
              {t('nav.contact')}
            </Link>
            
            <LanguageSwitcher />
            
            <Link
              href="/checkout"
              className="bg-silicon-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
              data-testid="button-nav-getstarted"
            >
              {t('nav.getStarted')}
            </Link>
          </div>
          
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4 border-t pt-4">
            <button
              onClick={() => scrollToSection('services')}
              className="block text-gray-600 hover:text-silicon-blue font-medium"
              data-testid="button-mobile-services"
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollToSection('use-cases')}
              className="block text-gray-600 hover:text-silicon-blue font-medium"
              data-testid="button-mobile-usecases"
            >
              {t('nav.useCases')}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="block text-gray-600 hover:text-silicon-blue font-medium"
              data-testid="button-mobile-pricing"
            >
              {t('nav.pricing')}
            </button>
            <Link
              href="/contact"
              className="block text-gray-600 hover:text-silicon-blue font-medium"
              data-testid="link-mobile-contact"
            >
              {t('nav.contact')}
            </Link>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
            <Link
              href="/checkout"
              className="block w-full bg-silicon-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium text-center"
              data-testid="button-mobile-getstarted"
            >
              {t('nav.getStarted')}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
