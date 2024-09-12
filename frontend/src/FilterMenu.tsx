import { makeUseAxios } from "axios-hooks";
import { Checkbox, Label } from "flowbite-react";
import { ReactElement, useEffect } from "react";
import axiosInstance from "./AxiosConfig";
import { PaperType } from "./Home";

const useAxios = makeUseAxios({
  axios: axiosInstance,
});

interface Keyword {
  id: number;
  type: string;
}

export default function FilterMenu(): ReactElement {
  const [{ data, error }, fetchTypes] = useAxios({
    url: "/api/types",
  });

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  return (
    <div className="m-4 flex flex-col rounded-md bg-cyan-950 p-5">
      <div>Autor</div>
      <div>Data od do</div>
      <div>Typ</div>

      <div className="flex max-w-md flex-col gap-1" id="types">
        <h5 className="font-bold">Type</h5>
        {(Object.keys(PaperType) as Array<keyof typeof PaperType>)
          .filter((key) => isNaN(Number(key)))
          .map((type) => (
            <div className="flex items-center gap-2">
              <Checkbox id={type} />
              <Label htmlFor={type} className="flex">
                {type}
              </Label>
            </div>
          ))}
      </div>
    </div>
  );
}
