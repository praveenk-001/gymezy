import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { AppColors } from '../theme/appTheme';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const GRID_WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * MonthlyGridCalendar matches the 1:1 UI design with circular day nodes,
 * Month + Year header with dropdown chevron, navigation chevrons, and navy selected states.
 */
export const MonthlyGridCalendar = ({
  selectedDate,
  multiSelectedDates,
  onDateSelected,
  onDateToggled,
  startDate,
  minDate,
  maxMonthsAhead = 12,
  showMonthHeader = true,
  padding = 20,
  wrapInCard = true,
  style,
}) => {
  const { isDark, colors } = useTheme();
  const today = new Date();
  const effectiveMin = minDate || new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const initialMonth = selectedDate
    ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
    : startDate
    ? new Date(startDate.getFullYear(), startDate.getMonth(), 1)
    : new Date(today.getFullYear(), today.getMonth(), 1);

  const [currentMonthDate, setCurrentMonthDate] = useState(initialMonth);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxMonth = new Date(today.getFullYear(), today.getMonth() + maxMonthsAhead, 1);

  const canGoPrevious =
    currentMonthDate.getFullYear() > minMonth.getFullYear() ||
    (currentMonthDate.getFullYear() === minMonth.getFullYear() &&
      currentMonthDate.getMonth() > minMonth.getMonth());

  const canGoNext =
    currentMonthDate.getFullYear() < maxMonth.getFullYear() ||
    (currentMonthDate.getFullYear() === maxMonth.getFullYear() &&
      currentMonthDate.getMonth() < maxMonth.getMonth());

  const handlePreviousMonth = () => {
    if (canGoPrevious) {
      setCurrentMonthDate(
        new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1)
      );
    }
  };

  const handleNextMonth = () => {
    if (canGoNext) {
      setCurrentMonthDate(
        new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1)
      );
    }
  };

  // Build grid
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const totalGridCells = firstDayIndex + totalDaysInMonth;

  // Available months list for picker
  const availableMonths = [];
  let cur = new Date(minMonth);
  while (cur <= maxMonth) {
    availableMonths.push(new Date(cur));
    cur.setMonth(cur.getMonth() + 1);
  }

  const primaryNavy = isDark ? '#2563EB' : AppColors.primaryNavy || '#003882';

  const content = (
    <View style={style}>
      {showMonthHeader && (
        <View style={styles.gridHeaderRow}>
          {/* Month + Year title with Dropdown Chevron */}
          <TouchableOpacity
            onPress={() => setShowMonthPicker(true)}
            style={styles.monthSelectBtn}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.headerTitle,
                { color: isDark ? '#FFFFFF' : '#0F172A' },
              ]}
            >
              {`${MONTH_NAMES[month]} ${year}`}
            </Text>
            <Ionicons
              name="chevron-down"
              size={18}
              color={isDark ? '#94A3B8' : '#334155'}
              style={{ marginLeft: 6, marginTop: 1 }}
            />
          </TouchableOpacity>

          {/* Navigation Chevrons */}
          <View style={styles.navArrowsRow}>
            <TouchableOpacity
              onPress={handlePreviousMonth}
              disabled={!canGoPrevious}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.arrowBtn}
            >
              <Ionicons
                name="chevron-back"
                size={22}
                color={
                  canGoPrevious
                    ? isDark
                      ? '#FFFFFF'
                      : '#0F172A'
                    : isDark
                    ? '#475569'
                    : '#CBD5E1'
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNextMonth}
              disabled={!canGoNext}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={[styles.arrowBtn, { marginLeft: 16 }]}
            >
              <Ionicons
                name="chevron-forward"
                size={22}
                color={
                  canGoNext
                    ? isDark
                      ? '#FFFFFF'
                      : '#0F172A'
                    : isDark
                    ? '#475569'
                    : '#CBD5E1'
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Weekday headers: Sun, Mon, Tue, Wed, Thu, Fri, Sat */}
      <View style={styles.weekdayRow}>
        {GRID_WEEKDAYS.map((w, idx) => (
          <View key={idx} style={styles.weekdayCell}>
            <Text
              style={[
                styles.weekdayText,
                { color: isDark ? '#94A3B8' : '#5A6E85' },
              ]}
            >
              {w}
            </Text>
          </View>
        ))}
      </View>

      {/* Days Grid */}
      <View style={styles.gridContainer}>
        {Array.from({ length: totalGridCells }).map((_, index) => {
          if (index < firstDayIndex) {
            return <View key={`empty-${index}`} style={styles.gridCell} />;
          }

          const dayNumber = index - firstDayIndex + 1;
          const cellDate = new Date(year, month, dayNumber);
          const isPast =
            cellDate <
            new Date(
              effectiveMin.getFullYear(),
              effectiveMin.getMonth(),
              effectiveMin.getDate()
            );

          const isSelected = multiSelectedDates
            ? multiSelectedDates.some(
                (d) =>
                  d.getFullYear() === cellDate.getFullYear() &&
                  d.getMonth() === cellDate.getMonth() &&
                  d.getDate() === cellDate.getDate()
              )
            : selectedDate &&
              selectedDate.getFullYear() === cellDate.getFullYear() &&
              selectedDate.getMonth() === cellDate.getMonth() &&
              selectedDate.getDate() === cellDate.getDate();

          return (
            <TouchableOpacity
              key={`day-${dayNumber}`}
              disabled={isPast}
              activeOpacity={0.7}
              onPress={() => {
                if (onDateSelected) onDateSelected(cellDate);
                if (onDateToggled) onDateToggled(cellDate);
              }}
              style={styles.gridCell}
            >
              <View
                style={[
                  styles.circleNode,
                  {
                    backgroundColor: isSelected
                      ? primaryNavy
                      : isDark
                      ? '#1E293B'
                      : '#F1F5F9',
                    borderColor: isSelected
                      ? primaryNavy
                      : isDark
                      ? isPast
                        ? 'transparent'
                        : '#334155'
                      : isPast
                      ? '#E2E8F0'
                      : '#DCE5F2',
                    opacity: isPast ? 0.45 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.nodeNumber,
                    {
                      color: isSelected
                        ? '#FFFFFF'
                        : isPast
                        ? isDark
                          ? '#64748B'
                          : '#94A3B8'
                        : isDark
                        ? '#E2E8F0'
                        : '#8292A6',
                      fontWeight: isSelected ? '700' : '600',
                    },
                  ]}
                >
                  {dayNumber}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Month picker Modal */}
      <Modal visible={showMonthPicker} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowMonthPicker(false)}
        >
          <View
            style={[
              styles.monthPickerCard,
              {
                backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                borderColor: isDark ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <Text
              style={[
                styles.pickerTitle,
                { color: isDark ? '#FFFFFF' : '#0F172A' },
              ]}
            >
              Choose Month
            </Text>
            <ScrollView style={{ maxHeight: 320 }} showsVerticalScrollIndicator={false}>
              {availableMonths.map((m, idx) => {
                const isCur =
                  m.getFullYear() === currentMonthDate.getFullYear() &&
                  m.getMonth() === currentMonthDate.getMonth();

                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => {
                      setCurrentMonthDate(m);
                      setShowMonthPicker(false);
                    }}
                    style={[
                      styles.monthItem,
                      {
                        backgroundColor: isCur
                          ? isDark
                            ? '#003882'
                            : '#EFF6FF'
                          : 'transparent',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.monthItemText,
                        {
                          color: isCur
                            ? isDark
                              ? '#FFFFFF'
                              : primaryNavy
                            : isDark
                            ? '#E2E8F0'
                            : '#334155',
                          fontWeight: isCur ? '700' : '500',
                        },
                      ]}
                    >
                      {`${MONTH_NAMES[m.getMonth()]} ${m.getFullYear()}`}
                    </Text>
                    {isCur && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={isDark ? '#FFFFFF' : primaryNavy}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );

  if (wrapInCard) {
    return (
      <View
        style={[
          styles.cardWrapper,
          {
            backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
            borderColor: isDark ? '#334155' : '#E2E8F0',
            padding,
          },
        ]}
      >
        {content}
      </View>
    );
  }

  return content;
};

// Aliases for clean universal usage
export const CustomCalendar = MonthlyGridCalendar;
export default MonthlyGridCalendar;

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 24,
    borderWidth: 1,
    marginVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  gridHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  monthSelectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  navArrowsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowBtn: {
    padding: 4,
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  weekdayCell: {
    flex: 1,
    alignItems: 'center',
  },
  weekdayText: {
    fontSize: 14,
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  circleNode: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeNumber: {
    fontSize: 15,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  monthPickerCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  monthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 6,
  },
  monthItemText: {
    fontSize: 15,
  },
});
