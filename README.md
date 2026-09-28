# expo-Skillio-home

A gesture-driven, theme-aware home screen for a language-learning app — streak flame, lessons card, level progress, skill rings, and an upcoming-class bar that morphs in from a pill. Built in React Native (Expo) as a live frontend test for Skillio.

https://github.com/user-attachments/assets/fd02d4e2-648b-415c-931a-7a6f5b146df4


---

## ✨ Features

- 🔔 **Morphing notification bell** — a 38px badge smoothly resizes into a full notifications tray, driven by shared-value width/height springs and an `openProgress` fade. No remounting between states, no layout jump.
- 🔥 **Streak card** — 7-day week view with a looping fire Lottie, green check dots for completed days, and a flame icon for today. The streak number sits behind the Lottie as a typographic layer.
- 🦉 **Lessons card** — animated owl Lottie mascot sits above the CTA. Gives the screen personality without feeling childish — right for the 10–20 age group.
- 📈 **Animated progress bar** — `withTiming` fill and a spring thumb travel from 0 → 66% on mount. Level and next-level labels flank the bar.
- 🎯 **Skills grid** — 2×2 card grid with animated `CircularProgress` SVG rings and per-skill gradient backgrounds. The Conversation tile re-themes itself from `theme` tokens in light mode.
- ⏰ **Upcoming-class morph bar** — starts as a small `📅 6:30 PM` pill, then springs into a full floating class card. Sits above the safe area, always visible while scrolling.
- 🌗 **Dark / light theme with crossfade** — a Sun/Moon toggle in the header fades the entire screen out (150ms), swaps the theme, and fades back in (300ms). Every component reads from `useTheme()` — nothing is hardcoded.
- ✨ **Staggered entrance** — every section uses `FadeInDown.delay(n).springify().damping(14)` so the screen assembles itself on load rather than popping in all at once. Skill grid cards get an additional per-card stagger (`index * 80ms`).
- 👑 **Subscription tier badge** — premium membership shown as a crown icon (Phosphor) pinned above the avatar. No separate card needed — one glance is enough.

---

## 📦 Stack

[Expo SDK 57](https://expo.dev/changelog) · [React Native 0.86](https://reactnative.dev/) · [React Native Reanimated 4.5](https://docs.swmansion.com/react-native-reanimated/) · [React Native Worklets 0.10](https://docs.swmansion.com/react-native-reanimated/) · [Lottie React Native 7.3](https://github.com/lottie-react-native/lottie-react-native) · [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) · [Phosphor Icons 3.0](https://phosphoricons.com/) · [react-native-svg](https://github.com/software-mansion/react-native-svg) · Manrope via expo-font

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── _layout.tsx          # Root layout — fonts, GestureHandlerRootView, ThemeProvider
│   └── index.tsx            # Home screen — header + all scroll sections
├── components/
│   ├── BellMorph.tsx        # Notification badge → tray morph
│   ├── CircularProgress.tsx # Animated SVG ring — accepts size, width, fill, tintColor
│   ├── ClassBar.tsx         # Floating pill → upcoming class card morph
│   ├── LessonsCard.tsx      # 4/5 lessons complete + owl Lottie CTA
│   ├── MorphContentLayer.tsx
│   ├── MorphMeasureLayer.tsx
│   ├── ProgressCard.tsx     # Level progress bar + animated thumb
│   ├── SkillsGrid.tsx       # 2×2 gradient skill tiles + circular rings
│   └── StreakCard.tsx       # 7-day streak row + fire Lottie
├── constants/
│   ├── Constants.ts
│   ├── scaling.ts           # verticalScale() utility
│   ├── theme.ts             # darkTheme + lightTheme token objects
│   └── types.ts
├── context/
│   └── ThemeContext.tsx     # ThemeProvider + useTheme() hook
└── hooks/
    ├── useMorphBox.ts
    ├── useMorphContent.ts
    └── useMorphSizeMap.ts

assets/
├── fonts/                   # Manrope family (.ttf)
└── lottie/
    ├── Fire.json            # Streak flame animation
    └── owl.json             # Lessons card mascot
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/ManasCodeXart/expo-UI-exploration.git
cd expo-UI-exploration
npm install
npx expo start
```

Scan the QR code with Expo Go on your device. Tested on physical iOS and Android.

---

## 🎨 Theme System

All color tokens live in `constants/theme.ts` as two flat objects — `darkTheme` and `lightTheme`. Components consume them via `useTheme()` from `context/ThemeContext.tsx`.

```ts
const { theme, isDark, toggleTheme } = useTheme()

// Use tokens anywhere:
// theme.screenBg, theme.cardBg, theme.textPrimary, theme.textSecondary
// theme.progressTrack, theme.iconColor, theme.classBarBg ...
```

The toggle crossfades with a Reanimated `withTiming` sequence — fade out in 150ms, swap theme in context, fade back in 300ms. No flicker, no hard cut.

Dynamic tokens are applied as inline overrides on top of static StyleSheet styles:
```ts
style={[styles.title, { color: theme.textPrimary }]}
```

No styled-components, no theme libraries. StyleSheet API throughout.

---

## 🧩 Data Shape

The screen consumes this hardcoded mock (matches the brief's backend contract exactly):

```ts
const MOCK_DATA = {
  user: { name: 'ManasCodeXart', avatarUrl: null },
  subscription: { tier: 'Pro', lessonsRemaining: 4, totalLessons: 8 },
  scheduledClass: {
    time: '6:30 PM',
    teacher: 'Sarah',
    subject: 'Conversation Practice',
  },
  progress: {
    currentCefrLevel: 'B1',
    nextCefrLevel: 'B2',
    overallProgressPercent: 66,
  },
  skillsSnapshot: {
    grammar: 23,
    vocabulary: 38,
    pronunciation: 61,
    speaking: 88,
    overallImprovementPercent: 18,
    growthPercent: 12,
  },
  dailyPractice: {
    completedToday: false,
    exerciseCount: 5,
    durationMinutes: 8,
  },
  // — invented fields, see table below —
  streak: 7,
  xpToday: 120,
}
```

### Invented fields — and why

| Field | Reason |
|---|---|
| `streak` | Streaks are the single highest-retention mechanic for the 10–20 age group. Duolingo's entire daily engagement loop is built around it. Not including it felt like a miss. |
| `xpToday` | Pairs with streak to reward daily activity — "you showed up AND you did something." Two signals are stronger than one. |
| `dailyPractice.exerciseCount` | Makes the "View Results" state feel meaningful — a number is more rewarding than just a checkmark. |
| `dailyPractice.durationMinutes` | Gives the user a sense of time investment. "I spent 8 minutes on this" feels like an accomplishment, especially for a student. |

---

## 🏝️ Morph Interactions

Two components use shared-value spring morphs:

**BellMorph** — the notification badge in the header:
- Tapping the bell springs `width` and `height` from badge size → tray size using `useMorphBox`
- `openProgress` drives a simultaneous content crossfade (badge label → tray content)
- Tapping outside collapses it back — measurement state is preserved so reopening is instant

**ClassBar** — the upcoming class floating bar:
- Mounts as a 140×36px pill showing `📅 6:30 PM`
- After 600ms, `morphWidth` and `morphHeight` spring to full card dimensions (`screenWidth - 40` × 90px)
- Pill text fades out, card content fades in 250ms after morph completes
- Sits `position: absolute` above `insets.bottom + 16px` — never scrolls away

---

## 🃏 Edge Cases

| State | Handling |
|---|---|
| No class scheduled | ClassBar shows a "Book a Session →" outlined CTA instead |
| Practice completed | Card switches to a green "✅ Done for today!" state with exercise count and duration |
| No lessons remaining | Shows "No lessons left" in red with an "Upgrade →" CTA |
| No active subscription | Shows "Free plan — upgrade for more" with upgrade prompt |
| Avatar URL null | Falls back to user initials in a colored circle |
| Skill data unavailable | Rings render at 0% with a "No data yet" label |

---

## 🔤 Fonts

Uses **Manrope** (`ManropeRegular`, `ManropeMedium`, `ManropeSemibold`, `ManropeBold`) loaded in `src/app/_layout.tsx` via `expo-font`. The splash screen is held until fonts load (or error) via `expo-splash-screen`. Falls back to system font silently if `.ttf` files are missing — everything still renders, just without the intended weight contrast.

---

## 📄 License

MIT
