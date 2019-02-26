const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProd ? './' : '/',
  tsCustomTransformers: {
    // NOTE this is conflict with reflect-metadata
    // before: ['@axew/jugg-plugin-react/lib/ts-rhl-transformer']
  },
  define: {
    PRODUCTION: isProd,
  },
  chunks: true,
  webpack: ({config}) => {
    config.resolve.alias
      .set('utils', './src/utils');
  }
};
