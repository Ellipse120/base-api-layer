import { H3Error } from 'h3'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)

  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'No files uploaded',
    })
  }

  // Get storage instance
  const storage = useStorage(uploadStorageSymbol)
  const uploadedFiles = []

  try {
    for (const file of formData) {
      if (file.data.length > MAX_FILE_SIZE) {
        throw createError({
          statusCode: 400,
          message: `File ${file.filename} exceeds maximum size of ${MAX_FILE_SIZE}MB`,
        })
      }

      if (!file.type || !allowedTypes.includes(file.type)) {
        throw createError({
          statusCode: 400,
          message: `File type ${file.type || '🗂️'} now allowed. Please using the following types: ${allowedTypes.join(', ')} files`,
        })
      }

      if (!file || !file.filename) {
        console.log('Skip invalid file')
        continue
      }

      const fileName = `${Date.now()}-${file.filename}`
      await storage.setItemRaw(fileName, file.data)
      uploadedFiles.push({
        filename: fileName,
        url: encodeURIComponent(`${uploadDir}/${fileName}`),
      })
    }

    return {
      files: uploadedFiles,
    }
  }
  catch (error) {
    if (error instanceof H3Error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: `Error uploading files`,
    })
  }
})
