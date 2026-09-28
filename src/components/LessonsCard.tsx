import { verticalScale } from '@/constants/scaling';
import { useTheme } from '@/context/ThemeContext';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function LessonsCard() {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
      <View style={styles.leftColumn}>
        <Text style={[styles.eyebrow, { color: theme.textSecondary }]}>
          this will only take 5 minutes
        </Text>
        <Text style={[styles.heading, { color: theme.textPrimary }]}>
          4/5 lessons{'\n'}Complete
        </Text>
      </View>
      <View style={styles.rightColumn}>
        <LottieView
          source={require('@/assets/lottie/owl.json')}
          autoPlay
          loop
          style={styles.owl}
        />
        <View style={styles.button}>
          <Text style={styles.buttonText}>Let&apos;s Complete</Text>
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
    alignItems: 'flex-end',
    paddingHorizontal: verticalScale(20),
    paddingVertical: verticalScale(20),
    marginHorizontal: verticalScale(20),
    gap: verticalScale(16),
    overflow: 'hidden',
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    gap: verticalScale(4),
    paddingLeft: verticalScale(10),
  },
  eyebrow: {
    fontFamily: 'ManropeRegular',
    fontSize: 12,
    marginBottom: verticalScale(0)
  },
  heading: {
    fontFamily: 'ManropeBold',
    fontSize: 22,
    lineHeight: 25,
  },
  rightColumn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: verticalScale(6),
    paddingRight: 5,
  },
  owl: {
    width: 84,
    height: 84,
  },
  button: {
    backgroundColor: '#6B21A8',
    borderRadius: 24,
    height: verticalScale(36),
    width: verticalScale(120),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'ManropeSemibold',
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
