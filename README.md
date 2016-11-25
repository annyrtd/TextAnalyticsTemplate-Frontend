# Text Analytics Template

Boilerplate for a TA report. Prerequisites: 

1. You need to have [Git](https://git-for-windows.github.io/) installed
2. You need to have [NodeJS](https://nodejs.org/en/download) installed

It's going to evolve and be more automatized. Currently the setup involves:

- Node.JS
- Webpack
- Babel for ES6 transpilation
- PostCSS with Autoprefixer (for autoprefixing vendors), includes and CSSnext (for css custom-properties etc.) and cssnano (for CSS minification)
- JSDoc3 to auto-generate JSDoc documentation for JS that uses JSDoc comment syntax.

### Setup

To set this project up on your local machine open Terminal and navigate to the project folder you're going to install it into. 
Running the following command will clone the contents of this repo into your project folder and download all dependencies.

```
      git clone https://github.com/ConfirmitASA/TextAnalyticsTemplate-Frontend && cd TextAnalyticsTemplate-Frontend && npm install
```

### Commands

- `npm install` installs all dependencies of the project
- `npm run build` generates build files under `/dist` folder and starts watching all changes made to the project during this session, appending them to the build files
- `npm run docs` generates documentation for your project .js files that use JSDoc3 comments and publishes it to `http://ConfirmitASA.github.io/TextAnalyticsTemplate-Frontend/` 

### Customization

In `/src` folder you'll find:

- `main.js` which must include all imports (via `require("path/to/module.js")`) of JS modules for your project
- `main.css` which must include all imports (via `@import "path/to/module.css";`) of CSS modules for your project

Feel free to add or delete modules for your project 

All modules are broken into named folders which contains js and css files for those modules as well as any necessary scripts, etc. This pattern allows keeping all module-related files in one place.

Besides there are various modules that are included as dependencies in the project. Make sure that you read their documentation if you want to learn their implementation and use cases.
  
* `flexboxLayout`: https://github.com/ConfirmitASA/flexboxLayout,
* `r-hitlist`: https://github.com/ConfirmitASA/r-hitlist,
* `r-loading-animation`: https://github.com/ConfirmitASA/r-loading-animation,
* `r-reporal-base`: https://github.com/ConfirmitASA/r-reportal-base,
* `r-sort-table`: https://github.com/ConfirmitASA/r-sort-table,
* `r-table-hierarchy`: https://github.com/ConfirmitASA/r-table-hierarchy

### Committing

To make changes to this set-up fork, change, commit, and pull-request.


# Styling

### box-model.css

As a shorthand for layout containers, a this small css file provides with the simplest container classes.

- `.layout-wrapper` wraps the page area giving the margins on the side and a white content area in the center.
- `.box` placed inside `.layout-wrapper` provides a simple container
- `.heading` placed inside a `.box` will be styled as a box heading.

### Flexbox Layout System

This project uses flexboxLayout system extensively to leverage mobile adaptaion of Reportal layout. See [flexboxLayout docs](https://confirmitasa.github.io/flexboxLayout) for description and usecases

