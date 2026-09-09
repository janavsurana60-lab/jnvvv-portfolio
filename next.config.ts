import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  // React's dev-mode debugger needs eval(); production never uses it.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/**
 * The Dulaar walkthrough is a static export of a separate project, bundled
 * under /public/dulaar-preview and embedded in an <iframe> on /work/dulaar so
 * visitors can click through the whole site without it being deployed. That
 * frame is same-origin, so the site-wide `frame-ancestors 'none'` +
 * `X-Frame-Options: DENY` would block it — this path gets its own headers that
 * permit same-origin framing and the pieces the export needs (self-hosted
 * fonts, its own inline styles/scripts, the embedded Google map).
 */
const dulaarPreviewCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  // the WebGL counter gallery pulls a label font from Google Fonts at runtime
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com",
  "worker-src 'self' blob:",
  "frame-src https://www.google.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const dulaarPreviewHeaders = [
  { key: "Content-Security-Policy", value: dulaarPreviewCsp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Overrides the catch-all above for the embedded walkthrough only.
        // Later match wins for duplicate header keys.
        source: "/dulaar-preview/:path*",
        headers: dulaarPreviewHeaders,
      },
    ];
  },
  async rewrites() {
    // The Dulaar export is a trailing-slash static build living under
    // /public/dulaar-preview. These run *after* the public-file check, so real
    // assets (_next, img) serve directly; only directory-style routes fall
    // through to their index.html here.
    return [
      { source: "/dulaar-preview", destination: "/dulaar-preview/index.html" },
      {
        source: "/dulaar-preview/:path+",
        destination: "/dulaar-preview/:path+/index.html",
      },
    ];
  },
};

export default nextConfig;
