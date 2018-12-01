export default function calculatePositionPxFromPercent(
  sliderWidth,
  handlerWidth,
  handlerPercent
) {
  return (handlerPercent / 100) * sliderWidth - handlerWidth / 2;
}
