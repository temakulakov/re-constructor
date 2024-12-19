const formatPrefixToDatasetKey = (prefix: string) =>
  prefix.replace(/-(\w)/, (_, match) => match.toUpperCase());

export const getPropertyRecursive = (
  prefix: string,
  element: HTMLElement | null
): { value: string | null; element: HTMLElement | null } => {
  const dataSetPrefix = formatPrefixToDatasetKey(prefix);
  const dataProperty = element?.dataset[dataSetPrefix];

  if (dataProperty !== undefined) {
    return { value: dataProperty, element };
  }

  if (!element?.parentElement) {
    return { value: null, element: null };
  }

  const parentElement = element.closest<HTMLElement>(`[data-${prefix}]`);
  const parentProperty = parentElement?.dataset[dataSetPrefix];

  return parentProperty
    ? { value: parentProperty, element: parentElement }
    : {
        value: null,
        element: null,
      };
};
