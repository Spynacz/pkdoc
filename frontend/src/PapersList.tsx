import {Button, Card, Pagination} from "flowbite-react";
import {ReactElement, useState} from "react";
import FilterMenu from "./FilterMenu";
import useFilters from "./hooks/useFilters";
import {Paper} from "./Paper";

interface PapersListProps {
    userId?: number;
}

export default function PapersList(props: PapersListProps): ReactElement {
    const {userId} = props;
    const {data, page, totalPages, onPageChange, handleFilterChange} = useFilters(userId);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="flex h-[calc(100vh-63px)] flex-row">
                <div
                    className={`transition-transform duration-300 ${
                        menuOpen ? "translate-x-0" : "-translate-x-full"
                    } absolute z-10 sm:static sm:translate-x-0`}
                >
                    <FilterMenu onFilterChange={handleFilterChange} />
                </div>

                <Button
                    color="light"
                    className={`absolute bottom-5 ${
                        menuOpen ? "left-[17rem]" : "left-4"
                    } z-20 sm:hidden transition-all duration-300`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "Close" : "Filters"}
                </Button>

                <div className="w-screen overflow-auto flex justify-center">
                    <div className="mt-4 mr-1 ml-1 sm:ml-4 sm:mr-4 flex min-w-0 max-w-screen-lg flex-col space-y-1 sm:space-y-4">
                        {data?.content?.map((paper: Paper) => (
                            <Card key={paper.id}>
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-row gap-3 align-middle">
                                        <img src="../src/assets/account.svg" width={"40px"} />
                                        <h6 className="my-auto text-gray-900 dark:text-white">{paper.authors}</h6>
                                    </div>
                                    <p className="my-auto font-normal text-gray-700 dark:text-gray-400">
                                        {paper.publishDate}
                                    </p>
                                </div>
                                <div className="">
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {paper.title}
                                    </h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">{paper.abstractText}</p>
                                </div>
                            </Card>
                        ))}
                        <div className="flex justify-center min-h-16">
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
        </>
    );
}
