// Утилиты
var gulp = require('gulp'),
    gutils = require('gulp-util'),
    uglify = require('gulp-uglify'),
    elixir = require('laravel-elixir'),
    bower = require('main-bower-files');

// Поддержка Stylus
require('nib');
require('laravel-elixir-stylus');

elixir(function(mix) {
    // Если команда запущена с параметром --production
    var production = !! gutils.env.production;

    // Компилируем SASS
    mix.sass('app-scss.scss');
    // Компилируем LESS
    mix.less('app-less.less');
    // Компилируем STYL
    mix.stylus('app-stylus.styl');

    // Собираем JS файлы из зависимостей Bower и записываем в public/js
    if (production) {
        // В production сжимаем
        gulp.src(bower('**/*.js')).pipe(uglify()).pipe(gulp.dest('public/js'));

        // Дополнительно копируем саму библиотеку require.js
        gulp.src('node_modules/requirejs/require.js').pipe(uglify()).pipe(gulp.dest('public/js'));
        // Или, как вариант, alameda
        // gulp.src('node_modules/alameda/alameda.js').pipe(uglify()).pipe(gulp.dest('public/js/require.js'));
    } else {
        mix.copy(bower('**/*.js'), 'public/js');
        mix.copy('node_modules/requirejs/require.js', 'public/js');
        //mix.copy('node_modules/alameda/alameda.js', 'public/js/require.js');
    }

    // Альтернатива - собрать все файлы из bower в файл vendor.js
    mix.scripts(bower('**/*.js'), 'public/js/vendor.js', '/');

    // Основной файл с кодом - компилится в all.js по умолчанию
    mix.scripts(['app-js.js']);

    // Файл конфигурации require.js - для примера в Coffee-Script
    mix.coffee('config.coffee');

    // Шрифты из font-awesome
    mix.copy('bower_components/font-awesome/fonts/**.*', 'public/fonts');

    // Изображения, используемые в CSS
    mix.copy('resources/assets/images/**.*', 'public/css/images');

    // Темы jQuery UI
    // mix.copy('bower_components/jquery-ui/themes/smoothness/images/**.*', 'public/css/images');

    // Версионирование Elixir - для каждого билда к файлам добавляется уникальный суффикс.
    // Позволяет избежать проблем с локальным кэшем в браузерах.
    // mix.version(['js/app-js.js', 'js/config.js', 'js/require.js']);
    // mix.version(['app-scss.css', 'app-less.css', 'app-stylus.css']);

});
