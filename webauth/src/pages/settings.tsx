import {
  SelfServiceSettingsFlow,
  SubmitSelfServiceSettingsFlowBody,
} from "@ory/client";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

import handleFlowError from "../lib/errors";
import ory from "../lib/ory";
import Flow, { Methods } from "../components/Flow";
import { Messages } from "../components/Messages";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import { useLabels } from "../contexts/labels";
import { useToasts } from "../contexts/toasts";
import { Box, Text } from "@mantine/core";
import Head from "next/head";
import GoBack from "../components/GoBack";
import PanelTitle from "../components/PanelTitle";

interface Props {
  flow?: SelfServiceSettingsFlow;
  only?: Methods;
}

function SettingsPanel({
  flow,
  only,
  children,
}: Props & { children: ReactNode }) {
  if (!flow) {
    return null;
  }

  const nodes = only
    ? flow.ui.nodes.filter(({ group }) => group === only)
    : flow.ui.nodes;

  if (nodes.length === 0) {
    return null;
  }

  return <Panel>{children}</Panel>;
}

export default function Settings() {
  const [flow, setFlow] = useState<SelfServiceSettingsFlow>();

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
        .getSelfServiceSettingsFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data);
        })
        .catch(
          handleFlowError(
            router,
            "settings",
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
      .initializeSelfServiceSettingsFlowForBrowsers(
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(
        handleFlowError(
          router,
          "settings",
          router.query,
          setFlow,
          labels,
          toasts
        )
      );
  }, [flowId, router, router.isReady, returnTo, flow, toasts]);

  const onSubmit = (values: SubmitSelfServiceSettingsFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/settings?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .submitSelfServiceSettingsFlow(String(flow?.id), values)
          .then(({ data }) => {
            // The settings have been saved and the flow was updated. Let's show it to the user!
            toasts.success(labels.toasts.messages.settingsSaved);
            setFlow(data);
          })
          .catch(
            handleFlowError(
              router,
              "settings",
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
        <title>{labels.settings.title}</title>
      </Head>
      <Layout>
        <SettingsPanel only="profile" flow={flow}>
          <PanelTitle>{labels.settings.panels.profile.title}</PanelTitle>
          <Messages messages={flow?.ui.messages} />
          <Flow
            hideGlobalMessages
            onSubmit={onSubmit}
            only="profile"
            flow={flow}
          />
        </SettingsPanel>
        <SettingsPanel only="password" flow={flow}>
          <PanelTitle>{labels.settings.panels.password.title}</PanelTitle>

          <Messages messages={flow?.ui.messages} />
          <Flow
            hideGlobalMessages
            onSubmit={onSubmit}
            only="password"
            flow={flow}
          />
        </SettingsPanel>
        <SettingsPanel only="oidc" flow={flow}>
          <PanelTitle>{labels.settings.panels.oidc.title}</PanelTitle>

          <Messages messages={flow?.ui.messages} />
          <Flow
            hideGlobalMessages
            onSubmit={onSubmit}
            only="oidc"
            flow={flow}
          />
        </SettingsPanel>
        <SettingsPanel only="lookup_secret" flow={flow}>
          <PanelTitle>{labels.settings.panels.lookupSecret.title}</PanelTitle>
          <Messages messages={flow?.ui.messages} />
          <Text>{labels.settings.panels.lookupSecret.description}</Text>

          <Flow
            hideGlobalMessages
            onSubmit={onSubmit}
            only="lookup_secret"
            flow={flow}
          />
        </SettingsPanel>
        <SettingsPanel only="totp" flow={flow}>
          <PanelTitle>{labels.settings.panels.totp.title}</PanelTitle>
          <Text>{labels.settings.panels.totp.description}</Text>
          <Messages messages={flow?.ui.messages} />
          <Flow
            hideGlobalMessages
            onSubmit={onSubmit}
            only="totp"
            flow={flow}
          />
        </SettingsPanel>
        <SettingsPanel only="webauthn" flow={flow}>
          <PanelTitle>{labels.settings.panels.webauthn.title}</PanelTitle>
          <Messages messages={flow?.ui.messages} />
          <Text>{labels.settings.panels.webauthn.description}</Text>
          <Flow
            hideGlobalMessages
            onSubmit={onSubmit}
            only="webauthn"
            flow={flow}
          />
        </SettingsPanel>
        <Panel>
          <GoBack />
        </Panel>
      </Layout>
    </Box>
  );
}
