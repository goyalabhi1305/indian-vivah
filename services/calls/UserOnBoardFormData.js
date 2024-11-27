import { formSubmit, post } from '../general/execute'

const UserOnBoardFormData = (body) => {
    return formSubmit(`/api/v1/user/onboard`,body)
}

export { UserOnBoardFormData }