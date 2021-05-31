const SECOND = 1000;
const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const DAYS = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'себбота'];

let date = new Date();
let changeTimeID;

let geoinfoTime = document.getElementById('geoinfoTime');
let geoinfoDate = document.getElementById('geoinfoDate');

setDate(geoinfoDate);
setTime(geoinfoTime);

setTimeout(function() {
    setTime(geoinfoTime);
    changeTimeID = setInterval(() => {
        setTime(geoinfoTime)
    }, 60 * SECOND);
}, (60 - date.getSeconds()) * SECOND);

function setTime(elem) {
    date = new Date();
    elem.innerHTML = date.getHours() + '<span class="geoinfo__time-colon">:</span>' + date.getMinutes();
}

function setDate(elem) {
    elem.innerHTML = date.getDate() + ' ' 
    + MONTHS[date.getMonth()] + ', ' 
    + DAYS[date.getDay()];
}