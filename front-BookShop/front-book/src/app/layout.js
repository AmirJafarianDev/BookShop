
import Layout from "@/components/layout/Layout";
import "./globals.css"

export default function RootLayout({ children }) {

  return (
    <html lang="fa" dir="rtl">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
