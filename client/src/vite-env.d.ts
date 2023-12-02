/// <reference types="vite/client" />
declare module 'vue3-typer'
declare module "*.vue" {
    import { DefineComponent } from "vue";
    export default DefineComponent<{}, {}, any>;
}