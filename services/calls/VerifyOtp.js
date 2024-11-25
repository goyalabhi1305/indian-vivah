import { post } from '../general/execute'

const VerifyOtp = (body) => {
    return post(`/api/v1/user/verifyOtp`,body)
}

export { VerifyOtp }
