import Head from 'next/head';
import Script from 'next/script';

import '@/styles/tailwind.css';
import '@/styles/app.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-3QTC1NR6JK"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-3QTC1NR6JK');
        
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
