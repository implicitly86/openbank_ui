module.exports = {
    port: 8000,
    files: [
        'dist/**/*.{html,htm,css,js}'
    ],
    server: {
      baseDir: 'dist',
      middleware: {
        1: require('connect-history-api-fallback')({index: '/index.html', verbose: true})
      }
    }
};