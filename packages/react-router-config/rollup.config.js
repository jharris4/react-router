import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

const config = {
  input: "modules/index.js",
  output: {
    name: "ReactRouterConfig",
    globals: {
      react: "React",
      "react-router/Switch": "ReactRouter.Switch",
      "react-router/Redirect": "ReactRouter.Redirect",
      "react-router/Router": "ReactRouter.Router",
      "react-router/Route": "ReactRouter.Route",
      "react-router/matchPath": "ReactRouter.matchPath",
      "react-router/generatePath": "ReactRouter.generatePath"
    }
  },
  external: [
    "react",
    "react-router/Switch",
    "react-router/Redirect",
    "react-router/Router",
    "react-router/Route",
    "react-router/matchPath",
    "react-router/generatePath"
  ],
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: ["../../node_modules", "../node_modules"]
      }
    }),
    commonjs({
      include: /node_modules/
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(uglify());
}

export default config;
