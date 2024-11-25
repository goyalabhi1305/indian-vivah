import { get } from '../general/execute'

const GetOnBoardingSheet = (body) => {
    return get(`/api/v1/user/getOnboardindSheet`)
}

export { GetOnBoardingSheet }
