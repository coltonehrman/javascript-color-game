var DEFAULT_HEADER_COLOR = 'steelblue';
var DEFAULT_BODY_COLOR   = '#232323';
var HARD_MODE_ON         = true;
var GAME_OVER            = false;

var $header         = document.getElementsByTagName('header')[0];
var $colorDisplay   = document.getElementById('color-display');
var $resetButton    = document.getElementById('reset-btn');
var $messageDisplay = document.getElementById('message');
var $easyButton     = document.getElementById('easy-btn');
var $hardButton     = document.getElementById('hard-btn');
var $squares        = document.getElementsByClassName('square');

init();

function init() {
    resetGame();

    $resetButton.addEventListener('click', resetGame);
    $easyButton.addEventListener('click', setGameMode.bind(null, false));
    $hardButton.addEventListener('click', setGameMode.bind(null, true));
}

function resetGame() {
    var colors = (HARD_MODE_ON) ? generateColors(6) : generateColors(3);
    var pickedColor = colors[generateRandomNumber(0, colors.length - 1)];

    GAME_OVER = false;
    $resetButton.textContent = 'New Colors';
    $messageDisplay.textContent = '';
    $colorDisplay.textContent = pickedColor;
    changeBackgroundColorTo(DEFAULT_HEADER_COLOR)($header);

    $hardButton.className = isActive(HARD_MODE_ON);
    $easyButton.className = isActive(!HARD_MODE_ON);

    forEach($squares, resetElement);
    forEach($squares, hideElement);

    colors.forEach(function(color, i) {
        $squares[i].style.display = 'block';
        $squares[i].style.backgroundColor = colors[i];

        $squares[i].addEventListener('click', (function() {
            return function() {
                if (GAME_OVER) return;

                if (color === pickedColor) {
                    GAME_OVER = true;
                    $messageDisplay.textContent = 'Correct!';
                    $resetButton.textContent = 'Play Again?';
                    changeBackgroundColorTo(pickedColor)($header);
                    forEach($squares, changeBackgroundColorTo(pickedColor) );
                } else {
                    changeBackgroundColorTo(DEFAULT_BODY_COLOR)($squares[i]);
                    $messageDisplay.textContent = 'Try Again';
                }
            }
        })());
    });
}

function setGameMode(mode) {
    if (HARD_MODE_ON !== mode) {
        HARD_MODE_ON = mode;
        resetGame();
    }
}

function isActive(active) {
    return (active) ? 'active' : '';
}

function forEach($elements, fn) {
    Array.prototype.forEach.call($elements, fn);
}

function resetElement($element) {
    var $newElement = $element.cloneNode(true);
    $element.parentNode.replaceChild($newElement, $element);
    return $newElement;
}

function hideElement($element) {
    $element.style.display = 'none';
}

function changeBackgroundColorTo(color) {
    return function($element) {
        $element.style.backgroundColor = color;
    }
}

function generateColors(length) {
    return new Array(length).fill(null).map(function() {
        var color = generateRandomColor();
        return 'rgb(' + color.red + ', ' + color.green + ', ' + color.blue + ')';
    });
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomColor() {
    var red     = generateRandomNumber(0, 255);
    var green   = generateRandomNumber(0, 255);
    var blue    = generateRandomNumber(0, 255);

    return {
        red: red,
        green: green,
        blue: blue
    };
}