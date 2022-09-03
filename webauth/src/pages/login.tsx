import {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
} from "@ory/client";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import handleFlowError from "../lib/errors";
import ory from "../lib/ory";
import { createLogoutHandler } from "../lib/hooks";
import PanelTitle from "../components/PanelTitle";
import CenterLink from "../components/CenterLink";
import Flow from "../components/Flow";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import { toast } from "react-toastify";
import Link from "../components/Link";

export default function Login() {
  const [flow, setFlow] = useState<SelfServiceLoginFlow>();

  // Get ?flow=... from the URL
  const router = useRouter();
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
        .catch(handleFlowError(router, "login", setFlow));
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
      .catch(handleFlowError(router, "login", setFlow));
  }, [flowId, router, router.isReady, aal, refresh, returnTo, flow]);

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
            toast.success("Logged in!");
            if (flow?.return_to) {
              window.location.href = flow?.return_to;
              return;
            }
            router.push("/").then();
          })
          .then(() => {})
          .catch(handleFlowError(router, "login", setFlow))
          .catch((err: AxiosError) => {
            // If the previous handler did not catch the error it's most likely a form validation error
            if (err.response?.status === 400) {
              // Yup, it is!
              toast.error("Input is invalid.");
              setFlow(err.response?.data);
              return;
            }

            return Promise.reject(err);
          })
      );

  return (
    <Layout title={"login · webauth"}>
      <Panel>
        <PanelTitle>
          {(() => {
            if (flow?.refresh) {
              return "Confirm Action";
            } else if (flow?.requested_aal === "aal2") {
              return "Two-Factor Authentication";
            }
            return "Sign In";
          })()}
        </PanelTitle>
        <Flow onSubmit={onSubmit} flow={flow} />
      </Panel>
      <Panel>
        {aal || refresh ? (
          <CenterLink onClick={onLogout}>Log out</CenterLink>
        ) : (
          <Link href="/" passHref>
            <CenterLink>Go back</CenterLink>
          </Link>
        )}
      </Panel>
    </Layout>
  );
}
