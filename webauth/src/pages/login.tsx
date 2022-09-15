import {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
} from "@ory/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import handleFlowError from "../lib/errors";
import ory from "../lib/ory";
import { createLogoutHandler } from "../lib/hooks";
import PanelTitle from "../components/PanelTitle";
import Flow from "../components/Flow";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import { useLabels } from "../contexts/labels";
import { useToasts } from "../contexts/toasts";
import { Anchor, Box } from "@mantine/core";
import Head from "next/head";
import GoBack from "../components/GoBack";

export default function Login() {
  const [flow, setFlow] = useState<SelfServiceLoginFlow>();

  const router = useRouter();
  const labels = useLabels();
  const toasts = useToasts();

  // Get ?flow=... from the URL
  const {
    return_to: returnTo,
    flow: flowId,
    // Refresh means we want to refresh the session. This is needed, for example, when we want to update the password
    // of a user.
    refresh,
    // AAL = Authorization Assurance Level. This implies that we want to upgrade the AAL, meaning that we want
    // to perform two-factor authentication/verification.
    aal,
  } = router.query;

  // This might be confusing, but we want to show the user an option
  // to sign out if they are performing two-factor authentication!
  const onLogout = createLogoutHandler([aal, refresh]);

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getSelfServiceLoginFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data);
        })
        .catch(
          handleFlowError(
            router,
            "login",
            router.query,
            setFlow,
            labels,
            toasts
          )
        );
      return;
    }

    // Otherwise, we initialize it
    ory
      .initializeSelfServiceLoginFlowForBrowsers(
        Boolean(refresh),
        aal ? String(aal) : undefined,
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(
        handleFlowError(router, "login", router.query, setFlow, labels, toasts)
      );
  }, [flowId, router, router.isReady, aal, refresh, returnTo, flow, toasts]);

  const onSubmit = (values: SubmitSelfServiceLoginFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/login?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .submitSelfServiceLoginFlow(String(flow?.id), values)
          // We logged in successfully! Let's bring the user home.
          .then(() => {
            toasts.success(labels.toasts.messages.loggedIn);
            if (flow?.return_to) {
              window.location.href = flow?.return_to;
              return;
            }
            router.push("/").then();
          })
          .then(() => {})
          .catch(
            handleFlowError(
              router,
              "login",
              router.query,
              setFlow,
              labels,
              toasts
            )
          )
      );

  const title = flow?.refresh
    ? labels.login.panel.title.refresh
    : flow?.requested_aal == "aal2"
    ? labels.login.panel.title.twoFactor
    : labels.login.panel.title.default;

  return (
    <Box>
      <Head>{labels.login.title}</Head>
      <Layout>
        <Panel>
          <PanelTitle>{title}</PanelTitle>
          <Flow onSubmit={onSubmit} flow={flow} />
        </Panel>
        <Panel>
          {aal || refresh ? (
            <Anchor component="a" onClick={onLogout}>
              {labels.logOut}
            </Anchor>
          ) : (
            <GoBack />
          )}
        </Panel>
      </Layout>
    </Box>
  );
}
