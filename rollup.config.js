import typescript from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import resolve from '@rollup/plugin-node-resolve';

export default [{
        input: './src/TestShop.ts',
        plugins: [
            typescript(),
            resolve(),
            serve({
                contentBase: 'development',
                open: true,
                historyApiFallback: true,
                port: 10004
            }),
            livereload()
        ],
        output: {
            file: './development/dev.js',
            format: 'esm',
            sourcemap: 'inline'
        }
    }
]
