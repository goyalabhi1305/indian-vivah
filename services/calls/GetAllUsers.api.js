import { get } from '../general/execute'

const GetAllUsers = (page) => {
    return get(`/api/v1/user/users?page=${page}`)
}

export { GetAllUsers }
