let rootModules = require('./root-modules-list'),
    appModule = rootModules[0];

module.exports = {

    appModule: appModule,

    js: {
        src: '',
        dest: './src/{moduleName}/public'
    },

    // LESS config
    less: {
        src: './src/{moduleName}/main.less',
        dest: './src/{moduleName}/public/css'
    },

    // Icons config
    icons: {
        src: './src/{moduleName}/assets/images/icons/*',
        srcSvgStore: './src/{moduleName}/assets/images/icons/svgStore/*.svg',
        dest: './src/{moduleName}/assets/styles/',
        destSvgStore: './src/{moduleName}/public/image/',
        template: './config/icons-template',
        concat: 'icons.less'
    },

    // Fonts config
    fonts: {
        src: './src/{moduleName}/assets/fonts/*',
        dest: './src/{moduleName}/public/fonts'
    },

    // Browser Sync config
    bsync: {
        base: './src/' + appModule.name + '/public/',
        start: './'
    },

    // Watch config
    watch: {
        less: './src/**/**/*.less',
        html: './src/**/*.html',
        ts: './src/**/*.ts',
        icons: './src/**/assets/images/icons/*',
        svgStore: './src/**/assets/images/icons/svgStore/*.svg',
        fonts: './src/**/assets/fonts/*'
    },

    // Prod config
    prod: {
        html: {
            src: './src/{moduleName}/public/*.html',
            dest: './dist/{moduleName}'
        },
        css: {
            dest: './dist/{moduleName}/css'
        },
        image: {
            dest: './dist/{moduleName}/image'
        },
        js: {
            dest: './dist/{moduleName}'
        },
        fonts: {
            dest: './dist/{moduleName}/fonts'
        }
    },

    // Clean config
    clean: {
        dist: './dist',
        public: {
            css: './src/{moduleName}/public/css',
            js: './src/{moduleName}/public/js',
            fonts: './src/{moduleName}/public/fonts',
            image: './src/{moduleName}/public/image'
        }
    },

    // Plugins config
    plugins: {
        scope: ['dependencies', 'devDependencies', 'peerDependencies'],
        rename: {
            'gulp-autoprefixer': 'autoprefixer',
            'gulp-concat': 'concat',
            'gulp-ignore': 'ignore',
            'gulp-image-data-uri': 'uri',
            'gulp-less': 'less',
            'gulp-plumber': 'plumber',
            'gulp-rename': 'rename',
            'gulp-rimraf': 'rimraf',
            'gulp-sequence': 'sequence',
            'gulp-sourcemaps': 'sourcemaps',
            'gulp-svgmin': 'svgmin',
            'gulp-svgstore': 'svgstore',
            'gulp-cssmin': 'cssmin'
        }
    }
};