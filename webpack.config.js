const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/app.ts",
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public/index.html", to: "" },
        { from: "public/style.css", to: "" },
        { from: "public/spectre.min.css", to: "" },
        { from: "public/spectre-exp.min.css", to: "" },
        { from: "public/spectre-icons.min.css", to: "" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "docs"),
  },
};
