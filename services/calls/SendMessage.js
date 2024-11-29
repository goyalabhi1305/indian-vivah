import { post } from '../general/execute'

const SendMessage = (body) => {
    return post(`/api/v1/user/chat/send`,body)
}

export { SendMessage }
