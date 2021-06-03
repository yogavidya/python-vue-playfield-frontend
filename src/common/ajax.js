import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const getAPIUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.VUE_APP_PRODUCTION_API_URL
  }
  return process.env.VUE_APP_DEVELOPMENT_API_URL
}

const ajax = axios.create({
  baseURL: getAPIUrl()
})

export default ajax
