const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const SvgSpriteHtmlWebpackPlugin = require('./lib/svg-sprite-html-webpack');

dotenv.config();

module.exports = (env, { mode = 'development' }) => {
    const isProduction = mode === 'production';

    return {
        mode,
        entry: ['babel-polyfill', './src/main.js'],
        output: {
            filename: 'js/[name].js?v=[contenthash:8]',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        target: isProduction ? ['web', 'es5'] : undefined,
        devtool: !isProduction ? 'source-map' : false,
        optimization: {
            minimizer: [
                new TerserJSPlugin({}),
                new OptimizeCSSAssetsPlugin({}),
            ],
            // splitChunks: {
            //     cacheGroups: {
            //         vendor: {
            //             test: /\/node_modules\//,
            //             name: 'vendor',
            //             chunks: 'all'
            //         }
            //     }
            // }
        },
        devServer: {
            hot: true,
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': path.resolve('src'),
                '@@': path.resolve('./'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        ...isProduction
                            ? [MiniCssExtractPlugin.loader]
                            : ['style-loader'],
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProduction,
                            },
                        },
                        ...isProduction
                            ? [{
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        plugins: isProduction ? [
                                            [
                                                autoprefixer({
                                                    overrideBrowserslist: ['last 100 versions'],
                                                }),
                                            ],
                                        ] : [],
                                    },
                                    sourceMap: !isProduction,
                                },
                            }]
                            : [],
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        ...isProduction
                            ? [MiniCssExtractPlugin.loader]
                            : ['style-loader'],
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProduction,
                            },
                        },
                        ...isProduction
                             ? [{
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        plugins: isProduction ? [
                                            [
                                                autoprefixer({
                                                    overrideBrowserslist: ['last 100 versions'],
                                                }),
                                            ],
                                        ] : [],
                                    },
                                    sourceMap: !isProduction,
                                },
                            }]
                            : [],
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: !isProduction,
                            },
                        },
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif)(\?.*)?$/,
                    type: 'asset/resource',
                    generator:  {
                        filename: 'images/[name][ext]?v=[contenthash:8]',
                    },
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext]?v=[contenthash:8]',
                    },
                },
                {
                    test: /\.svg$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name][ext]?v=[contenthash:8]',
                    },
                    use: 'svgo-loader',
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: true,
                __VUE_PROD_DEVTOOLS__: false,
                'process.env': {
                    API_URL: JSON.stringify(process.env.API_URL),
                },
            }),
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                minify: isProduction ? {
                    html5: true,
                    removeEmptyAttributes: true,
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true
                } : false
            }),
            new SvgSpriteHtmlWebpackPlugin({
                includeFiles: [
                    'src/images/sprite-svg-icons/*.svg',
                ],
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'static',
                        to: 'static',
                        noErrorOnMissing: true,
                        globOptions: {
                            ignore: ['**/.gitkeep'],
                        },
                    }
                ],
            }),
            ...isProduction
                ? [
                    new MiniCssExtractPlugin({
                        filename: 'css/[name].css?v=[contenthash:8]'
                    }),
                    new CleanWebpackPlugin(),
                ]
                : []
        ]
    };
};
