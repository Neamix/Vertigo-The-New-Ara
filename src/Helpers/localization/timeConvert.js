function timeConvert(time_in_secounds) {
    const hours = Math.floor(time_in_secounds / 3600)
    const minutes = Math.floor((time_in_secounds % 3600) / 60)

    return `${hours > 10 ? hours : '0' + hours} Hours ${minutes > 10 ? minutes : '0' + minutes} Min`
}

export default timeConvert;