import { makeUseAxios } from "axios-hooks";
import { useEffect, type ReactElement } from "react";
import axiosInstance from "./AxiosConfig";
import { useUser } from "./useUser";

export default function UserProfile(): ReactElement {
  const { email } = useUser();
  const useAxios = makeUseAxios({
    axios: axiosInstance,
  });

  const [{ data, error }, doFetch] = useAxios(`/api/users/${email}`);

  useEffect(() => {
    doFetch()
  }, [doFetch])

  return (
    <>
      <h2>User Profile Page</h2>
      <h3>{data?.email}</h3>
    </>
  );
}
