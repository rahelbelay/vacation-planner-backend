function dateToFormattedString(dateObject) {
    const year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = dateObject.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    const dateString = `${year}-${month}-${day}`;
    return dateString;
}

module.exports = {
    dateToFormattedString
};
