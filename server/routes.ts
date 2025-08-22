import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertDemoRequestSchema, insertContactMessageSchema, insertSubscriptionSchema } from "@shared/schema";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Demo request endpoint
  app.post("/api/demo-request", async (req, res) => {
    try {
      const validatedData = insertDemoRequestSchema.parse(req.body);
      const demoRequest = await storage.createDemoRequest(validatedData);
      res.json({ success: true, id: demoRequest.id });
    } catch (error: any) {
      res.status(400).json({ 
        success: false, 
        message: "Invalid demo request data: " + error.message 
      });
    }
  });

  // Contact message endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(validatedData);
      res.json({ success: true, id: contactMessage.id });
    } catch (error: any) {
      res.status(400).json({ 
        success: false, 
        message: "Invalid contact message data: " + error.message 
      });
    }
  });

  // Stripe payment intent for one-time payments
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, plan } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          plan: plan || 'professional'
        }
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ 
        success: false,
        message: "Error creating payment intent: " + error.message 
      });
    }
  });

  // Subscription creation endpoint
  app.post("/api/create-subscription", async (req, res) => {
    try {
      const { email, plan, paymentMethodId } = req.body;
      
      // Create customer
      const customer = await stripe.customers.create({
        email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      // Define price based on plan
      let priceId;
      switch (plan) {
        case 'starter':
          priceId = process.env.STRIPE_STARTER_PRICE_ID;
          break;
        case 'professional':
          priceId = process.env.STRIPE_PROFESSIONAL_PRICE_ID;
          break;
        case 'enterprise':
          priceId = process.env.STRIPE_ENTERPRISE_PRICE_ID;
          break;
        default:
          priceId = process.env.STRIPE_PROFESSIONAL_PRICE_ID;
      }

      if (!priceId) {
        throw new Error(`Price ID not configured for plan: ${plan}`);
      }

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      const latestInvoice = subscription.latest_invoice as any;
      res.json({
        subscriptionId: subscription.id,
        clientSecret: latestInvoice?.payment_intent?.client_secret,
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false,
        message: "Error creating subscription: " + error.message 
      });
    }
  });

  // Get demo requests (admin endpoint)
  app.get("/api/admin/demo-requests", async (req, res) => {
    try {
      const requests = await storage.getDemoRequests();
      res.json(requests);
    } catch (error: any) {
      res.status(500).json({ 
        success: false,
        message: "Error fetching demo requests: " + error.message 
      });
    }
  });

  // Get contact messages (admin endpoint)
  app.get("/api/admin/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ 
        success: false,
        message: "Error fetching contact messages: " + error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
