import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'
import * as CurrentUser from 'services/currentUser'

const API_ROOT = 'https://conduit.productionready.io/api'

const encode = encodeURIComponent

const superagent = superagentPromise(_superagent, global.Promise)
const responseBody = (res: Response) => res.body

let token: string | null = null

const tokenPlugin = (req: any) => {
  if (token) {
    req.set('authorization', `Token ${token}`)
  }
}

const requests = {
  del: (url: string) =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  get: (url: string) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  put: (url: string, body: any) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url: string, body: any) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
}

export const Auth = {
  current: () => requests.get('/user'),
  login: (email: string, password: string): { user: CurrentUser.User } =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username: string, email: string, password: string) =>
    requests.post('/users', { user: { username, email, password } }),
  save: (user: any) => requests.put('/user', { user }),
}

export default {
  Auth,
  setToken: (_token: string) => {
    token = _token
  },
}
