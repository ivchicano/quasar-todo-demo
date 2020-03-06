import axios from 'axios'
import qs from 'qs'

const axiosInstance = axios.create({
    paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    baseURL: 'http://192.168.99.100:3000'
})

export default ({ Vue }) => {
    Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
