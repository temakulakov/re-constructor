export const getComponentByType = ({
  type,
  components,
}: {
  type?: string;
  components?: Record<string, React.FC>;
}) => {
  if (type && components) {
    return components[type as keyof typeof components] ?? null;
  }

  return null;
};
