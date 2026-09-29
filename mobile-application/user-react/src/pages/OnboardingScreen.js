import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  StatusBar,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { AppColors } from '../theme/appTheme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    id: '1',
    tag: 'ALL-ACCESS NETWORK',
    tagIcon: 'verified',
    titlePrefix: 'Fitness Freedom,\n',
    titleHighlight: 'Simplified.',
    subtitle:
      'Discover premier gyms, state-of-the-art facilities, and certified personal coaches across your city. Train on your terms every day.',
    image: require('../../assets/pages/onboarding/onboarding_1.jpg'),
    floatingBadge: '50+ Verified Partner Gyms',
  },
  {
    id: '2',
    tag: 'INSTANT PASSES',
    tagIcon: 'bolt',
    titlePrefix: 'Book Any Workout,\n',
    titleHighlight: 'Instantly.',
    subtitle:
      'Reserve single-session gym passes, yoga studios, HIIT, and Zumba classes in seconds with transparent pricing and zero lock-in contracts.',
    image: require('../../assets/pages/onboarding/onboarding_2.jpg'),
    floatingBadge: 'Instant QR Entry • 0 Wait Time',
  },
  {
    id: '3',
    tag: 'UNLIMITED ACCESS',
    tagIcon: 'workspace-premium',
    titlePrefix: 'One Pass for,\n',
    titleHighlight: 'All Gyms.',
    subtitle:
      'Manage your multi-gym passes, track booking schedules, and unlock exclusive member perks from one unified, seamless dashboard.',
    image: require('../../assets/pages/onboarding/onboarding_3.jpg'),
    floatingBadge: '1 Membership • Infinite Workouts',
  },
];

export const OnboardingScreen = ({ navigation }) => {
  const { isDark, colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Animated scroll position for real-time image cross-fading
  const scrollX = useRef(new Animated.Value(0)).current;

  // Floating badge entrance animation (matching Flutter's fadeIn + slideY)
  const badgeOpacity = useRef(new Animated.Value(1)).current;
  const badgeTranslateY = useRef(new Animated.Value(0)).current;

  // Status bar offset calculation for exact clearance
  const topInset = Math.max(
    insets.top,
    Platform.OS === 'android' ? (StatusBar.currentHeight || 36) : 44
  );

  const highlightColor = isDark ? AppColors.secondaryColor : '#059669';

  useEffect(() => {
    // Trigger floating badge entrance animation on slide change
    badgeOpacity.setValue(0);
    badgeTranslateY.setValue(10);

    Animated.parallel([
      Animated.timing(badgeOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.spring(badgeTranslateY, {
        toValue: 0,
        friction: 8,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex === ONBOARDING_DATA.length - 1) {
      navigation.replace('Login');
    } else {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }
  };

  const handleSkip = () => {
    const lastIndex = ONBOARDING_DATA.length - 1;
    flatListRef.current?.scrollToIndex({
      index: lastIndex,
      animated: true,
    });
    setCurrentIndex(lastIndex);
  };

  const currentItem = ONBOARDING_DATA[currentIndex];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* 1. TOP HALF: Hero Image with Cinematic Vignette & Cross-Fade Animation */}
      <View style={styles.topHeroContainer}>
        {/* Stacked Images with opacity and subtle scale cross-fading */}
        {ONBOARDING_DATA.map((item, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH,
            ],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });

          const scale = scrollX.interpolate({
            inputRange: [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH,
            ],
            outputRange: [1.05, 1.0, 1.05],
            extrapolate: 'clamp',
          });

          return (
            <Animated.Image
              key={item.id}
              source={item.image}
              style={[
                styles.heroImage,
                {
                  opacity,
                  transform: [{ scale }],
                },
              ]}
              resizeMode="cover"
            />
          );
        })}

        {/* Ambient Gradient Overlay matching Flutter */}
        <LinearGradient
          colors={
            isDark
              ? [
                  'rgba(0,0,0,0.50)',
                  'transparent',
                  'rgba(18,18,18,0.5)',
                  '#121212',
                ]
              : [
                  'rgba(0,0,0,0.40)',
                  'transparent',
                  'rgba(0,0,0,0.15)',
                  'rgba(0,0,0,0.45)',
                ]
          }
          stops={isDark ? [0, 0.4, 0.75, 1] : [0, 0.35, 0.7, 1]}
          style={styles.gradientOverlay}
        />

        {/* Top Bar: Logo & Frosted Skip Button */}
        <View style={[styles.topBarContainer, { paddingTop: topInset + 6 }]}>
          <View style={styles.topBar}>
            {/* GYMEZY Silhouette Logo Mark */}
            <Image
              source={require('../../assets/logo/gymezy.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />

            {/* Frosted Skip Pill Button */}
            {currentIndex !== ONBOARDING_DATA.length - 1 && (
              <TouchableOpacity
                onPress={handleSkip}
                style={styles.skipPill}
                activeOpacity={0.8}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Floating Frosted Feature Pill Badge with animated entrance */}
        <Animated.View
          style={[
            styles.floatingBadgeWrapper,
            {
              opacity: badgeOpacity,
              transform: [{ translateY: badgeTranslateY }],
            },
          ]}
        >
          <View
            style={[
              styles.floatingBadge,
              {
                backgroundColor: isDark
                  ? 'rgba(30, 30, 30, 0.92)'
                  : 'rgba(255, 255, 255, 0.92)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#E2E8F0',
              },
            ]}
          >
            <MaterialIcons
              name={currentItem.tagIcon}
              size={16}
              color={highlightColor}
            />
            <Text
              style={[
                styles.floatingBadgeText,
                { color: isDark ? '#FFFFFF' : '#0F172A' },
              ]}
            >
              {currentItem.floatingBadge}
            </Text>
          </View>
        </Animated.View>
      </View>

      {/* 2. BOTTOM HALF: Story Progress, PageView, and Actions (48% height) */}
      <View
        style={[
          styles.bottomContentContainer,
          { paddingBottom: Math.max(insets.bottom, 16) + 12 },
        ]}
      >
        {/* Story-Style Segmented Progress Bar */}
        <View style={styles.progressRow}>
          <View style={styles.segmentsWrapper}>
            {ONBOARDING_DATA.map((_, idx) => {
              const isActive = currentIndex === idx;
              return (
                <View
                  key={idx}
                  style={[
                    styles.progressBarSegment,
                    {
                      backgroundColor: isActive
                        ? AppColors.secondaryColor
                        : isDark
                        ? 'rgba(255,255,255,0.12)'
                        : '#E2E8F0',
                    },
                  ]}
                />
              );
            })}
          </View>
          <Text
            style={[
              styles.counterText,
              { color: isDark ? 'rgba(255,255,255,0.6)' : '#64748B' },
            ]}
          >
            {`0${currentIndex + 1} / 0${ONBOARDING_DATA.length}`}
          </Text>
        </View>

        {/* Swipeable Slide View with animated scroll tracking */}
        <Animated.FlatList
          ref={flatListRef}
          data={ONBOARDING_DATA}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(
              e.nativeEvent.contentOffset.x / SCREEN_WIDTH
            );
            setCurrentIndex(index);
          }}
          renderItem={({ item }) => (
            <View style={styles.slideItem}>
              <Text
                style={[
                  styles.tagText,
                  { color: isDark ? AppColors.secondaryColor : '#047857' },
                ]}
              >
                {item.tag}
              </Text>

              <Text style={styles.headlineText}>
                <Text style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
                  {item.titlePrefix}
                </Text>
                <Text style={{ color: highlightColor }}>
                  {item.titleHighlight}
                </Text>
              </Text>

              <Text
                style={[
                  styles.subtitleText,
                  { color: isDark ? 'rgba(255,255,255,0.7)' : '#475569' },
                ]}
                numberOfLines={3}
              >
                {item.subtitle}
              </Text>
            </View>
          )}
        />

        {/* Bottom CTA Action Area */}
        <View style={styles.actionRowContainer}>
          {currentIndex === ONBOARDING_DATA.length - 1 ? (
            <TouchableOpacity
              onPress={handleNext}
              style={[
                styles.fullCtaBtn,
                { backgroundColor: AppColors.secondaryColor },
              ]}
              activeOpacity={0.88}
            >
              <Text style={styles.fullCtaText}>Get Started with GYMEZY</Text>
              <MaterialIcons
                name="arrow-forward"
                size={18}
                color="#FFFFFF"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.nextRow}>
              <Text
                style={[
                  styles.swipeHint,
                  { color: isDark ? 'rgba(255,255,255,0.6)' : '#94A3B8' },
                ]}
              >
                Swipe to explore
              </Text>

              <TouchableOpacity
                onPress={handleNext}
                style={[
                  styles.nextPillBtn,
                  { backgroundColor: AppColors.primaryColor },
                ]}
                activeOpacity={0.88}
              >
                <Text style={styles.nextPillText}>Next</Text>
                <MaterialIcons
                  name="arrow-forward"
                  size={16}
                  color="#FFFFFF"
                  style={{ marginLeft: 6 }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeroContainer: {
    height: SCREEN_HEIGHT * 0.52,
    position: 'relative',
    overflow: 'hidden',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
  topBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerLogo: {
    height: 32,
    width: 32,
    tintColor: '#FFFFFF',
  },
  skipPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
    borderWidth: 0.8,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  floatingBadgeWrapper: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    zIndex: 10,
  },
  floatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  floatingBadgeText: {
    fontSize: 12.5,
    fontWeight: '700',
    marginLeft: 8,
    letterSpacing: 0.1,
  },
  bottomContentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 18,
    justifyContent: 'space-between',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  segmentsWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  progressBarSegment: {
    flex: 1,
    height: 4.5,
    borderRadius: 3,
    marginRight: 6,
  },
  counterText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginLeft: 10,
  },
  slideItem: {
    width: SCREEN_WIDTH - 48,
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  headlineText: {
    fontSize: 38,
    fontWeight: '900',
    lineHeight: 44,
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 13.5,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  actionRowContainer: {
    paddingTop: 8,
  },
  fullCtaBtn: {
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  fullCtaText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  nextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 52,
  },
  swipeHint: {
    fontSize: 13,
    fontWeight: '500',
  },
  nextPillBtn: {
    height: 48,
    paddingHorizontal: 22,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: AppColors.primaryColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  nextPillText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
