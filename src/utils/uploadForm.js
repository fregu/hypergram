const uploadForm = (formData, url, token) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('POST', url)
    request.setRequestHeader('Authorization', `Bearer ${token}`)
    request.responseType = 'json'
    request.addEventListener('load', () => resolve(request.response))
    request.addEventListener('error', reject)

    request.send(formData)
  })
}
export default uploadForm
