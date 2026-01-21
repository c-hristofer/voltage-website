export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const withBasePath = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${basePath}${path}`;
};
