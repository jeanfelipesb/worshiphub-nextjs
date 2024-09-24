import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { User } from '@/types/user';

type TabelaProps = {
  columnsNames: string [] | null;
  columnsContents: { [key: string]: any }[] | any;
};

const TableVisualization = ({ columnsNames, columnsContents }: TabelaProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columnsNames && columnsNames.map((column) => (
            <TableHead key={column} className="font-medium text-gray-500">
              {column}
            </TableHead>
          ))}
          <TableHead className="font-medium text-gray-500">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {columnsContents && columnsContents.map((content: { [key: string]: any }[] | any) => (
          <TableRow key={content.id}>
            {columnsNames && columnsNames.map((column) => (
              <TableCell key={`${content.id}-${column}`} className="py-3">
                {content[column]}
              </TableCell>
            ))}
            <TableCell className="py-3">
              <Button variant="link" className="text-blue-600 hover:text-blue-800">Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableVisualization;