'use client'

import { usePaginationStore } from "@/store/usePagination";
import { User } from '@/types/user';
import React, { useState, useMemo, useEffect} from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TableVisualization from '@/components/table-visualization/tableVisualization'
import Pagination from "@/components/pagination/pagination";
import api from '@/lib/axios'; // Importa a instância global

const columnHeaders: Record<keyof User, string> = {
  id: "ID",
  name: "Nome",
  username: "Username"
};

export default function UserListing() {  
  const [users, setUsers] = useState<User[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { currentPage, setCurrentPage } = usePaginationStore();
  const [searchTerm, setSearchTerm] = useState<string>('')
  const itemsPerPage = 5

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await api.get<User[]>('/users')  // Replace with your actual API URL
        setUsers(response.data)
      } catch (err) {
        setError('Failed to load users')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    return users?.filter(user =>
      Object.values(user).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [users, searchTerm])

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredUsers?.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredUsers, currentPage])

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <div className="space-x-2">
          <Button>Novo usuário</Button>
        </div>
      </div>
      <Input
        placeholder="Pesquisar ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <TableVisualization columnsNames={Object.values(columnHeaders)} columnsContents={paginatedUsers} />
      {/* <Pagination itemsPerPage={itemsPerPage} filteredLength={filteredUsers?.length} /> */}

    </div>
  )
}