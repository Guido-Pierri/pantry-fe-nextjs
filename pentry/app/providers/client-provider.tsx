"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import Loading from "@/app/loading";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    i18n.init().then(() => setIsInitialized(true));
  }, []);

  if (!isInitialized) {
    return <Loading />;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
