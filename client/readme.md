## Componentes reutilizables en la app

## Loader

1. Importamos **useLoader** de `context/LoaderProvider`, ejemplo:

`import { useLoader } from '../../../context/LoaderProvider'`

2. Desestructuramos **addLoading** y **removeLoading** :

`const { addLoading, removeLoading } = useLoader()`

3. Se utiliza cuando realizamos alguna solicitud al back, al inicio: `addLoading()` y cunado ya esta la respuesta ok: `removeLoading()`

Como esta en un contexto que engloba a toda la app, se puede utilizar en todos los componentes.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`

- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`

- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
