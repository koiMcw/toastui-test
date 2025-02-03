const path = require('path');

module.exports = {
    // 1. Entry : 번들링 시작점
    entry: {
        index : './src/main/resources/static/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname,'src/main/resources/static/out'),
        clean: true,
    },

}