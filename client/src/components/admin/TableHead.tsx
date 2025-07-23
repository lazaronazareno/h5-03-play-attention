export const TableHead = ({ title }: { title: string }) => {
  return (
    <th className={`p-4 font-medium ${(title === 'Estado' || title === 'Editar') ? 'text-center' : 'text-start'}`}>{title}</th>
  );
}