import { SelfServiceError } from "@ory/client";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ory from "../lib/ory";
import PanelTitle from "../components/PanelTitle";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import { useLabels } from "../contexts/labels";
import { Box } from "@mantine/core";
import Head from "next/head";
import Json from "../components/Json";
import GoBack from "../components/GoBack";
import { useToasts } from "../contexts/toasts";

export default function Error() {
  const [error, setError] = useState<SelfServiceError | string>();

  const router = useRouter();
  const labels = useLabels();
  const toasts = useToasts();

  // Get ?id=... from the URL
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
        debugger;
        if (err.response?.data?.error?.reason) {
          // If there is a reason for this error, let's display it and redirect to the main page.
          toasts.error(err.response?.data?.error?.reason);
          return router.push("/");
        }

        switch (err.response?.status) {
          case 404:
            // The error id could not be found. Let's just redirect home!
            toasts.error(labels.toasts.messages.errorNotFound);
            return router.push("/");
          case 403:
            // The error id could not be fetched due to e.g. a CSRF issue. Let's just redirect home!
            toasts.error(labels.toasts.messages.errorUnfetchable);
            return router.push("/");
          case 410:
            // The error id expired. Let's just redirect home!
            toasts.error(labels.toasts.messages.errorExpired);
            return router.push("/");
        }

        // We are not able to handle the error? Return it.
        return Promise.reject(err);
      });
  }, [id, router, router.isReady, error]);

  if (!error) {
    return null;
  }

  return (
    <Box>
      <Head>
        <title>{labels.error.title}</title>
      </Head>
      <Layout>
        <Panel>
          <PanelTitle>{labels.error.panel.title}</PanelTitle>
          <Json object={error} />
        </Panel>
        <Panel>
          <GoBack />
        </Panel>
      </Layout>
    </Box>
  );
}
