export const UTILS = {
    setAuthToken: (token) => {
        localStorage.setItem('token', token);
    },
    removeAuthToken: (token) => {
        localStorage.removeItem('token', token);
    },
    getAuthToken: () => localStorage.getItem("token"),
}