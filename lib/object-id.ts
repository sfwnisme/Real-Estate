export function generateObjectId (): string {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  const suffix = 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16)).toLowerCase()
  return `${timestamp}${suffix}`;
}

export function isValidObjectId(id: string): boolean {
  return /^[a-fA-F0-9]{24}$/.test(id);
}