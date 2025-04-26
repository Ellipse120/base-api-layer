import { assert, describe, test, onTestFinished } from 'vitest'
import { setup, fetch } from '@nuxt/test-utils/e2e'
import fs from 'node:fs/promises'
import path from 'node:path'

const dirPath = 'public/uploads'

describe('Http API', () => {
  test('Upload Files', async () => {
    await setup({
      host: 'http://localhost:3000',
    })

    const formData = new FormData()
    const blob = new Blob(['Hello', 'world'], { type: 'text/plain' })
    formData.append('file', blob)
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    const responseFiles = await res.json()
    assert.hasAnyKeys(responseFiles.files[0], ['filename', 'url'], 'Should return the uploaded file info')
    onTestFinished(async () => {
      // clear temp uploaded files
      const files = await fs.readdir(dirPath)
      const deleteFilePromises = files.map(file =>
        fs.unlink(path.join(dirPath, file)),
      );

      await Promise.all(deleteFilePromises)
    })
  })
})
