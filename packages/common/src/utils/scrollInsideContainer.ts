import debounce from 'lodash/debounce';
import { getOffsetToParentElement } from './getOffsetToParentElement';

type ScrollToElementProps = { top: number; container: HTMLElement };

const visualOffsetGap = 20;

const scrollToElement = debounce(({ top, container }: ScrollToElementProps) => {
  container.scrollTo({
    top,
    behavior: 'smooth',
  });
}, 200);

export enum ScrollPosition {
  TOP = 'top',
  CENTER = 'center',
}

type ScrollInsideContainerProps = {
  element: HTMLElement;
  container?: HTMLElement | null;
  position?: ScrollPosition;
  force?: boolean;
};

/**
 * Both container and scrollContainer are needed because we calculate scroll
 * position according to element position inside exact container and then
 * scroll inside scroll container
 */
export const scrollInsideContainer = ({
  element,
  container,
  position = ScrollPosition.TOP,
  force = false,
}: ScrollInsideContainerProps) => {
  if (container) {
    const { offsetTop: elementOffsetTop } = getOffsetToParentElement({
      childElement: element,
      parentElement: container,
    });

    const isElementVisible =
      elementOffsetTop + element.clientHeight > container.scrollTop &&
      elementOffsetTop < container.scrollTop + container.clientHeight;

    if (isElementVisible && !force) {
      return;
    }

    const scrollOffset =
      position === ScrollPosition.TOP
        ? elementOffsetTop - visualOffsetGap
        : elementOffsetTop -
          container.clientHeight / 2 -
          visualOffsetGap +
          element.clientHeight / 2;

    if (scrollOffset) {
      scrollToElement({ top: scrollOffset, container });
    }
  }
};
