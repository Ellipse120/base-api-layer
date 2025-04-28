export const sizeInMB = (sizeInBytes: number, decimalsNum: number = 2) => {
  if (!sizeInBytes) return 0

  const result = sizeInBytes / (1024 * 1024)
  return +result.toFixed(decimalsNum)
}
