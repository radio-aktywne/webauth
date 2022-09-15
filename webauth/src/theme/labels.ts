const labels = {
  description: "authentication web ui",
  index: {
    title: "webauth",
    buttons: {
      login: "Login",
      settings: "Settings",
      logout: "Logout",
    },
  },
  error: {
    title: "error · webauth",
    panel: {
      title: "An error occurred",
    },
  },
  login: {
    title: "login · webauth",
    panel: {
      title: {
        default: "Sign In",
        refresh: "Confirm Action",
        twoFactor: "Two-Factor Authentication",
      },
    },
  },
  recover: {
    title: "recover · webauth",
    panel: {
      title: "Recover your account",
    },
  },
  register: {
    title: "register · webauth",
    panel: {
      title: "Create account",
    },
  },
  settings: {
    title: "settings · webauth",
    panels: {
      profile: {
        title: "Profile Settings",
      },
      password: {
        title: "Change Password",
      },
      oidc: {
        title: "Manage Social Sign In",
      },
      lookupSecret: {
        title: "Manage 2FA Backup Recovery Codes",
        description:
          "Recovery codes can be used in panic situations where you have lost access to your 2FA device.",
      },
      totp: {
        title: "Manage 2FA TOTP Authenticator App",
        description:
          "Add a TOTP Authenticator App to your account to improve your account security.",
      },
      webauthn: {
        title: "Manage Hardware Tokens and Biometrics",
        description:
          "Use Hardware Tokens (e.g. YubiKey) or Biometrics (e.g. FaceID, TouchID) to enhance your account security.",
      },
    },
  },
  verify: {
    title: "verify · webauth",
    panel: {
      title: "Verify your account",
    },
  },
  goBack: "Go back",
  logOut: "Log out",
  signIn: "Sign in",
  copy: "Copy",
  copied: "Copied!",
  secretUsed: "Used",
  toasts: {
    titles: {
      error: "Error",
      warning: "Warning",
      success: "Success",
    },
    messages: {
      errorNotFound: "The error could not be found.",
      errorUnfetchable: "The error could not be fetched.",
      errorExpired: "The error id expired.",
      loggedIn: "Logged in!",
      registered: "Successfully registered!",
      settingsSaved: "Settings saved!",
      redirectNotAllowed: "The redirect address is not allowed.",
      flowExpired: "Your interaction expired.",
      securityViolation: "A security violation was detected.",
      identityMismatch: "The requested item as intended for someone else.",
      sessionInactive: "You need to sign in first.",
      invalidInput: "Input is invalid.",
      internalServerError: "An internal server error occurred.",
    },
  },
};

export type Labels = typeof labels;

export default labels;
