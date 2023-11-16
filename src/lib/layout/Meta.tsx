import { Helmet } from 'react-helmet';

const APP_NAME = 'IndieMart';
const APP_DESCRIPTION = 'IndieMart - Mau Beli apa dahhhh.';

const Meta = () => {
  return (
    <Helmet>
      <title>{APP_NAME}</title>
      <meta name="description" content={APP_DESCRIPTION} />

      <meta name="application-name" content={APP_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#FFFFFF" />

      <link rel="shortcut icon" href="/assets/favicon.svg" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  );
};

export default Meta;
