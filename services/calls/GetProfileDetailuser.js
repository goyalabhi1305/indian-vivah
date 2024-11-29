import { get } from '../general/execute'

const GetProfileDetailUser = (id) => {
    if(id === undefined) {
        return get(`/api/v1/user/getProfileDetailuser`)
    }
    return get(`/api/v1/user/getProfileDetailuser?id=${id}`)
}

export { GetProfileDetailUser }
