import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(LanguageDetector)
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["sv", "en"],
    fallbackLng: "sv",
    preload: ["sv", "en"],
    resources: {
      sv: {
        translation: {
          text_welcome: "Välkommen till Pantry Partner!",
          text_welcome_user:
            "Vi är glada att ha dig här {{name}}. Vår applikation är designad för att göra det enklare och mer " +
            "effektivt att hantera ditt skafferi.",
          text_intro: "Hantera livsmedel och minimera matsvinn",
          text_login_to_continue: "Logga in för att fortsätta",
          text_enter_your_email: "Ange din e-postadress",
          text_enter_your_password: "Ange ditt lösenord",
          text_login_credentials: "Logga in med uppgifter",
          text_or: "Eller",
          text_dont_have_account: "Har du inget konto?",
          text_signup: "Registrera dig",
          text_your_pantry: "Ditt skafferi",
          text_your_pantry_empty: "Ditt skafferi är tomt",
          text_add_items: "Lägg till varor i ditt skafferi",
          text_create_item: "Skapa en vara",
          text_search_items: "Sök efter varor",
          menu_pantry: "Skafferi",
          menu_recipes: "Recept",
          menu_search: "Sök",
          menu_admin: "Admin",
          menu_profile: "Profil",
          menu_sign_out: "Logga ut",
          button_search: "Sök",
          text_logged_in_as: "Inloggad som: ",
        },
      },
      en: {
        translation: {
          text_welcome: "Welcome to Pantry Partner!",
          text_welcome_user:
            "We’re thrilled to have you here {{name}}. Our application is designed to make managing your pantry " +
            "easier and more efficient.",
          text_intro: "Manage groceries and minimize food waste",
          text_login_to_continue: "Please log in to continue",
          text_enter_your_email: "Enter your email",
          text_enter_your_password: "Enter your password",
          text_login_credentials: "Login with credentials",
          text_or: "Or",
          text_dont_have_account: "Don't have an account?",
          text_signup: "Sign up",
          text_your_pantry: "Your pantry",
          text_your_pantry_empty: "Your pantry is empty",
          text_add_items: "Add items to your pantry",
          text_create_item: "Create item",
          text_search_items: "Search for items",
          menu_pantry: "Pantry",
          menu_recipes: "Recipes",
          menu_search: "Search",
          menu_admin: "Admin",
          menu_profile: "Profile",
          menu_sign_out: "Sign out",
          button_search: "Search",
        },
      },
    },
    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ",",
    },
    debug: true,

    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    react: {
      useSuspense: false,
    },
  });

i18n.changeLanguage("sv");

i18n.on("initialized", (options) => {
  console.log("i18next initialized", options);
});

i18n.on("loaded", (loaded) => {
  console.log("Loaded translations:", loaded);
});

i18n.on("failedLoading", (lng, ns, msg) => {
  console.error(`Failed loading ${ns} namespace for ${lng} language:`, msg);
});
export default i18n;
