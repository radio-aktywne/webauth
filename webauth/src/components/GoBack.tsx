import React from "react";
import { useLabels } from "../contexts/labels";
import CenterLink from "./CenterLink";
import Link from "./Link";

export type GoBackProps = {};

export default function GoBack({}: GoBackProps) {
  const labels = useLabels();

  return (
    <Link href="/" passHref>
      <CenterLink>{labels.goBack}</CenterLink>
    </Link>
  );
}
