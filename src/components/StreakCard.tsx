import { verticalScale } from '@/constants/scaling';
import { useTheme } from '@/context/ThemeContext';
import LottieView from 'lottie-react-native';
import { Check, Fire } from 'phosphor-react-native';
import { StyleSheet, Text, View } from 'react-native';

const DAYS = [
  { label: 'Mon', done: true },
  { label: 'Tue', done: true },
  { label: 'Wed', done: true },
  { label: 'Thu', done: true },
  { label: 'Fri', done: true },
  { label: 'Sat', done: true },
  { label: 'Sun', done: false },
];

export default function StreakCard() {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
      <View style={styles.flameBlock}>
        <View style={[styles.flameCircle, { backgroundColor: theme.flameCircle }]} />
        <Text style={[styles.flameNumber, { color: theme.flameNumber }]}>7</Text>
        <LottieView
          source={require('@/assets/lottie/Fire.json')}
          autoPlay
          loop
          style={styles.flameLottie}
        />
      </View>

      <View style={styles.rightColumn}>
        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>7 Days streak, You&apos;re on fire!</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Every day counts!</Text>
        </View>

        <View style={styles.daysRow}>
          {DAYS.map((day) => (
            <View key={day.label} style={styles.dayItem}>
              <View style={[styles.dayBadge, { backgroundColor: theme.dayBadge }]}>
                {day.done ? (
                  <View style={styles.dayCircle}>
                    <Check
                      size={verticalScale(16)}
                      color="#FFFFFF"
                      weight="bold"
                    />
                  </View>
                ) : (
                  <Fire
                    size={verticalScale(20)}
                    color="#FF9500"
                    weight="fill"
                  />
                )}
              </View>
              <Text style={[styles.dayLabel, { color: theme.textSecondary }]}>{day.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: verticalScale(160),
    alignSelf: 'stretch',
    borderRadius: verticalScale(28),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: verticalScale(20),
    paddingVertical: verticalScale(20),
    marginHorizontal: verticalScale(20),
    gap: verticalScale(16),
  },
  flameBlock: {
    position: 'relative',
    width: verticalScale(80),
    height: verticalScale(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  flameCircle: {
    position: 'absolute',
    right: -4,
    width: verticalScale(80),
    height: verticalScale(100),
    borderRadius: verticalScale(64) / 2,

    zIndex: 0,
  },
  flameNumber: {
    position: 'absolute',
    fontSize: verticalScale(72),
    fontFamily: 'ManropeBold',
    opacity: 0.5,
    zIndex: 1,
  },
  flameLottie: {
    position: 'absolute',
    bottom: verticalScale(2),
    left: verticalScale(4),
    width: verticalScale(80),
    height: verticalScale(80),
    zIndex: 2,
  },
  rightColumn: {
    flex: 1,
    gap: verticalScale(10),
  },
  textBlock: {},
  title: {
    fontFamily: 'ManropeBold',
    fontSize: verticalScale(14),
  },
  subtitle: {
    fontFamily: 'ManropeRegular',
    fontSize: verticalScale(13),
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: verticalScale(4),
  },
  dayItem: {
    alignItems: 'center',
    gap: verticalScale(4),
  },
  dayBadge: {
    width: verticalScale(22),
    height: verticalScale(22),
    borderRadius: verticalScale(32) / 2,

    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircle: {
    width: verticalScale(22),
    height: verticalScale(22),
    borderRadius: verticalScale(32) / 2,
    backgroundColor: '#2D6A2D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayLabel: {
    fontFamily: 'ManropeRegular',
    fontSize: verticalScale(11),
    textAlign: 'center',
  },
});
