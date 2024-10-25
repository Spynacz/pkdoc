import {Card, Pagination} from "flowbite-react";
import {ReactElement} from "react";
import FilterMenu from "./FilterMenu";
import {PaperType} from "./PaperType";
import useFilters from "./hooks/useFilters";

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
    const {data, page, totalPages, onPageChange, handleFilterChange} =
        useFilters();

    return (
        <div className="flex h-[calc(100vh-63px)] flex-row">
            <FilterMenu onFilterChange={handleFilterChange} />
            <div className="w-screen overflow-auto">
                <div className="m-auto mt-4 flex min-w-0 max-w-screen-lg flex-col space-y-1 sm:space-y-4">
                    {data?.content?.map((paper: Paper) => (
                        <Card key={paper.id}>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row gap-3 align-middle">
                                    <img
                                        src="../src/assets/account.svg"
                                        width={"40px"}
                                    />
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
                    <div className="flex justify-center overflow-x-auto pb-5">
                        <Pagination
                            currentPage={page + 1}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            showIcons
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
