
const getDateValues = (date?: string | Date) => {
    if (date) {
        let d = new Date(date), month = `${d.getMonth()+1}`,
            day = '' + d.getDate(),
            year = `${d.getFullYear()}`,
            hours = `${d.getUTCHours()}`,
            minutes = `${d.getUTCMinutes()}`;
        if (month.length < 2) month = `0${month}`;
        if (day.length < 2) day = `0${day}`;
        if (hours.length < 2) hours = `0${hours}`;
        if (minutes.length < 2) minutes = `0${minutes}`;

        return {
            day, month, year, hours, minutes
        }
    }
    return null;
}


export const getDateFormat = (date?: string | Date) => {
    if (date) {
        const {day, month, year} = {...getDateValues(date)};
        return [day, month, year,].join('.');
    }
    return "";
}

export const getTimeFormat = (date?: string | Date) => {
    if (date) {


        const {hours, minutes} = {...getDateValues(date)};
        return [hours, minutes, ].join(':');
    }
    return "";
}

export const getDateFormatForDatePicker = (date?: string) => {
    if (date) {
        const {year, month, day} = {...getDateValues(date)};
        return [year, month, day ].join('-');
    }
    return "";
}

// "2000-01-01T00:00:00"
export const getDateTimeFormatForDatePicker = (date?: string) => {
    if (date) {
        const {year, month, day} = {...getDateValues(date)};
        return `${[year, month, day].join('-')}T${getTimeFormat(date)}`;
    }
    return "";
}

export const getIsPassed = (date?: Date | string) => {
    const d = date ? new Date(date) : new Date();
    const now = new Date();
    return d.getTime() < now.getTime();
}

export const getNowForDB = () => {
    const {year, month, day} = {...getDateValues(new Date())};
    return [year, month, day,].join('-');
}

export const daysBetween = (date1?: Date, date2?: Date) =>  {
    // @ts-ignore
    return (date1 && date2) ? Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24)) : 0;
}