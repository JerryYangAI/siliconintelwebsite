import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const demoFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  preferredTime: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
type DemoFormData = z.infer<typeof demoFormSchema>;

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'contact' | 'demo'>('contact');

  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
    },
  });

  const demoForm = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      preferredTime: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      contactForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const demoMutation = useMutation({
    mutationFn: (data: DemoFormData) => apiRequest('POST', '/api/demo-request', data),
    onSuccess: () => {
      toast({
        title: "Demo Requested",
        description: "Thank you for your interest! We'll contact you soon to schedule your demo.",
      });
      demoForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit demo request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onContactSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const onDemoSubmit = (data: DemoFormData) => {
    demoMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-slate-50" data-testid="page-contact">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-silicon-slate mb-6" data-testid="text-contact-title">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-contact-subtitle">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card data-testid="card-contact-info">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-silicon-blue" />
                    <span>Email</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">contact@siliconintel.ai</p>
                  <p className="text-gray-600">support@siliconintel.ai</p>
                </CardContent>
              </Card>

              <Card data-testid="card-contact-phone">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-silicon-blue" />
                    <span>Phone</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">+81 (3) 1234-5678</p>
                </CardContent>
              </Card>

              <Card data-testid="card-contact-address">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-silicon-blue" />
                    <span>Office</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">San Francisco, CA</p>
                  <p className="text-gray-600">Tokyo, Japan</p>
                  <p className="text-gray-600">Beijing, China</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Forms */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-8">
                {/* Tab Headers */}
                <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                      activeTab === 'contact'
                        ? 'bg-white text-silicon-blue shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    data-testid="button-tab-contact"
                  >
                    Contact Us
                  </button>
                  <button
                    onClick={() => setActiveTab('demo')}
                    className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                      activeTab === 'demo'
                        ? 'bg-white text-silicon-blue shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    data-testid="button-tab-demo"
                  >
                    {t('contact.demo.title')}
                  </button>
                </div>

                {/* Contact Form */}
                {activeTab === 'contact' && (
                  <Form {...contactForm}>
                    <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6" data-testid="form-contact">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={contactForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('contact.form.name')}</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} data-testid="input-contact-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={contactForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('contact.form.email')}</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@company.com" {...field} data-testid="input-contact-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={contactForm.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('contact.form.company')}</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Company" {...field} data-testid="input-contact-company" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={contactForm.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('contact.form.subject')}</FormLabel>
                              <FormControl>
                                <Input placeholder="How can we help?" {...field} data-testid="input-contact-subject" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={contactForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('contact.form.message')}</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your needs..." 
                                className="min-h-[120px]" 
                                {...field}
                                data-testid="textarea-contact-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-silicon-blue hover:bg-blue-700"
                        disabled={contactMutation.isPending}
                        data-testid="button-contact-send"
                      >
                        {contactMutation.isPending ? 'Sending...' : t('contact.form.send')}
                      </Button>
                    </form>
                  </Form>
                )}

                {/* Demo Request Form */}
                {activeTab === 'demo' && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-silicon-slate mb-2" data-testid="text-demo-title">
                        {t('contact.demo.title')}
                      </h3>
                      <p className="text-gray-600" data-testid="text-demo-subtitle">
                        {t('contact.demo.subtitle')}
                      </p>
                    </div>

                    <Form {...demoForm}>
                      <form onSubmit={demoForm.handleSubmit(onDemoSubmit)} className="space-y-6" data-testid="form-demo">
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={demoForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('contact.form.name')}</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} data-testid="input-demo-name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={demoForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('contact.form.email')}</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="john@company.com" {...field} data-testid="input-demo-email" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={demoForm.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('contact.form.company')}</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your Company" {...field} data-testid="input-demo-company" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={demoForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('contact.demo.phone')}</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1 (555) 123-4567" {...field} data-testid="input-demo-phone" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={demoForm.control}
                          name="preferredTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('contact.demo.preferredTime')}</FormLabel>
                              <FormControl>
                                <Input placeholder="Next week, Tuesday afternoon" {...field} data-testid="input-demo-time" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={demoForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('contact.form.message')} (Optional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us about your use case..." 
                                  className="min-h-[100px]" 
                                  {...field}
                                  data-testid="textarea-demo-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          className="w-full bg-silicon-blue hover:bg-blue-700"
                          disabled={demoMutation.isPending}
                          data-testid="button-demo-request"
                        >
                          {demoMutation.isPending ? 'Requesting...' : t('contact.demo.requestDemo')}
                        </Button>
                      </form>
                    </Form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
