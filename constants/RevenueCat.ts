/**
 * RevenueCat Configuration
 *
 * This file contains all RevenueCat-related configuration constants.
 *
 * 🚀 QUICK START WITH TEST STORE:
 * 1. Create a RevenueCat account at https://app.revenuecat.com/
 * 2. Create a new project in the RevenueCat dashboard
 * 3. Get your TEST API key from Project Settings > API keys (starts with "test_")
 * 4. Replace the TEST_API_KEY below with your actual test API key
 * 5. Configure your products, packages, and entitlements in the RevenueCat dashboard
 * 6. Start testing immediately - no need to connect Apple, Google, or Stripe!
 *
 * The test store works on ALL platforms (iOS, Android, Web) without external store setup.
 * Perfect for development, testing, and demos!
 *
 * SECURITY NOTE:
 * These API keys are safe to include in client-side code as they are
 * public keys designed for client-side use.
 */

export const REVENUECAT_CONFIG = {
  /**
   * 🧪 TEST STORE API KEY (RECOMMENDED FOR GETTING STARTED)
   * This single API key works for iOS, Android, and Web testing!
   * Get your test API key from: https://app.revenuecat.com/projects/[your-project]/api-keys
   * Look for the key that starts with "test_"
   *
   * Set this using Replit Secrets: REVENUECAT_TEST_API_KEY
   * Access Secrets in the left sidebar under "Tools" > "Secrets"
   */
  TEST_API_KEY: process.env.REVENUECAT_TEST_API_KEY || "",

  /**
   * 🏪 REAL STORE API KEYS (FOR REAL APP STORES: App Store, Play Store, Web Billing)
   * Only needed when you're ready to publish to actual app stores
   * Get these from: https://app.revenuecat.com/projects/[your-project]/api-keys
   *
   * Set these using Replit Secrets:
   * - REVENUECAT_IOS_API_KEY
   * - REVENUECAT_ANDROID_API_KEY
   * - REVENUECAT_WEB_API_KEY
   */
  IOS_API_KEY: process.env.REVENUECAT_IOS_API_KEY || "",
  ANDROID_API_KEY: process.env.REVENUECAT_ANDROID_API_KEY || "",
  WEB_API_KEY: process.env.REVENUECAT_WEB_API_KEY || "",

  /**
   * Configure your entitlement identifier
   * This should match the entitlement identifier you create in the RevenueCat dashboard
   * Configure entitlements in RevenueCat Dashboard > Entitlements
   *
   * Can also be set via environment variable: REVENUECAT_ENTITLEMENT_ID
   */
  ENTITLEMENT_ID: process.env.REVENUECAT_ENTITLEMENT_ID || "premium",

  /**
   * Enable test store mode (recommended for development)
   * Set to true to use the test store, false to use production stores
   *
   * Can also be set via environment variable: REVENUECAT_USE_TEST_STORE
   */
  USE_TEST_STORE: process.env.REVENUECAT_USE_TEST_STORE === "false" ? false : true,

  /**
   * Optional: Enable debug mode for development
   * This will show additional logging in development mode
   */
  DEBUG_MODE: __DEV__,

  /**
   * Optional: User identification
   * Set to true if you want to identify users with your own user IDs
   * Learn more: https://docs.revenuecat.com/docs/user-ids
   */
  USE_USER_IDENTIFICATION: false,
};

/**
 * Platform-specific configuration helper
 * Automatically selects the correct API key based on the current platform
 */
import { Platform } from "react-native";

export const getPlatformApiKey = (): string => {
  // Use test store API key if enabled (works on all platforms!)
  if (REVENUECAT_CONFIG.USE_TEST_STORE) {
    return REVENUECAT_CONFIG.TEST_API_KEY;
  }

  // Use platform-specific production API keys
  switch (Platform.OS) {
    case "ios":
      return REVENUECAT_CONFIG.IOS_API_KEY;
    case "android":
      return REVENUECAT_CONFIG.ANDROID_API_KEY;
    case "web":
      return REVENUECAT_CONFIG.WEB_API_KEY;
    default:
      console.warn(
        `Unsupported platform: ${Platform.OS}. Falling back to iOS API key.`
      );
      return REVENUECAT_CONFIG.IOS_API_KEY;
  }
};

/**
 * Validation helper to check if API keys are configured
 * This helps identify configuration issues during development
 */
export const validateRevenueCatConfig = (): boolean => {
  const apiKey = getPlatformApiKey();

  if (!apiKey || apiKey.includes("your_") || apiKey.includes("_here")) {
    if (REVENUECAT_CONFIG.USE_TEST_STORE) {
      console.error("🧪 RevenueCat TEST API key not configured!");
      console.error("\n📝 To add your API key:");
      console.error("1. Open 'Secrets' in the left sidebar (Tools > Secrets)");
      console.error("2. Add a new secret:");
      console.error("   - Key: REVENUECAT_TEST_API_KEY");
      console.error("   - Value: Your test API key (starts with 'test_')");
      console.error("3. Restart the app to load the secret");
      console.error("\n🔑 Get your test API key from:");
      console.error("   https://app.revenuecat.com/projects/[your-project]/api-keys");
    } else {
      console.error(
        "⚠️ RevenueCat production API key not configured for platform:",
        Platform.OS
      );
      console.error("\n📝 To add your production API keys:");
      console.error("1. Open 'Secrets' in the left sidebar (Tools > Secrets)");
      console.error("2. Add the appropriate secret for your platform:");
      console.error("   iOS: REVENUECAT_IOS_API_KEY");
      console.error("   Android: REVENUECAT_ANDROID_API_KEY");
      console.error("   Web: REVENUECAT_WEB_API_KEY");
      console.error("3. Restart the app to load the secrets");
      console.error("\n🔑 Get your API keys from:");
      console.error("   https://app.revenuecat.com/projects/[your-project]/api-keys");
    }
    return false;
  }

  // Check if API key format is correct
  if (REVENUECAT_CONFIG.USE_TEST_STORE && !apiKey.startsWith("test_")) {
    console.warn(
      "⚠️ Test store is enabled but API key doesn't start with 'test_'"
    );
    console.warn("Make sure you're using a test API key for development");
  }

  if (
    !REVENUECAT_CONFIG.ENTITLEMENT_ID ||
    REVENUECAT_CONFIG.ENTITLEMENT_ID === "premium"
  ) {
    console.warn(
      "⚠️ Using default entitlement ID. Consider updating to match your RevenueCat configuration."
    );
  }

  // Log current mode for clarity
  if (REVENUECAT_CONFIG.USE_TEST_STORE) {
    console.log("🧪 Running in TEST STORE mode - perfect for development!");
  } else {
    console.log("🏪 Running in PRODUCTION STORE mode");
  }

  return true;
};
