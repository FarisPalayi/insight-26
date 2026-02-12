# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


- [x] favicon
- [x] events loader scroll bottom shows home page
- [x] add contacts link to the home page
- [x] add maps links
- [x] add actual map links
- [x] add venue link and page 

- [x] add registration
- [x] add venue photos
- [x] event cards showing venueId instead of venue full name
- [x] add both days
- [x] home page events can't be changed

- [x] update accordion content
- [x] spot registration info 
- [x] remove gsap dependencies (unused)
- [x] compress video
- [x] reload bar not showing in mobile
- [-] create webm video
- [x] don't show registration link if event is free
- [x] in event detail page - spot registration, and free registration
- [x] view fullmap should expand it fully
- [x] remove the unnecessary label in embed map

- [] update social media links(in the footer and stuff)
- [] add brochure link
- [] meta tags
- [] event page images are bandwidth heavy and large

- [x] logo spacing
- [x] hero page events icon change
- [x] schedule page showing already shown page more than once
- [x] add analytics
- [] add venue section page

- [] host fonts
- [x] sponsor db connect
- [x] laggy carousal. check if chunk splitting is working
- [x] loading page
- [x] event card and page redesign
- [x] hero section problems
