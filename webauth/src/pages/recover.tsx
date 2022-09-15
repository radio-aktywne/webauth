import {
  SelfServiceRecoveryFlow,
  SubmitSelfServiceRecoveryFlowBody,
} from "@ory/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ory from "../lib/ory";
import handleFlowError from "../lib/errors";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import PanelTitle from "../components/PanelTitle";
import Flow from "../components/Flow";
import { useLabels } from "../contexts/labels";
import { useToasts } from "../contexts/toasts";
import { Box } from "@mantine/core";
import Head from "next/head";
import GoBack from "../components/GoBack";

export default function Recover() {
  const [flow, setFlow] = useState<SelfServiceRecoveryFlow>();

  const router = useRouter();
  const labels = useLabels();
  const toasts = useToasts();

  // Get ?flow=... from the URL
  const { flow: flowId, return_to: returnTo } = router.query;

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getSelfServiceRecoveryFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data);
        })
        .catch(
          handleFlowError(
            router,
            "recover",
            router.query,
            setFlow,
            labels,
            toasts
          )
        );
      return;
    }

    // Otherwise we initialize it
    ory
      .initializeSelfServiceRecoveryFlowForBrowsers()
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(
        handleFlowError(
          router,
          "recover",
          router.query,
          setFlow,
          labels,
          toasts
        )
      );
  }, [flowId, router, router.isReady, returnTo, flow, toasts]);

  const onSubmit = (values: SubmitSelfServiceRecoveryFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/recover?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .submitSelfServiceRecoveryFlow(String(flow?.id), values)
          .then(({ data }) => {
            // Form submission was successful, show the message to the user!
            setFlow(data);
          })
          .catch(
            handleFlowError(
              router,
              "recover",
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
        <title>{labels.recover.title}</title>
      </Head>
      <Layout>
        <Panel>
          <PanelTitle>{labels.recover.panel.title}</PanelTitle>
          <Flow onSubmit={onSubmit} flow={flow} />
        </Panel>
        <Panel>
          <GoBack />
        </Panel>
      </Layout>
    </Box>
  );
}
