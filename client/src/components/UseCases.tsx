import { useTranslation } from 'react-i18next';

export default function UseCases() {
  const { t } = useTranslation();

  const useCases = [
    {
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      alt: "AI agents collaborating in a modern digital workspace",
      tags: [
        { label: "Enterprise", color: "bg-silicon-blue/10 text-silicon-blue" },
        { label: "Automation", color: "bg-silicon-emerald/10 text-silicon-emerald" }
      ],
      titleKey: 'useCases.case1.title',
      descriptionKey: 'useCases.case1.description'
    },
    {
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      alt: "International business professionals collaborating on global projects",
      tags: [
        { label: "Global", color: "bg-purple-500/10 text-purple-500" },
        { label: "Strategy", color: "bg-orange-500/10 text-orange-500" }
      ],
      titleKey: 'useCases.case2.title',
      descriptionKey: 'useCases.case2.description'
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      alt: "Advanced enterprise technology infrastructure with automated systems",
      tags: [
        { label: "Operations", color: "bg-red-500/10 text-red-500" },
        { label: "Efficiency", color: "bg-silicon-blue/10 text-silicon-blue" }
      ],
      titleKey: 'useCases.case3.title',
      descriptionKey: 'useCases.case3.description'
    }
  ];

  const industries = [
    'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Logistics', 'Media', 'Technology', 'Education'
  ];

  return (
    <section id="use-cases" className="py-20 bg-white" data-testid="section-usecases">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-silicon-slate mb-6" data-testid="text-usecases-title">
            {t('useCases.title')}
          </h2>
          <p className="text-xl text-gray-600" data-testid="text-usecases-subtitle">
            {t('useCases.subtitle')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="bg-slate-50 rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
              data-testid={`card-usecase-${index}`}
            >
              <img 
                src={useCase.image} 
                alt={useCase.alt}
                className="w-full h-48 object-cover"
                data-testid={`img-usecase-${index}`}
              />
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  {useCase.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className={`${tag.color} px-3 py-1 rounded-full text-sm font-medium`}
                      data-testid={`tag-usecase-${index}-${tagIndex}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold text-silicon-slate mb-3" data-testid={`text-usecase-title-${index}`}>
                  {t(useCase.titleKey)}
                </h3>
                <p className="text-gray-600 mb-4" data-testid={`text-usecase-description-${index}`}>
                  {t(useCase.descriptionKey)}
                </p>
                <a href="#" className="text-silicon-blue hover:text-blue-700 font-medium" data-testid={`link-usecase-learn-${index}`}>
                  Learn more →
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <div className="flex flex-wrap gap-3 justify-center">
            {industries.map((industry, index) => (
              <span
                key={industry}
                className="bg-white border border-gray-200 px-4 py-2 rounded-full text-gray-600 hover:border-silicon-blue hover:text-silicon-blue transition duration-200 cursor-pointer"
                data-testid={`tag-industry-${index}`}
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
