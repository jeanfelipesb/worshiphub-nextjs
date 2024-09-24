import { Button } from "../ui/button";
import { usePaginationStore } from "@/store/usePagination";

type Props = {
  itemsPerPage: number | null;
  filteredLength: number | undefined;
};

const Pagination = ({ itemsPerPage, filteredLength }: Props) => {

  const { currentPage, setCurrentPage } = usePaginationStore();

  return (
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm text-gray-500">
        Exibindo {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredLength)} de {filteredLength} registros
      </span>
      <div className="flex space-x-2">
        {[...Array(Math.ceil(filteredLength / itemsPerPage))].map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Pagination;