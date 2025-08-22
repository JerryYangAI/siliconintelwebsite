import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Lock } from 'lucide-react';

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ plan }: { plan: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Thank you for your subscription!",
      });
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-checkout">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.paymentInfo')}</label>
        <PaymentElement />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.firstName')}</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-silicon-blue focus:border-transparent" 
            placeholder="John"
            data-testid="input-firstname"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.lastName')}</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-silicon-blue focus:border-transparent" 
            placeholder="Doe"
            data-testid="input-lastname"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Company (Optional)</label>
        <input 
          type="text" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-silicon-blue focus:border-transparent" 
          placeholder="Your Company Name"
          data-testid="input-company"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={!stripe || isLoading}
        className="w-full bg-silicon-blue text-white px-6 py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg transition duration-200 disabled:opacity-50"
        data-testid="button-submit-payment"
      >
        {isLoading ? 'Processing...' : `${t('checkout.subscribe')} - $299/month`}
      </button>
      
      <p className="text-xs text-gray-500 text-center" data-testid="text-checkout-terms">
        {t('checkout.terms')}
      </p>
    </form>
  );
};

export default function Checkout() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const [clientSecret, setClientSecret] = useState("");
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const plan = searchParams.get('plan') || 'professional';

  useEffect(() => {
    const amount = plan === 'starter' ? 99 : 299;
    
    apiRequest("POST", "/api/create-payment-intent", { amount, plan })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error('Error creating payment intent:', error);
      });
  }, [plan]);

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-slate-50" data-testid="page-checkout-loading">
        <Header />
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" data-testid="page-checkout">
      <Header />
      
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-silicon-slate mb-4" data-testid="text-checkout-title">
              {t('checkout.title')}
            </h2>
            <p className="text-lg text-gray-600" data-testid="text-checkout-subtitle">
              {t('checkout.subtitle')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-silicon-slate mb-6" data-testid="text-checkout-order-summary">
                  {t('checkout.orderSummary')}
                </h3>
                
                <div className="bg-slate-50 rounded-lg p-6 mb-6" data-testid="card-order-summary">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium text-silicon-slate">Professional Plan</span>
                    <span className="font-bold text-silicon-slate">$299/month</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    • Up to 25 AI Agents<br/>
                    • 100,000 tasks/month<br/>
                    • Advanced Analytics<br/>
                    • Priority Support
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center font-bold text-lg text-silicon-slate">
                      <span>{t('checkout.total')}</span>
                      <span>$299/month</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Lock className="w-4 h-4 text-silicon-emerald" />
                  <span data-testid="text-secure-payment">{t('checkout.secure')}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-silicon-slate mb-6" data-testid="text-payment-info">
                  {t('checkout.paymentInfo')}
                </h3>
                
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm plan={plan} />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
