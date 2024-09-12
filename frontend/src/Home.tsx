import { makeUseAxios } from "axios-hooks";
import { Card, Pagination } from "flowbite-react";
import { ReactElement, useState, useEffect } from "react";
import axiosInstance from "./AxiosConfig";

export enum PaperType {
  PAPER = "paper",
  BOOK = "book",
  DISSERTATION = "dis",
  PROJECT = "project",
  PATENT = "patent",
  JOURNAL = "journal",
  CONFERENCE_PAPER = "conf",
}

interface Paper {
  id: number;
  title: string;
  abstractText: string;
  authors: string;
  publishDate: string; // INFO: should probably be parsed into date
  privateOnly: boolean;
  type: PaperType;
  keywords: string;
}

export default function Home(): ReactElement {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const useAxios = makeUseAxios({
    axios: axiosInstance,
  });

  const [{ data }, fetchLatestPapers] = useAxios({
    url: "/api/papers",
    params: {
      page,
      size: 10,
      sortBy: "publishDate",
      sortDirection: "desc",
    },
  });

  const onPageChange = (page: number) => setPage(page - 1);

  useEffect(() => {
    fetchLatestPapers()
      .then((data) => setTotalPages(data.data.totalPages))
      .catch((err) => console.error(err));
  }, [fetchLatestPapers]);

  return (
    <div className="m-auto mt-4 flex max-w-screen-2xl min-w-0 flex-col space-y-1 sm:space-y-4">
      {data?.content?.map((paper: Paper) => (
        <Card key={paper.id}>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3 align-middle">
              <img src="../src/assets/account.svg" width={"40px"} />
              <h6 className="my-auto text-gray-900 dark:text-white">
                {paper.authors}
              </h6>
            </div>
            <p className="my-auto font-normal text-gray-700 dark:text-gray-400">
              {paper.publishDate}
            </p>
          </div>
          <div className="">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {paper.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {paper.abstractText}
            </p>
          </div>
        </Card>
      ))}
      <div className="flex overflow-x-auto justify-center !mb-6">
        <Pagination
          currentPage={page + 1}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
}
