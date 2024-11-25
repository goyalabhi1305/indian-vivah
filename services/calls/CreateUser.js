import { post } from '../general/execute'

const CreateUser = (body) => {
    return post(`/api/v1/user/create-user`,body)
}

export { CreateUser }
