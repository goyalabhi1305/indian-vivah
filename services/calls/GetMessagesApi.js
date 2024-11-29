import { get } from '../general/execute'

const GetMessages = (id) => {
    return get(`api/v1/user/chat/messages?receiverId=${id}`)
}

export { GetMessages }
