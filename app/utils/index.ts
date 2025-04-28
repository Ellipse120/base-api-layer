export const downloadFile = (res: Blob, fileName: string = '') => {
  const blob = new Blob([res], { type: 'application/octet-stream' })
  const el = document.createElement('a')
  el.download = fileName
  el.style.display = 'none'
  el.href = URL.createObjectURL(blob)
  document.body.appendChild(el)
  el.click()
  URL.revokeObjectURL(el.href)
  document.body.removeChild(el)
}
