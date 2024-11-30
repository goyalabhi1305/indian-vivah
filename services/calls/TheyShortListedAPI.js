import { get, post } from '../general/execute'

const TheyShortListedAPI = () => {
    return get(`/api/v1/user/profile-interaction/viewshortlist`)
}

export { TheyShortListedAPI }
