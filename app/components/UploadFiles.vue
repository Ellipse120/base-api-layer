<script setup lang="ts">
// const uploadTemplateRef = useTemplateRef('uploadRef')
const { $api } = useNuxtApp()

const files = ref()
const formData = new FormData()

const handleFilesChange = (event: Event) => {
  const inputRef = event.target as HTMLInputElement
  const files = inputRef.files || []

  if (!files?.length) return

  for (let i = 0; i < files.length; i++) {
    formData.append('file', files[i]!)
  }
}

const handleUpload = async () => {
  const res = await $api('/api/upload', {
    method: 'POST',
    body: formData
  }).catch(() => {
    files.value = []
    formData.delete('file')
  })
  files.value = res?.files
}
</script>

<template>
<div>
  <div>Upload Files</div>
  <input ref="uploadRef" type="file" name="files" multiple @change="handleFilesChange($event)">

  <button @click="handleUpload">upload</button>

  <ul>
    <li v-for="(item) in files" :key="item.url">
      <NuxtLink :to="item.url" target="_blank">{{ item.filename }}</NuxtLink>
    </li>
  </ul>
</div>
</template>

<style scoped>

</style>
