const numDivs = 36;
const maxHits = 10;

let hits = 0;
let fails = 0;
let firstHitTime = 0;

function getUnixTime() {
  let dt = new Date();
  return dt.getTime();
}

function randomDivId() {
  let d = Math.floor(Math.random() * 6) + 1;
  let n = Math.floor(Math.random() * 6) + 1;
  return `#slot-${d}${n}`;
}



function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $(`.target`).removeClass('target');
  $(`.miss`).removeClass('miss');


  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1);
  // TODO: помечать target текущим номером

  // FIXME: тут надо определять при первом клике firstHitTime
  if (hits === maxHits) $(divSelector).text(1);
  if (hits === 1) {firstHitTime = getUnixTime() }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(`.game-field`).hide();

  let totalPlayedMillis = getUnixTime() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $('#totalScores').text(hits - fails);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  let target = $(event.target); 
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    target.text('');
    round();
  } else {
    // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
    fails += 1;
    $(event.target).addClass('miss');
  }
  
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    hits = 0;
    fails = 0;
    firstHitTime = 0;
    $('.game-field').show();
    $('win-message').addClass(d-non);
    location.reload();
  });
}

$(document).ready(init);
