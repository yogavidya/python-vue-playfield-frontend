import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const urlPattern = /^(http[s]{0,1}):\/\/([a-z0-9\-._~%]+)([:]{0,1}[0-9]{0,5})/im

const getAPIUrl = () => {
  const match = urlPattern.exec(document.baseURI)
  if (match) {
    const mode = process.env.NODE_ENV
    const host = match[2]
    console.log(`mode = ${mode}, host = ${host}`)
    let apiUrl = ''
    switch (mode) {
      case 'development':
        apiUrl = `http://${host}:${process.env.VUE_APP_API_PORT}`
        break
      case 'production':
        apiUrl = `https://${host}/${process.env.VUE_APP_API_BASE}`
        break
      default:
        console.error('API URL build failed')
        break
    }
    return apiUrl
  }
}

const ajax = axios.create({
  baseURL: getAPIUrl()
})

export default ajax
