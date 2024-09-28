const { ModuleFederationPlugin } = require('webpack').container
const { dependencies } = require('./package.json')

module.exports = {
  webpack: {
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: 'aggregator',
          remotes: {
            tc_spacon_mission_interface_microfrontend:
              'tc_spacon_mission_interface_microfrontend@http://localhost:3002/remoteEntry.js',
            sccf_system_supervisor_microfrontend:
              'sccf_system_supervisor_microfrontend@http://localhost:3003/remoteEntry.js'
          },
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
      ],
    },
  },
}
