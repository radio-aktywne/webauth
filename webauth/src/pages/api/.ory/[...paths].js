import { config, createApiHandler } from "@ory/integrations/next-edge";

const apiUrl = process.env.WEBAUTH_AUTHE_URL || "http://localhost:21000";

export { config };

export default createApiHandler({
  apiBaseUrlOverride: apiUrl,
});
