`{
  "extends": ["tslint-config-standard", "tslint-react"],
  "rules": {
    "array-type": false,
    "interface-name": [true, "never-prefix"],
    "max-classes-per-file": false,
    "no-bitwise": false,
    "no-console": false,
    "no-reference": false,
    "interface-over-type-literal": false,
    "object-literal-sort-keys": false,
    "ordered-imports": false,
    "jsx-no-lambda": false,
    "jsx-no-multiline-js": false,
    "tsx-no-multiline-ts": false,
    "semicolon": false,
    "indent": false,
    "typedef-whitespace": [false],
    "whitespace": false,
    "no-consecutive-blank-lines": false,
    "quotemark": false,
    "space-before-function-paren": false
  },
  "linterOptions": {
    "exclude": [
      "config/**/*.js",
      "node_modules/**/*.ts",
      "coverage/lcov-report/*.js"
    ]
  }
}`
