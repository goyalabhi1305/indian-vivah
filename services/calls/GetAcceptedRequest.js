import { get } from '../general/execute'

const GetAcceptedRequest = (page) => {
    return get(`/api/v1/user/friend-requests/sent/accepted`)
}

export { GetAcceptedRequest }
