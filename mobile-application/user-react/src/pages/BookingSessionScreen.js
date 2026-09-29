import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { AppColors, AppTheme } from '../theme/appTheme';
import { MonthlyGridCalendar } from '../widgets/CustomCalendar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MORNING_SLOTS = ['6:00 AM', '7:00 AM', '8:00 AM'];
const EVENING_SLOTS = ['6:00 PM', '7:00 PM', '8:00 PM'];

const OTHER_CLASSES = [
  {
    name: 'HIIT',
    title: 'HIIT (High Intensity)',
    desc: 'Intense interval cardio & calorie burn',
    price: 249.0,
    defaultType: 'Standard HIIT',
    icon: 'bolt',
  },
  {
    name: 'CrossFit',
    title: 'CrossFit Training',
    desc: 'Functional strength & conditioning',
    price: 299.0,
    defaultType: 'WOD Session',
    icon: 'fitness-center',
  },
  {
    name: 'Pilates',
    title: 'Pilates Core',
    desc: 'Core strength, posture & flexibility',
    price: 249.0,
    defaultType: 'Mat Pilates',
    icon: 'self-improvement',
  },
  {
    name: 'Dance Fitness',
    title: 'Dance Fitness',
    desc: 'Fun energetic dance workout',
    price: 249.0,
    defaultType: 'BollyHop Workout',
    icon: 'music-note',
  },
  {
    name: 'Kickboxing',
    title: 'Kickboxing Cardio',
    desc: 'Strength, agility & martial arts cardio',
    price: 299.0,
    defaultType: 'Bag & Pad Work',
    icon: 'sports-mma',
  },
];

export const BookingSessionScreen = ({ route, navigation }) => {
  const { gym, initialCategory } = route.params;
  const { isDark, colors } = useTheme();

  // Navigation views: 'categories', 'gym_booking', 'weekly_plan', 'custom_dates', 'class_booking', 'other_classes'
  const [currentView, setCurrentView] = useState(
    initialCategory ? (initialCategory === 'Gym' ? 'gym_booking' : 'class_booking') : 'categories'
  );
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || null);

  // Gym Booking State
  const [gymBookingType, setGymBookingType] = useState('Per Session'); // 'Per Session', 'Weekly Plan', 'Custom Dates'
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [customSelectedDates, setCustomSelectedDates] = useState([
    new Date(),
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
  ]);

  // Class Booking State (Yoga, Zumba, HIIT, etc.)
  const [selectedClassName, setSelectedClassName] = useState('Yoga Classes');
  const [selectedClassType, setSelectedClassType] = useState('Hatha Yoga');
  const [selectedClassPrice, setSelectedClassPrice] = useState(249.0);
  const [selectedClassDate, setSelectedClassDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('7:00 AM');

  const primaryNavy = isDark ? '#93C5FD' : '#003882';
  const cardColor = isDark ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#0F172A';
  const subtitleColor = isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : '#E2E8F0';

  const selectCategory = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'Gym') {
      setCurrentView('gym_booking');
    } else if (cat === 'Yoga') {
      setSelectedClassName('Yoga Classes');
      setSelectedClassType('Hatha Yoga');
      setSelectedClassPrice(249.0);
      setCurrentView('class_booking');
    } else if (cat === 'Zumba') {
      setSelectedClassName('Zumba Classes');
      setSelectedClassType('Zumba Fitness');
      setSelectedClassPrice(249.0);
      setCurrentView('class_booking');
    } else if (cat === 'Other Classes') {
      setCurrentView('other_classes');
    }
  };

  const selectOtherClass = (name, price, defaultType) => {
    setSelectedClassName(name);
    setSelectedClassType(defaultType);
    setSelectedClassPrice(price);
    setCurrentView('class_booking');
  };

  const formatDate = (dt) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[(dt.getDay() + 6) % 7];
    return `${dayName}, ${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`;
  };

  const monthName = (m) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[m];
  };

  const goToCheckout = () => {
    let title = '';
    let datesSummary = '';
    let timeSlot = null;
    let sessions = 1;
    let subtotal = 0;

    if (currentView === 'gym_booking' && gymBookingType === 'Per Session') {
      title = 'Gym Access (Single Session)';
      datesSummary = 'Valid for today / next 24 hrs';
      sessions = 1;
      subtotal = gym.pricePerSession;
    } else if (currentView === 'weekly_plan' || (currentView === 'gym_booking' && gymBookingType === 'Weekly Plan')) {
      title = 'Weekly Unlimited Gym Pass';
      const end = new Date(selectedStartDate.getTime() + 6 * 24 * 60 * 60 * 1000);
      datesSummary = `${formatDate(selectedStartDate)} to ${formatDate(end)} (7 Days)`;
      sessions = 7;
      subtotal = 999.0;
    } else if (currentView === 'custom_dates' || (currentView === 'gym_booking' && gymBookingType === 'Custom Dates')) {
      title = 'Gym Access (Custom Dates)';
      sessions = customSelectedDates.length;
      const sortedDates = [...customSelectedDates].sort((a, b) => a.getTime() - b.getTime());
      datesSummary = sortedDates.map((d) => `${d.getDate()} ${monthName(d.getMonth())}`).join(', ');
      subtotal = gym.pricePerSession * sessions;
    } else if (currentView === 'class_booking') {
      title = `${selectedClassName} (${selectedClassType})`;
      datesSummary = formatDate(selectedClassDate);
      timeSlot = selectedTimeSlot;
      sessions = 1;
      subtotal = selectedClassPrice;
    }

    navigation.navigate('PaymentSummary', {
      type: 'booking',
      gym,
      bookingTitle: title,
      datesSummary,
      timeSlot,
      sessionsCount: sessions,
      subtotal,
      discount: 0.0,
      amount: subtotal,
    });
  };

  const getAppBarTitle = () => {
    switch (currentView) {
      case 'gym_booking':
        return 'Book Gym Session';
      case 'weekly_plan':
        return 'Weekly Plan';
      case 'custom_dates':
        return 'Custom Dates';
      case 'class_booking':
        return `Book ${selectedClassName}`;
      case 'other_classes':
        return 'Other Classes';
      default:
        return 'Book Session';
    }
  };

  const handleBackPress = () => {
    if (currentView === 'weekly_plan' || currentView === 'custom_dates') {
      setCurrentView('gym_booking');
    } else if (currentView !== 'categories') {
      setCurrentView('categories');
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* App Bar */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backBtn} activeOpacity={0.7}>
            <MaterialIcons name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>
          <Text style={[styles.appBarTitle, { color: textColor }]}>{getAppBarTitle()}</Text>
        </View>
      </SafeAreaView>

      {/* VIEW 1: CATEGORIES */}
      {currentView === 'categories' && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={[styles.chooseTitle, { color: textColor }]}>
            Choose What You Want to Book
          </Text>

          {/* 1. Gym Access */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => selectCategory('Gym')}
            style={[styles.categoryCard, { backgroundColor: cardColor, borderColor: borderColor }]}
          >
            <View style={[styles.categoryIconBox, { backgroundColor: isDark ? 'rgba(96,165,250,0.2)' : 'rgba(0,56,130,0.1)' }]}>
              <MaterialIcons name="fitness-center" size={26} color={isDark ? '#60A5FA' : '#003882'} />
            </View>
            <View style={styles.categoryContent}>
              <Text style={[styles.categoryTitle, { color: textColor }]}>Gym Access</Text>
              <Text style={[styles.categoryDesc, { color: subtitleColor }]}>
                Book gym access by session, weekly or custom dates
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={subtitleColor} />
          </TouchableOpacity>

          {/* 2. Yoga Classes */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => selectCategory('Yoga')}
            style={[styles.categoryCard, { backgroundColor: cardColor, borderColor: borderColor }]}
          >
            <View style={[styles.categoryIconBox, { backgroundColor: isDark ? 'rgba(167,139,250,0.2)' : 'rgba(124,58,237,0.12)' }]}>
              <MaterialIcons name="self-improvement" size={26} color={isDark ? '#A78BFA' : '#7C3AED'} />
            </View>
            <View style={styles.categoryContent}>
              <Text style={[styles.categoryTitle, { color: textColor }]}>Yoga Classes</Text>
              <Text style={[styles.categoryDesc, { color: subtitleColor }]}>
                Book yoga classes with certified expert trainers
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={subtitleColor} />
          </TouchableOpacity>

          {/* 3. Zumba Sessions */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => selectCategory('Zumba')}
            style={[styles.categoryCard, { backgroundColor: cardColor, borderColor: borderColor }]}
          >
            <View style={[styles.categoryIconBox, { backgroundColor: isDark ? 'rgba(244,114,182,0.2)' : 'rgba(219,39,119,0.12)' }]}>
              <MaterialIcons name="music-note" size={26} color={isDark ? '#F472B6' : '#DB2777'} />
            </View>
            <View style={styles.categoryContent}>
              <Text style={[styles.categoryTitle, { color: textColor }]}>Zumba Sessions</Text>
              <Text style={[styles.categoryDesc, { color: subtitleColor }]}>
                Book fun, high-energy dance workout sessions
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={subtitleColor} />
          </TouchableOpacity>

          {/* 4. Other Classes */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => selectCategory('Other Classes')}
            style={[styles.categoryCard, { backgroundColor: cardColor, borderColor: borderColor }]}
          >
            <View style={[styles.categoryIconBox, { backgroundColor: isDark ? 'rgba(52,211,153,0.2)' : 'rgba(0,191,98,0.12)' }]}>
              <MaterialIcons name="grid-view" size={26} color={isDark ? '#34D399' : '#00BF62'} />
            </View>
            <View style={styles.categoryContent}>
              <Text style={[styles.categoryTitle, { color: textColor }]}>Other Fitness Classes</Text>
              <Text style={[styles.categoryDesc, { color: subtitleColor }]}>
                Explore HIIT, CrossFit, Pilates, Kickboxing & more
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={subtitleColor} />
          </TouchableOpacity>

          {/* Info notice */}
          <View style={styles.infoNoticeRow}>
            <MaterialIcons name="info-outline" size={14} color={subtitleColor} style={{ marginRight: 6 }} />
            <Text style={[styles.infoNoticeText, { color: subtitleColor }]}>
              All sessions are subject to gym slot availability
            </Text>
          </View>
        </ScrollView>
      )}

      {/* VIEW 2: GYM BOOKING (Per Session / Weekly / Custom) */}
      {currentView === 'gym_booking' && (
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Gym Access Hero Banner */}
            <ImageBackground
              source={{ uri: gym.imageUrl || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop' }}
              style={styles.heroBanner}
              imageStyle={{ borderRadius: 20 }}
              resizeMode="cover"
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.82)', 'rgba(0,0,0,0.35)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.heroBannerGradient}
              >
                <Text style={styles.heroBannerTitle}>Gym Access</Text>
                <Text style={styles.heroBannerSubtitle}>
                  Train at your convenience • {gym.name}
                </Text>
              </LinearGradient>
            </ImageBackground>

            <Text style={[styles.chooseTypeHeading, { color: textColor }]}>
              Choose Booking Type
            </Text>

            {/* Option 1: Per Session */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setGymBookingType('Per Session')}
              style={[
                styles.typeOptionCard,
                {
                  backgroundColor: gymBookingType === 'Per Session'
                    ? (isDark ? '#262626' : '#F1F5F9')
                    : cardColor,
                  borderColor: gymBookingType === 'Per Session' ? (isDark ? '#60A5FA' : '#003882') : borderColor,
                  borderWidth: gymBookingType === 'Per Session' ? 1.5 : 1,
                },
              ]}
            >
              <View style={[styles.typeIconBox, { backgroundColor: isDark ? 'rgba(59,130,246,0.2)' : 'rgba(0,56,130,0.1)' }]}>
                <MaterialIcons name="calendar-today" size={22} color={isDark ? '#93C5FD' : '#003882'} />
              </View>
              <View style={styles.typeContent}>
                <Text style={[styles.typeTitle, { color: textColor }]}>Per Session</Text>
                <Text style={[styles.typeSubtitle, { color: subtitleColor }]}>Book for a single visit</Text>
                <Text style={styles.typePrice}>₹{Math.round(gym.pricePerSession)} / Session</Text>
              </View>
              <MaterialIcons
                name={gymBookingType === 'Per Session' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={20}
                color={gymBookingType === 'Per Session' ? (isDark ? '#60A5FA' : '#003882') : subtitleColor}
              />
            </TouchableOpacity>

            {/* Option 2: Weekly Plan */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                setGymBookingType('Weekly Plan');
                setCurrentView('weekly_plan');
              }}
              style={[
                styles.typeOptionCard,
                {
                  backgroundColor: gymBookingType === 'Weekly Plan'
                    ? (isDark ? '#262626' : '#F1F5F9')
                    : cardColor,
                  borderColor: gymBookingType === 'Weekly Plan' ? (isDark ? '#60A5FA' : '#003882') : borderColor,
                  borderWidth: gymBookingType === 'Weekly Plan' ? 1.5 : 1,
                },
              ]}
            >
              <View style={[styles.typeIconBox, { backgroundColor: isDark ? 'rgba(59,130,246,0.2)' : 'rgba(0,56,130,0.1)' }]}>
                <MaterialIcons name="date-range" size={22} color={isDark ? '#93C5FD' : '#003882'} />
              </View>
              <View style={styles.typeContent}>
                <Text style={[styles.typeTitle, { color: textColor }]}>Weekly Plan</Text>
                <Text style={[styles.typeSubtitle, { color: subtitleColor }]}>Unlimited access for 7 days</Text>
                <Text style={styles.typePrice}>₹999 / Week</Text>
              </View>
              <MaterialIcons
                name={gymBookingType === 'Weekly Plan' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={20}
                color={gymBookingType === 'Weekly Plan' ? (isDark ? '#60A5FA' : '#003882') : subtitleColor}
              />
            </TouchableOpacity>

            {/* Option 3: Custom Dates */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                setGymBookingType('Custom Dates');
                setCurrentView('custom_dates');
              }}
              style={[
                styles.typeOptionCard,
                {
                  backgroundColor: gymBookingType === 'Custom Dates'
                    ? (isDark ? '#262626' : '#F1F5F9')
                    : cardColor,
                  borderColor: gymBookingType === 'Custom Dates' ? (isDark ? '#60A5FA' : '#003882') : borderColor,
                  borderWidth: gymBookingType === 'Custom Dates' ? 1.5 : 1,
                },
              ]}
            >
              <View style={[styles.typeIconBox, { backgroundColor: isDark ? 'rgba(59,130,246,0.2)' : 'rgba(0,56,130,0.1)' }]}>
                <MaterialIcons name="event-note" size={22} color={isDark ? '#93C5FD' : '#003882'} />
              </View>
              <View style={styles.typeContent}>
                <Text style={[styles.typeTitle, { color: textColor }]}>Custom Dates</Text>
                <Text style={[styles.typeSubtitle, { color: subtitleColor }]}>Select multiple dates that suit you</Text>
                <Text style={styles.typePrice}>Custom Pricing</Text>
              </View>
              <MaterialIcons
                name={gymBookingType === 'Custom Dates' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={20}
                color={gymBookingType === 'Custom Dates' ? (isDark ? '#60A5FA' : '#003882') : subtitleColor}
              />
            </TouchableOpacity>
          </ScrollView>

          {/* Bottom Bar */}
          <View
            style={[
              styles.bottomBar,
              {
                backgroundColor: isDark
                  ? 'rgba(18, 18, 18, 0.88)'
                  : 'rgba(255, 255, 255, 0.88)',
                borderTopColor: isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(226, 232, 240, 0.8)',
              },
            ]}
          >
            <View>
              <Text style={[styles.bottomPriceLabel, { color: subtitleColor }]}>Price</Text>
              <Text style={[styles.bottomPriceValue, { color: textColor }]}>
                {gymBookingType === 'Per Session'
                  ? `₹${Math.round(gym.pricePerSession)}`
                  : gymBookingType === 'Weekly Plan'
                  ? '₹999'
                  : 'Custom'}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                if (gymBookingType === 'Per Session') {
                  goToCheckout();
                } else if (gymBookingType === 'Weekly Plan') {
                  setCurrentView('weekly_plan');
                } else {
                  setCurrentView('custom_dates');
                }
              }}
              style={styles.continueBtn}
            >
              <Text style={styles.continueBtnText}>
                {gymBookingType === 'Per Session' ? 'Continue to Payment' : 'Configure Plan'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* VIEW 3: WEEKLY PLAN */}
      {currentView === 'weekly_plan' && (
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Plan Banner */}
            <View style={[styles.planBanner, { backgroundColor: cardColor, borderColor: borderColor }]}>
              <View style={[styles.planIconBox, { backgroundColor: 'rgba(0,191,98,0.12)' }]}>
                <MaterialIcons name="date-range" size={24} color="#00BF62" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[styles.planBannerTitle, { color: textColor }]}>
                  Weekly Unlimited Pass
                </Text>
                <Text style={[styles.planBannerSub, { color: subtitleColor }]}>
                  7 days full gym access
                </Text>
              </View>
              <Text style={styles.planPriceText}>₹999</Text>
            </View>

            <Text style={[styles.planIncludesTitle, { color: textColor }]}>Plan Includes</Text>
            {[
              'Unlimited access for 7 consecutive days',
              'All gym equipment & workout areas',
              'Locker & shower facility access',
              'Trainer floor support during gym hours',
            ].map((inc, i) => (
              <View key={i} style={styles.inclusionRow}>
                <MaterialIcons name="check-circle" size={16} color="#00BF62" style={{ marginRight: 8 }} />
                <Text style={[styles.inclusionText, { color: textColor }]}>{inc}</Text>
              </View>
            ))}

            <View style={{ marginTop: 20 }}>
              <MonthlyGridCalendar
                selectedDate={selectedStartDate}
                minDate={new Date()}
                maxMonthsAhead={3}
                wrapInCard={true}
                showMonthHeader={true}
                onDateSelected={setSelectedStartDate}
              />
            </View>

            {/* Validity notice banner */}
            <View style={styles.validityNoticeBanner}>
              <MaterialIcons name="info-outline" size={16} color="#00BF62" style={{ marginRight: 8 }} />
              <Text style={styles.validityNoticeText}>
                Valid from {formatDate(selectedStartDate)} to{' '}
                {formatDate(new Date(selectedStartDate.getTime() + 6 * 24 * 60 * 60 * 1000))}
              </Text>
            </View>
          </ScrollView>

          {/* Bottom Bar */}
          <View
            style={[
              styles.bottomBar,
              {
                backgroundColor: isDark
                  ? 'rgba(18, 18, 18, 0.88)'
                  : 'rgba(255, 255, 255, 0.88)',
                borderTopColor: isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(226, 232, 240, 0.8)',
              },
            ]}
          >
            <View>
              <Text style={[styles.bottomPriceLabel, { color: subtitleColor }]}>Price</Text>
              <Text style={[styles.bottomPriceValue, { color: textColor }]}>₹999</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={goToCheckout}
              style={styles.continueBtn}
            >
              <Text style={styles.continueBtnText}>Continue to Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* VIEW 4: CUSTOM DATES */}
      {currentView === 'custom_dates' && (
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Top Header Card */}
            <View style={[styles.planBanner, { backgroundColor: cardColor, borderColor: borderColor }]}>
              <View style={[styles.planIconBox, { backgroundColor: 'rgba(0,56,130,0.1)' }]}>
                <MaterialIcons name="event-available" size={24} color={isDark ? '#93C5FD' : '#003882'} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[styles.planBannerTitle, { color: textColor }]}>
                  Custom Dates Booking
                </Text>
                <Text style={[styles.planBannerSub, { color: subtitleColor }]}>
                  Pick any dates that fit your routine
                </Text>
              </View>
            </View>

            <View style={styles.customDatesHeaderRow}>
              <Text style={[styles.planIncludesTitle, { color: textColor }]}>
                Select Dates ({customSelectedDates.length})
              </Text>
              {customSelectedDates.length > 0 && (
                <TouchableOpacity onPress={() => setCustomSelectedDates([])}>
                  <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Monthly grid calendar */}
            <MonthlyGridCalendar
              multiSelectedDates={customSelectedDates}
              maxMonthsAhead={3}
              onDateToggled={(date) => {
                const isSel = customSelectedDates.some(
                  (d) => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()
                );
                if (isSel) {
                  setCustomSelectedDates(
                    customSelectedDates.filter(
                      (d) => !(d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear())
                    )
                  );
                } else {
                  setCustomSelectedDates([...customSelectedDates, date]);
                }
              }}
            />

            {/* Selected Count Pill */}
            <View style={styles.selectedCountPill}>
              <Text style={styles.selectedCountText}>
                {customSelectedDates.length} Dates Selected
              </Text>
              <Text style={[styles.selectedCalcText, { color: textColor }]}>
                ₹{Math.round(gym.pricePerSession)} × {customSelectedDates.length} Sessions
              </Text>
            </View>
          </ScrollView>

          {/* Bottom Bar */}
          <View
            style={[
              styles.bottomBar,
              {
                backgroundColor: isDark
                  ? 'rgba(18, 18, 18, 0.88)'
                  : 'rgba(255, 255, 255, 0.88)',
                borderTopColor: isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(226, 232, 240, 0.8)',
              },
            ]}
          >
            <View>
              <Text style={[styles.bottomPriceLabel, { color: subtitleColor }]}>Price</Text>
              <Text style={[styles.bottomPriceValue, { color: textColor }]}>
                ₹{Math.round(gym.pricePerSession * customSelectedDates.length)}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              disabled={customSelectedDates.length === 0}
              onPress={goToCheckout}
              style={[styles.continueBtn, { opacity: customSelectedDates.length === 0 ? 0.5 : 1 }]}
            >
              <Text style={styles.continueBtnText}>Continue to Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* VIEW 5: CLASS BOOKING (Yoga / Zumba / Other) */}
      {currentView === 'class_booking' && (
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Class Hero Banner */}
            <ImageBackground
              source={{
                uri: selectedClassName.toLowerCase().includes('yoga')
                  ? 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop'
                  : selectedClassName.toLowerCase().includes('zumba')
                  ? 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop'
                  : 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
              }}
              style={styles.heroBanner}
              imageStyle={{ borderRadius: 20 }}
              resizeMode="cover"
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.82)', 'rgba(0,0,0,0.35)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.heroBannerGradient}
              >
                <Text style={styles.heroBannerTitle}>{selectedClassName}</Text>
                <Text style={styles.heroBannerSubtitle}>
                  {selectedClassName.toLowerCase().includes('yoga')
                    ? 'Mind. Body. Balance.'
                    : selectedClassName.toLowerCase().includes('zumba')
                    ? 'Dance. Sweat. Repeat.'
                    : 'Train Hard. Stay Consistent.'}
                </Text>
              </LinearGradient>
            </ImageBackground>

            <Text style={[styles.chooseTypeHeading, { color: textColor }]}>Select Class Type</Text>

            {(selectedClassName.includes('Yoga')
              ? [
                  { type: 'Hatha Yoga', price: 249.0 },
                  { type: 'Power Yoga', price: 249.0 },
                  { type: 'Yoga for Beginners', price: 249.0 },
                ]
              : selectedClassName.includes('Zumba')
              ? [
                  { type: 'Zumba Fitness', price: 249.0 },
                  { type: 'Zumba Toning', price: 249.0 },
                ]
              : [
                  { type: 'Standard Session', price: selectedClassPrice },
                  { type: 'Advanced Masterclass', price: selectedClassPrice + 50 },
                ]
            ).map((ct, idx) => {
              const isSel = selectedClassType === ct.type;
              return (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.85}
                  onPress={() => {
                    setSelectedClassType(ct.type);
                    setSelectedClassPrice(ct.price);
                  }}
                  style={[
                    styles.classTypeCard,
                    {
                      backgroundColor: isSel ? (isDark ? '#262626' : '#F1F5F9') : cardColor,
                      borderColor: isSel ? '#003882' : borderColor,
                      borderWidth: isSel ? 1.5 : 1,
                    },
                  ]}
                >
                  <Text style={[styles.classTypeName, { color: textColor }]}>{ct.type}</Text>
                  <View style={styles.classTypeRight}>
                    <Text style={styles.classTypePrice}>₹{Math.round(ct.price)} / Session</Text>
                    <MaterialIcons
                      name={isSel ? 'radio-button-checked' : 'radio-button-unchecked'}
                      size={18}
                      color={isSel ? '#003882' : subtitleColor}
                      style={{ marginLeft: 8 }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}

            <View style={{ marginTop: 18 }}>
              <MonthlyGridCalendar
                selectedDate={selectedClassDate}
                minDate={new Date()}
                maxMonthsAhead={3}
                wrapInCard={true}
                showMonthHeader={true}
                onDateSelected={setSelectedClassDate}
              />
            </View>

            <Text style={[styles.chooseTypeHeading, { color: textColor, marginTop: 20 }]}>
              Select Time Slot
            </Text>

            {/* Morning */}
            <Text style={[styles.slotCategoryLabel, { color: subtitleColor }]}>Morning</Text>
            <View style={styles.slotsRow}>
              {MORNING_SLOTS.map((slot) => {
                const isSel = selectedTimeSlot === slot;
                return (
                  <TouchableOpacity
                    key={slot}
                    activeOpacity={0.8}
                    onPress={() => setSelectedTimeSlot(slot)}
                    style={[
                      styles.slotPill,
                      {
                        backgroundColor: isSel ? '#003882' : isDark ? '#262626' : '#F1F5F9',
                        borderColor: isSel ? 'transparent' : borderColor,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.slotPillText,
                        { color: isSel ? '#FFFFFF' : textColor, fontWeight: isSel ? 'bold' : '500' },
                      ]}
                    >
                      {slot}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Evening */}
            <Text style={[styles.slotCategoryLabel, { color: subtitleColor, marginTop: 12 }]}>Evening</Text>
            <View style={styles.slotsRow}>
              {EVENING_SLOTS.map((slot) => {
                const isSel = selectedTimeSlot === slot;
                return (
                  <TouchableOpacity
                    key={slot}
                    activeOpacity={0.8}
                    onPress={() => setSelectedTimeSlot(slot)}
                    style={[
                      styles.slotPill,
                      {
                        backgroundColor: isSel ? '#003882' : isDark ? '#262626' : '#F1F5F9',
                        borderColor: isSel ? 'transparent' : borderColor,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.slotPillText,
                        { color: isSel ? '#FFFFFF' : textColor, fontWeight: isSel ? 'bold' : '500' },
                      ]}
                    >
                      {slot}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {/* Bottom Bar */}
          <View
            style={[
              styles.bottomBar,
              {
                backgroundColor: isDark
                  ? 'rgba(18, 18, 18, 0.88)'
                  : 'rgba(255, 255, 255, 0.88)',
                borderTopColor: isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(226, 232, 240, 0.8)',
              },
            ]}
          >
            <View>
              <Text style={[styles.bottomPriceLabel, { color: subtitleColor }]}>Price</Text>
              <Text style={[styles.bottomPriceValue, { color: textColor }]}>
                ₹{Math.round(selectedClassPrice)}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={goToCheckout}
              style={styles.continueBtn}
            >
              <Text style={styles.continueBtnText}>Continue to Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* VIEW 6: OTHER CLASSES DIRECTORY */}
      {currentView === 'other_classes' && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={[styles.chooseTitle, { color: textColor }]}>Explore Special Classes</Text>
          <Text style={[styles.subTitleSmall, { color: subtitleColor }]}>
            Find the perfect specialized workout class for you
          </Text>

          <View style={{ marginTop: 16 }}>
            {OTHER_CLASSES.map((c) => (
              <TouchableOpacity
                key={c.name}
                activeOpacity={0.85}
                onPress={() => selectOtherClass(c.name, c.price, c.defaultType)}
                style={[styles.otherClassCard, { backgroundColor: cardColor, borderColor: borderColor }]}
              >
                <View style={[styles.otherClassIconBox, { backgroundColor: 'rgba(0,56,130,0.08)' }]}>
                  <MaterialIcons name={c.icon} size={22} color={isDark ? '#93C5FD' : '#003882'} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[styles.categoryTitle, { color: textColor }]}>{c.title}</Text>
                  <Text style={[styles.categoryDesc, { color: subtitleColor }]}>{c.desc}</Text>
                </View>
                <Text style={styles.otherClassPrice}>₹{Math.round(c.price)}</Text>
                <MaterialIcons name="chevron-right" size={20} color={subtitleColor} style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    padding: 4,
    marginRight: 12,
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  chooseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: -0.3,
  },
  subTitleSmall: {
    fontSize: 12,
    marginTop: 4,
  },

  /* Categories */
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 14,
  },
  categoryIconBox: {
    padding: 12,
    borderRadius: 16,
  },
  categoryContent: {
    flex: 1,
    marginLeft: 14,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryDesc: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  infoNoticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  infoNoticeText: {
    fontSize: 11,
  },

  /* Hero Banner */
  heroBanner: {
    height: 115,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#0F172A',
    overflow: 'hidden',
    marginBottom: 10,
  },
  heroBannerGradient: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 20,
  },
  heroBannerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  heroBannerSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    marginTop: 4,
  },
  chooseTypeHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
  },

  /* Type Option Cards */
  typeOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
  },
  typeIconBox: {
    padding: 10,
    borderRadius: 12,
  },
  typeContent: {
    flex: 1,
    marginLeft: 12,
  },
  typeTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  typeSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  typePrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00BF62',
    marginTop: 4,
  },

  /* Weekly Plan */
  planBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  planIconBox: {
    padding: 10,
    borderRadius: 14,
  },
  planBannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  planBannerSub: {
    fontSize: 12,
    marginTop: 2,
  },
  planPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00BF62',
  },
  planIncludesTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inclusionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inclusionText: {
    fontSize: 13,
  },
  validityNoticeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,191,98,0.08)',
    padding: 12,
    borderRadius: 14,
    marginTop: 16,
  },
  validityNoticeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00BF62',
    flex: 1,
  },

  /* Custom Dates */
  customDatesHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  clearAllText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  selectedCountPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,191,98,0.08)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 16,
  },
  selectedCountText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#00BF62',
  },
  selectedCalcText: {
    fontSize: 12,
  },

  /* Class Booking */
  classTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  classTypeName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  classTypeRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classTypePrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00BF62',
  },
  slotCategoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  slotsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  slotPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  slotPillText: {
    fontSize: 12,
  },

  /* Other Classes */
  otherClassCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 12,
  },
  otherClassIconBox: {
    padding: 10,
    borderRadius: 12,
  },
  otherClassPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00BF62',
  },

  /* Bottom Bar */
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 14,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 10,
  },
  bottomPriceLabel: {
    fontSize: 11,
  },
  bottomPriceValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  continueBtn: {
    flex: 1,
    height: 48,
    backgroundColor: '#003882',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
