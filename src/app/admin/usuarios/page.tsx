"use client"

import Pagination from "@/components/data-table-custom/pagination";
import LoagingCustom1 from "@/components/ui/loading";
import ServerErrorMessage from "@/components/ui/panelError";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const columns = [
  { key: 'name', label: 'Nome' },
  { key: 'email', label: 'E-mail' },
  { key: 'perfil', label: 'Perfil' }
];

interface DataItem {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Usuarios() {
  const [data, setData] = useState<DataItem[]>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRegisters, setTotalRegisters] = useState(0);
  const [pageSize, setPageSize] = useState(15);

  const fetchData = async (page: number, size: number) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/users?page=${page}&size=${size}`);
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalRegisters(response.data.totalElements);
      setIsLoading(false);
    } catch (err) {
      const error = err as AxiosError;
      if (error && error.message) {
        setError(error.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData(currentPage, pageSize); // pageSize agora inicializa corretamente
  }, [currentPage, pageSize]);

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">

      {isLoading ? <LoagingCustom1 /> :
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map(({ key, label }) => (
                  <TableHead key={key} className="cursor-move">
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination 
            currentPage={currentPage + 1} 
            totalPages={totalPages} 
            totalRegisters={totalRegisters} 
            pageSize={pageSize} 
            onPageChange={(page) => setCurrentPage(page - 1)} 
            onPageSizeChange={(size) => setPageSize(size)} 
          />
        </div>
      }
      {error && (<ServerErrorMessage error={error} />)}
    </div>
  );
}
