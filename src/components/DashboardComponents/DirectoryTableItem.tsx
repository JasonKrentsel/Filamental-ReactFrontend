import { Grid2, Typography } from "@mui/material";

interface DirectoryTableItemProps {
  icon?: React.ReactNode;
  name: string;
  created_at: Date;
  created_by: string;
  file_size: number;
}

const DirectoryTableItem = ({
  icon,
  name,
  created_by,
  created_at,
  file_size,
}: DirectoryTableItemProps) => {
  return (
    <Grid2 container>
      <Grid2 size={6} display="flex" alignItems="center" gap={1}>
        {icon}
        <Typography>{name}</Typography>
      </Grid2>
      <Grid2 size={2}>
        <Typography>{created_by}</Typography>
      </Grid2>
      <Grid2 size={2}>
        <Typography>{created_at.toLocaleDateString()}</Typography>
      </Grid2>
      <Grid2 size={2}>
        <Typography>{file_size}</Typography>
      </Grid2>
    </Grid2>
  );
};

export default DirectoryTableItem;
