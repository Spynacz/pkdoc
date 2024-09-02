import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const token: string | null = sessionStorage.getItem("token");

  if (token) {
    config.headers.setAuthorization(`Bearer ${token}`);
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const config = error.config;

    if (error.response?.status === 403 && !config._retry) {
      config._retry = true;
      refreshAccessToken().then((res: RefreshResponse) => {
        sessionStorage.setItem("token", res.token);
        localStorage.setItem("refreshToken", res.refreshToken);
      });

      return axiosInstance(config);
    }
    return Promise.reject(error);
  },
);

interface RefreshResponse {
  email: string;
  token: string;
  refreshToken: string;
}

const refreshAccessToken = async (): Promise<RefreshResponse> => {
  return axios.post("/api/refresh", {
    token: localStorage.getItem("refreshToken"),
  });
};

export default axiosInstance;
