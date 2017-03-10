"use strict";

const config = require('./config/gulpconfig');

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')(config.plugins);
let bsync = require('browser-sync').create();
let webpackStream = require('webpack-stream-fixed');
let webpackConfig = require('./webpack.config');
let webpack = require('webpack');
let extend = require('util')._extend;
let path = require('path');
let historyFallback = require('connect-history-api-fallback');

// Aggregators
let rootModules = require('./config/root-modules-list');

// Task generators
let taskGenerators = {
    'less': getLessTask,
    'icons': getIconsTask,
    'svgstore': getSvgIconsTask,
    'fonts': getFontsTask,
    'js:prod': getJSProdTask,
    'less:prod': getLessProdTask,
    'svgstore:prod': getSvgIconsProdTask,
    'fonts:prod': getFontsProdTask,
    'html:prod': getHtmlProdTask,
    'clean:public': getCleanPublicTask
};

// Module name regex
let moduleNameRegEx = new RegExp('{moduleName}', 'g');



// GENERATED TASKS
// LESS tasks
generateTask('less');
generateTask('less:prod');

// Img tasks
generateTask('icons');
generateTask('svgstore');
generateTask('svgstore:prod');

// Fonts tasks
generateTask('fonts');
generateTask('fonts:prod');

// HTML tasks
generateTask('html:prod');

// JS tasks
generateTask('js:prod', true);

// Clean tasks
generateTask('clean:public');


// SIMPLE TASKS
// Watchers
gulp.task('watch', ['bsync'], () => {
    gulp.watch(config.watch.less, ['less']);
    gulp.watch(config.watch.icons, ['icons']);
    gulp.watch(config.watch.svgStore, ['svgstore']);
    gulp.watch(config.watch.fonts, ['fonts']);
});


// Browser Sync
gulp.task('bsync', ['icons', 'svgstore', 'less', 'fonts'], () => {
    bsync.init({
        server: {
            baseDir: config.bsync.base,
            middleware: [
                historyFallback()
            ]
        },
        startPath: config.bsync.start
    });
});



// JS tasks
gulp.task('js', () => {

    // Set entry points to webpack config
    let webpackWatchConfig = extend(webpackConfig, {
        entry: config.appModule.entry,
        watch: true,
        devtool: 'source-map'
    });

    return gulp.src(config.js.src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest(config.js.dest.replace(moduleNameRegEx, config.appModule.name)))
        .pipe(bsync.stream())

});


// Clean tasks
gulp.task('clean:dist', () => {
    return gulp.src(config.clean.dist)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.rimraf())
});



//Copy ng resources
// gulp.task('copyNgResources', ['js'], function () {
//     return gulp.src(config.copyNg.src)
//         .pipe(plugins.plumber({
//             errorHandler: onPlumberError
//         }))
//         .pipe(gulp.dest(config.copyNg.dest));
// });



//General tasks
gulp.task('default', ['watch', 'js']);
gulp.task('prod', plugins.sequence('icons', ['less:prod', 'fonts:prod', 'html:prod', 'js:prod', 'svgstore:prod']));
gulp.task('clean', ['clean:dist', 'clean:public']);


/*HELPERS*/
process.on('uncaughtException', (err) => {
    console.error(err.message, err.stack, err.errors);
    process.exit(255);
});

gulp.on('err', (gulpErr) => {
    if (gulpErr.err) {
        console.error("Gulp error details", [gulpErr.err.message, gulpErr.err.stack, gulpErr.err.errors].filter(Boolean));
    }
});

function onPlumberError(error) {
    console.log(error);
    this.emit('end');
}


// Task generator
function generateTask(name, sync) {
    let subtasks = [];

    rootModules.forEach(function (module) {
        let subtaskName = name + ':' + module.name;

        subtasks.push(subtaskName);

        gulp.task(subtaskName, () =>
            taskGenerators[name](module.name)
        );
    });

    if (sync) {
        gulp.task(name, plugins.sequence.apply(this, subtasks));
    } else {
        gulp.task(name, subtasks);
    }
}


// Less task generators
function getLessTask(moduleName) {
    let src = config.less.src.replace(moduleNameRegEx, moduleName),
        dest = config.less.dest.replace(moduleNameRegEx, moduleName);

    return gulp.src(src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(config.autoprefixer))
        .pipe(plugins.rename(function (path) {
            path.dirname = '';
        }))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(dest))
        .pipe(bsync.stream())
}


function getLessProdTask(moduleName) {
    let src = config.less.src.replace(moduleNameRegEx, moduleName),
        dest = config.less.dest.replace(moduleNameRegEx, moduleName),
        prodDest = config.prod.css.dest.replace(moduleNameRegEx, moduleName);

    return gulp.src(src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(config.autoprefixer))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest(dest))
        .pipe(gulp.dest(prodDest))
        .pipe(bsync.stream())
}


// Icons task generator
function getIconsTask(moduleName) {
    let src = config.icons.src.replace(moduleNameRegEx, moduleName),
        dest = config.icons.dest.replace(moduleNameRegEx, moduleName);

    return gulp.src(src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.uri({
            template: {
                file: config.icons.template
            }
        }))
        .pipe(plugins.concat(config.icons.concat))
        .pipe(gulp.dest(dest))
}

function getSvgIconsTask(moduleName) {
    let src = config.icons.srcSvgStore.replace(moduleNameRegEx, moduleName),
        dest = config.icons.destSvgStore.replace(moduleNameRegEx, moduleName);

    return gulp.src(src)
        .pipe(plugins.svgmin(function (file) {
            let prefix = path.basename(file.relative, path.extname(file.relative));

            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(plugins.svgstore())
        .pipe(gulp.dest(dest));
}


function getSvgIconsProdTask(moduleName) {
    let src = config.icons.srcSvgStore.replace(moduleNameRegEx, moduleName),
        dest = config.icons.destSvgStore.replace(moduleNameRegEx, moduleName),
        prodDest = config.prod.image.dest.replace(moduleNameRegEx, moduleName);

    return gulp.src(src)
        .pipe(plugins.svgmin(function (file) {
            let prefix = path.basename(file.relative, path.extname(file.relative));

            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(plugins.svgstore())
        .pipe(gulp.dest(dest))
        .pipe(gulp.dest(prodDest))
}


// Fonts task generators
function getFontsTask(moduleName) {
    let src = config.fonts.src.replace(moduleNameRegEx, moduleName),
        dest = config.fonts.dest.replace(moduleNameRegEx, moduleName);

    return gulp.src(src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(gulp.dest(dest))
}


function getFontsProdTask(moduleName) {
    let src = config.fonts.src.replace(moduleNameRegEx, moduleName),
        dest = config.fonts.dest.replace(moduleNameRegEx, moduleName),
        prodDest = config.prod.fonts.dest.replace(moduleNameRegEx, moduleName);

    return gulp.src(src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(gulp.dest(dest))
        .pipe(gulp.dest(prodDest))
}


// JS Prod task generator
function getJSProdTask(moduleName) {
    let dest = config.js.dest.replace(moduleNameRegEx, moduleName),
        prodDest = config.prod.js.dest.replace(moduleNameRegEx, moduleName),
        moduleInfo = getModuleInfoByName(moduleName);

    // Set entry points to webpack config
    let webpackProdConfig = extend(webpackConfig, {
        entry: moduleInfo.entry
    });

    return gulp.src(config.js.src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest(dest))
        .pipe(gulp.dest(prodDest));
}


// HTML Prod task generator
function getHtmlProdTask(moduleName) {
    let src = config.prod.html.src.replace(moduleNameRegEx, moduleName),
        dest = config.prod.html.dest.replace(moduleNameRegEx, moduleName);

    return gulp.src(src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(gulp.dest(dest))
}


// Clean public task generator
function getCleanPublicTask(moduleName) {
    let src = [
        config.clean.public.css.replace(moduleNameRegEx, moduleName),
        config.clean.public.js.replace(moduleNameRegEx, moduleName),
        config.clean.public.fonts.replace(moduleNameRegEx, moduleName),
        config.clean.public.img.replace(moduleNameRegEx, moduleName)
    ];

    return gulp.src(src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.rimraf());
}


// Get module info by name
function getModuleInfoByName(name) {
    let i,
        l = rootModules.length;

    for (i = 0; i < l; i++) {
        if (rootModules[i].name === name) {
            return rootModules[i];
        }
    }
}