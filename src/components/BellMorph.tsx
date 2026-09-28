import { verticalScale } from '@/constants/scaling';
import { useTheme } from '@/context/ThemeContext';
import { useMorphBox } from '@/hooks/useMorphBox';
import { useMorphSizeMap } from '@/hooks/useMorphSizeMap';
import { Bell } from 'phosphor-react-native';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { MorphContentLayer } from './MorphContentLayer';

const PANEL_KEY = 'bell-panel';
const BADGE = verticalScale(38);
const PANEL_WIDTH = 224;

type BellMorphProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function BellMorph({ open, onOpen, onClose }: BellMorphProps) {
  const { baseSize, measure, measureBase, sizes } = useMorphSizeMap();
  const { theme } = useTheme();

  const collapsedSize =
    baseSize.w > 0 && baseSize.h > 0 ? baseSize : { w: BADGE, h: BADGE };

  const { boxStyle, openProgress } = useMorphBox({
    activeKey: open ? PANEL_KEY : null,
    collapsedSize,
    mode: 'replace',
    sizes,
  });

  const radiusStyle = useAnimatedStyle(() => ({
    borderRadius: interpolate(openProgress.value, [0, 1], [BADGE / 2, 20]),
  }));

  const bellStyle = useAnimatedStyle(() => ({
    opacity: 1 - openProgress.value,
    transform: [{ scale: 1 - openProgress.value * 0.35 }],
  }));

  return (
    <View
      collapsable={false}
      style={styles.anchor}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        measureBase(Math.ceil(width), Math.ceil(height));
      }}
    >
      <Animated.View
        style={[
          styles.box,
          { backgroundColor: theme.iconWrapperBg },
          boxStyle,
          radiusStyle,
        ]}
      >
        <Animated.View
          pointerEvents={open ? 'none' : 'auto'}
          style={[StyleSheet.absoluteFill, styles.bellWrap, bellStyle]}
        >
          <Pressable
            accessibilityLabel="Notifications"
            accessibilityRole="button"
            onPress={onOpen}
            style={styles.bellHit}
          >
            <Bell
              size={verticalScale(20)}
              color={theme.iconColor}
              weight="regular"
            />
            <View style={styles.redDot} />
          </Pressable>
        </Animated.View>
        <MorphContentLayer
          active={open}
          contentKey={PANEL_KEY}
          direction={0}
          onMeasure={measure}
        >
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Text style={[styles.panelTitle, { color: theme.textPrimary }]}>
                Notifications
              </Text>
              <View style={styles.newPill}>
                <Text style={styles.newPillText}>2 new</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowEmoji}>🔥</Text>
              <Text style={[styles.rowText, { color: theme.textPrimary }]}>
                7-day streak — you&apos;re on fire!
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowEmoji}>📅</Text>
              <Text style={[styles.rowText, { color: theme.textPrimary }]}>
                Conversation Practice with Sarah · 6:30 PM
              </Text>
            </View>
            <Pressable onPress={onClose} style={styles.dismissHint}>
              <Text style={[styles.dismissHintText, { color: theme.textPrimary }]}>
                Tap outside to close
              </Text>
            </Pressable>
          </View>
        </MorphContentLayer>
      </Animated.View>
    </View>
  );
}

export default memo(BellMorph);

const styles = StyleSheet.create({
  anchor: {
    height: BADGE,
    position: 'relative',
    width: BADGE,
  },
  box: {
    alignItems: 'center',
    borderColor: '#5d5d5d38',
    borderWidth: verticalScale(1),
    justifyContent: 'center',
    minHeight: BADGE,
    minWidth: BADGE,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  bellHit: {
    alignItems: 'center',
    height: BADGE,
    justifyContent: 'center',
    position: 'relative',
    width: BADGE,
  },
  bellWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  redDot: {
    backgroundColor: '#FF3B30',
    borderRadius: verticalScale(7) / 2,
    height: verticalScale(7),
    position: 'absolute',
    right: verticalScale(8),
    top: verticalScale(8),
    width: verticalScale(7),
  },
  panel: {
    gap: verticalScale(10),
    padding: verticalScale(14),
    width: PANEL_WIDTH,
  },
  panelHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  panelTitle: {
    fontFamily: 'ManropeBold',
    fontSize: 14,
  },
  newPill: {
    backgroundColor: '#F5A623',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  newPillText: {
    color: '#1A1A1A',
    fontFamily: 'ManropeSemibold',
    fontSize: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  rowEmoji: {
    fontSize: 16,
  },
  rowText: {
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: 'ManropeRegular',
    fontSize: 12,
    lineHeight: 16,
  },
  dismissHint: {
    alignSelf: 'center',
    paddingTop: 2,
  },
  dismissHintText: {
    fontFamily: 'ManropeRegular',
    fontSize: 10,
  },
});
