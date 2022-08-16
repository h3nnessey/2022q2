import slider from './js/slider.js';
import todoApp from './js/todo.js';
import settings from './js/settings.js';
import player from './js/player.js';

const renderApp = () => {
    player();
    slider();
    todoApp();
    settings();
};
renderApp();
