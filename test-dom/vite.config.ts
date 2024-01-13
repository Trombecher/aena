// @ts-ignore
import {defineConfig, ESBuildOptions} from "vite";

export default defineConfig({
    esbuild: {
        jsxInject: "import {createElement as _0, Fragment as _1} from '../../src/jsx-runtime';"
    } satisfies ESBuildOptions
});