type GetOffsetToParentElementProps = {
  childElement?: HTMLElement | null;
  parentElement?: HTMLElement | null;
  offsetTop?: number;
  offsetLeft?: number;
};

function getTranslate(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrixReadOnly(style.transform);

  return {
    translateX: matrix.m41,
    translateY: matrix.m42,
  };
}

/**
 * For proper offset calculation parent container should have position other then static
 */
export const getOffsetToParentElement = ({
  childElement,
  parentElement,
  offsetTop,
  offsetLeft,
}: GetOffsetToParentElementProps): {
  offsetTop: number;
  offsetLeft: number;
} => {
  let currentOffsetTop = offsetTop || 0;
  let currentOffsetLeft = offsetLeft || 0;

  if (!(childElement && parentElement)) {
    return { offsetTop: currentOffsetTop, offsetLeft: currentOffsetLeft };
  }

  const isOffsetParentFound = parentElement === childElement;
  const isExceedParentElement =
    !parentElement.contains(childElement.offsetParent) ||
    childElement === document.body;

  const { translateX, translateY } = getTranslate(childElement);
  currentOffsetLeft += translateX;
  currentOffsetTop += translateY;

  if (isOffsetParentFound || isExceedParentElement) {
    return { offsetTop: currentOffsetTop, offsetLeft: currentOffsetLeft };
  }

  return getOffsetToParentElement({
    childElement: childElement.offsetParent as HTMLElement,
    parentElement,
    offsetTop: childElement.offsetTop + currentOffsetTop,
    offsetLeft: childElement.offsetLeft + currentOffsetLeft,
  });
};
