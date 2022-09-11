import {
  SelfServiceRecoveryFlow,
  SubmitSelfServiceRecoveryFlowBody,
} from "@ory/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ory from "../lib/ory";
import handleFlowError from "../lib/errors";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import PanelTitle from "../components/PanelTitle";
import Flow from "../components/Flow";
import CenterLink from "../components/CenterLink";

export default function Recover() {
  const [flow, setFlow] = useState<SelfServiceRecoveryFlow>();

  // Get ?flow=... from the URL
  const router = useRouter();
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
        .catch(handleFlowError(router, "recover", router.query, setFlow));
      return;
    }

    // Otherwise we initialize it
    ory
      .initializeSelfServiceRecoveryFlowForBrowsers()
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(handleFlowError(router, "recover", router.query, setFlow));
  }, [flowId, router, router.isReady, returnTo, flow]);

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
          .catch(handleFlowError(router, "recover", router.query, setFlow))
      );

  return (
    <Layout title={"recover · webauth"}>
      <Panel>
        <PanelTitle>Recover your account</PanelTitle>
        <Flow onSubmit={onSubmit} flow={flow} />
      </Panel>
      <Panel>
        <Link href="/" passHref>
          <CenterLink>Go back</CenterLink>
        </Link>
      </Panel>
    </Layout>
  );
}
