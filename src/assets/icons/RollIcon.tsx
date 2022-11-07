import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

export const RollIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 506 506"
    width={24}
    height={24}
    {...props}
  >
    <Circle
      fill={"#90dfaa"}
      cx={253}
      cy={253}
      r={253}
    />
    <Path
      fill={"#324a5e"}
      d="M96.2 94.9h313.7v230.6H96.2z"
    />
    <Path
      fill={"#e6e9ee"}
      d="M125.1 120H381v180.3H125.1z"
    />
    <Path
      fill={"#f1543f"}
      d="M253 157.1c-29.3 0-53.1 23.8-53.1 53.1s23.8 53.1 53.1 53.1 53.1-23.8 53.1-53.1-23.8-53.1-53.1-53.1z"
    />
    <Path
      fill={"#fff"}
      d="M235.7 176.7v67.7l49.5-33.8z"
    />
    <Path
      fill={"#e6e9ee"}
      d="M96.2 370.6h313.7v34H96.2z"
    />
    <Path
      fill={"#ff7058"}
      d="M96.2 370.6H221v34H96.2z"
    />
    <Circle
      fill={"#324a5e"}
      cx={135.2}
      cy={387.6}
      r={23.5}
    />
  </Svg>
)

