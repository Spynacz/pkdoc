import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
    const token: string | null = sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;
        if ((error.response?.status === 401 || error.response?.status === 403) && !config._retry) {
            config._retry = true;
            try {
                const res = await refreshAccessToken();
                sessionStorage.setItem("token", res.data.token);
                localStorage.setItem("refreshToken", res.data.refreshToken);
                return axiosInstance(config);
            } catch (refreshError) {
                sessionStorage.removeItem("token");
                localStorage.removeItem("refreshToken");

                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

interface RefreshResponse {
    data: {
        email: string;
        token: string;
        refreshToken: string;
    };
}

const refreshAccessToken = async (): Promise<RefreshResponse> => {
    const token: string | null = sessionStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios.post("/api/refresh", {token: localStorage.getItem("refreshToken")}, config);
};

export default axiosInstance;
