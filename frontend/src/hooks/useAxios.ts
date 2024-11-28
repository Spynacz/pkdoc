import {makeUseAxios} from "axios-hooks";
import axiosInstance from "../AxiosConfig";

const useAxios = makeUseAxios({
    axios: axiosInstance
});

export default useAxios;
