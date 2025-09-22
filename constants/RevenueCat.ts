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
   * You can also set this using Replit Secrets: REVENUECAT_TEST_API_KEY
   */
  TEST_API_KEY: "insert-your-test-api-key", // e.g., 'test_abcdef1234567890'

  /**
   * 🏪 REAL STORE API KEYS (FOR REAL APP STORES: App Store, Play Store, Web Billing)
   * Only needed when you're ready to publish to actual app stores
   * Get these from: https://app.revenuecat.com/projects/[your-project]/api-keys
   *
   * You can also set these using Replit Secrets:
   * - REVENUECAT_IOS_API_KEY
   * - REVENUECAT_ANDROID_API_KEY
   * - REVENUECAT_WEB_API_KEY
   */
  IOS_API_KEY: "insert-your-apple-app-store-api-key", // e.g., 'appl_abcdef1234567890'
  ANDROID_API_KEY: "insert-your-google-play-store-api-key", // e.g., 'goog_abcdef1234567890'
  WEB_API_KEY: "insert-your-revenuecat-web-billing-api-key", // e.g., 'rcb_abcdef1234567890' or 'rcb_sb_abcdef1234567890'

  /**
   * Configure your entitlement identifier
   * This should match the entitlement identifier you create in the RevenueCat dashboard
   * Configure entitlements in RevenueCat Dashboard > Entitlements
   */
  ENTITLEMENT_ID: "premium", // Common examples: 'premium', 'pro', 'all_access'

  /**
   * Enable test store mode (recommended for development)
   * Set to true to use the test store, false to use production stores
   */
  USE_TEST_STORE: true, // Default: true for development. Change to false once you want to use a real store like Apple App Store, Google Play, or RevenueCat Web Billing.

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
      console.error(
        "Please update constants/RevenueCat.ts with your test API key"
      );
      console.error("Get your test API key (starts with 'test_') from:");
      console.error(
        "https://app.revenuecat.com/projects/[your-project]/api-keys"
      );
    } else {
      console.error(
        "⚠️ RevenueCat production API key not configured for platform:",
        Platform.OS
      );
      console.error(
        "Please update constants/RevenueCat.ts with your production API keys"
      );
      console.error(
        "Get your API keys from: https://app.revenuecat.com/projects/[your-project]/api-keys"
      );
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
