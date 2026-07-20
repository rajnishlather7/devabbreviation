/**
 * Each entry renders as a vertical step-by-step diagram on the "Lifecycles" tab.
 * To add a new lifecycle/mini-diagram, just push a new object here — the
 * renderer in js/lifecycle.js and the tab list build themselves from this array.
 *
 * Shape:
 * {
 *   id:       "unique-slug",      // stable id, used for tab selection
 *   title:    "Display title",
 *   tagline:  "short eyebrow line above the title",
 *   summary:  "1-2 sentence intro to the whole flow",
 *   steps: [
 *     {
 *       label:  "Short step name",       // required
 *       tag:    "OPTIONAL · mono badge", // e.g. related abbreviation(s) or command
 *       detail: "1-2 sentence plain-English explanation of this step"
 *     },
 *     ...
 *   ]
 * }
 */

const LIFECYCLES = [
  {
    id: "tls-cert",
    title: "TLS Certificate Lifecycle",
    tagline: "from key pair to revocation",
    summary: "How the 'magical blob of bytes' actually comes into being, gets trusted, gets used, and eventually dies.",
    steps: [
      {
        label: "Generate a key pair",
        tag: "openssl genrsa / genpkey",
        detail: "Create a private key (RSA or ECDSA). It never leaves the server — only the matching public key gets shared from here on.",
      },
      {
        label: "Create a CSR",
        tag: "CSR · PKCS#10",
        detail: "Bundle the public key plus identity info (CN, SAN entries) into a Certificate Signing Request and send it off to a CA.",
      },
      {
        label: "CA validates & signs",
        tag: "CA",
        detail: "The Certificate Authority checks that you actually control the domain/organization, then signs your public key.",
      },
      {
        label: "Certificate is issued",
        tag: "X.509 · PEM / DER · CRT",
        detail: "You get back an X.509-structured certificate — usually as base64 PEM text, sometimes raw DER bytes. A .crt file can hold either.",
      },
      {
        label: "Deploy on the server",
        tag: "SNI",
        detail: "Install the cert plus its chain up to the CA. SNI lets one server present the right certificate when several domains share an IP.",
      },
      {
        label: "Client validates trust",
        tag: "Trust store · SAN",
        detail: "The client walks the signature chain up to a CA it already trusts, and checks that a SAN entry matches the hostname it requested.",
      },
      {
        label: "Status gets checked",
        tag: "CRL / OCSP",
        detail: "Before and during use, the client (or a proxy) can check whether the CA has revoked the cert via a CRL or a live OCSP lookup.",
      },
      {
        label: "Renew or revoke",
        tag: "EOL",
        detail: "Certificates expire (often 90 days to a year) and need renewing — or get revoked early if the private key ever leaks.",
      },
    ],
  },

  {
    id: "oauth-auth-code",
    title: "OAuth 2.0 Authorization Code Flow",
    tagline: "delegated access, no shared passwords",
    summary: "The flow behind every 'Log in with Google/GitHub' button — a second example of the same reusable diagram format.",
    steps: [
      {
        label: "User clicks 'Log in with X'",
        tag: "Client app",
        detail: "The client redirects the browser to the authorization server's login page, with its client ID and requested scopes attached.",
      },
      {
        label: "User authenticates & consents",
        tag: "OAuth · Scopes",
        detail: "The user logs into the authorization server directly (the client never sees the password) and approves the requested scopes.",
      },
      {
        label: "Authorization code returned",
        tag: "Redirect URI",
        detail: "The authorization server redirects back to the client's registered URI with a short-lived, single-use authorization code.",
      },
      {
        label: "Client exchanges code for tokens",
        tag: "Token endpoint",
        detail: "The client calls the token endpoint server-to-server with the code plus its own client secret, out of the browser's sight.",
      },
      {
        label: "Access token issued",
        tag: "JWT / opaque token",
        detail: "The authorization server returns an access token (and usually a refresh token) scoped to what the user approved.",
      },
      {
        label: "Client calls the API",
        tag: "Bearer token",
        detail: "The client attaches the access token to API requests; the resource server validates it before returning data.",
      },
      {
        label: "Token expires, gets refreshed",
        tag: "Refresh token",
        detail: "Access tokens are short-lived by design. The client uses the refresh token to get a new one without bothering the user again.",
      },
    ],
  },
];
