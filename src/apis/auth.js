import { authApi, constructAuthUrl } from "./axios-config";

const login = async (email, password) => {
    console.log(constructAuthUrl("/token"))
  try {
    const response = await authApi.post(constructAuthUrl("/token"), {
      email,
      password,
    });

    // Return the full response for successful logins
    return response; // or response if you want to return the whole response object
  } catch (error) {
    // Check if error response exists and return a meaningful message
    console.log(error.response);
    if (error.response) {
      // The request was made and the server responded with a status code
      return {
        status: error.response.status,
        message:
          error.response.data.message || "Login failed. Please try again.",
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        status: 0,
        message:
          "No response from the server. Please check your network connection.",
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        status: 500,
        message: error.message || "An unexpected error occurred.",
      };
    }
  }
};

export { login };
