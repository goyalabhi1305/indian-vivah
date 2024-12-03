const errorMsg  = (error) => {
    return error.response.data.message;
}

export default errorMsg;