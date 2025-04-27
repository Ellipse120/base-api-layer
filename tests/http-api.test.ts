import { assert, describe, test, onTestFinished } from 'vitest'
import { setup, fetch, $fetch } from '@nuxt/test-utils/e2e'
import fs from 'node:fs/promises'
import path from 'node:path'

const dirPath = 'public/uploads'

async function deleteAllFiles (dir: string) {
  // clear temp uploaded files
  const files = await fs.readdir(dir)
  const deleteFilePromises = files.map(file =>
    fs.unlink(path.join(dir, file)),
  )

  await Promise.all(deleteFilePromises)
}

describe('Http API', async () => {
  await setup({
    host: 'http://localhost:3000',
  })

  test('Local Nuxt Server Is Running', async () => {
    const html: string = await $fetch('/')
    assert.include(html, 'Upload Files', '🌈 Dev Server Is Running')
  })

  test('Upload Files API', async () => {
    const formData = new FormData()
    const blob = new Blob(['Hello', 'world'], { type: 'text/plain' })
    formData.append('file', blob)
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    const responseFiles = await res.json()
    assert.isArray(responseFiles.files, 'Doesn\'t Response Files Info')
    assert.hasAnyKeys(responseFiles.files[0], ['filename', 'url'], 'Should return the uploaded file info')
    onTestFinished(async () => {
      await deleteAllFiles(dirPath)
    })
  })
})
