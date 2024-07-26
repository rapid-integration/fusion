import { type DictionaryMap } from "~/lib/i18n";

export const dict: DictionaryMap = {
  continue: "Continue",
  pages: {
    404: {
      title: "Page not found",
      header: "This page does not exist",
      paragraph: "Sorry, we couldn't find the page you're looking for.",
      back: "Go home",
    },
    login: {
      title: "Sign in",
      header: "Log in to your account",
      footer:
        "Your name and avatar are displayed to users who invite you to a workspace using your email. By continuing, you acknowledge that you understand and agree to the Terms & Conditions and Privacy Policy.",
      form: {
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
          required: "Please enter your password.",
          minLength: "Your password must have 8 characters or more.",
        },
      },
      errors: {
        401: "Incorrect password",
        404: "User with such email not found",
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
};

export default dict;
