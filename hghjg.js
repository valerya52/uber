const { src, dest, watch, series } = require('gulp');
const browserSync =  require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const cleancss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');



// Определяем логику работы Browsersync
function browsersync() {
    browserSync.init({ // Инициализация Browsersync
        server: { baseDir: 'src/' }, // Указываем папку сервера
        notify: false, // Отключаем уведомления
        online: true // Режим работы: true или false
    })
}

function styles() {
    return src('src/sass/*.+(scss|sass)') // Выбираем источник: "app/sass/main.sass" или "app/less/main.less"
        .pipe(sass().on('error', sass.logError))
        // .pipe(eval(preprocessor)()) // Преобразуем значение переменной "preprocessor" в функцию
        // .pipe(concat('app.min.css')) // Конкатенируем в файл app.min.js
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
        .pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
        .pipe(dest('src/css/')) // Выгрузим результат в папку "app/css/"
        .pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

// function startwatch() {
//     // Мониторим файлы препроцессора на изменения
//     watch('src/sass/*.+(scss|sass)', styles);
//     watch('src/*.html').on('change', browserSync.reload());
// }

exports.browsersync = browsersync;
exports.styles = styles;
// exports.startwatch = startwatch;

exports.default = parallel(browsersync, styles);