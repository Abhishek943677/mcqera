import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import Seo from "../../lib/seo";
import Layout from "../../components/Layout/Layout";
import { Analytics } from "@vercel/analytics/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Aos from "aos";
import "aos/dist/aos.css";

export default function App({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
    Aos.init();
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <UserProvider>
        <SessionProvider session={pageProps.session}>
          {/* seo */}
          <Seo />

          {/* layout */}
          <Layout>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </SessionProvider>
      </UserProvider>
    );
  }
}
