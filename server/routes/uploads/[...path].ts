export default defineEventHandler(async (event) => {
  const storage = useStorage(uploadStorageSymbol)
  const path = getRouterParam(event, 'path')

  // Could restrict access to the file based on
  // the user, file type, or any other criteria,
  // this implementation makes the file public

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Path is needed',
    })
  }

  console.log(decodeURIComponent(path))
  return await storage.getItemRaw(decodeURIComponent(path))
})
