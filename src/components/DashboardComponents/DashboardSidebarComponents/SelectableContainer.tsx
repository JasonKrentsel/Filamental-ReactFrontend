import { Box } from "@mui/material";

interface SelectableContainerProps {
  children: React.ReactNode;
  selected: boolean;
}

const SelectableContainer = ({
  children,
  selected,
}: SelectableContainerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 1.5,
        paddingLeft: 1.5,
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "5px",
          height: selected ? "75%" : "0",
          transition: "height 0.4s ease",
          borderTopRightRadius: "50%",
          borderBottomRightRadius: "50%",
          bgcolor: "gray",
          position: "absolute",
          left: 0,
        }}
      />
      <Box sx={{ position: "relative" }}>{children}</Box>
    </Box>
  );
};

export default SelectableContainer;
