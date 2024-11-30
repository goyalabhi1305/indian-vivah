import { post } from '../general/execute'

const SendFriendRequest = (body) => {
    return post(`/api/v1/user/friend-request/send`,body)
}

export { SendFriendRequest }
