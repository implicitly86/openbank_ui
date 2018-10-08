const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
    entry: './src/app/index.tsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                query: {
                    'ignoreDiagnostics': [
                        2403, // 2403 -> Subsequent variable declarations
                        2300, // 2300 Duplicate identifier
                        2374, // 2374 -> Duplicate number index signature
                        2375  // 2375 -> Duplicate string index signature
                    ]
                },
                exclude: [ /\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/ ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css']
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'src/public', to: __dirname + "/dist", ignore: ['*.styl']}
        ])
    ],
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.plugins = (config.plugins || []).concat([
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"development"',
                    BASE_API_URL: '"http://localhost"',
                    BASE_API_PORT: '"8080"'
                }
            })
        ])
    }
    if (argv.mode === 'production') {
        config.plugins = (config.plugins || []).concat([
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"',
                    BASE_API_URL: '"http://localhost"',
                    BASE_API_PORT: '"8080"'
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        ]);
        config.devtool = '#source-map';
        config.optimization = {
            minimize: true
        }
    }
    return config;
};
