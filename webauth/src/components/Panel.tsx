import { createStyles, Paper, Stack } from "@mantine/core";
import React from "react";

export type PanelProps = {
  children: React.ReactNode;
};

const useStyles = createStyles((theme) => ({
  paper: {
    padding: theme.spacing.xl,
    boxShadow: theme.shadows.sm,
  },
}));

export default function Panel({ children }: PanelProps) {
  const { classes } = useStyles();

  return (
    <Paper className={classes.paper} withBorder>
      <Stack>{children}</Stack>
    </Paper>
  );
}
