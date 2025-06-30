"use client";

import { Poppins, Roboto_Mono } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import CustomCursor from "@/components/customCursor";
import "./globals.scss";
import SWProvider from "./providers";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "600"],
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Nenad's portfolio</title>
      </head>
      <body className={`${poppins.variable} ${robotoMono.variable}`}>
        <SWProvider>
          <Provider store={store}>
            {/* <CustomCursor /> */}
            {children}
          </Provider>
        </SWProvider>
      </body>
    </html>
  );
}
