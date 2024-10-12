import axios from 'axios'

const url = '/api/user'

export const updateProfile = async (params) => {
   await axios.post(`${url}/profile`, params)
}

export const updatePassword = async (params) => {
   await axios.post(`${url}/password`, params)
}