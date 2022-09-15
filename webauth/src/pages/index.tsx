import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ory from "../lib/ory";
import { createLogoutHandler } from "../lib/hooks";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import { Box, Button } from "@mantine/core";
import Head from "next/head";
import labels from "../theme/labels";
import Link from "../components/Link";

export default function Index() {
  const [hasSession, setHasSession] = useState<boolean>(undefined);
  const router = useRouter();

  const onLogout = createLogoutHandler();

  useEffect(() => {
    ory
      .toSession()
      .then(() => setHasSession(true))
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 403:
          // This is a legacy error code thrown. See code 422 for
          // more details.
          case 422:
            // This status code is returned when we are trying to
            // validate a session which has not yet completed
            // its second factor
            return router.push("/login?aal=aal2");
          case 401:
            // do nothing, the user is not logged in
            setHasSession(false);
            return;
        }

        // Something else happened!
        return Promise.reject(err);
      });
  }, []);

  if (hasSession === undefined) return null;

  return (
    <Box>
      <Head>
        <title>{labels.index.title}</title>
      </Head>
      <Layout>
        <Panel>
          <Link href="/login" disabled={hasSession} passHref>
            <Button
              component="a"
              disabled={hasSession}
              title={labels.index.buttons.login}
            >
              {labels.index.buttons.login}
            </Button>
          </Link>
          <Link href="/settings" disabled={!hasSession} passHref>
            <Button
              component="a"
              disabled={!hasSession}
              title={labels.index.buttons.settings}
            >
              {labels.index.buttons.settings}
            </Button>
          </Link>
          <Button
            onClick={onLogout}
            disabled={!hasSession}
            title={labels.index.buttons.logout}
          >
            {labels.index.buttons.logout}
          </Button>
        </Panel>
      </Layout>
    </Box>
  );
}
