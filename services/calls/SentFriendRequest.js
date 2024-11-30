import { get, post } from '../general/execute'

const SentFriendRequest = (body) => {
    return get(`/api/v1/user/friend-requests/sent`,body)
}

export { SentFriendRequest }
