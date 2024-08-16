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
          text_welcome_back:
            "Välkommen tillbaka till Pantry Partner, {{name}}!",
          text_welcome_back_message: "Vi tar dig till ditt skafferi.",
          text_welcome_user:
            "Vi är glada att ha dig här {{name}}. Vår applikation är designad för att göra det enklare och mer " +
            "effektivt att hantera ditt skafferi.",
          text_welcome_message_1:
            "Oavsett om du vill hålla koll på ditt skafferi, hitta nya recept eller minska matsvinnet, " +
            "är Pantry Partner här för att hjälpa dig.",
          text_welcome_message_2:
            "Utforska funktionerna och låt oss hjälpa dig att organisera och optimera ditt skafferi.",
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
          text_logged_in_as: "Inloggad som: ",
          text_search_placeholder: "Sök efter varor",
          button_search: "Sök",
          text_button_load_more: "Ladda fler resultat",
          text_button_save_item: "Spara",
          text_no_results: "Inga resultat hittades",
          text_expires_soon: "Nära utgångsdatum!",
          text_expired: "Utgånget",
          text_expires: "Utgår",
          text_quantity: "Antal",
          text_click: "Klicka på knappen nedan för att lägga till varor",
          text_recipes: "Recept baserade på dina varor",
          text_ingredients: "Tillgängliga ingredienser:",
          text_no_recipes: "Inga recept hittades",
          text_instructions: "Instruktioner",
          text_save_item: "Spara denna vara i ditt skafferi?",
          text_expiration_date: "Ange utgångsdatum",
        },
      },
      en: {
        translation: {
          text_welcome: "Welcome to Pantry Partner!",
          text_welcome_back: "Welcome back to Pantry Partner!",
          text_welcome_back_message: "We are taking you to your pantry.",
          text_welcome_user:
            "We’re thrilled to have you here {{name}}. Our application is designed to make managing your pantry " +
            "easier and more efficient.",
          text_welcome_message_1:
            "Whether you’re looking to keep track of your inventory, find new recipes, or reduce food waste, Pantry Partner is here to help.",
          text_welcome_message_2:
            "Explore the features, and let us assist you in organizing and optimizing" +
            "your pantry like never before.",
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
          text_button_save_item: "Save",
          text_search_placeholder: "Search for groceries",
          text_button_load_more: "Load more results",
          text_no_results: "No results found",
          text_expires_soon: "Expires soon!",
          text_expired: "Expired",
          text_expires: "Expires",
          text_quantity: "Quantity",
          text_click: "Click the button below to add items",
          text_recipes: "Recipes based on your pantry items",
          text_ingredients: "Available ingredients:",
          text_no_recipes: "No recipes found",
          text_instructions: "Instructions",
          text_save_item: "Save this item to your pantry?",
          text_expiration_date: "Set the expiration date",
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
