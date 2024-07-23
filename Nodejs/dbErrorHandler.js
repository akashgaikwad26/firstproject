

async function ErrorHandler(error) {
    let message = ''
    let code = ''
    console.log(error)

    if (error == 'ENOTFOUND') {
        message = 'Please check your internet connection'
        code = 408
    }
    else if (error == 42601) {
        message = 'invalid details'
        code = 406
    } else if (error == 'ECONNRESET') {

        message = 'Network connection timeout error'
        code = 599
    }
    else if (error == 53300) {
        message = 'Oops! something went wrong'
        code = 503
    }

    else {

        message = 'Oops! something went wrong'
        code = 500
    }
    return {
        message: message,
        status: code,
        err: error,
    }
}
module.exports = {
    ErrorHandler: ErrorHandler,
}