import { api, constructApiUrl } from "./axios-config";

const getBlogs = async() => {
    try {
        const response = await api.get(constructApiUrl("/blogs"));
        return response.data.blogs;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch blogs.");
    }
}

const createABlog = async({values}) => {
    try {
        const response = await api.post(constructApiUrl("/blogs"),{...values});
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch blogs.");
    }
}

const updateBlogs = async({id, values}) => {
    try {
        const response = await api.put(constructApiUrl("/blogs/"+id),{...values});
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch blogs.");
    }
}

const deleteBlog = async({id}) => {
    try {
        const response = await api.delete(constructApiUrl("/blogs/"+id));
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch blogs.");
    }
}

export { getBlogs, createABlog, deleteBlog, updateBlogs };