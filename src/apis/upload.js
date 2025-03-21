
import { uploadApi, constructUploadUrl } from "./axios-config";

const upload = async(formData) => {
    console.log(constructUploadUrl('/upload'))
    try {
        const response = await uploadApi.post(constructUploadUrl('/upload'),formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to upload file.");
    }
}

// API delete function
const deleteUrls = async (urls) => {
    console.log('urls', urls);
    try {
      // Extract clean keys from URLs
      const keys = urls.map(url => {
        // Remove query parameters and extract filename
        const [path] = url.split('?');
        return path.split('/').pop();
      });
  
      // Make DELETE request with proper body format
      const response = await uploadApi.delete(constructUploadUrl(`/delete`), {
        data: { keys } // Send as JSON body with array of keys
      });
      console.log("Files deleted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      throw new Error("Failed to delete files. Please try again.");
    }
  };

export {upload, deleteUrls}