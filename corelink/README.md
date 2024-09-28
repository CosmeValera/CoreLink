# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Microfrontends

This React application accepts microfrontends exposed in remote React applications and components.

To achieve this, the application uses the ModuleFederation webpack plugin. This plugin extends the native JavaScript module system to use "remote" modules that are not present in the host but can be accessed over the network.

> A React Application created with [create-react-app](https://create-react-app.dev/) has an underlying, pre-configured webpack. To add this plugin, this webpack needs to be modified. CRA allows for "ejection" of this internal configuration, but this is a permanent action that results in the need to maintain a forked or ejected version of CRA. To circumvent this complexity, the [craco](https://craco.js.org/) module is employed. It permits the reconfiguration of webpack without endangering the internal webpack setup.

As illustrated in [craco.config.js](./craco.config.js), the plugin was added, adding the possibility to register remote React applications (that applications needs to generate a `remoteEntry.js`) :

```js
new ModuleFederationPlugin({
  name: 'aggregator',
  remotes: {
    iov_react_microfrontend_example: // 👈🏻 The remote module name
      'iov_react_microfrontend_example@http://localhost:3001/remoteEntry.js', // 👈🏻 The remote module name and the route to the react application that exposes the remote entry point.
  },
  // Shared modules are dependencies that can be shared between this host and the remote react application.
  shared: {
    react: {
      singleton: true,
      requiredVersion: dependencies['react'],
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
  },
}),
```

In the remote React applications, that `remoteEntry.js` acts as a manifest or entry point for the host application, clarifying which modules are available in the remote application. It's generated during the build process and is crucial for the asynchronous loading of components from the remote application.

Like we can see in the component [MicrofrontendExample](./src/Panels/MicrofrontendExample/index.js), we need to use `React.lazy` method to import that remote module. That loads the remote entry point at the first remote application render:

```js
import React, { Suspense } from 'react'

// Async react component
// - iov_react_microfrontend_example: The remote module.
// - App: The main component exposed by that remote React application.
const IovMicrofrontendExampleApp = React.lazy(() =>
  import('iov_react_microfrontend_example/App'),
)

const MicrofrontendExample = (props) => {
  return (
    <Suspense fallback="Loading...">
      <IovMicrofrontendExampleApp {...props} />
    </Suspense>
  )
}

export default MicrofrontendExample
```

More information:

- [React.lazy](https://react.dev/reference/react/lazy).
- [Suspense component](https://react.dev/reference/react/Suspense).

### Remote React applications (microfrontends)

In the remote application, ModuleFederation plugins needs to be used to generate that file and expose that `App` component:
As illustrated in craco.config.js example, the plugin was added, exposing the application in a file named `remoteEntry.js`:

```js
new ModuleFederationPlugin({
  name: 'iov_react_microfrontend_example', // 👈🏻 The remote module name
  exposes: {
    './App': './src/App', // 👈🏻 The main react component, exposed as part of this module
  },
  filename: 'remoteEntry.js', // 👈🏻 The remote entry point. It will be automatically generated.
  shared: {
    react: { singleton: true, requiredVersion: dependencies['react'] },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
  },
})
```
