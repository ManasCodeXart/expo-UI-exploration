import { CircularProgress } from '@/components/CircularProgress';
import { verticalScale } from '@/constants/scaling';
import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, FadeInDown } from 'react-native-reanimated';

type SkillCard = {
  title: string;
  percent: number;
  buttonLabel: string;
  bgColor: string;
  gradientEnd: string;
  ringColor: string;
  ringBgColor: string;
};

const SKILLS: SkillCard[] = [
  {
    title: 'Grammar\nRefinement',
    percent: 23,
    buttonLabel: 'Join Class',
    bgColor: '#7B4FBF',
    gradientEnd: '#BDA7DF',
    ringColor: '#5B6FBF',
    ringBgColor: 'rgba(255,255,255,0.2)',
  },
  {
    title: 'Conversation\nprepration',
    percent: 23,
    buttonLabel: 'Join Class',
    bgColor: '#222222',
    gradientEnd: '#222222',
    ringColor: '#FFFFFF',
    ringBgColor: 'rgba(255,255,255,0.15)',
  },
  {
    title: 'Fluency\npractice',
    percent: 61,
    buttonLabel: 'Start Practice',
    bgColor: '#F5A623',
    gradientEnd: '#FAD291',
    ringColor: '#E08800',
    ringBgColor: 'rgba(255,255,255,0.25)',
  },
  {
    title: 'Vocabulary\npractice',
    percent: 38,
    buttonLabel: 'Start Practice',
    bgColor: '#4BBFBF',
    gradientEnd: '#A5DFDF',
    ringColor: '#2A9090',
    ringBgColor: 'rgba(255,255,255,0.2)',
  },
];

export default function SkillsGrid({
  onJoinClass,
  onStartPractice,
}: {
  onJoinClass?: () => void;
  onStartPractice?: () => void;
}) {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      {SKILLS.map((skill, index) => {
        const isConvoCard = index === 1;
        const cardBgColor = isConvoCard ? theme.convoCardBg : skill.bgColor;
        const cardGradientEnd = isConvoCard ? theme.convoCardBg : skill.gradientEnd;
        const ringColor = isConvoCard ? theme.convoRingColor : skill.ringColor;
        const ringBgColor = isConvoCard ? theme.convoRingBg : skill.ringBgColor;
        const titleColor = isConvoCard ? theme.convoTitleColor : '#FFFFFF';
        const buttonBg = isConvoCard ? theme.convoButtonBg : theme.skillButtonBg;
        const buttonTextColor = isConvoCard ? theme.convoButtonText : theme.skillButtonText;

        return (
          <Animated.View
            key={skill.title}
            entering={FadeInDown.duration(550)
              .delay(450 + index * 80)
              .easing(Easing.out(Easing.cubic))}
            style={{ width: '47.5%' }}
          >
            <LinearGradient
              colors={[cardBgColor, cardGradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.card, { width: '100%' }]}
            >
              <Text style={[styles.title, { color: titleColor }]}>{skill.title}</Text>
              <CircularProgress
                size={76}
                width={8}
                fill={skill.percent}
                tintColor={ringColor}
                backgroundColor={ringBgColor}
                duration={800}
              >
                <Text style={[styles.percentText, { color: titleColor }]}>
                  {skill.percent}
                  <Text style={[styles.percentSmall, { color: titleColor }]}>%</Text>
                </Text>
              </CircularProgress>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: buttonBg }]}
                activeOpacity={0.7}
                onPress={
                  skill.buttonLabel === 'Join Class'
                    ? onJoinClass
                    : skill.buttonLabel === 'Start Practice'
                      ? onStartPractice
                      : undefined
                }
              >
                <Text style={[styles.buttonText, { color: buttonTextColor }]}>{skill.buttonLabel}</Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal:20,
    marginTop: verticalScale(14),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    paddingVertical: verticalScale(16),
    borderRadius: 30,
    padding: 12,
    paddingBottom: verticalScale(12),
    gap: verticalScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'ManropeSemibold',
    fontSize: 16,
    lineHeight: 22

  },
  percentText: {
    fontFamily: 'ManropeSemibold',
    fontSize: 18,
  },
  percentSmall: {
    fontFamily: 'ManropeRegular',
    fontSize: 11,
  },
  button: {
    borderRadius: 16,
    height: verticalScale(36),
    width: verticalScale(120),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'ManropeSemibold',
    fontSize: 12,
    textAlign: 'center',
  },
});
