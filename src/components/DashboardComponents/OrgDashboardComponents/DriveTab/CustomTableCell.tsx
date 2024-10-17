import { Stack, TableCell } from "@mui/material";

const CustomTableCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <TableCell>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        {children}
      </Stack>
    </TableCell>
  );
};

export default CustomTableCell;
