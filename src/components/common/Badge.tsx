import { Box } from "@primer/react";

export interface BadgeProps {
  color: "red" | "green" | "yellow";
  text: string;
}

export default function Badge({ color, text }: BadgeProps) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      color={color}
    >
      {text}
    </Box>
  );
}
