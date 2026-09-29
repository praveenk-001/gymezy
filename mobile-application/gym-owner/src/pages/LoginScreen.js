import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme/ThemeContext';
import { AppColors } from '../theme/appTheme';
import { useToast } from '../widgets/CustomScaffoldMessage';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const LoginScreen = ({ navigation }) => {
  const { isDark, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [obscurePassword, setObscurePassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const topInset = Math.max(
    insets.top,
    Platform.OS === 'android' ? (StatusBar.currentHeight || 36) : 44
  );

  const fillDemoCredentials = (demoId, demoPass) => {
    setIdentifier(demoId);
    setPassword(demoPass);
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    const trimmedId = identifier.trim();

    if (!trimmedId) {
      newErrors.identifier = 'Please enter your registered email or phone number';
    } else {
      const isEmail = /\S+@\S+\.\S+/.test(trimmedId);
      const isPhone = /^[0-9+ \-()]{7,15}$/.test(trimmedId);
      if (!isEmail && !isPhone) {
        newErrors.identifier = 'Please enter a valid email address or phone number';
      }
    }

    if (!password) {
      newErrors.password = 'Please enter your password';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast({
        message: 'Welcome back to FitZone Arena Partner Portal',
        isSuccess: true,
      });
      navigation.replace('Dashboard');
    }, 600);
  };

  const cardBg = isDark ? AppColors.darkCard : '#FFFFFF';
  const surfaceBg = isDark ? AppColors.darkSurface : '#F8FAFC';
  const borderColor = isDark ? AppColors.darkBorder : '#E2E8F0';
  const textColor = isDark ? '#FFFFFF' : '#0F172A';
  const subtitleColor = isDark ? 'rgba(255, 255, 255, 0.65)' : '#64748B';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? AppColors.darkBackground : '#F8FAFC' },
      ]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* 1. TOP HERO: Cinematic Visual with GYMEZY Logo & Vignette */}
        <View style={styles.topHeroContainer}>
          <Image
            source={require('../../assets/pages/onboarding/onboarding_1.jpg')}
            style={styles.heroImage}
            resizeMode="cover"
          />

          <LinearGradient
            colors={
              isDark
                ? [
                    'rgba(0,0,0,0.55)',
                    'transparent',
                    'rgba(18,18,18,0.7)',
                    AppColors.darkBackground,
                  ]
                : [
                    'rgba(0,0,0,0.45)',
                    'transparent',
                    'rgba(0,0,0,0.15)',
                    'rgba(0,0,0,0.55)',
                  ]
            }
            style={styles.gradientOverlay}
          />

          {/* Centered Brand Logo & Partner Tagline */}
          <View style={styles.heroCenterContent}>
            <Image
              source={require('../../assets/logo/gymezy.png')}
              style={styles.heroLogo}
              resizeMode="contain"
            />
            <Text style={styles.heroSubtitle}>PARTNER PORTAL</Text>
          </View>

          {/* Top Actions: Theme Switcher & Auto-Fill Demo */}
          <View style={[styles.topActionsRow, { top: topInset + 6 }]}>
            <TouchableOpacity
              onPress={toggleTheme}
              style={styles.themePill}
              activeOpacity={0.8}
            >
              <Icon
                name={isDark ? 'light-mode' : 'dark-mode'}
                size={16}
                color={isDark ? '#F59E0B' : '#FFFFFF'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => fillDemoCredentials('owner@fitzone.com', 'Admin@123')}
              style={styles.demoPill}
              activeOpacity={0.8}
            >
              <Icon name="bolt" size={14} color={AppColors.secondaryColor} />
              <Text style={styles.demoPillText}>Auto-Fill Demo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. FORM & ACTIONS SECTION */}
        <View style={styles.formContainer}>
          <Text style={[styles.welcomeTitle, { color: textColor }]}>
            Welcome Back, Partner
          </Text>
          <Text style={[styles.welcomeSubtitle, { color: subtitleColor }]}>
            Log in to manage your gym facility, track revenue, and monitor check-ins
          </Text>

          {/* Email / Phone Number Field */}
          <Text style={[styles.fieldLabel, { color: textColor }]}>
            Registered Email / Phone Number
          </Text>
          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: surfaceBg,
                borderColor: errors.identifier ? AppColors.dangerRed : borderColor,
              },
            ]}
          >
            <Icon
              name="person-outline"
              size={20}
              color={isDark ? 'rgba(255,255,255,0.6)' : AppColors.primaryColor}
              style={styles.inputPrefixIcon}
            />
            <TextInput
              style={[styles.inputField, { color: textColor }]}
              placeholder="owner@fitzone.com or 9876543210"
              placeholderTextColor={isDark ? 'rgba(255,255,255,0.35)' : '#94A3B8'}
              value={identifier}
              onChangeText={(text) => {
                setIdentifier(text);
                if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: null }));
              }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          {errors.identifier && <Text style={styles.errorText}>{errors.identifier}</Text>}

          {/* Password Field */}
          <Text style={[styles.fieldLabel, { color: textColor, marginTop: 16 }]}>
            Password
          </Text>
          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: surfaceBg,
                borderColor: errors.password ? AppColors.dangerRed : borderColor,
              },
            ]}
          >
            <Icon
              name="lock-outline"
              size={20}
              color={isDark ? 'rgba(255,255,255,0.6)' : AppColors.primaryColor}
              style={styles.inputPrefixIcon}
            />
            <TextInput
              style={[styles.inputField, { color: textColor }]}
              placeholder="Enter your password"
              placeholderTextColor={isDark ? 'rgba(255,255,255,0.35)' : '#94A3B8'}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
              }}
              secureTextEntry={obscurePassword}
            />
            <TouchableOpacity
              onPress={() => setObscurePassword(!obscurePassword)}
              style={styles.inputSuffixBtn}
            >
              <Icon
                name={obscurePassword ? 'visibility-off' : 'visibility'}
                size={20}
                color={subtitleColor}
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          {/* Remember Me & Forgot Password */}
          <View style={styles.rememberForgotRow}>
            <TouchableOpacity
              onPress={() => setRememberMe(!rememberMe)}
              style={styles.rememberRow}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: rememberMe
                      ? AppColors.secondaryColor
                      : 'transparent',
                    borderColor: rememberMe
                      ? AppColors.secondaryColor
                      : borderColor,
                  },
                ]}
              >
                {rememberMe && (
                  <Icon name="check" size={14} color="#FFFFFF" />
                )}
              </View>
              <Text style={[styles.rememberText, { color: subtitleColor }]}>
                Remember me
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Password Reset',
                  'A password reset link or OTP will be sent to your registered email or phone.'
                )
              }
            >
              <Text
                style={[
                  styles.forgotText,
                  { color: isDark ? AppColors.darkAccentColor : AppColors.primaryColor },
                ]}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Log In Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            style={[
              styles.loginBtn,
              { backgroundColor: AppColors.secondaryColor },
            ]}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <View style={styles.loginBtnContent}>
                <Text style={styles.loginBtnText}>Sign In to Dashboard</Text>
                <Icon
                  name="arrow-forward"
                  size={18}
                  color="#FFFFFF"
                  style={styles.iconLeftMargin}
                />
              </View>
            )}
          </TouchableOpacity>

          {/* Quick Demo Chips Section */}
          <View style={styles.demoRow}>
            <TouchableOpacity
              style={[
                styles.demoQuickChip,
                { backgroundColor: cardBg, borderColor: borderColor },
              ]}
              onPress={() => fillDemoCredentials('owner@fitzone.com', 'Admin@123')}
              activeOpacity={0.8}
            >
              <Text style={[styles.demoChipTitle, { color: AppColors.primaryColor }]}>
                FitZone (Email Login)
              </Text>
              <Text style={styles.demoChipSub}>owner@fitzone.com</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.demoQuickChip,
                { backgroundColor: cardBg, borderColor: borderColor },
              ]}
              onPress={() => fillDemoCredentials('+91 98765 43210', 'Admin@123')}
              activeOpacity={0.8}
            >
              <Text style={[styles.demoChipTitle, { color: AppColors.primaryColor }]}>
                PowerGym (Phone Login)
              </Text>
              <Text style={styles.demoChipSub}>+91 98765 43210</Text>
            </TouchableOpacity>
          </View>

          {/* Support Footer */}
          <View style={styles.footerRow}>
            <Text style={[styles.footerText, { color: subtitleColor }]}>
              Need new gym partner onboarding?{' '}
            </Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Partner Support',
                  'Contact GYMEZY Partner Support at partner@gymezy.com or call +91 98765 43210'
                )
              }
            >
              <Text style={styles.signUpLink}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 36,
  },
  topHeroContainer: {
    height: SCREEN_HEIGHT * 0.35,
    position: 'relative',
    overflow: 'hidden',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  heroCenterContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLogo: {
    height: 48,
    width: 140,
    tintColor: '#FFFFFF',
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 3,
    marginTop: 8,
  },
  topActionsRow: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themePill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderWidth: 0.8,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderWidth: 0.8,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  demoPillText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '700',
    marginLeft: 4,
  },
  formContainer: {
    paddingHorizontal: 22,
    paddingTop: 16,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 13.5,
    letterSpacing: 0.1,
    marginTop: 4,
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  inputPrefixIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  inputSuffixBtn: {
    padding: 4,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 11,
    marginTop: 4,
  },
  rememberForgotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 22,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rememberText: {
    fontSize: 12.5,
    marginLeft: 8,
  },
  forgotText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  loginBtn: {
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  demoRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  demoQuickChip: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  demoChipTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    marginBottom: 2,
  },
  demoChipSub: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 13,
  },
  signUpLink: {
    fontSize: 13,
    color: AppColors.secondaryColor,
    fontWeight: '700',
  },
  iconLeftMargin: {
    marginLeft: 8,
  },
});
