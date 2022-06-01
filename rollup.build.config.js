import { version } from './package.json';
import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

import compiler from '@ampproject/rollup-plugin-closure-compiler';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-typescript2';
import strip from '@rollup/plugin-strip';

export default {
    input: './src/TestShop.ts',
    plugins: [
        clear({ targets: ['public'] }),
        resolve(),
        copy({
            targets: [
                { src: 'assets/icons/**.*', dest: 'public' },
                { src: 'assets/resources/**.*', dest: 'public' },
                {
                    src: 'assets/index.html',
                    dest: 'public',
                    transform: (contents) => contents.toString().replace('{{version}}', version).replace('{{version}}', version)
                }
            ]
        }),
        typescript({ tsconfig: 'tsconfig.build.json' }),
        strip({ include: '**/*.ts' }),
        filesize({ showBrotliSize: true })
    ],
    output: [getOutput(2015), getOutput(2021)]
}

function getOutput(year) {
    return {
        entryFileNames: '[name].' + version + '.es' + year + '.js',
        dir: './public/',
        format: 'esm',
        plugins: [getCompiler(year)]
    }
}

function getCompiler(year) {
    return compiler({
        language_in: 'ECMASCRIPT_NEXT',
        compilation_level: 'ADVANCED',
        language_out: 'ECMASCRIPT_' + year
    })
}
