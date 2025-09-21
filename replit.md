# Document Request Management System

## Overview

This is a full-stack web application for managing document requests, built as a barangay (local government) document processing system. The application allows users to submit requests for various official documents (like certificates, clearances, and permits) and provides staff with tools to manage and process these requests. The system tracks the complete lifecycle of document requests from submission to completion, including status updates, payment tracking, and transaction history.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom theming and CSS variables
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Authentication**: Session-based authentication with context provider

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Authentication**: Passport.js with local strategy and session management
- **Password Security**: Node.js crypto module with scrypt hashing
- **Session Storage**: PostgreSQL-based session store with fallback to memory store
- **API Design**: RESTful endpoints with proper HTTP status codes and error handling

### Database Architecture
- **Primary Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM with TypeScript-first schema definition
- **Schema Design**: Three main entities:
  - Users: Authentication and user management
  - Document Requests: Core business logic with status tracking
  - Transactions: Audit trail for all request modifications
- **Migration Strategy**: Drizzle Kit for database schema migrations

### Key Features and Business Logic
- **Document Types**: Supports multiple document types (clearances, certificates, permits)
- **Status Workflow**: Complete lifecycle tracking (pending → processing → approved → ready_for_pickup → completed)
- **Payment System**: Integrated fee calculation and payment status tracking
- **Audit Trail**: Complete transaction history for all request changes
- **Role-based Access**: Differentiated user and staff interfaces

### Development and Deployment
- **Development**: Hot reload with Vite dev server and TypeScript checking
- **Build Process**: Client-side bundling with Vite, server bundling with esbuild
- **Environment**: Environment-based configuration with development/production modes
- **Code Quality**: TypeScript strict mode, path aliases for clean imports

## External Dependencies

### Database and Storage
- **Neon Database**: Serverless PostgreSQL hosting platform
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI and Frontend Libraries
- **Radix UI**: Comprehensive component library for accessibility and functionality
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation library
- **date-fns**: Date manipulation and formatting

### Backend and Server Libraries
- **Express.js**: Web application framework
- **Passport.js**: Authentication middleware with local strategy
- **Drizzle ORM**: TypeScript ORM for database operations
- **express-session**: Session management middleware

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type system and compiler
- **ESBuild**: Fast JavaScript bundler for production builds
- **Drizzle Kit**: Database migration and introspection tools