const path = require('path');

module.exports = {
    entry: {
      checkoutButton: './CheckoutButton.js', // notice the './'
      sessionNav: './session_nav.js' // notice the './'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    mode: 'development' // you can also set this to 'production' when you're ready to deploy
}
