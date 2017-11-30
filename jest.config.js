module.exports = {
    verbose: true,
    browser: true,
    setupFiles: ['./jest/setup'],
    'globals': {
        'NODE_ENV': 'test'
    },
    'moduleFileExtensions': [
        'js',
        'jsx'
    ],
    'moduleDirectories': [
        'node_modules',
        'lib'
    ],
    transform: {
        '^.+\\.js$': '<rootDir>/jest/transform.js',
        '^.+\\.(styl|css|scss|less)$': 'jest-css-modules'
    }
  }