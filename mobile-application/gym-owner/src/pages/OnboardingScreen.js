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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme/ThemeContext';
import { AppColors } from '../theme/appTheme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    id: '1',
    tag: 'PARTNER NETWORK',
    tagIcon: 'verified',
    titlePrefix: 'Scale Your Fitness\n',
    titleHighlight: 'Business.',
    subtitle:
      'Effortlessly manage member subscriptions, daily check-ins, personal trainer schedules, and multiple branch operations from one unified portal.',
    image: require('../../assets/pages/onboarding/onboarding_1.jpg'),
    floatingBadge: '100+ Partner Gyms Active',
  },
  {
    id: '2',
    tag: 'ACCESS AUTOMATION',
    tagIcon: 'qr-code-scanner',
    titlePrefix: 'Instant QR Entry &\n',
    titleHighlight: 'Capacity.',
    subtitle:
      'Validate member entry in milliseconds with digital QR check-in scanning, manage live workout zone capacity, and ensure seamless gym access.',
    image: require('../../assets/pages/onboarding/onboarding_2.jpg'),
    floatingBadge: 'High-Speed QR Scanning',
  },
  {
    id: '3',
    tag: 'REVENUE & INSIGHTS',
    tagIcon: 'insights',
    titlePrefix: 'Real-Time Financial\n',
    titleHighlight: 'Intelligence.',
    subtitle:
      'Track daily revenue, recurring plan renewals, trainer payout splits, and member retention rates with real-time actionable visual analytics.',
    image: require('../../assets/pages/onboarding/onboarding_3.jpg'),
    floatingBadge: 'Real-Time Financial Reports',
  },
];

export const OnboardingScreen = ({ navigation }) => {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const scrollX = useRef(new Animated.Value(0)).current;
  const badgeOpacity = useRef(new Animated.Value(1)).current;
  const badgeTranslateY = useRef(new Animated.Value(0)).current;

  const topInset = Math.max(
    insets.top,
    Platform.OS === 'android' ? (StatusBar.currentHeight || 36) : 44
  );

  const highlightColor = isDark ? AppColors.secondaryColor : '#059669';

  useEffect(() => {
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
  }, [currentIndex, badgeOpacity, badgeTranslateY]);

  const handleNext = () => {
    if (currentIndex === ONBOARDING_DATA.length - 1) {
      navigation.replace('Login');
    } else {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const currentItem = ONBOARDING_DATA[currentIndex];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? AppColors.darkBackground : '#FFFFFF' },
      ]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* TOP HALF: Hero Image with Cinematic Vignette & Cross-Fade Animation */}
      <View style={styles.topHeroContainer}>
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
            outputRange: [1.08, 1.0, 1.08],
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
          style={styles.gradientOverlay}
        />

        {/* Top Bar: Logo & Skip Button */}
        <View style={[styles.topBarContainer, { paddingTop: topInset + 6 }]}>
          <View style={styles.topBar}>
            <Image
              source={require('../../assets/logo/gymezy.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />

            {currentIndex !== ONBOARDING_DATA.length - 1 ? (
              <TouchableOpacity
                onPress={handleSkip}
                style={styles.skipPill}
                activeOpacity={0.8}
              >
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.emptySpacer} />
            )}
          </View>
        </View>

        {/* Floating Feature Badge */}
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
                  ? 'rgba(30, 30, 30, 0.94)'
                  : 'rgba(255, 255, 255, 0.94)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#E2E8F0',
              },
            ]}
          >
            <Icon
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

      {/* BOTTOM HALF: Progress, Content, and Actions */}
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
                        ? 'rgba(255,255,255,0.14)'
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

        {/* Swipeable Slide View */}
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

        {/* Bottom Action Area */}
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
              <Text style={styles.fullCtaText}>Sign In to Partner Portal</Text>
              <Icon
                name="arrow-forward"
                size={18}
                color="#FFFFFF"
                style={styles.iconMargin}
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
                <Icon
                  name="arrow-forward"
                  size={16}
                  color="#FFFFFF"
                  style={styles.iconMargin}
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
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderWidth: 0.8,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  emptySpacer: {
    width: 50,
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
    paddingTop: 18,
    justifyContent: 'space-between',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 24,
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
    width: SCREEN_WIDTH,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  headlineText: {
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 13.5,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  actionRowContainer: {
    paddingHorizontal: 24,
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
  iconMargin: {
    marginLeft: 6,
  },
});
