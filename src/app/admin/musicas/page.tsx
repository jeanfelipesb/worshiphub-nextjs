'use client'

// import React, { useState, useMemo } from 'react'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

// interface DataItem {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// }

// const initialData: DataItem[] = [
//   { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
//   { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
//   { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer' },
//   { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Designer' },
// ]

// const columns: (keyof DataItem)[] = ['name', 'email', 'role']

export default function DataTable() {
  // const [data, setData] = useState<DataItem[]>(initialData)
  // const [columnOrder, setColumnOrder] = useState<(keyof DataItem)[]>(columns)
  // const [currentPage, setCurrentPage] = useState<number>(1)
  // const [filterText, setFilterText] = useState<string>('')
  // const itemsPerPage = 3

  // const filteredData = useMemo(() => {
  //   return data.filter(item =>
  //     Object.values(item).some(
  //       value => value.toString().toLowerCase().includes(filterText.toLowerCase())
  //     )
  //   )
  // }, [data, filterText])

  // const paginatedData = useMemo(() => {
  //   const startIndex = (currentPage - 1) * itemsPerPage
  //   return filteredData.slice(startIndex, startIndex + itemsPerPage)
  // }, [filteredData, currentPage])

  return (
      <div className="bg-white rounded-lg shadow-xl p-8">
        {/* <h2 className="text-2xl font-bold text-center mb-6">Data Table</h2>
        <Input
          placeholder="Filter records..."
          value={filterText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
          className="mb-4"
        />
        <Table >
          <TableHeader>
            <TableRow>
              {columnOrder.map((column, index) => (
                <TableHead
                  className="cursor-move"
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </TableHead>
              )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                {columnOrder.map((column) => (
                  <TableCell key={`${item.id}-${column}`}>{item[column]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}</span>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage)))}
            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
          >
            Next
          </Button>
        </div> */}
      </div>
  )
}