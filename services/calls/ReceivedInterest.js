import { get, post } from '../general/execute'

const ReceviedInterest = (body) => {
    return get(`/api/v1/user/friend-requests/received`,body)
}

export { ReceviedInterest }
