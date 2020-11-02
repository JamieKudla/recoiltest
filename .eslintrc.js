module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    settings: {
        react: {
          version: 'detect',
        },
    },
    parser: 'babel-eslint',
}