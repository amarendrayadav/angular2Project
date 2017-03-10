// Helper: root() is defined at the bottom
let path = require('path');
let webpack = require('webpack');

// Webpack Plugins
let autoprefixer = require('autoprefixer');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
let ENV = process.env.npm_lifecycle_event;
let isTest = ENV === 'test';
let isProd = ENV === 'build';


module.exports = function makeWebpackConfig() {
    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    let config = {};

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    // config.devtool = 'source-map';

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     */
    // config.entry = {
    //     'ng-app': './src/nc-components-showcase/ng-app.ts', // our angular app
    //     'ng': './src/nc-components-showcase/ng.ts',
    //     'ng-polyfills': './src/nc-components-showcase/ng-polyfills.ts'
    // };

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     */
    config.output = {
        // path: root('src/public/js'),
        // publicPath: (isProd) ? './' : 'http://localhost:9000/',
        filename: 'js/[name].js', //isProd ? 'js/[name].[hash].js' : 'js/[name].js',
        chunkFilename: '[id].chunk.js' //isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
    };

    /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    config.resolve = {
        // only discover files that have those extensions
        extensions: ['.ts', '.js', '.json', '.html'],
    };

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    config.module = {
        rules: [
            // Support for .ts files.
            {
                test: /\.ts$/,
                // loaders: ['awesome-typescript-loader?', 'angular2-template-loader'],
                loaders: ['awesome-typescript-loader?', 'angular2-template-loader'],
                exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },
            {
                test: /\.html$/, loader: 'raw-loader',
                exclude: [root('src', 'public'), /node_modules\/(?!(ng2-.+))/]
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "raw-loader"
                    },
                    {
                        loader: "markdown-loader"
                    }
                ]
            }
        ]
    };



    config.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ];

    if (isProd) {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({mangle: true})
        );
    }

    return config;
}();

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    console.log(path.join.apply(path, [__dirname].concat(args)));
    return path.join.apply(path, [__dirname].concat(args));
}