export const BodyScripts: React.FC<{ text: string }> = ({ text }) => (
  <div dangerouslySetInnerHTML={{ __html: text }} />
);
