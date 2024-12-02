import { post } from '../general/execute'

const AcceptFriendRequest = (body) => {
    return post(`/api/v1/user/friend-request/respond`,body)
}

export { AcceptFriendRequest }
