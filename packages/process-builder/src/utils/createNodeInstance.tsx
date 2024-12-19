import { createRoot, Root } from 'react-dom/client';

export type NodeInstance = {
  render: (component: React.ReactNode) => void;
  unmount: () => void;
};

type CreateNodeInstance = (node: HTMLElement) => NodeInstance;

export const createNodeInstance: CreateNodeInstance = (node) => {
  let root: Root | null = null;
  const mountedNode = node;

  return {
    render: (component) => {
      if (!root) {
        root = createRoot(mountedNode);
      }

      root.render(component);
    },
    unmount: () => {
      if (root) {
        root.unmount();
        root = null;
      }
    },
  };
};
