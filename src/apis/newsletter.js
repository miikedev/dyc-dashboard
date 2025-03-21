import { api, constructApiUrl } from "./axios-config";

const getNewsletters = async() => {
    try {
        const response = await api.get(constructApiUrl("/newsletters"));
        return response.data.newsletters;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch newsletters.");
    }
}

const createANewsletter = async({values}) => {
    try {
        const response = await api.post(constructApiUrl("/newsletter"),{...values});
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch newsletter.");
    }
}

const updateNewsletter = async({id, values}) => {
    try {
        const response = await api.put(constructApiUrl("/newsletter/"+id),{...values});
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch newsletter.");
    }
}

const deleteNewsletter = async({id}) => {
    try {
        const response = await api.delete(constructApiUrl("/newsletter/"+id));
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch newsletter.");
    }
}

export { getNewsletters, createANewsletter, deleteNewsletter, updateNewsletter };