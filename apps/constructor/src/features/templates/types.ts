export type Template = {
  id: string;
  createdAt?: string;
  description?: string;
  name: string;
  type: string;
};

export type Id = number | string;

export enum EditModes {
  CREATE_FILE = 'CREATE_FILE',
  CREATE_DIRECTORY = 'CREATE_DIRECTORY',
  RENAME_NODE = 'RENAME_NODE',
}

export enum NodeTypes {
  FILE = 'file',
  DIRECTORY = 'directory',
  ROOT = 'root',
}

type BaseNode = {
  parentId?: Id | null;
  id: Id;
  name: string;
};

export type File = BaseNode & {
  type: NodeTypes.FILE;
  serverId: string;
};

export type Directory = BaseNode & {
  type: NodeTypes.DIRECTORY | NodeTypes.ROOT;
  childrenIds: Id[];
};

export type Node = File | Directory;

export type NodeTree = { [key: Id]: Node };
