import { get, post } from '../general/execute'

const ShortListUser = (body) => {
    return post(`/api/v1/user/profile-interaction/shortlist`,body)
}

export { ShortListUser }
