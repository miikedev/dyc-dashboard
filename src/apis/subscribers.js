import { api, constructApiUrl } from "./axios-config";

const getSubscribers = async() => {
    try {
        const response = await api.get(constructApiUrl("/subscribers"));
        return response.data.subscribers;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch subscribers.");
    }
}

const createASubscriber = async({values}) => {
    try {
        const response = await api.post(constructApiUrl("/subscribers"),{...values});
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch subscribers.");
    }
}

const updateSubscriber = async({id, values}) => {
    try {
        const response = await api.put(constructApiUrl("/subscribers/"+id),{...values});
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch subscribers.");
    }
}

const deleteSubscriber = async({id}) => {
    try {
        const response = await api.delete(constructApiUrl("/subscribers/"+id));
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch subscribers.");
    }
}

export { getSubscribers, createASubscriber, deleteSubscriber, updateSubscriber };