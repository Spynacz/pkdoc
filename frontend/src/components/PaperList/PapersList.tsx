import {Button, Pagination} from "flowbite-react";
import {ReactElement, useState} from "react";
import useFilters from "../../hooks/useFilters";
import {Paper} from "../../types/Paper";
import FilterMenu from "./FilterMenu";
import PaperCard from "./PaperCard";

interface PapersListProps {
    userId?: number;
}

export default function PapersList(props: PapersListProps): ReactElement {
    const {userId} = props;
    const {data, loading, page, totalPages, onPageChange, handleFilterChange} = useFilters(userId);
    const [menuOpen, setMenuOpen] = useState(false);

    const renderFilterMenu = () => {
        return (
            <>
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
                <div className="ml-1 mr-1 mt-4 flex w-full min-w-0 max-w-screen-lg flex-col space-y-1 sm:ml-4 sm:mr-4 sm:space-y-4">
                    {data?.content?.map((paper: Paper) => (
                        <PaperCard
                            id={paper.id}
                            title={paper.title}
                            authors={paper.authors}
                            abstractText={paper.abstractText}
                            publishDate={paper.publishDate}
                            doi={paper.doi}
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
