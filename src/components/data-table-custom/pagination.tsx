import { ChevronLeft, ChevronRight, ChevronLast, ChevronFirst } from 'lucide-react';
import ButtonPagination from './button_pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRegisters: number;
  pageSizeOptions?: number[];
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalRegisters,
  pageSizeOptions = [15, 25, 50, 100],
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    onPageSizeChange(newSize); // Propaga a mudança para o componente pai
  };

  return (
    <div className="flex flex-row justify-between items-center mt-6">
      {/* Select para número de registros por página */}
      <div>
        <label htmlFor="pageSize" className="mr-2">Registros por página:</label>
        <select
          id="pageSize"
          value={pageSize} // Mantém o valor sincronizado com o estado
          onChange={handlePageSizeChange}
          className="border rounded px-2 py-1"
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-row items-center">
        <span className="mx-10">
          Página {currentPage} de {totalPages} {'('}{totalRegisters} registros{')'}
        </span>

        {/* Botões de navegação */}
        <ButtonPagination
          start={true}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronFirst className="size-5" />
        </ButtonPagination>

        <ButtonPagination
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="size-5" />
        </ButtonPagination>

        <ButtonPagination
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="size-5" />
        </ButtonPagination>

        <ButtonPagination
          end={true}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronLast className="size-5" />
        </ButtonPagination>
      </div>
    </div>
  );
}
