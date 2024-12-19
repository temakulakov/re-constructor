import { Element, BpmnPropertiesPanelRenderer } from 'bpmn-js';
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import { createFormIdEntries } from '../components';

const LOW_PRIORITY = 500;

type TranslateProps = (
  template: string,
  replacements?: Record<string, string>
) => string;

// Create the custom group
function createCustomGroup(element: Element, translate: TranslateProps) {
  const formIdGroup = {
    id: 'custom',
    label: translate('Custom properties'),
    // The entry is a text input field with logic attached to create,
    // update and delete the custom properties.
    entries: createFormIdEntries(element),
  };

  return formIdGroup;
}

/**
 * A provider with a `#getGroups(element)` method
 * that exposes groups for a diagram element.
 *
 * @param {PropertiesPanel} propertiesPanel
 * @param {Function} translate
 */
export function CustomPropertiesProvider(
  propertiesPanel: BpmnPropertiesPanelRenderer,
  translate: TranslateProps
) {
  /**
   * Return the groups provided for the given element.
   *
   * @param {DiagramElement} element
   *
   * @return {(Object[]) => (Object[])} groups middleware
   */
  this.getGroups = function (element: Element) {
    /**
     * We return a middleware that modifies
     * the existing groups.
     *
     * @param {Object[]} groups
     *
     * @return {Object[]} modified groups
     */
    return function (groups: ReturnType<typeof createCustomGroup>[]) {
      // Add the custom group
      if (isAny(element, ['bpmn:StartEvent', 'bpmn:UserTask'])) {
        groups.push(createCustomGroup(element, translate));
      }

      return groups;
    };
  };

  // Register our custom properties provider.
  // Use a lower priority to ensure it is loaded after
  // the basic BPMN properties.
  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

CustomPropertiesProvider.$inject = ['propertiesPanel', 'translate'];

export const customPropertiesProviderModule = {
  __init__: ['customPropertiesProvider'],
  customPropertiesProvider: ['type', CustomPropertiesProvider],
};
