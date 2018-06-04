import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

let plugins
    
const babelConfig = {
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [['env', { modules: false }]],
    plugins: ['external-helpers']
}

if (process.env.DEVELOPMENT) {
    plugins = [
        resolve(),
        commonjs(),
        babel(babelConfig)
    ]
} else {
    plugins = [
        resolve(),
        commonjs(),
        uglify({
            compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true,
                reduce_funcs: false
            },
            mangle: {
                toplevel: true
            }
        }),
        babel(babelConfig)
    ]
}

export default {
    entry: 'src/index.js',
    output: [
        {
            file: './dist/img-size.umd.js',
            format: 'umd',
            name: 'imgSize'
        },
        {
            file: './dist/img-size.min.js',
            format: 'cjs'
        }
    ],
    plugins,
    external: [],
    watch: {
        include: 'src/**'
    }
}
