import jwtDecode from "jwt-decode";

const logout = () => {
    window.localStorage.removeItem('authToken')
}

const setup = () => {
    const token = window.localStorage.getItem('authToken');
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if (expiration * 1000 < new Date().getTime()) {
            logout()
        }
    } else {
        logout()
    }
}

const isAuthenticated = () => {
    const token = window.localStorage.getItem('authToken');
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if (expiration * 1000 < new Date().getTime()) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

export default {
    setup,
    logout,
    isAuthenticated,
};
