export const stringNormalizerLower = (arg: string | null) => {
  if (arg) {
    return arg.toLowerCase();
  }
  return null;
};
