module.exports = {
  displayName: 'client',
  preset: '../../jest.preset.js',
  transform: {
    '^.+.vue$': '@vue/vue3-jest',
    '.+.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'vue', 'js', 'json'],
  coverageDirectory: '../../coverage/apps/client',
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    'ts-jest': {
      tsconfig: 'apps/client/tsconfig.spec.json',
      babelConfig: 'apps/client/babel.config.js',
    },
    'vue-jest': {
      tsConfig: 'apps/client/tsconfig.spec.json',
      babelConfig: 'apps/client/babel.config.js',
    },
  },
};
