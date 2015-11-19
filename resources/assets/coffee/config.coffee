# Конфигурация
requirejs.config

  # Путь до JS библиотек
  baseUrl: "js",

  # Алиасы библиотек, если не поддерживается AMD
  # или не соответствуют названия
  paths:
    main: 'all',
    slick: 'slick.min',

# Запускаем основной файл приложения
require ['main']
