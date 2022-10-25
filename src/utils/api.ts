import axios from 'axios'

export const axiosClient = axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/',
  responseType: 'json',
  headers: {
    'X-Auth-Token': '102a32fe00de4ec1b52d5eb16dd38043',
  },
})
