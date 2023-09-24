import moment from "moment";

export const UTILS = {
    setAuthToken: (token) => {
        localStorage.setItem('token', token);
    },
    removeAuthToken: (token) => {
        localStorage.removeItem('token', token);
    },
    clearLocalStorage: () => localStorage.clear(),
    getAuthToken: () => localStorage.getItem("token"),
    getDateWithoutTimeZone: (date) => moment(date).utcOffset(0, true).format(),
}

export const REGEX = {
    IS_PHONE_NUMBER: /^\+?[1-9]\d{1,14}$/,
}