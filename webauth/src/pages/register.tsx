import {
  SelfServiceRegistrationFlow,
  SubmitSelfServiceRegistrationFlowBody,
} from "@ory/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import handleFlowError from "../lib/errors";

import ory from "../lib/ory";
import PanelTitle from "../components/PanelTitle";
import Flow from "../components/Flow";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import { useLabels } from "../contexts/labels";
import { useToasts } from "../contexts/toasts";
import Head from "next/head";
import GoBack from "../components/GoBack";
import { Anchor, Box } from "@mantine/core";
import Link from "../components/Link";

export default function Register() {
  const router = useRouter();
  const labels = useLabels();
  const toasts = useToasts();

  // The "flow" represents a registration process and contains
  // information about the form we need to render (e.g. username + password)
  const [flow, setFlow] = useState<SelfServiceRegistrationFlow>();

  // Get ?flow=... from the URL
  const { flow: flowId, return_to: returnTo } = router.query;

  // In this effect we either initiate a new registration flow, or we fetch an existing registration flow.
  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getSelfServiceRegistrationFlow(String(flowId))
        .then(({ data }) => {
          // We received the flow - let's use its data and render the form!
          setFlow(data);
        })
        .catch(
          handleFlowError(
            router,
            "register",
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
      .initializeSelfServiceRegistrationFlowForBrowsers(
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(
        handleFlowError(
          router,
          "register",
          router.query,
          setFlow,
          labels,
          toasts
        )
      );
  }, [flowId, router, router.isReady, returnTo, flow, toasts]);

  const onSubmit = (values: SubmitSelfServiceRegistrationFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/register?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .submitSelfServiceRegistrationFlow(String(flow?.id), values)
          .then(() => {
            // If we ended up here, it means we are successfully signed up!
            //
            // You can do cool stuff here, like having access to the identity which just signed up:
            toasts.success(labels.toasts.messages.registered);

            // For now however we just want to redirect home!
            return router.push(flow?.return_to || "/").then(() => {});
          })
          .catch(
            handleFlowError(
              router,
              "register",
              router.query,
              setFlow,
              labels,
              toasts
            )
          )
      );

  return (
    <Box>
      <Head>
        <title>{labels.register.title}</title>
      </Head>
      <Layout>
        <Panel>
          <PanelTitle>{labels.register.panel.title}</PanelTitle>
          <Flow onSubmit={onSubmit} flow={flow} />
        </Panel>
        <Panel>
          <Link href="/login" passHref>
            <Anchor component="a">{labels.signIn}</Anchor>
          </Link>
        </Panel>
        <Panel>
          <GoBack />
        </Panel>
      </Layout>
    </Box>
  );
}
