import BellMorph from '@/components/BellMorph';
import ClassBar from '@/components/ClassBar';
import LessonsCard from '@/components/LessonsCard';
import ProgressCard from '@/components/ProgressCard';
import SkillsGrid from '@/components/SkillsGrid';
import StreakCard from '@/components/StreakCard';
import { verticalScale } from '@/constants/scaling';
import { useTheme } from '@/context/ThemeContext';
import { Crown, Moon, Star, Sun } from 'phosphor-react-native';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const [showBar, setShowBar] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const { theme, isDark, toggleTheme } = useTheme();
  const fadeAnim = useSharedValue(1);

  const handleToggle = () => {
    fadeAnim.value = withTiming(0, { duration: 150 });
    setTimeout(() => {
      toggleTheme();
      fadeAnim.value = withTiming(1, { duration: 300 });
    }, 150);
  };

  const screenFadeStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  return (
    <View style={[styles.root, { backgroundColor: theme.screenBg }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerRow}>
          <View style={styles.leftGroup}>
            <View style={styles.avatarWrap}>
              <Image
                source={require('@/assets/images/avatar.png')}
                style={styles.avatar}
              />
              <View style={styles.crownBadge}>
                <Crown
                  size={verticalScale(14)}
                  color="#FFD700"
                  weight="fill"
                />
              </View>
            </View>

            <View style={styles.textBlock}>
              <Text style={[styles.userName, { color: theme.textPrimary }]}>ManasCodeXart</Text>
              <Text style={styles.levelRow}>
                <Text style={[styles.levelGray, { color: theme.textSecondary }]}>Lvl. </Text>
                <Text style={styles.levelGold}>20. </Text>
                <Text style={[styles.levelGray, { color: theme.textSecondary }]}>Explorer</Text>
              </Text>
              <View style={styles.starsRow}>
                <Star size={verticalScale(15)} color="#FFD700" weight="fill" />
                <Star size={verticalScale(15)} color="#FFD700" weight="fill" />
                <Star size={verticalScale(15)} color="#FFD700" weight="fill" />
              </View>
            </View>
          </View>

          <View style={styles.rightGroup}>
            <BellMorph
              open={bellOpen}
              onOpen={() => setBellOpen(true)}
              onClose={() => setBellOpen(false)}
            />
            <Pressable
              accessibilityLabel="Toggle theme"
              accessibilityRole="button"
              onPress={handleToggle}
              style={[styles.iconBadge, { backgroundColor: theme.iconWrapperBg }]}
            >
              {isDark ? (
                <Sun size={22} color={theme.iconColor} weight="fill" />
              ) : (
                <Moon size={22} color={theme.iconColor} weight="fill" />
              )}
            </Pressable>
          </View>
        </View>

        {bellOpen && (
          <Pressable
            accessibilityLabel="Close notifications"
            onPress={() => setBellOpen(false)}
            style={styles.dismiss}
          />
        )}

        <Animated.View style={[{ flex: 1 }, screenFadeStyle]}>
          <ScrollView
            style={styles.scrollView}
            scrollEnabled={!bellOpen}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.streakWrap}>
              <Animated.View
                entering={FadeInDown.duration(550)
                  .delay(150)
                  .easing(Easing.out(Easing.cubic))}
              >
                <StreakCard />
              </Animated.View>
            </View>
            <View style={styles.lessonsWrap}>
              <Animated.View
                entering={FadeInDown.duration(550)
                  .delay(250)
                  .easing(Easing.out(Easing.cubic))}
              >
                <LessonsCard />
              </Animated.View>
            </View>
            <View style={styles.progressWrap}>
              <Animated.View
                entering={FadeInDown.duration(550)
                  .delay(350)
                  .easing(Easing.out(Easing.cubic))}
              >
                <ProgressCard />
              </Animated.View>
            </View>
            <SkillsGrid
              onJoinClass={() => setShowBar(true)}
              onStartPractice={() => setShowBar(false)}
            />
          </ScrollView>
          <ClassBar visible={showBar} />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: verticalScale(20),
    paddingTop: verticalScale(14),
    paddingBottom: verticalScale(10),
    zIndex: 2,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: verticalScale(12),
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: verticalScale(75),
    height: verticalScale(86),
  },
  crownBadge: {
    position: 'absolute',
    top: verticalScale(-4),
    right: verticalScale(-8),
    width: verticalScale(26),
    height: verticalScale(26),
    borderRadius: verticalScale(26) / 2,
    backgroundColor: '#141414',
    borderWidth: verticalScale(1),
    borderColor: '#5d5d5db0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBlock: {},
  userName: {
    fontFamily: 'ManropeBold',
    fontSize: verticalScale(14),
  },
  levelRow: {
    fontSize: verticalScale(12),
    fontFamily: 'ManropeRegular',
  },
  levelGray: {
    fontFamily: 'ManropeRegular',
    fontSize: verticalScale(12),
  },
  levelGold: {
    fontFamily: 'ManropeBold',
    fontSize: verticalScale(14),
    color: '#FFD700',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: verticalScale(3),
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: verticalScale(10),
  },
  iconBadge: {
    position: 'relative',
    width: verticalScale(38),
    height: verticalScale(38),
    borderRadius: verticalScale(38) / 2,
    borderWidth: verticalScale(1),
    borderColor: '#5d5d5d38',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismiss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  streakWrap: {
    marginTop: verticalScale(16),
  },
  lessonsWrap: {
    marginTop: verticalScale(14),
  },
  progressWrap: {
    marginTop: verticalScale(14),
  },
  scrollContent: {
    paddingBottom: verticalScale(40),
  },
  scrollView: {
    flex: 1,
  },
});
