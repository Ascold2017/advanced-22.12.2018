'use strict';
import svgDiagrams from '@modules/svgDiagrams';
import preloader from '@modules/preloader';

document.addEventListener('DOMContentLoaded', () => {
    preloader();
    svgDiagrams([
        { category: 1, percents: 80, title: 'PugJs' },
        { category: 1, percents: 50, title: 'CSS3' },
        { category: 1, percents: 40, title: 'Jquery' },
        { category: 1, percents: 80, title: 'VueJS' },
        { category: 2, percents: 30, title: 'NodeJS' },
        { category: 3, percents: 60, title: 'Gulp4' },
    ]);
});
