# Подготовка

Для работы требуется git, nodejs, npm, bower и gulp.

## Ubuntu / Debian

Установка из консоли:
```
sudo apt-get install git
sudo apt-get install nodejs npm
sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo npm -g install bower gulp
```

## Windows

1. Скачиваем и устанавливаем [свежий дистрибутив git](https://git-scm.com/download/win).
2. Скачиваем и устанавливаем [свежий дистрибутив nodejs](https://nodejs.org/en/download).
3. В любимой консоли устанавливаем зависимости

```
npm -g install bower gulp
```

# Настройка

Клонируем репозиторий, заменяем `project-name` на название проекта.

```
git clone git@gitlab.ibecsystems.kz:web-development/markup-stub.git project-name
cd project-name
```

## Зависимости

В зависимостях `npm` по умолчанию устанавливается `requirejs`, а также `bootstrap-sass`, 
`bootstrap` и `purecss-sass` - из последних нужно оставить только необходимые. `laravel-elixir-stylus` 
и `nib` нужны только для использования Stylus.

В `bower` устанавливается `jquery`, `font-awesome`, `animate.css` и `jquery.maskedinput` - последние два 
для примера, их таже можно удалить.

В папке `resources/assets` содержатся исходники стилей и скриптов. В `sass`, `less`, и `stylus` базовые 
стили приложения. Из них можно оставить только один нужный и переименовать как нравится.

## Gulp

Для сборки проекта используется `gulp`, конфигурация билдов задается в файле `gulpfile.js`

По умолчанию предусмотрены следующие шаги:

1. Компиляция скриптов.
2. Копирование `requrie.js` и зависимостей `bower` в `public/js`.
3. Компиляция скриптов приложения.
4. Копирование шрифтов `font-awesome` в `public/fonts`.
5. Копирование изображений, предусмотренных в дизайне в `public/css/images`.

## Require.js

Конфигурация `require.js` находится в файле `assets/coffee/config.coffee`. При добавлении библиотек необходимо 
учитывать, поддерживается ли интеграция с модульной системой, а также название файла в директиве `main`.

Если поддержка отсутствует или название изменено (например, есть суффикс `.min`), необходимо добавить директивы 
в массив `paths`.

```
paths:
    main: 'all',
    slick: 'slick.min',
```

Если библиотека содержит зависимости, необходимо добавить директиву `shim`.

```
shim:
    bootstrap:
        deps: ['jquery']
    backbone:
        exports: 'Backbone'
        deps: ['underscore', 'jquery']
```

# Верстка

Основной файл верстки `index.html` уже содержит подключение скриптов и стилей. Необходимо отредактировать 
раздел `head` на использование нужной версии `css`.

# TODO

* Компиляторы Twig и Blade.
* Использование Elixir Build.
* Альтернитивная вариация сборки зависимостей в один файл.
* Инструкция для MacOS.
