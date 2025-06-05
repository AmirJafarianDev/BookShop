
import Layout from "@/components/layout/Layout";
import "./globals.css"
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {

  return (
    <html lang="fa" dir="rtl">
      <body >
      <Toaster position="top-center" reverseOrder={false} />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
