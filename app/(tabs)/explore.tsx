/**
 * RevenueCat Documentation Hub
 * 
 * This screen serves as a comprehensive documentation center for RevenueCat
 * integration. It provides interactive examples, setup guides, and best practices.
 * 
 * FEATURES:
 * - Step-by-step setup instructions
 * - Cross-platform considerations
 * - Code examples for common use cases
 * - Troubleshooting guides
 * - Links to external documentation
 */

import { Platform, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { usePurchases } from '@/hooks/usePurchases';

export default function RevenueCatDocsScreen() {
  const { isConfigured, isPremium, isLoading, currentOffering } = usePurchases();
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="doc.text.magnifyingglass"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">RevenueCat Guide</ThemedText>
      </ThemedView>
      <ThemedText>Complete setup guide and documentation for RevenueCat integration.</ThemedText>
      
      {/* Configuration Status */}
      <Collapsible title="🔧 Configuration Status" defaultOpen={!isConfigured}>
        <ThemedView style={styles.statusContainer}>
          <ThemedText>
            <ThemedText type="defaultSemiBold">API Keys: </ThemedText>
            {isConfigured ? '✅ Configured' : '❌ Not configured'}
          </ThemedText>
          <ThemedText>
            <ThemedText type="defaultSemiBold">Offerings: </ThemedText>
            {currentOffering ? '✅ Available' : isLoading ? '⏳ Loading...' : '❌ No offerings found'}
          </ThemedText>
          <ThemedText>
            <ThemedText type="defaultSemiBold">Subscription Status: </ThemedText>
            {isPremium ? '✨ Premium' : '🆓 Free'}
          </ThemedText>
          <ThemedText>
            <ThemedText type="defaultSemiBold">Platform: </ThemedText>
            {Platform.OS} {Platform.OS === 'web' && '(Web Billing supported)'}
          </ThemedText>
        </ThemedView>
        {!isConfigured && (
          <ThemedText style={styles.warningText}>
            ⚠️ Please configure your API keys in <ThemedText type="defaultSemiBold">constants/RevenueCat.ts</ThemedText>
          </ThemedText>
        )}
      </Collapsible>

      {/* Getting Started */}
      <Collapsible title="🚀 Getting Started">
        <ThemedText type="subtitle" style={styles.sectionTitle}>1. RevenueCat Dashboard Setup</ThemedText>
        <ThemedText>
          • Create account at{' '}
          <ExternalLink href="https://app.revenuecat.com/">
            <ThemedText type="link">app.revenuecat.com</ThemedText>
          </ExternalLink>
        </ThemedText>
        <ThemedText>• Create a new project</ThemedText>
        <ThemedText>• Configure your app in Project Settings</ThemedText>
        <ThemedText>• Set up products and entitlements</ThemedText>
        
        <ThemedText type="subtitle" style={styles.sectionTitle}>2. API Keys Configuration</ThemedText>
        <ThemedText>
          Update <ThemedText type="defaultSemiBold">constants/RevenueCat.ts</ThemedText> with your API keys:
        </ThemedText>
        <ThemedView style={styles.codeBlock}>
          <ThemedText style={styles.codeText}>
            IOS_API_KEY: 'appl_xxxxxxxxxx',{'\n'}
            ANDROID_API_KEY: 'goog_xxxxxxxxxx',{'\n'}
            WEB_API_KEY: 'strp_xxxxxxxxxx', // For web billing
          </ThemedText>
        </ThemedView>
        
        <ExternalLink href="https://docs.revenuecat.com/docs/getting-started">
          <ThemedText type="link">📚 Complete Setup Guide</ThemedText>
        </ExternalLink>
      </Collapsible>

      {/* Platform Support */}
      <Collapsible title="📱 Cross-Platform Support">
        <ThemedText type="subtitle" style={styles.sectionTitle}>iOS</ThemedText>
        <ThemedText>• Native App Store integration</ThemedText>
        <ThemedText>• StoreKit support</ThemedText>
        <ThemedText>• Automatic receipt validation</ThemedText>
        
        <ThemedText type="subtitle" style={styles.sectionTitle}>Android</ThemedText>
        <ThemedText>• Google Play Billing integration</ThemedText>
        <ThemedText>• Play Console configuration required</ThemedText>
        <ThemedText>• Supports subscriptions and one-time purchases</ThemedText>
        
        <ThemedText type="subtitle" style={styles.sectionTitle}>Web</ThemedText>
        <ThemedText>• Stripe-powered web billing</ThemedText>
        <ThemedText>• Configure in RevenueCat Dashboard > Web billing</ThemedText>
        <ThemedText>• Requires Stripe account setup</ThemedText>
        
        <ExternalLink href="https://docs.revenuecat.com/docs/web-billing">
          <ThemedText type="link">🌐 Web Billing Setup</ThemedText>
        </ExternalLink>
      </Collapsible>

      {/* Usage Examples */}
      <Collapsible title="💡 Usage Examples">
        <ThemedText type="subtitle" style={styles.sectionTitle}>Basic Subscription Check</ThemedText>
        <ThemedView style={styles.codeBlock}>
          <ThemedText style={styles.codeText}>
            const {'{'}isPremium{'}'} = usePurchases();{'\n'}
            return isPremium ? &lt;PremiumContent /&gt; : &lt;Paywall /&gt;;
          </ThemedText>
        </ThemedView>
        
        <ThemedText type="subtitle" style={styles.sectionTitle}>Purchase Implementation</ThemedText>
        <ThemedView style={styles.codeBlock}>
          <ThemedText style={styles.codeText}>
            const {'{'}purchasePackage{'}'} = usePurchases();{'\n'}
            await purchasePackage(selectedPackage);
          </ThemedText>
        </ThemedView>
        
        <ThemedText type="subtitle" style={styles.sectionTitle}>User Authentication (Optional)</ThemedText>
        <ThemedView style={styles.codeBlock}>
          <ThemedText style={styles.codeText}>
            // Enable in constants/RevenueCat.ts{'\n'}
            // await Purchases.logIn(userId);
          </ThemedText>
        </ThemedView>
        
        <ExternalLink href="https://docs.revenuecat.com/docs/sample-apps">
          <ThemedText type="link">📖 More Code Examples</ThemedText>
        </ExternalLink>
      </Collapsible>

      {/* Testing & Debug */}
      <Collapsible title="🧪 Testing & Debug">
        <ThemedText>
          Check the <ThemedText type="defaultSemiBold">Profile</ThemedText> tab for:
        </ThemedText>
        <ThemedText>• Customer info inspection</ThemedText>
        <ThemedText>• Active entitlements</ThemedText>
        <ThemedText>• Purchase restoration</ThemedText>
        
        <ThemedText type="subtitle" style={styles.sectionTitle}>Sandbox Testing</ThemedText>
        <ThemedText>• iOS: Use App Store Connect sandbox accounts</ThemedText>
        <ThemedText>• Android: Use Google Play Console test accounts</ThemedText>
        <ThemedText>• Web: Use Stripe test mode</ThemedText>
        
        <ExternalLink href="https://docs.revenuecat.com/docs/sandbox">
          <ThemedText type="link">🛠️ Sandbox Testing Guide</ThemedText>
        </ExternalLink>
      </Collapsible>

      {/* Paywall Implementation */}
      <Collapsible title="💳 Paywall Implementation">
        <ThemedText>
          This template includes a cross-platform paywall at{' '}
          <ThemedText type="defaultSemiBold">app/paywall.tsx</ThemedText>
        </ThemedText>
        
        <ThemedText type="subtitle" style={styles.sectionTitle}>Custom Paywall (Recommended)</ThemedText>
        <ThemedText>• Works on iOS, Android, and Web</ThemedText>
        <ThemedText>• Full customization control</ThemedText>
        <ThemedText>• Supports web billing</ThemedText>
        
        <ThemedText type="subtitle" style={styles.sectionTitle}>RevenueCat Paywalls (Mobile Only)</ThemedText>
        <ThemedText>• Pre-built UI components</ThemedText>
        <ThemedText>• iOS and Android only</ThemedText>
        <ThemedText>• Less customization but faster setup</ThemedText>
        
        {currentOffering && (
          <ThemedView style={styles.actionContainer}>
            <ThemedText 
              type="link" 
              style={styles.actionButton}
              onPress={() => router.push('/paywall')}
            >
              🎯 View Example Paywall
            </ThemedText>
          </ThemedView>
        )}
        
        <ExternalLink href="https://docs.revenuecat.com/docs/displaying-products">
          <ThemedText type="link">🎨 Paywall Best Practices</ThemedText>
        </ExternalLink>
      </Collapsible>

      {/* Troubleshooting */}
      <Collapsible title="🔍 Troubleshooting">
        <ThemedText type="subtitle" style={styles.sectionTitle}>Common Issues</ThemedText>
        
        <ThemedText>
          <ThemedText type="defaultSemiBold">No offerings found:</ThemedText>{'\n'}
          • Check API keys configuration{'\n'}
          • Verify products are set up in RevenueCat dashboard{'\n'}
          • Ensure entitlements are properly configured
        </ThemedText>
        
        <ThemedText>
          <ThemedText type="defaultSemiBold">Web billing not working:</ThemedText>{'\n'}
          • Configure Stripe in RevenueCat dashboard{'\n'}
          • Check web API key is correct{'\n'}
          • Verify domain is whitelisted
        </ThemedText>
        
        <ThemedText>
          <ThemedText type="defaultSemiBold">Purchases not reflecting:</ThemedText>{'\n'}
          • Check sandbox vs production environment{'\n'}
          • Verify receipt validation is working{'\n'}
          • Review customer info in Profile tab
        </ThemedText>
        
        <ExternalLink href="https://docs.revenuecat.com/docs/troubleshooting">
          <ThemedText type="link">🆘 Full Troubleshooting Guide</ThemedText>
        </ExternalLink>
      </Collapsible>

      {/* Resources */}
      <Collapsible title="📚 Resources">
        <ThemedText type="subtitle" style={styles.sectionTitle}>Official Documentation</ThemedText>
        <ExternalLink href="https://docs.revenuecat.com/">
          <ThemedText type="link">📖 RevenueCat Docs</ThemedText>
        </ExternalLink>
        
        <ExternalLink href="https://docs.revenuecat.com/docs/reactnative">
          <ThemedText type="link">⚛️ React Native SDK Guide</ThemedText>
        </ExternalLink>
        
        <ThemedText type="subtitle" style={styles.sectionTitle}>Community</ThemedText>
        <ExternalLink href="https://community.revenuecat.com/">
          <ThemedText type="link">💬 RevenueCat Community</ThemedText>
        </ExternalLink>
        
        <ThemedText type="subtitle" style={styles.sectionTitle}>Support</ThemedText>
        <ExternalLink href="mailto:support@revenuecat.com">
          <ThemedText type="link">📧 Contact Support</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  statusContainer: {
    gap: 4,
    marginBottom: 12,
  },
  warningText: {
    color: '#ff6b35',
    fontStyle: 'italic',
    marginTop: 8,
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
  },
  codeBlock: {
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  codeText: {
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      web: 'Monaco, Consolas, "Lucida Console", monospace',
    }),
    fontSize: 12,
    lineHeight: 16,
  },
  actionContainer: {
    marginVertical: 12,
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    textAlign: 'center',
  },
});