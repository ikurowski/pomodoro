module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react/no-unstable-nested-components': [
      'warn',
      {
        allowAsProps: true,
      },
    ],
  },
};
