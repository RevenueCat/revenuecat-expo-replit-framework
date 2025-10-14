# Expo React Native + RevenueCat Mobile App

## Overview

Ready-to-run Expo + RevenueCat starter template. This is a cross-platform mobile application built with Expo and React Native, featuring integrated RevenueCat subscription management. The app uses file-based routing with Expo Router and supports iOS, Android, and web platforms with a complete subscription paywall system.

## User Preferences

Preferred communication style: Simple, everyday language.

## Quick Start

### Run on Replit
- Press Run. The dev server starts automatically on port `8081` and opens a web preview URL.
- Hot reload is enabled. Edit files and the browser refreshes.

### Without RevenueCat Setup
- The app requires RevenueCat API keys to function properly.
- Without keys, you'll see an error but the basic navigation will still work.
- Add your test API key to enable subscription testing.

## RevenueCat Configuration

### 🔐 Using Replit Secrets (Recommended)

**All API keys are now stored as environment variables using Replit Secrets for security.**

### 🧪 Test Store Setup (Start Here!)
**Start with the test store** - works on iOS, Android, and Web without connecting external stores!

1. **Open Replit Secrets**
   - Click "Tools" > "Secrets" in the left sidebar
   - Or search for "Secrets" in the command palette

2. **Add your test API key**
   - Click "Add new secret"
   - Key: `REVENUECAT_TEST_API_KEY`
   - Value: Your test API key (starts with `test_`)
   - Get it from: https://app.revenuecat.com/projects/[your-project]/api-keys

3. **Restart the dev server**
   - The app will automatically pick up the new secret
   - Look for "🧪 Running in TEST STORE mode" in the console

### 🏪 Production Store Keys (When Ready to Launch)
When ready for real app stores, add these secrets using the same process:

**iOS (App Store):**
- Key: `REVENUECAT_IOS_API_KEY`
- Value: Your iOS API key (starts with `appl_`)

**Android (Google Play):**
- Key: `REVENUECAT_ANDROID_API_KEY`
- Value: Your Android API key (starts with `goog_`)

**Web (RevenueCat Web Billing):**
- Key: `REVENUECAT_WEB_API_KEY`
- Value: Your web API key (starts with `rcb_`)

**Switch to production mode:**
- Key: `REVENUECAT_USE_TEST_STORE`
- Value: `false`

### 📌 Optional Configuration Secrets

**Custom Entitlement ID:**
- Key: `REVENUECAT_ENTITLEMENT_ID`
- Value: Your entitlement ID (default: `premium`)

**Why Use Secrets?**
- ✅ API keys never appear in git history
- ✅ Easy to rotate if compromised
- ✅ Works seamlessly in development and deployment
- ✅ No accidental commits of sensitive data

## System Architecture

### Frontend Architecture
- **Framework**: React Native with Expo SDK 54
- **Routing**: File-based routing using Expo Router 6.x with typed routes
- **Navigation**: Tab-based navigation with React Navigation
- **Subscriptions**: RevenueCat SDK integration with cross-platform support
- **UI Components**: Custom themed components with automatic light/dark mode support
- **Styling**: StyleSheet-based styling with dynamic theming
- **Animations**: React Native Reanimated for smooth animations and transitions
- **Icons**: Platform-specific icons (SF Symbols on iOS, Material Icons on Android/web)

### Component Architecture
- **RevenueCat Provider**: Centralized subscription state management with React Context
- **Themed Components**: ThemedText and ThemedView components that automatically adapt to color schemes
- **Reusable UI**: Modular components like Collapsible, ParallaxScrollView, and HapticTab
- **Platform Adaptation**: Platform-specific implementations for optimal native experience
- **Custom Hooks**: useColorScheme, useThemeColor, and usePurchases for consistent functionality

### Development Tools
- **TypeScript**: Full TypeScript support with strict mode enabled
- **ESLint**: Code linting with Expo-specific configuration
- **Jest**: Testing framework with Expo preset
- **Development**: Hot reloading and debugging support across all platforms

### Platform Support
- **iOS**: Native iOS features including haptic feedback and blur effects
- **Android**: Adaptive icons and edge-to-edge display support
- **Web**: Metro bundler with static output generation
- **Cross-Platform**: Shared codebase with platform-specific optimizations when needed

### Project Structure
- File-based routing with organized tab structure in `app/(tabs)/`
- RevenueCat provider wrapping the entire app in `app/_layout.tsx`
- Subscription paywall screen in `app/paywall.tsx`
- RevenueCat components in dedicated `components/` directory
- Centralized RevenueCat configuration in `constants/RevenueCat.ts`
- Purchase hooks and utilities in `hooks/usePurchases.ts`
- Platform-specific component implementations

## Key Files

### RevenueCat Integration
- `app/_layout.tsx` – wraps app with `RevenueCatProvider` and Router
- `app/(tabs)/index.tsx` – Home tab with subscription status and content
- `app/(tabs)/profile.tsx` – Profile tab with debug info and configuration status
- `app/paywall.tsx` – Cross-platform paywall UI with purchase flow
- `components/RevenueCatProvider.tsx` – SDK initialization, state management, and actions
- `hooks/usePurchases.ts` – purchasing helpers and paywall utilities
- `constants/RevenueCat.ts` – API keys and entitlement configuration

### Core App Files
- `components/ThemedText.tsx` and `components/ThemedView.tsx` – Themed UI components
- `hooks/useColorScheme.ts` and `hooks/useThemeColor.ts` – Theming utilities
- `constants/Colors.ts` – Color scheme definitions

## External Dependencies

### Core Dependencies
- **Expo SDK**: Primary development platform and runtime (^54.0.0)
- **React Navigation**: Navigation library with bottom tabs support
- **React Native Reanimated**: Animation library for smooth transitions
- **Expo Router**: File-based routing system

### RevenueCat Integration
- **react-native-purchases**: RevenueCat SDK for subscription management (^9.5.0)

### UI and UX Libraries
- **@expo/vector-icons**: Icon library for cross-platform icons
- **expo-blur**: Native blur effects for iOS
- **expo-haptics**: Haptic feedback support
- **expo-symbols**: SF Symbols support for iOS

### Development Dependencies
- **TypeScript**: Type checking and development experience (~5.9.2)
- **ESLint**: Code quality and consistency
- **Jest**: Unit testing framework
- **Babel**: JavaScript compilation

### Platform Services
- **expo-web-browser**: In-app browser functionality
- **expo-linking**: Deep linking support
- **expo-splash-screen**: Native splash screen management
- **expo-status-bar**: Status bar styling control

### Native Modules
- **react-native-gesture-handler**: Touch and gesture handling
- **react-native-safe-area-context**: Safe area management
- **react-native-screens**: Native screen management
- **react-native-webview**: WebView component support

## Available Scripts

- Start web dev server: `npm run web` or `expo start --web`
- Start with platform selector: `npm start` or `expo start`
- Start iOS simulator: `npm run ios`
- Start Android emulator: `npm run android`
- Run tests: `npm test`
- Run linting: `npm run lint`
- Reset to clean app shell: `npm run reset-project`

## Testing Notes

### Native Testing
- Web works in Replit. For iOS/Android native flows, use local simulators/emulators (`npx expo start` then `i`/`a`) or EAS builds.
- Test store works on all platforms without sandbox accounts - just configure products in RevenueCat.
- Production purchases require store sandbox accounts and store-specific product configuration.

### RevenueCat Test Store Benefits
- Works on iOS, Android, and Web without external store setup
- No need for App Store Connect, Google Play Console, or payment processor setup
- Perfect for development, testing, and demos
- Configure products, packages, and entitlements directly in RevenueCat dashboard

## Troubleshooting

### Replit Issues
- Server didn't start? Press Run again or reload the workspace.
- No preview? Ensure port is correct and the process is running.
- Keys not picked up? Add secrets, then fully restart the Repl.

### RevenueCat Issues
- Check the Profile tab for configuration status and debug information
- Ensure API key starts with `test_` when using test store
- Verify entitlement ID matches your RevenueCat dashboard configuration

## SDK References

- [react-native-purchases SDK Documentation](https://docs.revenuecat.com/docs/reactnative) - Integration guide
- [react-native-purchases API Reference](https://revenuecat.github.io/react-native-purchases-docs) - Complete SDK reference
- [RevenueCat Test Store Guide](https://docs.revenuecat.com/docs/test-store) - Testing with the test store
- [Expo Documentation](https://docs.expo.dev/) - Expo framework documentation