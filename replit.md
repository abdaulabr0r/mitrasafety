# Safety Store (Mitra Safety)

## Project Overview
**Safety Store** is an e-commerce platform for safety equipment targeted at the Indonesian market. The platform serves both B2C (individual buyers) and B2B (organizational procurement) customers.

**Market:** Indonesia  
**Language:** Indonesian (Bahasa Indonesia)  
**Development Level:** Beginner-Intermediate  

## Project Status
✅ **MIGRATED** - Project successfully migrated to Replit environment (October 20, 2025)

## Current Features

### Core E-commerce Functionality
- **Product Catalog** - Browse safety equipment (helmets, gloves, vests, shoes, goggles, masks)
- **Advanced Filtering** - Filter by safety standards, categories, price, and specifications
- **Shopping Cart** - Add/remove items with real-time cart updates
- **Product Details** - Detailed product information with images
- **Search** - Full-text product search in Indonesian
- **Responsive Design** - Mobile-first approach with tablet and desktop support

### B2C Features
- Guest checkout capability
- Individual product purchases
- Product recommendations
- User reviews and ratings system

### B2B Features
- B2B checkout flow for bulk orders
- Employee subsidy/allowance tracking
- Purchase order submission
- Organizational account management

### Technical Features
- **Database:** SQLite with Drizzle ORM (mitrasafety.db)
- **State Management:** Zustand for cart and product state
- **UI Components:** Shadcn UI component library
- **Animations:** Framer Motion for smooth interactions
- **Forms:** React Hook Form with Zod validation
- **Data Fetching:** TanStack Query (React Query)

## Project Architecture

### Frontend (`/client`)
- **Framework:** React + Vite + TypeScript
- **Styling:** Tailwind CSS with custom theme
- **Routing:** Wouter (lightweight routing)
- **Components:** Shadcn UI primitives + custom components

### Backend (`/server`)
- **Runtime:** Node.js + Express
- **Database:** SQLite + Drizzle ORM
- **API:** RESTful endpoints
- **Session:** Express Session with MemoryStore

### Database Schema (`/shared/schema.ts`)
- Products (id, name, category, price, images, safety standards)
- Categories (id, name, icon)
- Orders (B2C and B2B orders)
- Cart items (user cart management)

## Enhancement Requirements

The following enhancements are planned to improve the platform:

### Accessibility & Standards
1. ✅ **Color Contrast** - Meet WCAG AA standards for text readability
2. ✅ **Semantic HTML** - Proper HTML5 semantic elements and ARIA labels
3. ✅ **Alt Text** - Meaningful alt attributes for all images
4. ✅ **Keyboard Navigation** - Full keyboard accessibility with visible focus states

### Performance
5. **Image Optimization** - WebP/AVIF formats, lazy loading
6. **Bundle Optimization** - Code splitting, tree shaking
7. **Caching Strategy** - Browser caching, CDN integration
8. **Web Performance** - Fast load times, optimized Critical Rendering Path

### Cross-Platform Compatibility
9. **Browser Support** - Chrome, Firefox, Safari, Edge
10. **Device Support** - iPhone, Android, tablets
11. **Responsive Theme** - Fluid layouts across all screen sizes
12. **Touch Targets** - Minimum 44px touch targets for mobile

### User Experience
13. **Simplified Checkout** - Streamlined multi-step checkout flow
14. **Mobile Navigation** - Simplified mobile menu and navigation
15. **Page Content** - Optimized product descriptions and CTAs
16. **Compact Layouts** - Clean, minimal designs reducing visual noise

### Code Quality
17. **Maintainability** - Clear structure, modular components
18. **Documentation** - Code comments in Indonesian (Bahasa Indonesia)
19. **Debuggability** - Easy to debug and troubleshoot

## Design Principles

### Mobile-First Approach
- Start with mobile layouts, progressively enhance for larger screens
- Majority of Indonesian e-commerce traffic is mobile

### Visual Priority
- High-quality product images from multiple angles
- Product videos where applicable
- Clear pricing and discount display

### Conversion Optimization
- Users should find products within 3 clicks
- Prominent search with autocomplete
- Faceted filtering by safety standards and attributes

### Accessibility (A11y)
- Non-negotiable requirement
- Legal compliance in many jurisdictions
- Inclusive design for all users

## Technology Stack

### Frontend Dependencies
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + Shadcn UI
- Wouter (routing)
- TanStack Query (data fetching)
- Zustand (state management)
- Framer Motion (animations)
- React Hook Form + Zod (forms/validation)
- Lucide React (icons)

### Backend Dependencies
- Express.js
- Drizzle ORM + SQLite
- Express Session
- CORS middleware

### Dev Tools
- TypeScript
- ESLint + Prettier (code quality)
- Drizzle Kit (migrations)
- tsx (TypeScript execution)

## File Structure

```
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ui/          # Shadcn UI primitives
│   │   │   ├── Header.tsx   # Site header with search
│   │   │   ├── Hero.tsx     # Hero section
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CartSheet.tsx
│   │   │   └── ...
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── stores/          # Zustand stores
│   │   ├── lib/             # Utilities
│   │   ├── App.tsx          # Root component
│   │   └── index.css        # Global styles
│   └── index.html
├── server/                   # Backend application
│   ├── index.ts             # Express server entry
│   ├── routes.ts            # API routes
│   ├── storage.ts           # Storage interface
│   ├── db.ts                # Database connection
│   └── vite.ts              # Vite middleware
├── shared/
│   └── schema.ts            # Shared types & Drizzle schema
├── Research/                # Design research documents
├── attached_assets/         # Product images
└── design_guidelines.md     # UI/UX design guidelines
```

## Running the Project

The project runs automatically via the configured workflow:

```bash
npm run dev
```

This starts:
- Express server on port 5000 (backend API)
- Vite dev server (frontend with HMR)

The application is available at: `https://<repl-url>.replit.dev`

## Development Guidelines

### Code Comments
All code comments and documentation MUST be written in **Indonesian (Bahasa Indonesia)** for developer-facing content.

### Open-Source First
Prefer open-source, free tools and libraries. Avoid paid services.

### Beginner-Intermediate Level
Keep implementations pragmatic and maintainable. Avoid overly complex patterns.

### Testing
Manual testing via browser and mobile device emulation. Future: Add automated tests.

## User Preferences

### Development Style
- Clear, maintainable code structure
- Modular component design
- Consistent naming conventions
- Indonesian comments for clarity

### UI/UX Focus
- Prioritize user experience over technical complexity
- Mobile-first responsive design
- Accessibility compliance
- Fast, performant interactions

### Workflow
- Use existing Shadcn components
- Follow the 8-point grid system
- Apply Gestalt principles for visual hierarchy
- Implement proper button states and interactions

## Recent Changes

**October 20, 2025**
- ✅ Migrated project from Replit Agent to Replit environment
- ✅ Reinstalled all Node.js dependencies
- ✅ Configured and started development workflow
- ✅ Verified application is running successfully
- ✅ Created project documentation (replit.md)

## Next Steps

1. Review and enhance accessibility features
2. Optimize images for web performance
3. Implement advanced caching strategies
4. Test cross-browser compatibility
5. Enhance mobile checkout flow
6. Add Indonesian code documentation
7. Performance audit and optimization

## Research Documents

- `Research/E-commerce UI_UX Design Research.txt` - Comprehensive UX research for safety shoe e-commerce
- `attached_assets/E-commerce UI_UX Design Research_1760982946974.txt` - Detailed design analysis
- `attached_assets/Pasted-I-am-a-UI-UX-developer...` - Project requirements and enhancement guidelines
- `design_guidelines.md` - UI/UX implementation guidelines

## Notes

- The platform is designed for dual markets (B2C + B2B)
- All user-facing content is in Indonesian
- Focus on safety equipment compliance and standards
- Target audience: Individual buyers and organizational procurement managers
- Market positioning: Trusted by 500+ companies in Indonesia
