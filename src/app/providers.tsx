// app/providers.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "../../store/store";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  return (
    <Provider store={store}>
      {/* <CustomCursor /> */}
      {children}
    </Provider>
  );
}
