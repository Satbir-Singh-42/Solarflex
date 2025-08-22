# Solar Weave Net - Energy Trading Platform

## Overview

Solar Weave Net is a modern React-based energy trading platform that visualizes and manages peer-to-peer energy trading in smart neighborhoods. The application provides real-time monitoring of energy generation, consumption, and trading between households with solar panels, batteries, and electric vehicles. It features grid health monitoring, ML-based forecasting, and a comprehensive trading interface for decentralized energy markets.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI System**: shadcn/ui component library built on Radix UI primitives for accessibility and customization
- **Styling**: Tailwind CSS with custom design tokens for energy-specific color schemes and gradients
- **State Management**: TanStack Query for server state management and caching
- **Routing**: React Router for client-side navigation with catch-all error handling

### Component Structure
- **Modular Design**: Component-based architecture with reusable UI components in `src/components/ui/`
- **Domain Components**: Specialized energy trading components including:
  - `HouseCard`: Individual household energy monitoring with solar/battery/EV status
  - `EnergyTradingPanel`: Real-time energy marketplace interface
  - `GridHealthMonitor`: Infrastructure monitoring with utilization metrics
  - `MLForecastPanel`: AI-powered energy prediction interface
  - `NeighborhoodView`: Street-level energy network visualization

### Design System
- **Custom CSS Variables**: Energy-themed color palette with HSL values for solar, battery, grid, and energy flow indicators
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Dark Mode Support**: Built-in theme switching capability
- **Accessibility**: Focus on ARIA compliance through Radix UI primitives

### Development Tooling
- **Build System**: Vite with React SWC for fast compilation and hot module replacement
- **Type Safety**: Strict TypeScript configuration with path aliases for clean imports
- **Code Quality**: ESLint with React hooks and TypeScript rules
- **Styling**: PostCSS with Tailwind CSS and Autoprefixer

### Project Structure
- **Source Organization**: Clear separation between pages, components, hooks, and utilities
- **Import Aliases**: Configured path mapping (`@/` prefix) for cleaner imports
- **Component Library**: Comprehensive UI component library with consistent styling patterns

## External Dependencies

### UI and Styling
- **Radix UI**: Headless component library for accessibility-first UI primitives
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe variant handling for component styling

### Data Management
- **TanStack Query**: Server state management with caching, synchronization, and background updates
- **React Hook Form**: Form state management with validation support
- **Date-fns**: Date manipulation and formatting utilities

### Development and Build
- **Vite**: Modern build tool with fast HMR and optimized production builds
- **TypeScript**: Static type checking and enhanced developer experience
- **ESLint**: Code linting and quality enforcement
- **Lovable Tagger**: Development-specific component tagging (development mode only)

### Additional Features
- **Next Themes**: Theme switching and dark mode support
- **Embla Carousel**: Touch-friendly carousel components
- **React Router**: Client-side routing and navigation
- **Sonner**: Toast notification system for user feedback

The application is designed as a progressive web app that can be deployed to any static hosting platform, with all data visualization and trading logic handled client-side through mock data and local state management.