import { api, constructApiUrl } from "./axios-config";

const getOverviews = async() => {
    try {
        const response = await api.get(constructApiUrl("/overviews"));
        console.log('response', response)
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch newsletters.");
    }
}

export { getOverviews }