import PropTypes from 'prop-types';
import React from 'react';
import gaugeRangeImage from './resources/gauge-range-no-numbers.png';
import pointerImage from './resources/pointer.png';
import targetImage from './resources/target.png';

/**
 * Get the different styles so they're properly positioned when overlapped.
 *
 * @returns {object} style - CSS in JS object.
 */
const getPositionStyle = () => {
  const imageSize = {
    gaugeRange: { height: 356, width: 671, tickHeight: 339 },
    target: { height: 289, width: 289 },
    pointer: { height: 29, width: 259, radius: 14.5 },
  };

  // TypeScript gonna TypeScript
  const relativePosition: 'relative' = 'relative';
  const absolutePosition: 'absolute' = 'absolute';

  const gaugeRangeStyle = {
    width: '100%',
    maxWidth: `${imageSize.gaugeRange.width}px`,
  };

  const containerPositionStyle = {
    position: relativePosition,
    ...gaugeRangeStyle,
    overflow: 'hidden',
  };

  const tickHeightDiff = imageSize.gaugeRange.height - imageSize.gaugeRange.tickHeight;
  const targetPositionStyle = {
    transformOrigin: 'center right',
    position: absolutePosition,
    width: `${(imageSize.target.width / imageSize.gaugeRange.width) * 100}%`,
    right: '50%',
    bottom: `${((tickHeightDiff - imageSize.target.height / 2) / imageSize.gaugeRange.height) * 100}%`,
  };

  const centerOfCircle = imageSize.pointer.width - imageSize.pointer.radius;
  const centerOfCirclePercent = (centerOfCircle / imageSize.pointer.width) * 100;
  const pointerPositionStyle = {
    transformOrigin: `${centerOfCirclePercent}% 50%`,
    position: absolutePosition,
    right: `${((imageSize.gaugeRange.width / 2 - imageSize.pointer.radius) / imageSize.gaugeRange.width) * 100}%`,
    bottom: `${((tickHeightDiff - imageSize.pointer.height / 2) / imageSize.gaugeRange.height) * 100}%`,
    width: `${(imageSize.pointer.width / imageSize.gaugeRange.width) * 100}%`,
  };

  return {
    containerPositionStyle,
    gaugeRangeStyle,
    targetPositionStyle,
    pointerPositionStyle,
  };
};

const GaugePropTypes = {
  /** The degree to rotate the target with. */
  targetDegree: PropTypes.number,

  /** Target visibility. */
  targetVisible: PropTypes.bool,

  /** The degree to rotate the pointer with. */
  pointerDegree: PropTypes.number,
};

type Props = PropTypes.InferProps<typeof GaugePropTypes>;

/**
 * The Gauge component displays the scoring target and pointer. Both can be rotated. The Target may be hidden.
 *
 * @returns {object} - Gauge Component
 */
const Gauge: React.FC<Props> = ({ targetDegree = 0, targetVisible = true, pointerDegree = 0 }) => {
  const { containerPositionStyle, gaugeRangeStyle, targetPositionStyle, pointerPositionStyle } = getPositionStyle();

  const containerStyle = {
    ...containerPositionStyle,
  };

  const gaugeRangeAltText = 'Semi-circle gauge ranging from 0 to 100.';

  const targetAltText = 'Five colored slice representing 2, 3, and 4 points.';
  const targetStyle = {
    transform: `rotate(${targetDegree}deg)`,
    ...targetPositionStyle,
  };

  const pointerAltText = 'Gauge pointer.';
  const pointerStyle = {
    transform: `rotate(${pointerDegree}deg)`,
    ...pointerPositionStyle,
  };

  return (
    <div style={containerStyle}>
      <img src={gaugeRangeImage} alt={gaugeRangeAltText} style={gaugeRangeStyle} />
      {targetVisible && <img src={targetImage} alt={targetAltText} style={targetStyle} />}
      <img src={pointerImage} alt={pointerAltText} style={pointerStyle} />
    </div>
  );
};

Gauge.propTypes = GaugePropTypes;

export default Gauge;
