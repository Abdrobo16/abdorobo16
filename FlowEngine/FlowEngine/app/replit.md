# Overview

This is a Store Account Management Web System built for tracking credit/debit transactions across multiple stores. The application provides a secure multi-store platform where users can manage stores, record daily transactions, and monitor running balances. The system supports role-based access control with Admin, Store Owner, and Clerk roles, multi-language support (English & Arabic) with RTL capabilities, and real-time transaction tracking with balance calculations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite for fast development and building
- **UI Components**: Shadcn/ui component library built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Routing**: Wouter for lightweight client-side routing with protected routes
- **State Management**: TanStack React Query for server state management and caching
- **Forms**: React Hook Form with Zod for type-safe form validation
- **Internationalization**: i18next with React integration for English/Arabic support and RTL layout handling

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle ORM for type-safe database operations with PostgreSQL
- **API Design**: RESTful API endpoints with role-based access control middleware
- **File Structure**: Clean separation between client, server, and shared code using monorepo structure
- **Development**: Hot module replacement with Vite in development mode
- **Session Storage**: PostgreSQL-based session storage with connect-pg-simple

## Authentication & Authorization
- **Provider**: Replit Auth integration for OAuth-based authentication using OpenID Connect
- **Session Management**: Server-side sessions stored in PostgreSQL with configurable TTL
- **Access Control**: Role-based permissions (Admin, StoreOwner, Clerk) enforced at API level
- **Security**: HTTP-only cookies, secure session handling, and proper CSRF protection
- **User Management**: Automatic user upsert on login with profile synchronization

## Data Architecture
- **Database Schema**: PostgreSQL with well-defined relationships using Drizzle ORM
  - Users table with role-based access and profile information
  - Stores table linked to store owners with metadata
  - Transactions table for financial records with decimal precision
  - Store-user relationships for access control and permissions
  - Sessions table for server-side session storage
- **Data Validation**: Zod schemas shared between client and server for consistent validation
- **Type Safety**: Full TypeScript coverage from database to frontend with shared types

## Key Design Patterns
- **Monorepo Structure**: Client, server, and shared code in single repository with proper path aliases
- **Type Sharing**: Common interfaces and schemas in shared directory for consistency
- **Component Composition**: Reusable UI components with consistent design patterns using shadcn/ui
- **Error Handling**: Centralized error handling with user-friendly messages and proper HTTP status codes
- **Loading States**: Comprehensive loading and error states throughout the application
- **Responsive Design**: Mobile-first approach with adaptive layouts and touch-friendly interfaces

# External Dependencies

## Database
- **PostgreSQL**: Primary database using Neon serverless PostgreSQL with connection pooling
- **Drizzle ORM**: Type-safe database operations with schema migrations support

## Authentication
- **Replit Auth**: OAuth provider integration using OpenID Connect specification
- **Passport.js**: Authentication middleware with custom OpenID Connect strategy
- **Session Storage**: PostgreSQL session store with automatic cleanup and TTL management

## UI Framework
- **Radix UI**: Headless component primitives for accessibility and keyboard navigation
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Build tool and development server with hot module replacement
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds

## Internationalization
- **i18next**: Internationalization framework with browser language detection
- **React i18next**: React bindings for i18next with hooks and components

## Form Handling
- **React Hook Form**: Performant forms with minimal re-renders
- **Hookform Resolvers**: Zod integration for type-safe form validation

## State Management
- **TanStack React Query**: Server state management with caching, background updates, and optimistic updates