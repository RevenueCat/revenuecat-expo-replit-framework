/**
 * Home Screen - RevenueCat Framework
 *
 * This screen demonstrates how to integrate RevenueCat subscription status
 * into your app's main interface. It shows different content based on the
 * user's subscription status and provides easy access to premium features.
 *
 * FEATURES:
 * - Real-time subscription status display
 * - Premium vs free user content
 * - Quick access to paywall
 * - Configuration status indicators
 */

import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { usePurchases } from "@/hooks/usePurchases";

export default function HomeScreen() {
  const {
    isPremium,
    isLoading,
    isConfigured,
    customerInfo,
    currentOffering,
    activeEntitlements,
    errorMessage,
  } = usePurchases();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">RevenueCat + Expo</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Subscription Status Section */}
      <ThemedView style={styles.statusContainer}>
        <ThemedText type="subtitle">Subscription Status</ThemedText>

        {isLoading ? (
          <ThemedView style={styles.statusCard}>
            <ThemedText>⏳ Loading subscription status...</ThemedText>
          </ThemedView>
        ) : !isConfigured ? (
          <ThemedView style={[styles.statusCard, styles.errorCard]}>
            <ThemedText type="defaultSemiBold">
              ⚠️ Configuration Required
            </ThemedText>
            <ThemedText style={styles.errorText}>
              Please configure your RevenueCat API keys in{" "}
              <ThemedText type="defaultSemiBold">
                constants/RevenueCat.ts
              </ThemedText>
            </ThemedText>
            <ThemedText style={styles.helpText}>
              Check the "RevenueCat Guide" tab for setup instructions.
            </ThemedText>
          </ThemedView>
        ) : errorMessage ? (
          <ThemedView style={[styles.statusCard, styles.errorCard]}>
            <ThemedText type="defaultSemiBold">❌ Error</ThemedText>
            <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
          </ThemedView>
        ) : isPremium ? (
          <ThemedView style={[styles.statusCard, styles.premiumCard]}>
            <ThemedText type="defaultSemiBold">✨ Premium Active</ThemedText>
            <ThemedText>You have access to all premium features!</ThemedText>
            {activeEntitlements.length > 0 && (
              <ThemedView style={styles.entitlementsContainer}>
                <ThemedText style={styles.entitlementsTitle}>
                  Active Entitlements:
                </ThemedText>
                {activeEntitlements.map((entitlement, index) => (
                  <ThemedText key={index} style={styles.entitlementItem}>
                    • {entitlement}
                  </ThemedText>
                ))}
              </ThemedView>
            )}
          </ThemedView>
        ) : (
          <ThemedView style={[styles.statusCard, styles.freeCard]}>
            <ThemedText type="defaultSemiBold">🆓 Free User</ThemedText>
            <ThemedText>Upgrade to unlock premium features</ThemedText>

            {currentOffering && (
              <TouchableOpacity
                style={styles.upgradeButton}
                onPress={() => router.push("/paywall")}
              >
                <ThemedText style={styles.upgradeButtonText}>
                  🚀 View Premium Options
                </ThemedText>
              </TouchableOpacity>
            )}
          </ThemedView>
        )}
      </ThemedView>

      {/* Getting Started Steps */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🧪 Test Store Setup</ThemedText>
        <ThemedText>
          The easiest way to get started! Works on iOS, Android, and Web without
          connecting external stores.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">
          Step 1: Create RevenueCat Project
        </ThemedText>
        <ThemedText>
          Go to{" "}
          <ThemedText type="defaultSemiBold">app.revenuecat.com</ThemedText> and
          create a new project. Configure entitlements (e.g., "premium") and
          create offerings with test products and pricing.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">
          Step 2: Get Your Test API Key
        </ThemedText>
        <ThemedText>
          In your RevenueCat project, go to{" "}
          <ThemedText type="defaultSemiBold">
            Project Settings → API Keys
          </ThemedText>{" "}
          and copy your test API key (starts with "test_").
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">
          Step 3: Configure Your App
        </ThemedText>
        <ThemedText>
          Update{" "}
          <ThemedText type="defaultSemiBold">
            constants/RevenueCat.ts
          </ThemedText>{" "}
          with your test API key and entitlement ID. Keep{" "}
          <ThemedText type="defaultSemiBold">USE_TEST_STORE: true</ThemedText>{" "}
          for development.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">
          Step 4: Start Testing!
        </ThemedText>
        <ThemedText>
          You're ready to test subscriptions immediately! No need for App Store
          Connect, Google Play, or Stripe setup. Check the{" "}
          <ThemedText type="defaultSemiBold">Profile</ThemedText> tab for
          debugging info.
        </ThemedText>
      </ThemedView>

      {/* Real Stores */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🏪 Ready for Real Stores?</ThemedText>
        <ThemedText>
          Once you're comfortable with the test store, you can integrate with
          real stores (Apple App Store, Google Play Store, RevenueCat Web
          Billing) which all have sandbox modes for testing before publishing.
        </ThemedText>
        <ThemedText style={styles.helpText}>
          Set{" "}
          <ThemedText type="defaultSemiBold">USE_TEST_STORE: false</ThemedText>{" "}
          in constants/RevenueCat.ts and configure your production API keys.
        </ThemedText>
      </ThemedView>

      {/* Documentation Link */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">📚 Documentation</ThemedText>
        <ThemedText>
          For detailed guides and advanced setup, visit the{" "}
          <ThemedText type="defaultSemiBold">
            RevenueCat Documentation
          </ThemedText>{" "}
          at docs.revenuecat.com/docs/welcome/overview
        </ThemedText>
      </ThemedView>

      {/* Platform Information */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Platform Support</ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Current Platform: </ThemedText>
          {Platform.OS}
        </ThemedText>
        <ThemedText>
          This framework supports iOS, Android, and Web with RevenueCat's web
          billing.
        </ThemedText>
        {Platform.OS === "web" && (
          <ThemedText style={styles.webNote}>
            💡 Web billing uses Stripe to process payments.
          </ThemedText>
        )}
      </ThemedView>

      {/* Development Tools */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Development Tools</ThemedText>
        <ThemedText>
          Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools and inspect RevenueCat logs.
        </ThemedText>
      </ThemedView>

      {/* Fresh Start Option */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Start Fresh</ThemedText>
        <ThemedText>
          When you're ready to customize this template, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to move this example code to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText> and create
          a clean starting point.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  statusContainer: {
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0.2)",
  },
  premiumCard: {
    backgroundColor: "rgba(52, 199, 89, 0.1)",
    borderColor: "rgba(52, 199, 89, 0.3)",
  },
  freeCard: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderColor: "rgba(0, 122, 255, 0.3)",
  },
  errorCard: {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    borderColor: "rgba(255, 59, 48, 0.3)",
  },
  errorText: {
    marginTop: 4,
    fontSize: 14,
  },
  helpText: {
    marginTop: 8,
    fontSize: 12,
    fontStyle: "italic",
    opacity: 0.8,
  },
  entitlementsContainer: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(128, 128, 128, 0.2)",
  },
  entitlementsTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  entitlementItem: {
    fontSize: 12,
    marginLeft: 8,
  },
  upgradeButton: {
    backgroundColor: "rgba(0, 122, 255, 0.2)",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
    alignItems: "center",
  },
  upgradeButtonText: {
    fontWeight: "600",
    color: "#007AFF",
  },
  webNote: {
    marginTop: 8,
    fontSize: 12,
    fontStyle: "italic",
    backgroundColor: "rgba(255, 193, 7, 0.1)",
    padding: 8,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: "#FFC107",
  },
});
