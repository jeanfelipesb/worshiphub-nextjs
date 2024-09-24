"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function Usuarios() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/users'); 
        console.log(response.data.content); 
        setData(response.data); 
      } catch (err) {
        const error = err as AxiosError; 
        if (error && error.message) {
          setError(error.message); 
        } 
      }
    };

    fetchData();
  }, []);


  console.log(data)
  console.log(error)
  
  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead>
              Teste1
            </TableHead>
            <TableHead>
              Teste1
            </TableHead>
            <TableHead>
              Teste1
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
          <TableCell >Teste</TableCell>
          <TableCell >Teste</TableCell>
          <TableCell >Teste</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}