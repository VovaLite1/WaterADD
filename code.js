// подключаем модуль датчика уровня воды
var level = require('@amperka/water-level');
// подключаем датчик на дне бочки
var onBottom = level.connect(P1, {debounce: 3});
// подключаем датчик на крышке бочки
var onTop = level.connect(P2, {debounce: 3});
var pump = require('@amperka/relay').connect(P5);

var switchOn = function() {
  // включаем насос
  pump.turnOn();
  print('On');
};

var switchOff = function() {
  // выключаем насос
  pump.turnOff();
  print('Off');
};

// событие: датчик на крышке бочки поднялся
onTop.on('up', function () {
  print('water level is high');
  // выключаем устройство
  switchOff();
});

// событие: датчик на дне бочки опустился
onBottom.on('down', function () {
  // включаем устройство
  switchOn();
  print('water level is low');
});


