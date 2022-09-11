import {
  SelfServiceVerificationFlow,
  SubmitSelfServiceVerificationFlowBody,
} from "@ory/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ory from "../lib/ory";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import PanelTitle from "../components/PanelTitle";
import Flow from "../components/Flow";
import CenterLink from "../components/CenterLink";
import handleFlowError from "../lib/errors";

export default function Verify() {
  const [flow, setFlow] = useState<SelfServiceVerificationFlow>();

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
        .getSelfServiceVerificationFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data);
        })
        .catch(handleFlowError(router, "verify", router.query, setFlow));
      return;
    }

    // Otherwise we initialize it
    ory
      .initializeSelfServiceVerificationFlowForBrowsers(
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(handleFlowError(router, "verify", router.query, setFlow));
  }, [flowId, router, router.isReady, returnTo, flow]);

  const onSubmit = (values: SubmitSelfServiceVerificationFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/verify?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .submitSelfServiceVerificationFlow(String(flow?.id), values)
          .then(({ data }) => {
            // Form submission was successful, show the message to the user!
            setFlow(data);
          })
          .catch(handleFlowError(router, "verify", router.query, setFlow))
      );

  return (
    <Layout title={"verify · webauth"}>
      <Panel>
        <PanelTitle>Verify your account</PanelTitle>
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
