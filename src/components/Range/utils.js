import { dimensions } from './constants';

// http://learn.javascript.ru/drag-and-drop
export function getCoords(elem) {
  const box = elem.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}

const sliderWidth = dimensions.slider.width;
const handlerWidth = dimensions.handler.width;

export const calculateHandlePosition = (sliderNode, e) => {
  const pointPageX = e.targetTouches
    ? e.targetTouches.item(0).clientX
    : e.clientX;
  const pointerPositionDiff =
    pointPageX - getCoords(sliderNode).left - handlerWidth / 2;

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
};

export const calculatePercentFromPositionPx = (
  sliderWidthArg = sliderWidth,
  handlerPosition
) => ((handlerPosition + handlerWidth / 2) / sliderWidthArg) * 100;

export const calculatePositionPxFromPercent = (
  sliderWidthArg = sliderWidth,
  handlerPercent
) => (handlerPercent / 100) * sliderWidthArg - handlerWidth / 2;
