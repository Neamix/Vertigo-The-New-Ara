function timeConvert(time_in_secounds) {
    const hours = Math.floor(time_in_secounds / 3600)
    const minutes = Math.floor((time_in_secounds % 3600) / 60)

    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} : ${minutes} minute${minutes > 1 ? 's' : ''}`
    } else {
        return `${minutes} minute${minutes > 1 ? 's' : ''}`
    }
}

export default timeConvert;