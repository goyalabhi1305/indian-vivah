import { get, post } from '../general/execute'

const ProfileVisitors = () => {
    return get(`/api/v1/user/profile-interaction`)
}

export { ProfileVisitors }
