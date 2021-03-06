module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "mocha"
  ],
  "rules": {
    "arrow-body-style": [
      "error",
      "as-needed"
    ],
    "camelcase": 0,
    "class-methods-use-this": 0,
    "max-len": 0,
    "new-cap": 0,
    "no-use-before-define": [
      "error",
      {
        "functions": false,
        "classes": true
      }
    ],
    "no-useless-escape": 0,
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
    "import/prefer-default-export": 0,
    "guard-for-in": 0,
    "indent": [
      "error",
      2
    ],
    "mocha/no-exclusive-tests": "error",
    "no-unreachable": "warn",
    "consistent-return": 0
  },
  "env": {
    "browser": false,
    "mocha": true,
    "node": true
  }
};
