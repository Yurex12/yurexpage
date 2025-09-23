import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import "overlayscrollbars/overlayscrollbars.css";
import "./globals.css";

import { Toaster } from "react-hot-toast";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yurex page",
  description: "Share your mind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.className} h-dvh text-sm break-words text-gray-600 antialiased md:text-base`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toasterId="default"
            toastOptions={{
              // Define default options
              className: "",
              duration: 2000,

              style: {
                background: "#fff",
                color: "#202124",
              },

              // Default options for specific types
              success: {
                duration: 3000,
              },
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
