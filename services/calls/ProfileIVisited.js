import { get, post } from '../general/execute'

const ProfileIVisited = () => {
    return get(`/api/v1/user/profile-interaction/user`)
}

export { ProfileIVisited }
