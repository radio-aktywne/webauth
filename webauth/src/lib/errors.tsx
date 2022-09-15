import { AxiosError } from "axios";
import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { ParsedUrlQuery } from "querystring";
import { ToastsContext } from "../contexts/toasts";
import { Labels } from "../theme/labels";

// A small function to help us deal with errors coming from fetching a flow.
export default function handleFlowError<S>(
  router: NextRouter,
  page: "login" | "recover" | "register" | "settings" | "verify",
  query: ParsedUrlQuery,
  setFlow: Dispatch<SetStateAction<S | undefined>>,
  labels: Labels,
  toasts: ToastsContext
) {
  return async (err: AxiosError) => {
    switch (err.response?.data.error?.id) {
      case "session_aal2_required":
        // 2FA is enabled and enforced, but user did not perform 2fa yet!
        window.location.href = err.response?.data.redirect_browser_to;
        return;
      case "session_already_available":
        // User is already signed in, let's redirect them!
        if ("return_to" in query)
          window.location.href = Array.isArray(query.return_to)
            ? query.return_to[0]
            : query.return_to;
        else await router.push("/");
        return;
      case "session_refresh_required":
        // We need to re-authenticate to perform this action
        window.location.href = err.response?.data.redirect_browser_to;
        return;
      case "self_service_flow_return_to_forbidden":
        // The flow expired, let's request a new one.
        toasts.error(labels.toasts.messages.redirectNotAllowed);
        setFlow(undefined);
        await router.push("/" + page);
        return;
      case "self_service_flow_expired":
        // The flow expired, let's request a new one.
        toasts.error(labels.toasts.messages.flowExpired);
        setFlow(undefined);
        await router.push("/" + page);
        return;
      case "security_csrf_violation":
        // A CSRF violation occurred. Best to just refresh the flow!
        toasts.error(labels.toasts.messages.securityViolation);
        setFlow(undefined);
        await router.push("/" + page);
        return;
      case "security_identity_mismatch":
        // The requested item was intended for someone else. Let's request a new flow...
        toasts.error(labels.toasts.messages.identityMismatch);
        setFlow(undefined);
        await router.push("/" + page);
        return;
      case "browser_location_change_required":
        // Ory Kratos asked us to point the user to this URL.
        window.location.href = err.response.data.redirect_browser_to;
        return;
      case "session_inactive":
        // Tried to access some resource available only to signed-in users.
        toasts.error(labels.toasts.messages.sessionInactive);
        await router.push("/");
        return;
    }

    switch (err.response?.status) {
      case 400:
        if (!err.response?.data?.error) {
          // Bad request without an error field is a form validation error
          toasts.error(labels.toasts.messages.invalidInput);
          setFlow(err.response?.data);
          return;
        }
        break;
      case 410:
        // The flow expired, let's request a new one.
        toasts.warning(labels.toasts.messages.flowExpired);
        setFlow(undefined);
        await router.push("/" + page);
        return;
      case 500:
        // Internal Kratos error
        toasts.error(labels.toasts.messages.internalServerError);
        setFlow(undefined);
        await router.push("/" + page);
        return;
    }

    if (err.response?.data?.error?.reason) {
      // If there is a reason for this error, let's display it and redirect to the main page.
      toasts.error(err.response?.data?.error?.reason);
      await router.push("/");
      return;
    }

    // We are not able to handle the error? Return it.
    return Promise.reject(err);
  };
}
