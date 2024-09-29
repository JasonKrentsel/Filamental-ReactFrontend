import { Stack, TableCell } from "@mui/material";

const CustomTableCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <TableCell>
      <Stack
        gap={1}
        direction="row"
        sx={{ alignItems: "center", display: "flex" }}
      >
        {children}
      </Stack>
    </TableCell>
  );
};

export default CustomTableCell;
