# Как пользоваться

## Импорт в проект Vue

1. `main.ts`

    ```ts
    import { createApp } from "vue";
    import App from "./App.vue";
    import init_ui from "vue_xable/ui/init";
    import init_directives from "vue_xable/directives/init";

    const app = createApp(App);
    //
    //
    // Импорт пользовательских директив  в глобальную область
    init_directives.map((i) => {
        app.directive(i.name, i);
    });
    // Импорт UI в глобальную область
    init_ui.map((i) => {
        app.component(i.name, i);
    });
    //
    //
    // Остальное
    app.use(store).mount("#app");
    ```

1. `tsconfig.json`

    ```ts
    {
        "compilerOptions": {
            "paths": {
                "vue_xable/*": [
                    "/ПУТЬ/vue_xable/*"
                ]
            },
        },
    }
    ```

1. `vue.config.js`

    ```ts
    const { defineConfig } = require("@vue/cli-service");
    const path = require("path");

    module.exports = {
        ...defineConfig({
            transpileDependencies: true,
        }),
        configureWebpack: {
            resolve: {
                alias: {
                    vue_xable: path.resolve(
                        "/ПУТЬ/vue_xable/"
                    ),
                },
            },
        },
    };
    ```
