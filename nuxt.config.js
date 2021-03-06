require('dotenv').config();

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Aplicación CCS Diken',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/global.css',
    '@/assets/css/transitions.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    '@/plugins/products.js',
    '@/plugins/dates.js',
    {src: '@/plugins/qr-reader.js', mode: 'client'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
    '@nuxtjs/style-resources'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  styleResources: {
    scss: ['./assets/scss/*.scss']
  },
  axios: {
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        maxAge: 6000
      }
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: process.env.URL_RA_BACKEND +'auth/login', method: 'post', propertyName: 'data.access_token' },
          logout: { url: process.env.URL_RA_BACKEND +'auth/logout', method: 'post' },
          user: { url: process.env.URL_RA_BACKEND +'auth/me', method: 'get', propertyName: 'data.user' }
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
