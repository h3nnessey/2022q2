const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
    mode: mode,
    devtool: mode === 'production' ? false : 'eval',
    entry: ['./src/index.js', './src/css/style.css'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'App.js',
        assetModuleFilename: './assets/[name][ext]',
        clean: true,
    },
    devServer: {
        open: true,
        port: 8080,
        client: {
            overlay: true,
            progress: true,
        },
        liveReload: true,
        watchFiles: ['src/*.html'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg|mp3)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/assets/sounds'),
                    to: path.resolve(__dirname, 'dist/assets/sounds'),
                },
                {
                    from: path.resolve(__dirname, './src/assets/favicon.ico'),
                    to: path.resolve(__dirname, 'dist/assets/favicon.ico'),
                },
                {
                    from: path.resolve(__dirname, './src/js/quotes_en.json'),
                    to: path.resolve(__dirname, 'dist/assets/quotes_en.json'),
                },
                {
                    from: path.resolve(__dirname, './src/js/quotes_ru.json'),
                    to: path.resolve(__dirname, 'dist/assets/quotes_ru.json'),
                },
            ],
        }),
    ],
    optimization: {
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
        minimize: mode === 'production' ? true : false,
    },
};
