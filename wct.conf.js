module.exports = {
    verbose: true,
    plugins: {
        local: {
            browsers: ['chrome', 'firefox', 'safari']
        },
        sauce: {
            disabled: true
        }
    },
    suites: [
      'test/px-simple-horizontal-bar-chart-tests.html'
    ]
};
