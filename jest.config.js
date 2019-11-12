module.exports = {
    verbose: true,
    collectCoverageFrom: ['src/**/*.js'],
    setupFilesAfterEnv: [
        './src/jestMatcher.js',
    ],
};
