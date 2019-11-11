import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import minify from "rollup-plugin-babel-minify";
import pkg from './package.json'

const date = (new Date()).toDateString();

const banner = `/**
 * ${pkg.name} v${pkg.version} build ${date}
 * ${pkg.homepage}
 * Copyright ${date.slice(-4)} ${pkg.author.name}, ${pkg.license}
 */`;

const production = (process.env.NODE_ENV === "production");
const globals = { three: "THREE" };
const extensions = [
    '.js', '.jsx', '.ts', '.tsx',
];

export const lib = {
    module: {
        input: "src/index.ts",
        external: Object.keys(globals),
        plugins: [
            resolve({
                extensions: extensions,
                customResolveOptions: {
                    moduleDirectory: 'src'
                }
            }),
            babel({
                extensions,
                include: ['src/**/*'],
                //runtimeHelpers: true,
            })
        ],
        output: {
            file: pkg.module,
            format: "esm",
            globals,
            banner
        }
    },

    main: {
        input: "src/index.ts",
        external: Object.keys(globals),
        plugins: [
            resolve({
                extensions: extensions,
                customResolveOptions: {
                    moduleDirectory: 'src'
                }
            }),
            babel({
                extensions,
                include: ['src/**/*'],
                //runtimeHelpers: true,
            })
        ],
        output: {
            file: pkg.main,
            format: "umd",
            name: pkg.name.replace(/-/g, "").toUpperCase(),
            globals,
            banner
        }
    },

    min: {
        input: "src/index.ts",
        external: Object.keys(globals),
        plugins: [
            resolve({
                extensions: extensions,
                customResolveOptions: {
                    moduleDirectory: 'src'
                }
            }),
            minify({
                bannerNewLine: true,
                comments: false
            }),
            babel({
                extensions,
                include: ['src/**/*'],
                //runtimeHelpers: true,
            })
        ],
        output: {
            file: pkg.main.replace(".js", ".min.js"),
            format: "umd",
            name: pkg.name.replace(/-/g, "").toUpperCase(),
            globals,
            banner
        }
    }
};
export default (production ? [
    lib.module, lib.main, lib.min,
] : [lib.module]);