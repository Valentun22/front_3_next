const baseUrl = 'http://localhost:8000';

const auth = '/auth'
const users = '/users'

const urls = {
    signboard: {
        base: `${baseUrl}/signboard`
    },
    venuesDetails: {
        venuesById: (id: string): string => `${baseUrl}/signboard/${id}`
    },
    search: {
        base: `${baseUrl}/search/signboard`
    },
    auth: {
        login:auth,
        refresh:`${auth}/refresh`,
        register:users,
        me:`${auth}/me`
    }
};
export {
    baseUrl,
    urls
};