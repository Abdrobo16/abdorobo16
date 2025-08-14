# Store Account Management System - Complete Source Code

## Overview
This is a comprehensive multi-language (English & Arabic) Store Account Management Web System built with React, Node.js, PostgreSQL, and Replit Auth. The system supports role-based access control (Admin, Store Owner, Clerk) with real-time transaction tracking and balance management.

## 🚀 Features
- ✅ Multi-language support (English & Arabic) with RTL support
- ✅ Role-based authentication (Admin, Store Owner, Clerk)
- ✅ Real-time transaction tracking
- ✅ Balance management and calculations
- ✅ Responsive dashboard with KPI cards
- ✅ Store management and user access control
- ✅ Admin panel for system administration
- ✅ Session-based authentication with PostgreSQL storage

## 📁 Project Structure

```
├── server/
│   ├── index.ts          # Express server entry point
│   ├── routes.ts         # API routes with authentication
│   ├── storage.ts        # Database operations layer
│   ├── db.ts            # Database connection setup
│   ├── replitAuth.ts    # Replit OAuth integration
│   └── vite.ts          # Vite development server
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── language-switcher.tsx  # Language selection
│   │   │   ├── sidebar.tsx           # Navigation sidebar
│   │   │   ├── kpi-card.tsx         # Dashboard metrics
│   │   │   ├── add-store-modal.tsx  # Store creation modal
│   │   │   └── add-transaction-modal.tsx
│   │   ├── pages/
│   │   │   ├── landing.tsx          # Login landing page
│   │   │   ├── dashboard.tsx        # Main dashboard
│   │   │   ├── stores.tsx           # Store listing
│   │   │   ├── store-details.tsx    # Individual store view
│   │   │   ├── admin-panel.tsx      # Admin management
│   │   │   ├── profile.tsx          # User profile
│   │   │   └── not-found.tsx        # 404 page
│   │   ├── hooks/
│   │   │   ├── useAuth.ts           # Authentication hook
│   │   │   ├── use-toast.ts         # Toast notifications
│   │   │   └── use-mobile.tsx       # Mobile detection
│   │   ├── lib/
│   │   │   ├── queryClient.ts       # React Query setup
│   │   │   ├── authUtils.ts         # Auth utilities
│   │   │   └── utils.ts             # General utilities
│   │   ├── i18n/
│   │   │   └── index.ts             # Internationalization
│   │   ├── App.tsx                  # React app root
│   │   ├── main.tsx                 # React entry point
│   │   └── index.css                # Global styles
│   └── index.html                   # HTML template
├── shared/
│   └── schema.ts                    # Database schema & types
├── package.json                     # Dependencies
├── drizzle.config.ts               # Database config
├── vite.config.ts                  # Vite config
├── tailwind.config.ts              # Tailwind config
└── tsconfig.json                   # TypeScript config
```

## 🛠 Technology Stack

### Backend
- **Node.js** with **Express.js** framework
- **PostgreSQL** with **Drizzle ORM** for type-safe database operations
- **Replit Auth** for OAuth-based authentication
- **Session management** with PostgreSQL storage
- **TypeScript** for type safety

### Frontend
- **React 18** with **TypeScript**
- **Vite** for fast development and building
- **TanStack React Query** for server state management
- **Wouter** for lightweight routing
- **Shadcn/UI** components with **Radix UI** primitives
- **Tailwind CSS** for styling
- **React Hook Form** with **Zod** validation
- **react-i18next** for internationalization

## 🌐 Internationalization Features

The system includes comprehensive i18n support:

### Language Switcher Component
```typescript
// Located in: client/src/components/language-switcher.tsx
// Features: Dropdown menu, RTL support, persistent language selection
```

### Translation Files
```typescript
// Located in: client/src/i18n/index.ts
// Supports: English (en) and Arabic (ar)
// Includes: Navigation, forms, messages, error handling
```

### RTL Support
- Automatic text direction switching
- Arabic language support with proper formatting
- Persistent language selection in localStorage

## 🔐 Authentication & Authorization

### Role-Based Access Control
- **Admin**: Full system access, user management
- **Store Owner**: Can create/manage own stores
- **Clerk**: Limited access to assigned stores

### Security Features
- OAuth integration with Replit
- Session-based authentication
- HTTP-only cookies
- CSRF protection
- Role-based route protection

## 📊 Database Schema

### Core Tables
- `users`: User accounts with roles
- `stores`: Store information and ownership
- `transactions`: Financial transaction records
- `store_users`: User access to stores
- `sessions`: Session storage for authentication

### Key Relationships
- Users can own multiple stores
- Stores can have multiple transactions
- Users can have access to multiple stores
- Transactions link to stores and users

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Replit account for authentication

### Environment Variables
```env
DATABASE_URL=postgresql://...
SESSION_SECRET=your-session-secret
REPLIT_DOMAINS=your-domain.repl.co
REPL_ID=your-repl-id
```

### Installation & Setup
```bash
# Install dependencies
npm install

# Setup database
npm run db:push

# Start development server
npm run dev
```

### Production Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Adaptive navigation (sidebar on desktop, mobile menu)
- Touch-friendly interactions
- Optimized layouts for all screen sizes

## 🧪 Testing

The application includes comprehensive test attributes:
- `data-testid` attributes on all interactive elements
- Structured naming convention for easy testing
- Unique identifiers for dynamic content

## 🔧 Configuration Files

### Vite Configuration
- React plugin setup
- Path aliases for clean imports
- Development and production optimization

### Tailwind Configuration
- Custom color palette
- Component-specific utilities
- Animation and transition classes

### TypeScript Configuration
- Strict type checking
- Path mapping for imports
- Modern JavaScript features

## 📈 Performance Features

- **Code Splitting**: Automatic route-based code splitting
- **Caching**: TanStack Query for efficient data caching
- **Optimized Building**: Vite for fast builds and HMR
- **Database Indexing**: Proper indexes for query performance

## 🔄 State Management

- **Server State**: TanStack React Query
- **Authentication State**: Custom React hooks
- **Form State**: React Hook Form
- **UI State**: React useState/useReducer

## 🎨 Styling System

- **Design System**: Shadcn/UI component library
- **Utility Framework**: Tailwind CSS
- **Icons**: Lucide React
- **Color Scheme**: Consistent brand colors
- **Dark Mode Ready**: Infrastructure in place

## 📝 API Documentation

### Authentication Endpoints
- `GET /api/auth/user` - Get current user
- `GET /api/login` - Initiate OAuth login
- `GET /api/logout` - Logout and clear session

### Store Management
- `GET /api/stores` - List user stores
- `POST /api/stores` - Create new store
- `GET /api/stores/:id` - Get store details
- `PATCH /api/stores/:id` - Update store
- `DELETE /api/stores/:id` - Delete store

### Transaction Management
- `GET /api/stores/:id/transactions` - List store transactions
- `POST /api/stores/:id/transactions` - Create transaction
- `PATCH /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Analytics & Reports
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/stores/:id/balance` - Store balance summary

### Admin Endpoints
- `GET /api/admin/stores` - All stores (admin only)

## 🛡️ Security Considerations

- Input validation with Zod schemas
- SQL injection prevention with parameterized queries
- XSS protection with React's built-in escaping
- CSRF protection via same-origin policy
- Role-based access control at API level
- Session security with HTTP-only cookies

## 🔮 Future Enhancements

- Real-time notifications with WebSockets
- Advanced reporting and analytics
- Bulk operations for transactions
- Email notifications for important events
- Mobile app with React Native
- Advanced user management features
- Data export capabilities
- Audit logging system

## 📞 Support & Maintenance

The system is designed for easy maintenance with:
- Clear separation of concerns
- Comprehensive error handling
- Structured logging
- Type safety throughout
- Consistent code patterns
- Detailed documentation

---

**Built with ❤️ using modern web technologies and best practices**