import { post } from '../general/execute'

const ApplyFilter = (body) => {
    return post(`/api/v1/user/filter`,body)
}

export { ApplyFilter }
