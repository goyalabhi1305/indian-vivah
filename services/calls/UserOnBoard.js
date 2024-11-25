import { post } from '../general/execute'

const UserOnBoard = (body) => {
    return post(`/api/v1/user/onboard`,body)
}

export { UserOnBoard }
