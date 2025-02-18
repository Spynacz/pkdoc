import {Button, Pagination} from "flowbite-react";
import {ReactElement, useCallback, useEffect, useState} from "react";
import useAxios from "../../hooks/useAxios";
import useFilters from "../../hooks/useFilters";
import {Paper} from "../../types/Paper";
import FilterMenu from "./FilterMenu";
import PaperCard from "./PaperCard";

interface PapersListProps {
    userId?: number;
}

export default function PapersList(props: PapersListProps): ReactElement {
    const {userId} = props;
    const {filters, sorting, handleFilterChange} = useFilters();
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const [{data, loading}, fetchPapers] = useAxios(
        {
            url: "/api/papers",
            params: {
                page,
                user: userId,
                size: 10,
                sort: sorting.sort,
                order: sorting.order,
                ...filters,
                types: filters.types?.join(","),
                keywords: filters.keywords?.join(",")
            }
        },
        {manual: true}
    );

    useEffect(() => {
        fetchPapers()
            .then((data) => setTotalPages(data.data.totalPages))
            .catch((error) => {
                // react strict mode in development calls useEffect twice, the first request gets immediately canceled
                if (error.code === "ERR_CANCELED") {
                    return Promise.resolve({status: 499});
                }
            });
    }, [fetchPapers]);

    const onPageChange = useCallback((page: number) => setPage(page - 1), []);

    const renderFilterMenu = () => {
        return (
            <>
                <div
                    className={`transition-transform duration-300 ${
                        menuOpen ? "translate-x-0" : "-translate-x-full"
                    } absolute z-10 sm:static sm:translate-x-0`}
                >
                    <FilterMenu onFilterChange={handleFilterChange} filters={filters} sorting={sorting} />
                </div>

                <Button
                    color="light"
                    className={`absolute bottom-5 ${
                        menuOpen ? "left-[17rem]" : "left-4"
                    } z-20 transition-all duration-300 sm:hidden`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "Close" : "Filters"}
                </Button>
            </>
        );
    };

    const renderPapersList = () => {
        return (
            <div className="flex w-screen justify-center overflow-auto">
                <div className="mx-1 mt-4 flex w-full min-w-0 max-w-screen-lg flex-col space-y-1 sm:mx-4 sm:space-y-4">
                    {data?.content?.map((paper: Paper) => (
                        <PaperCard
                            key={paper.id}
                            id={paper.id}
                            title={paper.title}
                            authors={paper.authors}
                            abstractText={paper.abstractText}
                            publishDate={paper.publishDate}
                            type={paper.type}
                            doi={paper.doi || "10.1337/pk.2137"}
                            points={paper.points}
                        />
                    ))}
                    <div className="flex min-h-16 justify-center">
                        <Pagination
                            currentPage={page + 1}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            showIcons
                        />
                    </div>
                </div>
            </div>
        );
    };

    const renderLoading = () => {
        return <div className="flex w-screen justify-center overflow-auto">loading...</div>;
    };

    return (
        <div className="flex h-[calc(100vh-63px)] flex-row">
            {renderFilterMenu()}
            {loading ? renderLoading() : renderPapersList()}
        </div>
    );
}
