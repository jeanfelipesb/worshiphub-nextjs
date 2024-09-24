"use client"

import LoagingCustom1 from "@/components/ui/loading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { ChevronLeft, ChevronRight, ChevronLast, ChevronFirst } from 'lucide-react'
import { Input } from "@/components/ui/input";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/users');

        setData(response.data.content);
        setIsLoading(false);
      } catch (err) {
        const error = err as AxiosError;
        if (error && error.message) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  console.log(error)

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">

      {isLoading ? <LoagingCustom1 /> :
        <div>
          <Table >
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

          <div className="flex flex-row justify-end items-center">
            <span className="mx-10">1 a 3 de 3 registros</span>
            <button className="bg-zinc-50 text-secondary-foreground shadow hover:bg-purple-600 hover:text-white rounded-s p-2"><ChevronFirst className="size-5" /></button>
            <button className="bg-zinc-50 text-secondary-foreground shadow hover:bg-purple-600 hover:text-white p-2"><ChevronLeft className="size-5" /></button>
            <button className="bg-zinc-50 text-secondary-foreground shadow hover:bg-purple-600 hover:text-white p-2"><ChevronRight className="size-5" /></button>
            <button className="bg-zinc-50 text-secondary-foregroundd shadow hover:bg-purple-600 hover:text-white rounded-e p-2"><ChevronLast className="size-5" /></button>
          </div>
        </div>
      }
    </div>
  );
}