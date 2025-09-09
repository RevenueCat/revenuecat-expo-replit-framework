/**
 * usePurchases Hook
 * 
 * A comprehensive hook that provides easy access to RevenueCat functionality
 * This is a convenience wrapper around the RevenueCat context.
 * 
 * USAGE:
 * const {
 *   isPremium,
 *   offerings,
 *   purchasePackage,
 *   isLoading
 * } = usePurchases();
 * 
 * FEATURES:
 * - Subscription status checking
 * - Purchase handling with error management
 * - Offering and package management
 * - Loading states for better UX
 * - Cross-platform compatibility
 */

import { useState } from 'react';
import { Platform, Alert } from 'react-native';
import { PurchasesPackage } from 'react-native-purchases';
import { useRevenueCat } from '@/components/RevenueCatProvider';

/**
 * Enhanced purchases hook with additional functionality and error handling
 */
export function usePurchases() {
  const revenueCatContext = useRevenueCat();
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);
  
  /**
   * Enhanced purchase function with loading states and user feedback
   */
  const purchasePackage = async (packageToPurchase: PurchasesPackage) => {
    try {
      setPurchaseLoading(true);
      await revenueCatContext.purchasePackage(packageToPurchase);
      
      // Show success message
      Alert.alert(
        '🎉 Purchase Successful!',
        'Thank you for your purchase. You now have access to premium features!',
        [{ text: 'OK', style: 'default' }]
      );
      
    } catch (error: any) {
      // Only show error if user didn't cancel
      if (!error.userCancelled) {
        console.error('Purchase error in hook:', error);
        
        // Provide user-friendly error messages
        let errorMessage = 'Please try again later.';
        
        if (error.message?.includes('network')) {
          errorMessage = 'Please check your internet connection and try again.';
        } else if (error.message?.includes('payment')) {
          errorMessage = 'There was an issue processing your payment. Please try again.';
        } else if (Platform.OS === 'web' && error.message?.includes('billing')) {
          errorMessage = 'Web billing is not configured. Please contact support.';
        }
        
        Alert.alert(
          'Purchase Failed',
          errorMessage,
          [{ text: 'OK', style: 'default' }]
        );
        
        throw error; // Re-throw for component-level handling if needed
      }
    } finally {
      setPurchaseLoading(false);
    }
  };
  
  /**
   * Enhanced restore purchases function
   */
  const restorePurchases = async () => {
    try {
      setRestoreLoading(true);
      await revenueCatContext.restorePurchases();
      
      // Show success message
      if (Platform.OS !== 'web') {
        Alert.alert(
          '✅ Restore Successful',
          'Your purchases have been restored successfully.',
          [{ text: 'OK', style: 'default' }]
        );
      }
      
    } catch (error: any) {
      console.error('Restore error in hook:', error);
      
      Alert.alert(
        'Restore Failed',
        'Unable to restore purchases. Please try again or contact support if the issue persists.',
        [{ text: 'OK', style: 'default' }]
      );
      
      throw error;
    } finally {
      setRestoreLoading(false);
    }
  };
  
  /**
   * Check if user has access to a specific entitlement
   */
  const hasEntitlement = (entitlementId: string): boolean => {
    return revenueCatContext.customerInfo?.entitlements?.active?.[entitlementId] != null;
  };
  
  /**
   * Get all active entitlements
   */
  const getActiveEntitlements = (): string[] => {
    const activeEntitlements = revenueCatContext.customerInfo?.entitlements?.active;
    return activeEntitlements ? Object.keys(activeEntitlements) : [];
  };
  
  /**
   * Get packages sorted by price (lowest to highest)
   */
  const getPackagesSortedByPrice = () => {
    const packages = revenueCatContext.currentOffering?.availablePackages || [];
    
    return [...packages].sort((a, b) => {
      const priceA = a.storeProduct?.price || a.product?.price || 0;
      const priceB = b.storeProduct?.price || b.product?.price || 0;
      return priceA - priceB;
    });
  };
  
  /**
   * Get a specific package by type
   */
  const getPackageByType = (packageType: string) => {
    const packages = revenueCatContext.currentOffering?.availablePackages || [];
    return packages.find(pkg => pkg.packageType === packageType);
  };
  
  /**
   * Format price string for display
   */
  const formatPackagePrice = (packageItem: PurchasesPackage): string => {
    // Try different price string sources based on platform
    return packageItem.storeProduct?.priceString ||
           packageItem.product?.priceString ||
           packageItem.storeProduct?.price?.toString() ||
           packageItem.product?.price?.toString() ||
           'Price unavailable';
  };
  
  /**
   * Get package title for display
   */
  const formatPackageTitle = (packageItem: PurchasesPackage): string => {
    // Try different title sources
    const title = packageItem.storeProduct?.title ||
                  packageItem.product?.title ||
                  packageItem.storeProduct?.localizedTitle ||
                  packageItem.product?.localizedTitle;
    
    if (title) return title;
    
    // Fallback to package type formatting
    const packageType = packageItem.packageType || 'Unknown';
    return packageType.charAt(0).toUpperCase() + packageType.slice(1) + ' Package';
  };
  
  /**
   * Check if RevenueCat is properly configured
   */
  const isConfigured = (): boolean => {
    return revenueCatContext.isInitialized && !revenueCatContext.error;
  };
  
  /**
   * Get user-friendly error message
   */
  const getErrorMessage = (): string | null => {
    if (!revenueCatContext.error) return null;
    
    // Provide more helpful error messages
    if (revenueCatContext.error.includes('configuration')) {
      return 'RevenueCat is not properly configured. Please check your API keys in constants/RevenueCat.ts';
    }
    
    if (revenueCatContext.error.includes('network')) {
      return 'Network error. Please check your internet connection.';
    }
    
    return revenueCatContext.error;
  };
  
  // Return all the functionality
  return {
    // State from context
    ...revenueCatContext,
    
    // Enhanced loading states
    isPurchasing: purchaseLoading,
    isRestoring: restoreLoading,
    
    // Enhanced actions
    purchasePackage,
    restorePurchases,
    
    // Utility functions
    hasEntitlement,
    getActiveEntitlements,
    getPackagesSortedByPrice,
    getPackageByType,
    formatPackagePrice,
    formatPackageTitle,
    isConfigured,
    getErrorMessage,
  };
}

/**
 * Simplified hook for basic premium status checking
 * Use this when you only need to check if the user is premium
 */
export function usePremiumStatus() {
  const { isPremium, isLoading, error } = usePurchases();
  
  return {
    isPremium,
    isLoading,
    hasError: !!error,
  };
}

/**
 * Hook specifically for paywall components
 * Provides everything needed to build a paywall screen
 */
export function usePaywall() {
  const {
    currentOffering,
    purchasePackage,
    isPurchasing,
    isLoading,
    error,
    isConfigured,
    getPackagesSortedByPrice,
    formatPackagePrice,
    formatPackageTitle,
  } = usePurchases();
  
  const packages = currentOffering?.availablePackages || [];
  const sortedPackages = getPackagesSortedByPrice();
  
  return {
    // Offerings
    offering: currentOffering,
    packages,
    sortedPackages,
    hasPackages: packages.length > 0,
    
    // Actions
    purchasePackage,
    
    // State
    isPurchasing,
    isLoading,
    hasError: !!error,
    errorMessage: error,
    isConfigured,
    
    // Utilities
    formatPackagePrice,
    formatPackageTitle,
  };
}