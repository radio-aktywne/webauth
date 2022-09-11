import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ory from "../lib/ory";
import { createLogoutHandler } from "../lib/hooks";
import Layout from "../components/Layout";
import LinkButton from "../components/LinkButton";
import Button from "../components/Button";
import Panel from "../components/Panel";
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
    <Layout title="webauth">
      <Panel>
        <Link href="/login">
          <LinkButton disabled={hasSession} title={"Login"}>
            Login
          </LinkButton>
        </Link>
        <Link href="/settings">
          <LinkButton disabled={!hasSession} title={"Settings"}>
            Settings
          </LinkButton>
        </Link>
        <Button onClick={onLogout} disabled={!hasSession} title={"Logout"}>
          Logout
        </Button>
      </Panel>
    </Layout>
  );
}
