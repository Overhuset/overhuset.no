export const getDateFormat = (date?: string) => {
    if (date) {
        let d = new Date(date), month = `${d.getMonth() + 1}`, day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2) month = `0${month}`;
        if (day.length < 2) day = `0${day}`;
        return [day, month, year, ].join('.');
    }
    return "";
}

export const getTimeFormat = (date?: string) => {
    if (date) {
        let d = new Date(date), hours = `${d.getHours() + 1}`, minutes = '' + d.getMinutes();
        if (hours.length < 2) hours = `0${hours}`;
        if (minutes.length < 2) minutes = `0${minutes}`;
        return [hours, minutes, ].join(':');
    }
    return "";
}

export const getDateFormatDatePicker = (date?: string) => {
    if (date) {
        let d = new Date(date), month = `${d.getMonth() + 1}`, day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2) month = `0${month}`;
        if (day.length < 2) day = `0${day}`;
        return [year, month, day ].join('-');
    }
    return "";
}

export const getIsPassed = (date?: Date) => {
    const d = date ? new Date(date) : new Date();
    const now = new Date();
    return d.getTime() < now.getTime();
}