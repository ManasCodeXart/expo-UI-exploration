import { verticalScale } from '@/constants/scaling';
import { useTheme } from '@/context/ThemeContext';
import { useEffect } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH - 30;
const PILL_WIDTH = 140;
const PILL_HEIGHT = 36;
const CARD_HEIGHT = verticalScale(90);

type ClassBarProps = {
  visible: boolean;
};

export default function ClassBar({ visible }: ClassBarProps) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();

  const morphWidth = useSharedValue(PILL_WIDTH);
  const morphHeight = useSharedValue(PILL_HEIGHT);
  const morphRadius = useSharedValue(30);
  const contentOpacity = useSharedValue(0);
  const pillOpacity = useSharedValue(1);
  const containerOpacity = useSharedValue(0);

  const morphStyle = useAnimatedStyle(() => ({
    width: morphWidth.value,
    height: morphHeight.value,
    borderRadius: morphRadius.value,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const pillStyle = useAnimatedStyle(() => ({
    opacity: pillOpacity.value,
  }));

  useEffect(() => {
    if (!visible) {
      return;
    }

    containerOpacity.value = withTiming(1, { duration: 300 });


    morphWidth.value = withDelay(
      600,
      withSpring(CARD_WIDTH, {
        damping: 24,
        stiffness: 200,
      }),
    );
    morphHeight.value = withDelay(
      600,
      withSpring(CARD_HEIGHT, {
        damping: 24,
        stiffness: 200,
      }),
    );
    morphRadius.value = withDelay(
      600,
      withSpring(28, {
        damping: 24,
        stiffness: 200,
      }),
    );

    pillOpacity.value = withDelay(600, withTiming(0, { duration: 150 }));
    contentOpacity.value = withDelay(950, withTiming(1, { duration: 250 }));
  }, [visible, containerOpacity, contentOpacity, morphHeight, morphRadius, morphWidth, pillOpacity]);

  if (!visible) {
    return null;
  }

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.root,
        { bottom: insets.bottom + verticalScale(16) },
      ]}
    >
      <Animated.View style={containerStyle}>
        <Animated.View
          style={[
            styles.morphBase,
            {
              backgroundColor: theme.classBarBg,
              shadowColor: '#000',
              shadowOpacity: isDark ? 0 : 0.08,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 12,
              elevation: isDark ? 0 : 8,
            },
            morphStyle,
          ]}
        >
          <Animated.View style={[StyleSheet.absoluteFill, styles.pillWrap, pillStyle]}>
            <Text style={styles.pillText}>📅 6:30 PM</Text>
          </Animated.View>

          <Animated.View style={[StyleSheet.absoluteFill, styles.cardContent, contentStyle]}>
            <View style={styles.avatarCircle}>
              <Image
                source={require('@/assets/images/teacher.png')}
                style={styles.avatar}
              />
            </View>

            <View style={styles.centerCol}>
              <View style={styles.upNextRow}>
                <Text style={[styles.upNextLabel, { color: theme.textSecondary }]}>UP NEXT</Text>
                <Text style={[styles.upNextTime, { color: theme.textPrimary }]}>  6:30 PM</Text>
              </View>
              <Text style={[styles.titleLine, { color: theme.textPrimary }]}>
                <Text style={[styles.titleWhite, { color: theme.textPrimary }]}>
                  Conversation Practice{'\n'}
                </Text>
                <Text style={[styles.titleWhite, { color: theme.textPrimary }]}>with </Text>
                <Text style={styles.titleGold}>Sarah</Text>
              </Text>
            </View>

            <View style={styles.rightCol}>
              <Text style={[styles.startsIn, { color: theme.textPrimary }]}>Starts in 24 min</Text>
              <Pressable style={[styles.joinButton, { backgroundColor: theme.joinClassesButtonBg }]}>
                <Text style={[styles.joinText, { color: theme.joinClassesButtonText }]}>Join Class</Text>
              </Pressable>
            </View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 999,
  },
  morphBase: {
    borderWidth: 1,
    borderColor: '#ffffff31',

    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    gap: 8,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
  },
  avatar: {
    width: 64,
    height: 64,
  },
  centerCol: {
    flex: 1,
  },
  upNextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upNextLabel: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 10,

  },
  upNextTime: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 12,
  },
  titleLine: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
  },
  titleWhite: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
  },
  titleGold: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
    color: '#F5A623',
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: verticalScale(6),
  },
  startsIn: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 12,
  },
  joinButton: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: verticalScale(8),
  },
  joinText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 13,
  },
});
