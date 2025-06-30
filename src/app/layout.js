"use client";

import { Poppins, Roboto_Mono } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import CustomCursor from "@/components/customCursor";
import "./globals.css";

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
        <title>Nenad's portfolio</title>
      </head>
      <body className={`${poppins.variable} ${robotoMono.variable}`}>
        <Provider store={store}>
          <CustomCursor />
          {children}
        </Provider>
      </body>
    </html>
  );
}
