export const TableCell = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <td className={`p-4 border-b border-gray-200/30 ${className ?? className}`}>{children}</td>
  );
}