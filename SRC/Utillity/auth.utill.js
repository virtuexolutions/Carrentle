import localStore from "./localstoreUntil";

export const getToken = () => localStore.get_data("token");
export const setToken = (token) => localStore.store_data("token", token);

export const getUser = () => localStore.get_data("user");
export const saveUser = (user) => localStore.store_data("user", user);

export const loginKey = () => localStore.store_data("isLogin", true);
export const getLoginKey = () => localStore.get_data("isLogin");


export const introKey = () => localStore.store_data("isIntro", true);
export const getIntroKey = () => localStore.get_data("isIntro");


export const logout = async () => {
    localStore.remove_all();
    return true;
};

class Auth {
    constructor() {
        this.user = {};
    }

    async setUserFromLocal() {
        const user = await getToken();
        this.user = user ? user : {};
    }

    set setUser(user) {
        this.user = user;
    }

    set loginKey(value) {
        this.value = value;
    }

    get getUser() {
        return this.user;
    }

    async logout() {
        await logout();
        this.user = {};
    }
}

export const authClass = new Auth();
