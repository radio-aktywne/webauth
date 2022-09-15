import React from "react";
import { createStyles, Title, TitleProps } from "@mantine/core";

export type PanelTitleProps = TitleProps;

const useStyles = createStyles((theme) => ({
  text: {
    textAlign: "center",
  },
}));

export default function PanelTitle(props: PanelTitleProps) {
  const { classes } = useStyles();

  return <Title className={classes.text} {...props} />;
}
