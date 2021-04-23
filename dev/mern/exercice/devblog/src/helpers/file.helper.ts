// ------ file helper -----
export const toB64 = (file: File) => new Promise((res, rej) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => res(reader.result)
  reader.onerror = err => rej(err)
})
