# RevenueCat + Expo Framework

A comprehensive Expo framework with RevenueCat integration for cross-platform subscription management. This template provides everything you need to build subscription-based apps that work seamlessly across iOS, Android, and Web platforms.

![Platforms](https://img.shields.io/badge/platforms-iOS%20%7C%20Android%20%7C%20Web-blue)
![RevenueCat](https://img.shields.io/badge/RevenueCat-9.3.0-green)
![Expo](https://img.shields.io/badge/Expo-53.0.9-black)

## ✨ Features

- 🚀 **Cross-Platform Support** - iOS, Android, and Web with RevenueCat Web Billing
- 📱 **Modern UI** - Clean, responsive interface using Expo's design patterns
- 🔧 **Easy Configuration** - Well-documented setup with clear instructions
- 🛠️ **Developer Tools** - Debug screens, error handling, and development aids
- 📚 **In-App Documentation** - Comprehensive guides built into the app
- 🔄 **Real-time Updates** - Automatic subscription status synchronization
- 🧪 **Testing Ready** - Sandbox testing support for all platforms

## 🏁 Quick Start

### 1. Installation

```bash
npm install
```

### 2. Configure RevenueCat

1. Create a RevenueCat account at [app.revenuecat.com](https://app.revenuecat.com/)
2. Create a new project and get your API keys
3. Update `constants/RevenueCat.ts` with your API keys:

```typescript
export const REVENUECAT_CONFIG = {
  IOS_API_KEY: 'appl_xxxxxxxxxx',        // Your iOS API key
  ANDROID_API_KEY: 'goog_xxxxxxxxxx',    // Your Android API key
  WEB_API_KEY: 'strp_xxxxxxxxxx',        // Your Web API key (for web billing)
  ENTITLEMENT_ID: 'premium',             // Your entitlement identifier
};
```

### 3. Set Up Products & Entitlements

1. Configure products in App Store Connect and Google Play Console
2. Create entitlements in your RevenueCat dashboard
3. Set up offerings to group your products

### 4. Start Development

```bash
npx expo start
```

Choose your platform:
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Press `w` for Web Browser

## 📋 Platform Setup

### iOS Setup

1. **App Store Connect:**
   - Create your app and configure in-app purchases
   - Set up subscription products with pricing

2. **RevenueCat Dashboard:**
   - Add your iOS app with Bundle ID
   - Configure the iOS API key
   - Upload App Store Connect credentials

3. **Testing:**
   - Use App Store Connect sandbox accounts
   - Test purchases in iOS Simulator or device

### Android Setup

1. **Google Play Console:**
   - Create your app and configure billing products
   - Set up subscription products with pricing

2. **RevenueCat Dashboard:**
   - Add your Android app with Package Name
   - Configure the Android API key
   - Upload Google Play service account credentials

3. **Testing:**
   - Use Google Play Console test accounts
   - Test purchases on Android emulator or device

### Web Setup

1. **Stripe Account:**
   - Create a Stripe account for payment processing
   - Get your Stripe keys (test and live)

2. **RevenueCat Dashboard:**
   - Configure Web Billing in your project settings
   - Connect your Stripe account
   - Set up web products and pricing

3. **Testing:**
   - Use Stripe test mode for development
   - Test purchases in web browser

## 🏗️ Project Structure

```
├── app/
│   ├── _layout.tsx           # Root layout with RevenueCat provider
│   ├── (tabs)/
│   │   ├── index.tsx         # Home screen with subscription status
│   │   ├── explore.tsx       # RevenueCat documentation hub
│   │   └── profile.tsx       # Account management & debug tools
│   └── paywall.tsx          # Cross-platform paywall
├── components/
│   └── RevenueCatProvider.tsx # RevenueCat context provider
├── hooks/
│   └── usePurchases.ts      # Main RevenueCat integration hook
├── constants/
│   └── RevenueCat.ts        # Configuration and API keys
└── README.md               # This file
```

## 🔧 Configuration

### Required Variables

Update these values in `constants/RevenueCat.ts`:

| Variable | Description | Required |
|----------|-------------|----------|
| `IOS_API_KEY` | iOS API key from RevenueCat dashboard | Yes |
| `ANDROID_API_KEY` | Android API key from RevenueCat dashboard | Yes |
| `WEB_API_KEY` | Web API key for Stripe integration | Yes (for web) |
| `ENTITLEMENT_ID` | Your premium entitlement identifier | Yes |

### Optional Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `DEBUG_MODE` | Enable debug logging in development | `__DEV__` |
| `USE_USER_IDENTIFICATION` | Enable custom user IDs | `false` |

## 📖 Usage Examples

### Basic Subscription Check

```typescript
import { usePurchases } from '@/hooks/usePurchases';

function MyComponent() {
  const { isPremium } = usePurchases();

  return isPremium ? <PremiumContent /> : <FreeContent />;
}
```

### Purchase Implementation

```typescript
import { usePaywall } from '@/hooks/usePurchases';

function PaywallComponent() {
  const { purchasePackage, packages } = usePaywall();

  const handlePurchase = async (packageToPurchase) => {
    try {
      await purchasePackage(packageToPurchase);
      // Success is handled automatically
    } catch (error) {
      // Error is handled automatically
    }
  };
}
```

### User Authentication (Optional)

If you enable `USE_USER_IDENTIFICATION` in the config:

```typescript
// Uncomment the login/logout methods in RevenueCatProvider.tsx
import { useRevenueCat } from '@/components/RevenueCatProvider';

function AuthComponent() {
  const { logIn, logOut } = useRevenueCat();

  const handleLogin = async (userId: string) => {
    await logIn(userId);
  };
}
```

## 🧪 Testing & Development

### Debug Information

The app includes comprehensive debugging tools:

- **Home Tab**: Real-time subscription status and configuration warnings
- **RevenueCat Guide Tab**: Complete documentation and troubleshooting
- **Profile Tab**: Customer info, entitlements, and raw data inspection

### Sandbox Testing

1. **iOS**: Use App Store Connect sandbox accounts
2. **Android**: Use Google Play Console test accounts
3. **Web**: Use Stripe test mode

### Common Issues

**No offerings found:**
- Check API keys configuration
- Verify products are set up in RevenueCat dashboard
- Ensure entitlements are properly configured

**Web billing not working:**
- Configure Stripe in RevenueCat dashboard
- Check web API key is correct
- Verify domain is whitelisted

**Purchases not reflecting:**
- Check sandbox vs production environment
- Verify receipt validation is working
- Review customer info in Profile tab

## 🌐 Cross-Platform Considerations

### iOS
- Native App Store integration
- StoreKit support
- Automatic receipt validation

### Android
- Google Play Billing integration
- Play Console configuration required
- Supports subscriptions and one-time purchases

### Web
- Stripe-powered web billing
- Configure in RevenueCat Dashboard > Web billing
- Requires Stripe account setup

## 📚 Documentation & Resources

### In-App Documentation
The "RevenueCat Guide" tab contains comprehensive documentation including:
- Setup instructions
- Code examples
- Troubleshooting guides
- Platform-specific information

### External Resources
- [RevenueCat Documentation](https://docs.revenuecat.com/)
- [React Native SDK Guide](https://docs.revenuecat.com/docs/reactnative)
- [Web Billing Setup](https://docs.revenuecat.com/docs/web-billing)
- [RevenueCat Community](https://community.revenuecat.com/)

## 🔄 Starting Fresh

When you're ready to customize this template:

```bash
npm run reset-project
```

This will:
1. Move the current example code to `app-example/`
2. Create a clean `app/` directory for your project
3. Provide a minimal starting point

## 🤝 Support

- Check the in-app "RevenueCat Guide" for comprehensive documentation
- Review the "Profile" tab for debug information
- Visit [RevenueCat Community](https://community.revenuecat.com/) for help
- Contact [RevenueCat Support](mailto:support@revenuecat.com) for technical issues

## 📄 License

This project is provided as an example template for RevenueCat integration. Feel free to use it as a starting point for your own applications.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/) for cross-platform development
- Powered by [RevenueCat](https://revenuecat.com/) for subscription management
- Following [Replit Developer Framework Guidelines](https://docs.replit.com/replit-workspace/templates)

---

**Ready to build amazing subscription experiences? Start by configuring your API keys in `constants/RevenueCat.ts`!** 🚀
