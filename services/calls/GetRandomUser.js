import { get, post } from '../general/execute'

const GetRandomUser = () => {
    return get(`/api/v1/user/getRendomUser`)
}

export { GetRandomUser }
