// @ts-ignore
import {defineConfig, ESBuildOptions} from "vite";

export default defineConfig({
    esbuild: {
        jsxInject: "import {createElement, createFragment} from '../../src/jsx-runtime';"
    } satisfies ESBuildOptions
});