export const UTILS = {
    setAuthToken: (token) => {
        localStorage.setItem('token', token);
    },
    removeAuthToken: (token) => {
        localStorage.removeItem('token', token);
    },
    getAuthToken: () => localStorage.getItem("token"),
}

export const REGEX = {
    IS_PHONE_NUMBER: /^\+?[1-9]\d{1,14}$/,
}