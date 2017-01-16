// ==UserScript==
// @name        AnimeBytes CountForMe
// @author      mukti
// @description Automatically count in the counting thread
// @include     *animebytes.tv/forums.php*threadid=556*
// @include     *animebyt.es/forums.php*threadid=556*
// @version     1
// @grant       none
// @icon        http://animebytes.tv/favicon.ico
// ==/UserScript==

// Get the page number in the thread, then calculate the total number of posts
var pgre = /^.*page=(\d+).*$/
var postcnt = document.querySelectorAll('[id^="post"]').length;
var mycount = (window.location.href.match(pgre)[1] - 1 ) * 25 + postcnt;
// Tell the truth
console.log("I'M A LAZY COUNTER!!!");
document.getElementById('quickpost').value = mycount
