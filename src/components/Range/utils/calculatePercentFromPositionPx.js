export default function calculatePercentFromPositionPx(
  sliderWidth,
  handlerWidth,
  handlerPosition
) {
  return ((handlerPosition + handlerWidth / 2) / sliderWidth) * 100;
}
