/**
 * Cross-Platform Paywall Screen
 * 
 * This paywall implementation works across iOS, Android, and Web platforms.
 * It automatically adapts to different screen sizes and handles platform-specific
 * purchase flows including RevenueCat's web billing.
 * 
 * FEATURES:
 * - Cross-platform compatibility (iOS, Android, Web)
 * - Responsive design for different screen sizes
 * - Package comparison with pricing
 * - Platform-specific purchase handling
 * - Loading states and error handling
 * - Graceful fallbacks for missing offerings
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { usePaywall } from '@/hooks/usePurchases';
import { PACKAGE_TYPES } from '@/constants/RevenueCat';

export default function PaywallScreen() {
  const {
    packages,
    sortedPackages,
    hasPackages,
    purchasePackage,
    isPurchasing,
    isLoading,
    hasError,
    errorMessage,
    isConfigured,
    formatPackagePrice,
    formatPackageTitle,
  } = usePaywall();

  const [selectedPackageIndex, setSelectedPackageIndex] = useState(1); // Default to middle option

  // Handle purchase with loading state
  const handlePurchase = async () => {
    if (!hasPackages || isPurchasing) return;
    
    const selectedPackage = sortedPackages[selectedPackageIndex];
    if (!selectedPackage) return;

    try {
      await purchasePackage(selectedPackage);
      // Success is handled in the hook with user feedback
      router.replace('/');
    } catch (error) {
      // Error is handled in the hook with user feedback
      console.log('Purchase failed in paywall (handled in hook)');
    }
  };

  // Get package type badge
  const getPackageTypeBadge = (packageType: string) => {
    switch (packageType) {
      case PACKAGE_TYPES.WEEKLY:
        return '⚡ Try It';
      case PACKAGE_TYPES.MONTHLY:
        return '📱 Popular';
      case PACKAGE_TYPES.ANNUAL:
        return '🎯 Best Value';
      case PACKAGE_TYPES.LIFETIME:
        return '💎 Premium';
      default:
        return null;
    }
  };

  // Calculate savings for annual plans
  const calculateSavings = (packageItem: any, index: number) => {
    if (packageItem.packageType === PACKAGE_TYPES.ANNUAL && packages.length > 1) {
      const monthlyPackage = packages.find(p => p.packageType === PACKAGE_TYPES.MONTHLY);
      if (monthlyPackage) {
        const annualPrice = packageItem.storeProduct?.price || packageItem.product?.price || 0;
        const monthlyPrice = monthlyPackage.storeProduct?.price || monthlyPackage.product?.price || 0;
        if (annualPrice > 0 && monthlyPrice > 0) {
          const monthlyCost = monthlyPrice * 12;
          const savings = Math.round(((monthlyCost - annualPrice) / monthlyCost) * 100);
          if (savings > 0) {
            return `Save ${savings}%`;
          }
        }
      }
    }
    return null;
  };

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.closeButtonText}>✕</ThemedText>
          </TouchableOpacity>
          <ThemedText type="title" style={styles.title}>
            Upgrade to Premium
          </ThemedText>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Loading State */}
          {isLoading && (
            <ThemedView style={styles.centerContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <ThemedText style={styles.loadingText}>Loading premium options...</ThemedText>
            </ThemedView>
          )}

          {/* Error State */}
          {hasError && !isLoading && (
            <ThemedView style={[styles.card, styles.errorCard]}>
              <ThemedText type="defaultSemiBold" style={styles.errorTitle}>
                Unable to load premium options
              </ThemedText>
              <ThemedText style={styles.errorText}>
                {!isConfigured 
                  ? 'Please configure your RevenueCat API keys in constants/RevenueCat.ts'
                  : errorMessage || 'Please try again later.'
                }
              </ThemedText>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => router.back()}
              >
                <ThemedText style={styles.retryButtonText}>Go Back</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}

          {/* No Packages Available */}
          {!hasPackages && !isLoading && !hasError && (
            <ThemedView style={[styles.card, styles.warningCard]}>
              <ThemedText type="defaultSemiBold" style={styles.warningTitle}>
                No premium options available
              </ThemedText>
              <ThemedText style={styles.warningText}>
                Please configure your products and offerings in the RevenueCat dashboard.
              </ThemedText>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => router.back()}
              >
                <ThemedText style={styles.retryButtonText}>Go Back</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}

          {/* Premium Features */}
          {hasPackages && !isLoading && (
            <>
              <ThemedView style={styles.featuresContainer}>
                <ThemedText type="subtitle" style={styles.featuresTitle}>
                  Premium Features
                </ThemedText>
                
                <View style={styles.featuresList}>
                  <View style={styles.feature}>
                    <ThemedText style={styles.featureIcon}>🚀</ThemedText>
                    <ThemedText style={styles.featureText}>
                      Advanced functionality and tools
                    </ThemedText>
                  </View>
                  
                  <View style={styles.feature}>
                    <ThemedText style={styles.featureIcon}>⭐</ThemedText>
                    <ThemedText style={styles.featureText}>
                      Priority support and updates
                    </ThemedText>
                  </View>
                  
                  <View style={styles.feature}>
                    <ThemedText style={styles.featureIcon}>🌍</ThemedText>
                    <ThemedText style={styles.featureText}>
                      Works across all platforms
                    </ThemedText>
                  </View>
                  
                  <View style={styles.feature}>
                    <ThemedText style={styles.featureIcon}>🔄</ThemedText>
                    <ThemedText style={styles.featureText}>
                      Sync across all your devices
                    </ThemedText>
                  </View>
                </View>
              </ThemedView>

              {/* Package Selection */}
              <ThemedView style={styles.packagesContainer}>
                <ThemedText type="subtitle" style={styles.packagesTitle}>
                  Choose Your Plan
                </ThemedText>
                
                {sortedPackages.map((packageItem, index) => {
                  const isSelected = index === selectedPackageIndex;
                  const badge = getPackageTypeBadge(packageItem.packageType || '');
                  const savings = calculateSavings(packageItem, index);
                  
                  return (
                    <TouchableOpacity
                      key={packageItem.identifier || `package-${index}`}
                      style={[
                        styles.packageOption,
                        isSelected && styles.selectedPackage
                      ]}
                      onPress={() => setSelectedPackageIndex(index)}
                      disabled={isPurchasing}
                    >
                      {/* Badge */}
                      {(badge || savings) && (
                        <View style={styles.badgeContainer}>
                          {badge && (
                            <View style={styles.badge}>
                              <ThemedText style={styles.badgeText}>{badge}</ThemedText>
                            </View>
                          )}
                          {savings && (
                            <View style={[styles.badge, styles.savingsBadge]}>
                              <ThemedText style={styles.badgeText}>{savings}</ThemedText>
                            </View>
                          )}
                        </View>
                      )}
                      
                      <View style={styles.packageContent}>
                        <View style={styles.packageHeader}>
                          <ThemedText style={styles.packageTitle}>
                            {formatPackageTitle(packageItem)}
                          </ThemedText>
                          <ThemedText style={styles.packagePrice}>
                            {formatPackagePrice(packageItem)}
                          </ThemedText>
                        </View>
                        
                        <ThemedText style={styles.packageDescription}>
                          {packageItem.packageType === PACKAGE_TYPES.WEEKLY && 'Perfect for trying premium features'}
                          {packageItem.packageType === PACKAGE_TYPES.MONTHLY && 'Great for regular users'}
                          {packageItem.packageType === PACKAGE_TYPES.ANNUAL && 'Best value for committed users'}
                          {packageItem.packageType === PACKAGE_TYPES.LIFETIME && 'One-time purchase, lifetime access'}
                          {!Object.values(PACKAGE_TYPES).includes(packageItem.packageType as any) && 'Premium subscription access'}
                        </ThemedText>
                      </View>
                      
                      {/* Selection Indicator */}
                      <View style={[styles.selectionIndicator, isSelected && styles.selectedIndicator]}>
                        {isSelected && <ThemedText style={styles.checkmark}>✓</ThemedText>}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ThemedView>

              {/* Platform Info */}
              {Platform.OS === 'web' && (
                <ThemedView style={styles.webInfo}>
                  <ThemedText style={styles.webInfoTitle}>💳 Web Billing</ThemedText>
                  <ThemedText style={styles.webInfoText}>
                    Secure payments powered by Stripe. Your subscription will be managed through RevenueCat's web billing system.
                  </ThemedText>
                </ThemedView>
              )}

              {/* Purchase Button */}
              <TouchableOpacity
                style={[
                  styles.purchaseButton,
                  isPurchasing && styles.purchasingButton
                ]}
                onPress={handlePurchase}
                disabled={isPurchasing || !hasPackages}
              >
                {isPurchasing ? (
                  <View style={styles.purchasingContent}>
                    <ActivityIndicator size="small" color="white" />
                    <ThemedText style={styles.purchaseButtonText}>
                      Processing...
                    </ThemedText>
                  </View>
                ) : (
                  <ThemedText style={styles.purchaseButtonText}>
                    Start Premium Experience
                  </ThemedText>
                )}
              </TouchableOpacity>

              {/* Terms */}
              <ThemedView style={styles.termsContainer}>
                <ThemedText style={styles.termsText}>
                  Subscriptions automatically renew unless cancelled. You can manage your subscription in your account settings.
                  {Platform.OS === 'ios' && ' Subscriptions are managed through your Apple ID.'}
                  {Platform.OS === 'android' && ' Subscriptions are managed through Google Play.'}
                  {Platform.OS === 'web' && ' Subscriptions are managed through our web billing system.'}
                </ThemedText>
              </ThemedView>

              {/* Close Button */}
              <TouchableOpacity
                style={styles.laterButton}
                onPress={() => router.back()}
              >
                <ThemedText style={styles.laterButtonText}>Maybe Later</ThemedText>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  closeButton: {
    padding: 8,
    marginRight: 12,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // Offset for close button
  },
  content: {
    flex: 1,
    padding: 20,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  errorCard: {
    backgroundColor: '#fff5f5',
    borderColor: '#fed7d7',
  },
  warningCard: {
    backgroundColor: '#fffbf0',
    borderColor: '#feeaa7',
  },
  errorTitle: {
    color: '#e53e3e',
    marginBottom: 8,
  },
  errorText: {
    color: '#c53030',
    marginBottom: 16,
    lineHeight: 20,
  },
  warningTitle: {
    color: '#d69e2e',
    marginBottom: 8,
  },
  warningText: {
    color: '#b7791f',
    marginBottom: 16,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  featuresContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  featuresTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresList: {
    gap: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  packagesContainer: {
    marginBottom: 24,
  },
  packagesTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  packageOption: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  selectedPackage: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    gap: 6,
    zIndex: 1,
  },
  badge: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  savingsBadge: {
    backgroundColor: '#34C759',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  packageContent: {
    padding: 20,
    paddingRight: 60, // Space for badges
  },
  packageHeader: {
    marginBottom: 8,
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  packagePrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  packageDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 18,
  },
  selectionIndicator: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  selectedIndicator: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  webInfo: {
    backgroundColor: '#e6f3ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  webInfoTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#0066cc',
  },
  webInfoText: {
    fontSize: 14,
    color: '#004499',
    lineHeight: 18,
  },
  purchaseButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginBottom: 20,
  },
  purchasingButton: {
    backgroundColor: '#5ac8fa',
  },
  purchasingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  purchaseButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsContainer: {
    marginBottom: 20,
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.6,
    lineHeight: 16,
  },
  laterButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  laterButtonText: {
    fontSize: 16,
    opacity: 0.6,
  },
});