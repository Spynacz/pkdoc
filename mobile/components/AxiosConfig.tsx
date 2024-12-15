import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const API_URL = "http://192.168.100.169:8080/api";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
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
                await AsyncStorage.setItem("token", res.data.token);
                await AsyncStorage.setItem("refreshToken", res.data.refreshToken);
                return axiosInstance(config);
            } catch (refreshError) {
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("refreshToken");

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
    const token = await AsyncStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios.post("/api/refresh", {token: await AsyncStorage.getItem("refreshToken")}, config);
};

export default axiosInstance;
