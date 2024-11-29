import { get } from '../general/execute'

const GetAllConversations = (page) => {
    return get(`/api/v1/user/conversations`)
}

export { GetAllConversations }
