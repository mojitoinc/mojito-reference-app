/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "abs.twimg.com",
      "pbs.twimg.com",
      "s.gravatar.com",
      "lh3.googleusercontent.com",
      "c7.staticflickr.com",
      "placeimg.com",
      "cloudflare-ipfs.com",
      "loremflickr.com",
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
};
