function dateHelpers(date, format) {
    if(format === 'fromDate'){
        return window.moment(date).from();
    }
    return window.moment(date).format(format);
}

export default dateHelpers;