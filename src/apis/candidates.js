import { api, constructUrl } from "./axios-config";

const getCandidates = async() => {
    try {
        const response = await api.get(constructUrl("/candidates"));
        return response.data.candidates;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch candidates.");
    }
}

const createACandidate = async({values}) => {
    try {
        const response = await api.post(constructUrl("/candidates"),{...values});
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch candidates.");
    }
}

const updateCandidate = async({id, values}) => {
    try {
        const response = await api.put(constructUrl("/candidates/"+id),{...values});
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch candidates.");
    }
}

const deleteCandidate = async({id}) => {
    try {
        const response = await api.delete(constructUrl("/candidates/"+id));
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch candidates.");
    }
}

export { getCandidates, createACandidate, deleteCandidate, updateCandidate };