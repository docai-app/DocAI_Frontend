// web/config/config.ts
extraBabelPlugins: [
    ['babel-plugin-istanbul',  {
      "exclude": ["**/.umi", "**/locales"]
    }],
  ],