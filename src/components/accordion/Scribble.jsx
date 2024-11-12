/**
 * @name Scribble
 * @description Renders a scribble SVG component.
 * @param {number} width - The width of the SVG component.
 * @param {number} height - The height of the SVG component.
 * @param {string} strokeColor - The color of the stroke.
 * @param {string} styles - The CSS class name for styling the SVG component.
 * @returns {JSX.Element} - The rendered SVG component.
 */

import Svg, { Path } from "react-native-svg";

const SvgComponent = ({ width = 80, height = 80, strokeColor = "black", styles }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 -1 20 20" className={styles}>
    <Path
      fill="none"
      fillRule="evenodd"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 10.58C7.99 2.834 12.244-.215 13.765 1.433c2.282 2.47-8.21 11.712-6.287 13.52 1.923 1.809 7.518-6.382 9.58-5.543 2.062.839-2.943 5.761-1.652 6.589.86.551 1.913.06 3.16-1.473"
    />
  </Svg>
);

export default SvgComponent;
