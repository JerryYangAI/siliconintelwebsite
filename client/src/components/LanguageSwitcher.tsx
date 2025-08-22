import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative" data-testid="language-switcher">
      <button
        className="flex items-center space-x-2 text-gray-600 hover:text-silicon-blue font-medium"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-language-toggle"
      >
        <span>{currentLang?.flag}</span>
        <span>{currentLang?.code.toUpperCase()}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50 border">
          {languages.map((language) => (
            <button
              key={language.code}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              onClick={() => {
                changeLanguage(language.code);
                setIsOpen(false);
              }}
              data-testid={`button-language-${language.code}`}
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
