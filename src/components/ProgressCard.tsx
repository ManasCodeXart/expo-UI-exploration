import { verticalScale } from '@/constants/scaling';
import { useTheme } from '@/context/ThemeContext';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const PROGRESS = 0.66;

export default function ProgressCard() {
  const { theme } = useTheme();
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(PROGRESS, { duration: 800 });
  }, [width]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%`,
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    left: `${width.value * 100}%`,
    transform: [{ translateX: -8 }],
  }));

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
      <View style={styles.topRow}>
        <Text style={[styles.headline, { color: theme.textPrimary }]}>
          Finish your lessons{'\n'}and join classes
        </Text>
        <View style={styles.pill}>
          <Text style={styles.pillText}>Complete mission</Text>
        </View>
      </View>

      <View style={styles.progressLabelRow}>
        <Text style={[styles.progressLabel, { color: theme.textSecondary }]}>current progress</Text>
        <Text style={[styles.progressValue, { color: theme.textPrimary }]}>66%</Text>
      </View>

      <View style={styles.barWrap}>
        <View style={[styles.track, { backgroundColor: theme.progressTrack }]}>
          <Animated.View style={[styles.fill, fillStyle]} />
        </View>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.levelGroup}>
          <Text style={[styles.levelLabel, { color: theme.textSecondary }]}>Level </Text>
          <Text style={[styles.levelValue, { color: theme.textPrimary }]}>20</Text>
        </View>
        <View style={styles.levelGroup}>
          <Text style={[styles.levelLabel, { color: theme.textSecondary }]}>Next Level </Text>
          <Text style={[styles.levelValue, { color: theme.textPrimary }]}>21</Text>
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
    paddingHorizontal: verticalScale(20),
    paddingVertical: verticalScale(20),
    marginHorizontal: verticalScale(20),
    gap: verticalScale(8),
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headline: {
    fontFamily: 'ManropeSemibold',
    fontSize: 12,

  },
  pill: {
    backgroundColor: '#F5A623',
    borderRadius: 24,
    height: verticalScale(36),
    width: verticalScale(120),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: verticalScale(5)
  },
  pillText: {
    fontFamily: 'ManropeSemibold',
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontFamily: 'ManropeRegular',
    fontSize: 13,
  },
  progressValue: {
    fontFamily: 'ManropeBold',
    fontSize: 13,
  },
  barWrap: {
    position: 'relative',
    justifyContent: 'center',
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#F5A623',
  },
  thumb: {
    position: 'absolute',
    top: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F5A623',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelLabel: {
    fontFamily: 'ManropeRegular',
    fontSize: 15,
  },
  levelValue: {
    fontFamily: 'ManropeSemibold',
    fontSize: 18,
  },
});
