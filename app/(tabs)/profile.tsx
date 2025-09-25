/**
 * Profile Screen - User Account & Subscription Details
 *
 * This screen shows user-specific information including subscription status,
 * customer details, and account management options.
 *
 * FEATURES:
 * - Detailed customer information
 * - Subscription management
 * - Account settings
 * - Debug information for development
 */

import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { usePurchases } from "@/hooks/usePurchases";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { REVENUECAT_CONFIG } from "@/constants/RevenueCat";

export default function ProfileScreen() {
  const {
    isPremium,
    isLoading,
    isConfigured,
    customerInfo,
    currentOffering,
    activeEntitlements,
    errorMessage,
  } = usePurchases();
  const tintColor = useThemeColor({}, "tint");

  const { top } = useSafeAreaInsets();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: top + 16 },
        ]}
      >
        {/* Profile Header */}
        <ThemedView style={styles.profileHeader}>
          <ThemedText style={styles.profileIcon}>👤</ThemedText>
          <ThemedText type="title">My Profile</ThemedText>
          <ThemedText style={styles.subtitle}>
            Account & Subscription Details
          </ThemedText>
        </ThemedView>

        {/* Account Status */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Account Status</ThemedText>

          {isLoading ? (
            <ThemedView style={styles.statusCard}>
              <ThemedText>⏳ Loading account info...</ThemedText>
            </ThemedView>
          ) : !isConfigured ? (
            <ThemedView style={[styles.statusCard, styles.errorCard]}>
              <ThemedText type="defaultSemiBold">⚠️ Not Configured</ThemedText>
              <ThemedText>RevenueCat needs to be configured</ThemedText>
            </ThemedView>
          ) : isPremium ? (
            <ThemedView style={[styles.statusCard, styles.premiumCard]}>
              <ThemedText type="defaultSemiBold">✨ Premium Member</ThemedText>
              <ThemedText>You have access to all premium features</ThemedText>
            </ThemedView>
          ) : (
            <ThemedView style={[styles.statusCard, styles.freeCard]}>
              <ThemedText type="defaultSemiBold">🆓 Free Account</ThemedText>
              <ThemedText>Upgrade to unlock premium features</ThemedText>
              <TouchableOpacity
                style={[styles.upgradeButton]}
                onPress={() => router.push("/paywall")}
              >
                <ThemedText style={styles.upgradeButtonText}>
                  Upgrade to Premium
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}
        </ThemedView>

        {/* Customer Information */}
        {customerInfo && (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle">Customer Information</ThemedText>

            <ThemedView style={styles.infoCard}>
              <ThemedView style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Customer ID:</ThemedText>
                <ThemedText style={styles.infoValue}>
                  {customerInfo.originalAppUserId || "N/A"}
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>First Seen:</ThemedText>
                <ThemedText style={styles.infoValue}>
                  {formatDate(customerInfo.firstSeen)}
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Last Updated:</ThemedText>
                <ThemedText style={styles.infoValue}>
                  {formatDate(customerInfo.requestDate)}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        )}

        {/* Active Entitlements */}
        {activeEntitlements.length > 0 && (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle">Active Subscriptions</ThemedText>

            <ThemedView style={styles.infoCard}>
              {activeEntitlements.map((entitlement, index) => (
                <ThemedView key={index} style={styles.entitlementItem}>
                  <ThemedText style={styles.entitlementName}>
                    ✅ {entitlement}
                  </ThemedText>
                  <ThemedText style={styles.entitlementStatus}>
                    Active
                  </ThemedText>
                </ThemedView>
              ))}
            </ThemedView>
          </ThemedView>
        )}

        {/* Available Offerings */}
        {currentOffering && (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle">Available Plans</ThemedText>

            <ThemedView style={styles.infoCard}>
              <ThemedText style={styles.offeringTitle}>
                {currentOffering.identifier}
              </ThemedText>
              <ThemedText style={styles.offeringDescription}>
                {currentOffering.availablePackages?.length || 0} subscription
                options available
              </ThemedText>

              <TouchableOpacity
                style={styles.viewPlansButton}
                onPress={() => router.push("/paywall")}
              >
                <ThemedText style={styles.viewPlansButtonText}>
                  View All Plans
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        )}

        {/* Platform Information */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Platform Info</ThemedText>

          <ThemedView style={styles.infoCard}>
            <ThemedView style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Platform:</ThemedText>
              <ThemedText style={styles.infoValue}>{Platform.OS}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Store:</ThemedText>
              <ThemedText style={styles.infoValue}>
                {REVENUECAT_CONFIG.USE_TEST_STORE
                  ? "🧪 Test Store"
                  : Platform.OS === "ios"
                  ? "🍎 Apple App Store"
                  : Platform.OS === "android"
                  ? "🤖 Google Play Store"
                  : Platform.OS === "web"
                  ? "😸 RevenueCat Web Billing"
                  : "🏪 Production Store"}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Configuration:</ThemedText>
              <ThemedText
                style={[
                  styles.infoValue,
                  isConfigured ? styles.successText : styles.errorText,
                ]}
              >
                {isConfigured ? "✅ Configured" : "❌ Not Configured"}
              </ThemedText>
            </ThemedView>

            {errorMessage && (
              <ThemedView style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Status:</ThemedText>
                <ThemedText style={[styles.infoValue, styles.errorText]}>
                  Error: {errorMessage}
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        </ThemedView>

        {/* Account Actions */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Account Actions</ThemedText>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/")}
          >
            <ThemedText style={styles.actionButtonText}>
              🏠 Back to Home
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/paywall")}
          >
            <ThemedText style={styles.actionButtonText}>
              💎 View Premium Options
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Developer Info */}
        {__DEV__ && (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle">Debug Information</ThemedText>

            <ThemedView style={[styles.infoCard, styles.debugCard]}>
              <ThemedText style={styles.debugText}>Development Mode</ThemedText>
              <ThemedText style={styles.debugText}>
                Customer Info: {customerInfo ? "Loaded" : "Not loaded"}
              </ThemedText>
              <ThemedText style={styles.debugText}>
                Offerings: {currentOffering ? "Available" : "Not available"}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 32,
    paddingTop: 20,
  },
  profileIcon: {
    fontSize: 48,
    lineHeight: 56,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.7,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
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
  infoCard: {
    backgroundColor: "rgba(128, 128, 128, 0.05)",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0.1)",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(128, 128, 128, 0.1)",
    backgroundColor: "transparent",
  },
  infoLabel: {
    fontWeight: "600",
    flex: 1,
  },
  infoValue: {
    flex: 2,
    textAlign: "right",
    fontSize: 14,
  },
  successText: {
    color: "#34C759",
  },
  errorText: {
    color: "#FF3B30",
  },
  entitlementItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(128, 128, 128, 0.1)",
    backgroundColor: "transparent",
  },
  entitlementName: {
    fontWeight: "600",
  },
  entitlementStatus: {
    color: "#34C759",
    fontSize: 12,
    fontWeight: "600",
  },
  offeringTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  offeringDescription: {
    opacity: 0.7,
    marginBottom: 12,
  },
  upgradeButton: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 122, 255, 0.3)",
  },
  upgradeButtonText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  viewPlansButton: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 122, 255, 0.3)",
  },
  viewPlansButtonText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  actionButton: {
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0.2)",
  },
  actionButtonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  debugCard: {
    backgroundColor: "rgba(255, 193, 7, 0.1)",
    borderColor: "rgba(255, 193, 7, 0.3)",
  },
  debugText: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 4,
  },
});
