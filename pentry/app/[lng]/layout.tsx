import type { Metadata } from "next";
import "../globals.css";
import React from "react";
import { inter } from "@/app/ui/fonts";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { dir } from "i18next";
import { languages } from "../i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: "Pantry Partner",
  description: "Manage groceries and minimize food waste",
};
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html
      lang={params.lng}
      dir={dir(params.lng)}
      className={`${inter.className} antialiased `}
    >
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <div>{children}</div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
