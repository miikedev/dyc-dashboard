import { api, constructUrl } from "./axios-config";

const getBlogs = async() => {
    try {
        const response = await api.get(constructUrl("/blogs"));
        return response.data.blogs;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch blogs.");
    }
}

const createABlog = async({values}) => {
    try {
        const response = await api.post(constructUrl("/blogs"),{...values});
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch blogs.");
    }
}

const updateBlogs = async({id, values}) => {
    try {
        const response = await api.put(constructUrl("/blogs/"+id),{...values});
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch blogs.");
    }
}

const deleteBlog = async({id}) => {
    try {
        const response = await api.delete(constructUrl("/blogs/"+id));
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch blogs.");
    }
}

export { getBlogs, createABlog, deleteBlog, updateBlogs };