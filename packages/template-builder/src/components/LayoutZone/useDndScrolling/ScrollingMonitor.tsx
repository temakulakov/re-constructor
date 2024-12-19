import throttle from 'lodash/throttle';
import { DndContextType } from 'react-dnd';

import { intBetween, getCoords } from './utils';
import { Options } from './types';

export class ScrollingMonitor {
  constructor(
    dragDropManager: DndContextType['dragDropManager'],
    container: HTMLElement,
    options: Options
  ) {
    this.dragDropManager = dragDropManager;
    this.container = container;
    this.options = options;
  }

  options: Options;

  attached = false;

  dragging = false;

  frame: number | null = null;

  scaleX = 0;

  scaleY = 0;

  container: HTMLElement;

  dragDropManager: DndContextType['dragDropManager'];

  clearMonitorSubscription?: () => void;

  start() {
    this.container.addEventListener('dragover', this.handleEvent);
    // touchmove events don't seem to work across siblings, so we unfortunately
    // have to attach the listeners to the body
    window.document.body.addEventListener('touchmove', this.handleEvent);

    this.clearMonitorSubscription = this.dragDropManager
      ?.getMonitor()
      .subscribeToStateChange(() => this.handleMonitorChange());
  }

  stop() {
    this.container.removeEventListener('dragover', this.handleEvent);
    window.document.body.removeEventListener('touchmove', this.handleEvent);
    this.clearMonitorSubscription?.();
    this.stopScrolling();
  }

  handleEvent = (event: TouchEvent | DragEvent) => {
    if (this.dragging && !this.attached) {
      this.attach();
      this.updateScrolling(event);
    }
  };

  handleMonitorChange() {
    const isDragging = this.dragDropManager?.getMonitor().isDragging();

    if (!this.dragging && isDragging) {
      this.dragging = true;
    } else if (this.dragging && !isDragging) {
      this.dragging = false;
      this.stopScrolling();
    }
  }

  attach() {
    this.attached = true;
    window.document.body.addEventListener('dragover', this.updateScrolling);
    window.document.body.addEventListener('touchmove', this.updateScrolling);
  }

  detach() {
    this.attached = false;
    window.document.body.removeEventListener('dragover', this.updateScrolling);
    window.document.body.removeEventListener('touchmove', this.updateScrolling);
  }

  // Update scaleX and scaleY every 100ms or so
  // and start scrolling if necessary
  updateScrolling = throttle(
    (evt) => {
      const {
        left: x,
        top: y,
        width: w,
        height: h,
      } = this.container.getBoundingClientRect();

      const box = { x, y, w, h };
      const coords = getCoords(evt);

      // calculate strength
      this.scaleX = this.options.horizontalStrength(box, coords);
      this.scaleY = this.options.verticalStrength(box, coords);

      // start scrolling if we need to
      if (!this.frame && (this.scaleX || this.scaleY)) {
        this.startScrolling();
      }
    },
    50,
    { trailing: false }
  );

  startScrolling() {
    let i = 0;
    const tick = () => {
      const { scaleX, scaleY, container } = this;
      const { strengthMultiplier, onScrollChange } = this.options;

      // stop scrolling if there's nothing to do
      if (strengthMultiplier === 0 || scaleX + scaleY === 0) {
        this.stopScrolling();
        return;
      }

      // there's a bug in safari where it seems like we can't get
      // mousemove events from a container that also emits a scroll
      // event that same frame. So we double the strengthMultiplier and only adjust
      // the scroll position at 30fps
      if (i++ % 2) {
        const {
          scrollLeft,
          scrollTop,
          scrollWidth,
          scrollHeight,
          clientWidth,
          clientHeight,
        } = container;

        const newLeft = scaleX
          ? (container.scrollLeft = intBetween(
              0,
              scrollWidth - clientWidth,
              scrollLeft + scaleX * strengthMultiplier
            ))
          : scrollLeft;

        const newTop = scaleY
          ? (container.scrollTop = intBetween(
              0,
              scrollHeight - clientHeight,
              scrollTop + scaleY * strengthMultiplier
            ))
          : scrollTop;

        onScrollChange(newLeft, newTop);
      }
      this.frame = requestAnimationFrame(tick);
    };

    tick();
  }

  stopScrolling() {
    this.detach();
    this.scaleX = 0;
    this.scaleY = 0;

    if (this.frame) {
      cancelAnimationFrame(this.frame);
      this.frame = null;
    }
  }
}
