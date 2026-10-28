
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Path, Line } from 'react-native-svg';

type Props = {
  crossColor?: string;
  leafColor?: string;
  textColor?: string;
  size?: number;
};

export default function SkinFirtsLogo({
  crossColor = '#FFFFFF',
  leafColor = '#2860F5',
  textColor = '#FFFFFF',
  size = 120,
}: Props) {
  return (
    <View style={styles.container}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
      >
        {/* Медициналық крест */}
        <Rect
          x="43"
          y="5"
          width="34"
          height="110"
          rx="17"
          fill={crossColor}
        />

        <Rect
          x="5"
          y="43"
          width="110"
          height="34"
          rx="17"
          fill={crossColor}
        />

        {/* Жоғарғы жапырақ */}
        <Path
          d="M60 59 C43 43 52 19 66 12 C76 28 72 45 60 59 Z"
          fill={leafColor}
        />

        <Path
          d="M60 56 Q63 35 66 16"
          stroke={crossColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Сол жақ жапырақ */}
        <Path
          d="M59 60 C40 43 18 50 12 61 C26 73 44 70 59 60 Z"
          fill={leafColor}
        />

        <Path
          d="M55 60 Q35 57 16 61"
          stroke={crossColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Төменгі оң жақ жапырақ */}
        <Path
          d="M60 60 C66 76 85 83 96 72 C88 59 73 55 60 60 Z"
          fill={leafColor}
        />

        <Path
          d="M63 61 Q79 67 92 71"
          stroke={crossColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </Svg>

      {/* Бренд атауы */}
      <View style={styles.nameContainer}>
        <Text style={[styles.name, { color: textColor }]}>
          Skin
        </Text>

        <Text style={[styles.name, { color: textColor }]}>
          Firts
        </Text>
      </View>

      <Text style={[styles.subtitle, { color: textColor }]}>
        Dermatology Center
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  nameContainer: {
    alignItems: 'center',
    marginTop: 8,
  },

  name: {
    fontSize: 35,
    fontWeight: '300',
    lineHeight: 36,
    letterSpacing: -1.5,
  },

  subtitle: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 14,
  },
});
