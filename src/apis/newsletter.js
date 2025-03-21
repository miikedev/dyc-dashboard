import { api, constructUrl } from "./axios-config";

const getNewsletters = async() => {
    try {
        const response = await api.get(constructUrl("/newsletters"));
        return response.data.newsletters;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch newsletters.");
    }
}

const createANewsletter = async({values}) => {
    try {
        const response = await api.post(constructUrl("/newsletter"),{...values});
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch newsletter.");
    }
}

const updateNewsletter = async({id, values}) => {
    try {
        const response = await api.put(constructUrl("/newsletter/"+id),{...values});
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch newsletter.");
    }
}

const deleteNewsletter = async({id}) => {
    try {
        const response = await api.delete(constructUrl("/newsletter/"+id));
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch newsletter.");
    }
}

export { getNewsletters, createANewsletter, deleteNewsletter, updateNewsletter };