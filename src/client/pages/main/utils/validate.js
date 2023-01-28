let exports = {}

exports.validateEmail = (email) => {
    let regex = /^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
    let test = regex.test(email.toString())
    return test
}
exports.validateName = (name) => {
    if (
        name.last == "" ||
        name.first == ""
    )
        return false
    else {
        return true
    }
}

export default exports