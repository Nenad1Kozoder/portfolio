module.exports = {
  globDirectory: ".next/static/",
  globPatterns: ["**/*.{js,css,woff,woff2,ico,png,svg,webp}"],
  swDest: "public/sw.js",
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: "StaleWhileRevalidate",
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com/,
      handler: "CacheFirst",
    },
  ],
};
