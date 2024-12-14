import {makeUseAxios} from "axios-hooks";
import axiosInstance from "../components/AxiosConfig";

const useAxios = makeUseAxios({
    axios: axiosInstance
});

export default useAxios;
