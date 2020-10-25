'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const BAR_HEIGHT = 150;
const BAR_WIDTH = 40;
const BAR_GAP = 50;


const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

const randomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

const randomBlueColor = function () {
  return `hsl(230, ${randomInt(100)}%, 50%)`;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = "16px PT Mono";

  const maxTime = getMaxElement(times);

  const fillScore = function (x, y, i) {
    if (players[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = randomBlueColor();
    }
    ctx.fillRect(x, y - BAR_WIDTH + GAP, BAR_WIDTH, ((BAR_HEIGHT * times[i]) / maxTime) * -1);
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText(Math.floor(times[i]), x + BAR_WIDTH / 2, y - BAR_WIDTH - (BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillText(players[i], x + BAR_WIDTH / 2, y - GAP);
  };

  for (let i = 0; i < players.length; i++) {
    fillScore(CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT, i);
  }
  ctx.textAlign = 'left';
  ctx.fillText('Ура, вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);
};
