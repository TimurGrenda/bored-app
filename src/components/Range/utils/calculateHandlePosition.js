export default function calculateHandlePosition(
  sliderCoords,
  sliderWidth,
  handlerWidth,
  e
) {
  const pointPageX = e.targetTouches
    ? e.targetTouches.item(0).clientX
    : e.clientX;
  const pointerPositionDiff = pointPageX - sliderCoords.left - handlerWidth / 2;

  const maxHandlerPosition = sliderWidth - handlerWidth / 2;
  const minHandlerPosition = -(handlerWidth / 2);

  let handlePosition;
  if (pointerPositionDiff < minHandlerPosition) {
    handlePosition = minHandlerPosition;
  } else if (pointerPositionDiff > maxHandlerPosition) {
    handlePosition = maxHandlerPosition;
  } else {
    handlePosition = pointerPositionDiff;
  }
  return handlePosition;
}
