export const copyToClipboard = (data: unknown) =>
  navigator.clipboard.writeText(JSON.stringify(data));
