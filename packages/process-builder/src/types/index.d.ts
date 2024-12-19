export type Process = {
  id: string;
  name?: string;
  schema: string;
};

declare global {
  function showSaveFilePicker({
    suggestedName,
  }: {
    suggestedName: string;
  }): Promise<FileSystemFileHandle>;
}
