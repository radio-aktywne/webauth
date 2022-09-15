import { Anchor, AnchorProps, createStyles } from "@mantine/core";
import React from "react";

export type CenterLinkProps = Omit<AnchorProps, "component" | "className">;

const useStyles = createStyles((theme) => ({
  anchor: {
    textAlign: "center",
    fontSize: theme.fontSizes.xs,
  },
}));

export default function CenterLink(props: CenterLinkProps) {
  const { classes } = useStyles();

  return <Anchor component="a" className={classes.anchor} {...props} />;
}
