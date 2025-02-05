const baseUrl = '';

const urls = {
    venues: {
        base: `${baseUrl}/discover/venues`
    },
    venuesDetails: {
        venuesById: (id: string): string => `${baseUrl}/venues/${id}`
    },
    search: {
        base: `${baseUrl}/search/venues`
    },
};
export {
    baseUrl,
    urls
};