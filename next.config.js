const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const path = require('path');
const webpack = require('webpack');

module.exports = withCSS(withSass(withTypescript({
    webpack: (config, { dev }) => {
        config.node = {
            fs: 'empty',
        };
        config.resolve = {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                '@common': path.resolve(__dirname, 'src/common'),
                '@components': path.resolve(__dirname, 'src/components'),
                '@redux': path.resolve(__dirname, 'src/redux'),
                '@routes': path.resolve(__dirname, 'src/routes'),
                '@shared': path.resolve(__dirname, 'src/shared'),
                '@static': path.resolve(__dirname, 'src/static'),
                '@layouts': path.resolve(__dirname, 'src/layouts'),
                '@util': path.resolve(__dirname, 'src/util'),
            }
        };
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        });

        if (dev) {
            config.module.rules.push({
                test: /\.(ts|tsx)$/,
                loader: 'tslint-loader'
            });
        }

        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
            })
        );

        return config;
    },
    distDir: '../.next'
})));
