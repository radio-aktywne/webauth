import { config, createApiHandler } from "@ory/integrations/next-edge";

const baseUrl = process.env.WEBAUTH_AUTHGATE_URL || "http://localhost:20000";
const apiUrl = `${baseUrl}/authe`;

export { config };

export default createApiHandler({
  apiBaseUrlOverride: apiUrl,
  forceCookieDomain: process.env.WEBAUTH_COOKIE_DOMAIN || "localhost",
});
