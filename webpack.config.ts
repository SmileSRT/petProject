import path from 'path';
import webpack from 'webpack';
import {EnvVars} from './types/buildWebpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';
import 'webpack-dev-server';

export default (env: EnvVars) => {

    const isDev = env.mode === 'development';

    const plugins = [
        new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
        new MiniCssExtractPlugin({filename: 'css/[name].[contenthash:8].css'}),
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv(),
    ];

    const modules = [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 
                'css-loader', 
                'sass-loader'
            ],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
            type: 'asset/resource',
        },
    ];

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'js/[name].[contenthash:8].js',
            assetModuleFilename: 'assets/[name][ext]',
            clean: true,
        },

        plugins: plugins,

        module: {
            rules: modules,
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },

        devtool: isDev && 'inline-source-map',

        devServer: isDev ? {
            port: env.port ?? 3000,
            static: './build',
        } : undefined,
    }

    return config;
};