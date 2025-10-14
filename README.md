# RevenueCat + Expo App

**TL;DR**
A ready-to-run framework for building subscription-based apps with Expo and RevenueCat.
Pre-configured paywalls, testing environments, and deployment workflows for iOS, Android, and Web.

**🎯 Ready for Replit - Click "Run" to start immediately!**

A complete template for creating React Native apps with Expo and RevenueCat monetization. This template includes everything you need to build subscription-based iOS, Android, and Web apps that work seamlessly across all platforms.

![Platforms](https://img.shields.io/badge/platforms-iOS%20%7C%20Android%20%7C%20Web-blue)
![RevenueCat](https://img.shields.io/badge/RevenueCat-9.5.0-green)
![Expo](https://img.shields.io/badge/Expo-54.0.0-black)
![Replit](https://img.shields.io/badge/Replit-Ready-orange)

For AI coding tools and automation guidance, see `replit.md`.

## 🚀 Quick Start on Replit

Start coding in minutes — this flow takes you from **first run to first subscription**.

1. **Click the "Run" button** — everything is pre-configured!
2. **Configure RevenueCat Test Store** (recommended):
   - Open **Replit Secrets** (Tools > Secrets in the left sidebar)
   - Add a new secret:
     - Key: `EXPO_PUBLIC_REVENUECAT_TEST_API_KEY`
     - Value: Your TEST API key from [app.revenuecat.com](https://app.revenuecat.com) (starts with `test_`)
   - Restart the app to load the secret
   - Note: Must be prefixed with `EXPO_PUBLIC_` for Expo compatibility
   - Works on **all platforms** (iOS, Android, Web) without store setup!
   - Learn more on [revenuecat.com](https://rev.cat/sdk-test-store)
3. **Start building** - Modify the existing screens or add new ones

**🔐 Security Note:** API keys are now stored as environment variables using Replit Secrets. Never commit API keys directly to your code!

## ⚡ What's Pre-Configured

- Development server auto-starts when you press Run
- All dependencies installed and ready
- Web development environment optimized for Replit
- RevenueCat integration with test store support
- Cross-platform navigation and UI components

## 🧪 Testing Your Subscriptions

**🎯 Test Store (Recommended)**: The fastest way to test real subscriptions without connecting external stores!

- **One API key** works on iOS, Android, and Web
- **Real subscription testing** without Apple, Google, or Stripe setup
- **Perfect for development** and prototyping
- Add your `test_` API key using Replit Secrets (see setup instructions above)

**Without Configuration**: If you haven't set up RevenueCat yet, the app will show an error with instructions on how to add your API key via Replit Secrets. The navigation and basic UI will still work for development.

**Ready for production stores?** See the "Production Deployment" section below to connect real app stores.

## 🎯 What You Get

- **🔥 Ready to Run**: Click Run button and start developing immediately
- **📱 Cross-Platform**: iOS, Android, and Web with a single codebase
- **💰 Monetization**: RevenueCat integration with paywall templates
- **🎨 Modern UI**: Clean interface following Expo design patterns
- **🛠️ Developer Tools**: Debug screens, error handling, and testing aids
- **📚 Documentation**: In-app guides and comprehensive setup instructions
- **🧪 Testing Ready**: Sandbox support for all platforms

## 📱 Development Workflows

### Local Development

1. **Start the development server:**
   ```bash
   npx expo start
   ```

2. **Choose your platform:**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Press `w` for Web Browser
   - Scan QR code with Expo Go on your device

### Prerequisites for Mobile Deployment

**Required Developer Accounts:**
- **Apple Developer Program**: $99/year for iOS App Store distribution
- **Google Play Developer Account**: $25 one-time fee for Android Play Store
- **Expo Account**: Free tier available, required for EAS builds

**Required Setup:**
1. **Choose unique Bundle ID/Package Name:**
   - iOS: `com.yourcompany.yourapp`
   - Android: `com.yourcompany.yourapp`
   - Must be unique across all app stores

2. **Install EAS CLI:**
   ```bash
   npm install -g eas-cli
   eas login
   ```

3. **Configure App Store Credentials:**
   - iOS: App Store Connect API Key (EAS handles automatically)
   - Android: Google Play Service Account (EAS handles automatically)

### Building for Production

**Using EAS Build (Recommended):**
- Initialize once: `npx eas init`
- Build: `npx eas build --platform ios|android`
- Submit: `npx eas submit --platform ios|android`

For local builds (advanced):
- iOS: `npx expo run:ios` (requires Xcode)
- Android: `npx expo run:android` (requires Android Studio)

### Over-the-Air Updates

Deploy updates instantly without app store approval:

```bash
npx eas update --auto
```

### App Store Configuration

**Configure app.json for stores:**

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.yourapp",
      "buildNumber": "1",
      "config": {
        "usesNonExemptEncryption": false
      },
      "infoPlist": {
        "NSCameraUsageDescription": "This app needs camera access for profile photos",
        "NSPhotoLibraryUsageDescription": "This app needs photo library access for profile photos"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourcompany.yourapp",
      "versionCode": 1,
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.READ_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "favicon": "./assets/images/favicon.png",
      "bundler": "metro"
    },
    "plugins": [
      "expo-router"
    ]
  }
}
```

**Key Configuration Notes:**
- Update `bundleIdentifier` and `package` with your unique app ID
- Increment `buildNumber` (iOS) and `versionCode` (Android) for each build
- Add required permissions based on your app's features
- Configure privacy usage descriptions for iOS

## 💰 RevenueCat Setup

This is where your app becomes **monetizable**.

### 1. 🧪 Test Store Setup (Start Here!)

**The easiest way to test subscriptions - works on ALL platforms!**

**Create RevenueCat Project:**
1. Create a new project at [app.revenuecat.com](https://app.revenuecat.com/)
2. Configure **Entitlements** (e.g., "premium", "pro")
3. Create **Offerings** and **Products** with test pricing
4. Get your **Test API Key** from Project Settings → API Keys (starts with `test_`)

**Configure Test Store Using Replit Secrets:**

1. **Open Replit Secrets:**
   - Click "Tools" > "Secrets" in the left sidebar

2. **Add your test API key:**
   - Click "Add new secret"
   - Key: `EXPO_PUBLIC_REVENUECAT_TEST_API_KEY`
   - Value: `test_xxxxxxxxxx` (your actual test key)
   - Note: Must be prefixed with `EXPO_PUBLIC_` for Expo

3. **Optional: Customize entitlement ID:**
   - Key: `EXPO_PUBLIC_REVENUECAT_ENTITLEMENT_ID`
   - Value: `premium` (or your custom entitlement ID)

4. **Restart the app** to load the secrets

**✅ You're ready to test!** The test store works immediately on iOS, Android, and Web without connecting any external payment systems.

### 2. 🏪 Production Stores (When Ready to Launch)

**Add when ready to publish to actual app stores:**

**iOS (App Store Connect):**
- Create in-app purchase products in App Store Connect
- Configure subscription pricing and duration
- Set up introductory offers/free trials
- Upload App Store Connect API key to RevenueCat
- Add iOS app to your RevenueCat project
- Add secret: `REVENUECAT_IOS_API_KEY` with your iOS API key

**Android (Google Play Console):**
- Create subscription products in Google Play Console
- Configure billing and pricing
- Set up promotional offers
- Upload Google Play service account to RevenueCat
- Add Android app to your RevenueCat project
- Add secret: `REVENUECAT_ANDROID_API_KEY` with your Android API key

**Web (via RevenueCat Web Billing):**
- Connect your Stripe account to RevenueCat
- Add a Web Billing app in your RevenueCat project
- Add secret: `REVENUECAT_WEB_API_KEY` with your Web API key

**Switch to Production:**
- Add secret: `REVENUECAT_USE_TEST_STORE` with value `false`
- Or simply remove the `REVENUECAT_TEST_API_KEY` secret and the app will use production keys

### 🔄 Transitioning from Test Store to Production

When you're ready to move from testing to real app store distribution:

1. **Keep your test setup intact** - you can switch back anytime
2. **Add production API keys** using Replit Secrets (see section 2 above)
3. **Test the transition** by adding the secret:
   - Key: `REVENUECAT_USE_TEST_STORE`
   - Value: `false`
   - Restart the app
4. **Switch back to test mode** anytime:
   - Change the secret value to `true`
   - Or remove the secret entirely (defaults to test mode)

**💡 Pro Tip**: The test store and production stores all use the same RevenueCat project - just different API key types. Your products, entitlements, and settings remain consistent across both.

## 🏗️ Project Structure

```
├── app/
│   ├── _layout.tsx           # Root layout with RevenueCat provider
│   ├── (tabs)/               # Tab navigation
│   │   ├── index.tsx         # Home screen with subscription status
│   │   └── profile.tsx       # Account management & debug tools
│   └── paywall.tsx          # Cross-platform paywall screen
├── components/
│   ├── RevenueCatProvider.tsx # RevenueCat context provider
│   ├── ThemedText.tsx        # Themed text components
│   └── ThemedView.tsx        # Themed view components
├── hooks/
│   └── usePurchases.ts       # Main RevenueCat integration hook
├── constants/
│   ├── RevenueCat.ts         # 🔧 Configure your API keys here
│   └── Colors.ts             # App color scheme
└── assets/                   # Images, fonts, and other assets
```

## 🔧 Customization

### Essential Files to Edit

1. **Replit Secrets** - Add your Test API key via Secrets (start here!)
2. **`app.json`** - Update app name, bundle ID, and metadata
3. **`app/(tabs)/index.tsx`** - Customize your home screen
4. **`app/paywall.tsx`** - Design your subscription paywall

### Adding New Screens

Create new screens in the `app/` directory:

```typescript
// app/new-screen.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NewScreen() {
  return (
    <ThemedView>
      <ThemedText>Your new screen!</ThemedText>
    </ThemedView>
  );
}
```

### Using Subscriptions in Your Code

```typescript
import { usePurchases } from '@/hooks/usePurchases';

function MyComponent() {
  const { isPremium, purchasePackage, packages } = usePurchases();

  if (isPremium) {
    return <PremiumFeatures />;
  }

  return (
    <View>
      <Text>Upgrade to unlock premium features!</Text>
      <Button
        title="Subscribe"
        onPress={() => purchasePackage(packages[0])}
      />
    </View>
  );
}
```

### Testing & Distribution

**Internal Testing (Before Store Submission):**

**iOS - TestFlight:**
```bash
# Build for internal testing
npx eas build --platform ios --profile preview

# Upload to TestFlight automatically
npx eas submit --platform ios --latest
```

**Android - Google Play Internal Testing:**
```bash
# Build for internal testing
npx eas build --platform android --profile preview

# Upload to Google Play Console
npx eas submit --platform android --latest
```

**EAS Build Profiles (eas.json):**
```json
{
  "build": {
    "development": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "distribution": "store",
      "channel": "production"
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Store Requirements

**App Store Listing Requirements:**
- **App Name**: Unique, descriptive (30 characters max)
- **Screenshots**: Required for all device sizes (iPhone, iPad, Android phones/tablets)
- **App Description**: Clear explanation of features and benefits
- **Keywords**: Relevant search terms (100 characters max for iOS)
- **Privacy Policy**: **Required** for apps with RevenueCat/subscriptions
- **App Category**: Choose appropriate primary and secondary categories

**Subscription App Specific Requirements:**
- **Clear subscription terms**: Pricing, duration, auto-renewal clearly stated
- **Restore purchases functionality**: Required for iOS (already included in template)
- **Cancellation information**: How users can cancel subscriptions
- **Free trial details**: If offering trial periods

**Privacy & Compliance:**
- **App Tracking Transparency** (iOS 14.5+): Required if tracking users
- **GDPR Compliance**: For EU users
- **COPPA Compliance**: If app targets children under 13

### Environment Management

**All API keys are automatically managed via environment variables and Replit Secrets.**

The app reads from these environment variables:

**Development (Test Store):**
- `REVENUECAT_TEST_API_KEY` - Your test API key
- `REVENUECAT_USE_TEST_STORE=true` - Enable test mode (default)
- `REVENUECAT_ENTITLEMENT_ID` - Your entitlement ID (optional, defaults to "premium")

**Production (Real App Stores):**
- `REVENUECAT_IOS_API_KEY` - iOS App Store API key
- `REVENUECAT_ANDROID_API_KEY` - Google Play API key  
- `REVENUECAT_WEB_API_KEY` - Web Billing API key
- `REVENUECAT_USE_TEST_STORE=false` - Disable test mode

**Security Best Practices:**
- ✅ All keys are stored in Replit Secrets (encrypted)
- ✅ Never commit API keys to git
- ✅ Easy to rotate keys if compromised
- ✅ Same approach works in development and deployment

**Build Credentials Management:**
- **EAS automatically handles**: iOS certificates, Android keystores
- **Manual override available**: For custom signing requirements

## 🧪 Testing

### Development Testing

The app includes built-in debugging tools:

- **Home Tab**: Shows real-time subscription status and app features
- **Profile Tab**: Configuration status, customer info, entitlements, and debug tools

### Platform-Specific Testing

**iOS Testing:**
- Use App Store Connect Sandbox accounts
- Test in iOS Simulator or on device
- Verify receipt validation

**Android Testing:**
- Use Google Play Console test accounts
- Test with signed APK or through Play Console
- Verify subscription management

**Web Testing:**
- Test in any web browser
- Verify webhook delivery

## 🚢 Deployment

### Expo Application Services (EAS)

**Build Configuration (eas.json):**
```json
{
  "build": {
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "distribution": "store"
    }
  },
  "submit": {
    "production": {}
  }
}
```

**Deployment Steps:**
1. Build app: `npx eas build --platform all`
2. Submit to stores: `npx eas submit --platform all`
3. Deploy updates: `npx eas update --auto`

### Manual Deployment

**iOS:**
1. Archive in Xcode
2. Upload to App Store Connect
3. Submit for review

**Android:**
1. Build signed APK/AAB
2. Upload to Google Play Console
3. Release to production

## 📚 Learn More

### Expo Resources
- [Expo Documentation](https://docs.expo.dev/) - Comprehensive Expo guides
- [Expo + RevenueCat Tutorial](https://expo.dev/blog/expo-revenuecat-in-app-purchase-tutorial) - Official step-by-step integration guide
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based navigation
- [EAS Build](https://docs.expo.dev/build/introduction/) - Cloud build service
- [EAS Update](https://docs.expo.dev/eas-update/introduction/) - Over-the-air updates

### RevenueCat Resources
- [RevenueCat Docs](https://docs.revenuecat.com/) - Complete monetization guide
- [React Native SDK](https://docs.revenuecat.com/docs/reactnative) - Platform integration
- [Web Billing](https://www.revenuecat.com/docs/web/web-billing/overview) - Web Billing integration
- [Testing Guide](https://docs.revenuecat.com/docs/sandbox) - Sandbox testing

### Community
- [Expo Discord](https://chat.expo.dev) - Get help from the community
- [RevenueCat Community](https://community.revenuecat.com/) - Monetization discussions
- [Expo GitHub](https://github.com/expo/expo) - Open source contributions

## 🔄 Start Fresh

When ready to build your own app:

```bash
npm run reset-project
```

This moves the example code to `app-example/` and creates a clean `app/` directory for your project.

## 🛟 Troubleshooting

### Replit-Specific Issues

**Development server won't start?**
- The server automatically starts when you click "Run"
- If issues persist, try: Refresh the page or restart the Repl
- Check the console logs in the Workflows panel

**Changes not showing?**
- The development server auto-refreshes on file changes
- Force refresh your browser if needed
- Clear browser cache if styles aren't updating

**Need to configure API keys?**
- Use Replit Secrets for both development and production
- Access Secrets via Tools > Secrets in the left sidebar
- App requires RevenueCat configuration to work properly

### General Issues

**App won't start locally?**
- Ensure Node.js 22 LTS is installed
- Run `npm install` to install dependencies
- Clear Metro cache: `npx expo start --clear`

**No subscriptions showing?**
- Check API keys are set in Replit Secrets (Tools > Secrets)
- Verify products are configured in RevenueCat dashboard
- Review the Profile tab for debug information

**Build failing?**
- Update Expo CLI: `npm install -g @expo/cli@latest`
- Check `app.json` configuration
- Review EAS build logs for specific errors

## 📄 License

This Developer Framework is provided as an open-source template. Use it freely for your projects!

---

**Ready to monetize your app?** Add your RevenueCat Test API key to Replit Secrets and start testing subscriptions immediately on all platforms! 🧪

Open **Tools > Secrets** → Add `REVENUECAT_TEST_API_KEY` → Restart the app

*Built by RevenueCat for Replit*
