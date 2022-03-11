import { SelfServiceError } from "@ory/kratos-client";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ory from "../lib/ory";
import PanelTitle from "../components/PanelTitle";
import CodeBox from "../components/CodeBox";
import CenterLink from "../components/CenterLink";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import Link from "../components/Link";

export default function Error() {
  const [error, setError] = useState<SelfServiceError | string>();

  // Get ?id=... from the URL
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // If the router is not ready yet, or we already have an error, do nothing.
    if (!router.isReady || error) {
      return;
    }

    ory
      .getSelfServiceError(String(id))
      .then(({ data }) => {
        setError(data);
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
          // The error id could not be found. Let's just redirect home!
          case 403:
          // The error id could not be fetched due to e.g. a CSRF issue. Let's just redirect home!
          case 410:
            // The error id expired. Let's just redirect home!
            return router.push("/");
        }

        return Promise.reject(err);
      });
  }, [id, router, router.isReady, error]);

  if (!error) {
    return null;
  }

  return (
    <Layout title="error · webauth">
      <Panel>
        <PanelTitle>An error occurred</PanelTitle>
        <CodeBox code={JSON.stringify(error, null, 2)} />
      </Panel>
      <Panel>
        <Link href="/" passHref>
          <CenterLink>Go back</CenterLink>
        </Link>
      </Panel>
    </Layout>
  );
}
