import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  remove as svgRemove,
} from 'tiny-svg';
import { getRoundRectPath } from 'bpmn-js/lib/draw/BpmnRenderUtil';
import { is } from 'bpmn-js/lib/util/ModelUtil';
import Image from './assets/image.gif';

const HIGH_PRIORITY = 1500;
const TASK_BORDER_RADIUS = 2;

export default class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element) {
    // only render tasks and events (ignore labels)
    return is(element, 'bpmn:UserTask') && !element.labelTarget;
  }

  drawShape(parentNode, element) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element);

    if (is(element, 'bpmn:UserTask')) {
      svgRemove(shape);

      const imageSVG = svgCreate('image', {
        x: 0,
        y: element.height / 2,
        width: element.width,
        height: element.height,
        href: Image,
      });

      svgAppend(parentNode, imageSVG);

      return shape;
    }
  }

  getShapePath(shape) {
    if (is(shape, 'bpmn:UserTask')) {
      return getRoundRectPath(shape, TASK_BORDER_RADIUS);
    }

    return this.bpmnRenderer.getShapePath(shape);
  }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer'];

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, strokeColor) {
  const rect = svgCreate('rect');

  svgAttr(rect, {
    width,
    height,
    rx: borderRadius,
    ry: borderRadius,
    stroke: strokeColor || '#000',
    strokeWidth: 2,
    fill: '#fff',
  });

  svgAppend(parentNode, rect);

  return rect;
}

// copied from https://github.com/bpmn-io/diagram-js/blob/master/lib/core/GraphicsFactory.js
function prependTo(newNode, parentNode, siblingNode) {
  parentNode.insertBefore(newNode, siblingNode || parentNode.firstChild);
}
