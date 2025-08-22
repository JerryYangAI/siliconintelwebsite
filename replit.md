# Overview

Silicon-Intelligence is a full-stack SaaS application built for AI-powered business automation and workflow management. The platform provides intelligent agents and automation tools with multi-language support, payment processing via Stripe, and a comprehensive business-focused user interface. The application follows a modern web architecture with separate client and server codebases, shared schemas, and database integration.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built using React with TypeScript, utilizing Vite as the build tool for fast development and optimized production builds. The UI framework is based on shadcn/ui components with Radix UI primitives, styled using Tailwind CSS with a custom design system. The application uses Wouter for lightweight client-side routing and TanStack Query for efficient server state management.

**Key Design Decisions:**
- **Component Library**: Chose shadcn/ui with Radix UI for accessible, customizable components
- **Styling**: Tailwind CSS with CSS custom properties for theming and consistent design tokens
- **State Management**: TanStack Query for server state, React Context for client state
- **Internationalization**: react-i18next for multi-language support (English, Japanese, Chinese)

## Backend Architecture  
The server is built with Express.js and TypeScript, following a RESTful API design. The application uses a modular architecture with separate route handlers, storage abstraction, and middleware layers. The server includes comprehensive logging, error handling, and development tooling integration.

**Key Design Decisions:**
- **Framework**: Express.js chosen for simplicity and ecosystem maturity
- **Storage Pattern**: Abstract storage interface allowing for multiple implementations (currently in-memory, extensible to database)
- **Development Integration**: Vite middleware integration for seamless development experience
- **Error Handling**: Centralized error handling with consistent API responses

## Database Layer
The application uses Drizzle ORM with PostgreSQL for type-safe database operations. The schema includes users, demo requests, contact messages, and subscription management tables. Database migrations are handled through Drizzle Kit with support for schema evolution.

**Key Design Decisions:**
- **ORM Choice**: Drizzle for type safety and performance over heavier ORMs
- **Database**: PostgreSQL for reliability and advanced features
- **Schema Validation**: Zod integration for runtime validation matching database schema
- **Migration Strategy**: Code-first approach with automatic migration generation

## Payment Processing
Stripe integration handles subscription management and one-time payments. The system supports multiple pricing tiers (starter, professional, enterprise) with proper webhook handling for subscription lifecycle events.

**Key Design Decisions:**
- **Payment Provider**: Stripe for comprehensive payment processing and international support
- **Integration Pattern**: Stripe Elements for secure payment collection
- **Subscription Model**: Tiered pricing with different feature sets per plan

# External Dependencies

## Core Infrastructure
- **Database**: Neon Database (PostgreSQL) for managed database hosting
- **Payment Processing**: Stripe for subscription billing and payment processing
- **Frontend Hosting**: Configured for static site deployment with Vite build output

## Development Tools  
- **Build System**: Vite for fast development and optimized production builds
- **Type System**: TypeScript for type safety across the entire stack
- **Database ORM**: Drizzle with PostgreSQL adapter for type-safe database operations
- **Validation**: Zod for schema validation and type inference

## UI Framework
- **Component Library**: Radix UI primitives with shadcn/ui component system
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Internationalization**: i18next ecosystem for multi-language support

## Utility Libraries
- **HTTP Client**: Native fetch with TanStack Query for caching and synchronization  
- **Form Handling**: React Hook Form with Zod resolvers for type-safe form validation
- **Date Handling**: date-fns for date manipulation and formatting
- **Class Management**: clsx and tailwind-merge for conditional class application