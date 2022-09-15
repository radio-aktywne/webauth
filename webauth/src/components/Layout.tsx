import { ReactNode } from "react";
import { Center, Container, createStyles, Stack } from "@mantine/core";

export interface LayoutProps {
  children: ReactNode;
}

const useStyles = createStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.xl,
  },
  center: {
    flex: 1,
    height: "100%",
  },
  stack: {
    width: "100%",
  },
}));

export default function Layout({ children }: LayoutProps) {
  const { classes } = useStyles();

  return (
    <Container size="sm" className={classes.container}>
      <Center className={classes.center}>
        <Stack className={classes.stack}>{children}</Stack>
      </Center>
    </Container>
  );
}
