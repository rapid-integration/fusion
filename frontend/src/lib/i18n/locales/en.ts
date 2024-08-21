import { type DictionaryMap } from "~/lib/i18n";

export const dict: DictionaryMap = {
  routes: {
    404: {
      title: "Page not found",
      heading: "This page does not exist",
      paragraph: "Sorry, we couldn't find the page you're looking for.",
      back: "Take me home",
    },
    login: {
      title: "Sign in",
      heading: "Log in to your account",
      form: {
        fields: {
          email: {
            label: "Email",
            placeholder: "Enter your email address…",
            description: "Use an organization email to easily collaborate with teammates.",
            required: "Please enter your email.",
            error: "The email address is badly formatted.",
          },
          password: {
            label: "Password",
            placeholder: "Enter your password…",
            description: "Passwords are encrypted.",
            forgot: "Forgot your password?",
            required: "Please enter your password.",
            minLength: "Your password must have 8 characters or more.",
          },
        },
        errors: {
          401: "Incorrect password",
          404: "User with such email not found",
        },
        submit: "Log in",
      },
      footer:
        "Your name and avatar are displayed to users who invite you to a workspace using your email. By continuing, you acknowledge that you understand and agree to the Terms & Conditions and Privacy Policy.",
    },
    resetPassword: {
      title: "Reset password",
    },
    settings: {
      heading: "Settings",
      sections: {
        personal: {
          heading: "Personal",
          fields: {
            avatar: {
              heading: "Avatar",
              description: "Profile picture visible to everyone.",
            },
            email: {
              heading: "Email",
              change: "Change email",
            },
            password: {
              heading: "Password",
              description: "Permanent password to login to your account.",
              change: "Change password",
            },
          },
        },
        appearance: {
          heading: "Appearance",
          fields: {
            language: {
              heading: "Language",
              description: "Change the language used in the user interface.",
            },
            theme: {
              heading: "Theme",
              options: {
                light: "Light",
                dark: "Dark",
                night: "Night",
                system: "System",
              },
            },
          },
        },
        danger: {
          heading: "Danger",
          fields: {
            logout: {
              heading: "Sign out",
              description: "Logout from this account on this device.",
              action: "Logout",
            },
            deactivate: {
              heading: "Close account",
              description: "Delete your account and all the data.",
              action: "Delete my account",
            },
          },
        },
      },
    },
  },
  steps: {
    resetPassword: {
      email: {
        heading: "Password Recovery",
        back: "Back to login form",
      },
      password: {
        heading: "Change Password",
        paragraph: "You are setting a new password for ",
        form: {
          fields: {
            password: {
              label: "New password",
              placeholder: "Enter your new password…",
              description: "Regularly update your passwords for added security.",
              required: "Please enter your new password.",
              minLength: "Your new password must be at least {{ length }} characters long.",
            },
            confirm: {
              label: "Confirm new password",
              placeholder: "Re-enter your new password…",
              description: "Make sure both entered passwords match.",
              required: "Please re-enter your new password.",
              minLength: "The confirmation password must be at least {{ length }} characters long.",
            },
          },
          errors: {
            mismatch: "The entered passwords don't match!",
            unknown: "Something went wrong. Try all the steps again.",
          },
          submit: "Update my password",
          success: "Password changed successfully.",
        },
      },
    },
    verification: {
      email: {
        label: "Email",
        placeholder: "Enter your email address…",
        description:
          "Enter the email address associated with your account and we'll send you a message with further instructions.",
        required: "We need your email address to send you a verification code.",
        error: "The email address is badly formatted.",
        submit: "Send verification code",
        notExists: "There is no user with this email address!",
      },
      otp: {
        heading: "Verification",
        sent: "We’ve sent an e-mail with verification code to your inbox: ",
        resend: "Re-send code",
        sending: "We’re sending an e-mail with verification code to your inbox: ",
        uncomplete: "Please enter the code completely.",
        incorrect: "The code you entered is incorrect!",
      },
    },
  },
  slogan: {
    share: "Share it",
    analyze: "Analyze it",
    design: "Design it",
    enjoy: "Enjoy it",
    explore: "Explore it",
  },
  sessionExpired: "Your session has expired!"
};

export default dict;
