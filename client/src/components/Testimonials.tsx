import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import businessExecutiveImg from '@assets/generated_images/Professional_business_executive_headshot_fcdd0ae5.png';
import techFounderImg from '@assets/generated_images/Tech_startup_founder_headshot_8b45811e.png';
import marketingDirectorImg from '@assets/generated_images/Marketing_director_professional_headshot_b1ce5cd5.png';

export default function Testimonials() {
  const { t } = useTranslation();

  const testimonials = [
    {
      textKey: 'testimonials.testimonial1.text',
      authorKey: 'testimonials.testimonial1.author',
      positionKey: 'testimonials.testimonial1.position',
      image: businessExecutiveImg
    },
    {
      textKey: 'testimonials.testimonial2.text',
      authorKey: 'testimonials.testimonial2.author',
      positionKey: 'testimonials.testimonial2.position',
      image: techFounderImg
    },
    {
      textKey: 'testimonials.testimonial3.text',
      authorKey: 'testimonials.testimonial3.author',
      positionKey: 'testimonials.testimonial3.position',
      image: marketingDirectorImg
    }
  ];

  return (
    <section className="py-20 bg-white" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-silicon-slate mb-6" data-testid="text-testimonials-title">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600" data-testid="text-testimonials-subtitle">
            {t('testimonials.subtitle')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-slate-50 rounded-2xl p-8 mb-8" data-testid="card-testimonial-main">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-lg text-gray-700 mb-6 italic" data-testid="text-testimonial-main-quote">
                {t('testimonials.testimonial1.text')}
              </p>
              
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonials[0].image} 
                  alt={t('testimonials.testimonial1.author')} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-silicon-slate" data-testid="text-testimonial-main-author">
                    {t('testimonials.testimonial1.author')}
                  </div>
                  <div className="text-gray-600 text-sm" data-testid="text-testimonial-main-position">
                    {t('testimonials.testimonial1.position')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {testimonials.slice(1).map((testimonial, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6" data-testid={`card-testimonial-${index + 1}`}>
                <div className="flex items-center space-x-3 mb-3">
                  <img 
                    src={testimonial.image} 
                    alt={t(testimonial.authorKey)} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-silicon-slate" data-testid={`text-testimonial-author-${index + 1}`}>
                      {t(testimonial.authorKey)}
                    </div>
                    <div className="text-sm text-gray-600" data-testid={`text-testimonial-position-${index + 1}`}>
                      {t(testimonial.positionKey)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700" data-testid={`text-testimonial-quote-${index + 1}`}>
                  {t(testimonial.textKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
