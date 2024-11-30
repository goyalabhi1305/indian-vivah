import { get, post } from '../general/execute'

const IShortListedAPI = () => {
    return get(`/api/v1/user/profile-interaction/viewshortlist/user`)
}

export { IShortListedAPI }
