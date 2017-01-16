// ==UserScript==
// @name        AnimeBytes ShowDeleted
// @author      mukti
// @description Automatically add "&showdeleted=1" to all forum post URLs
// @include     *animebytes.tv/forums.php*
// @include     *animebyt.es/forums.php*
// @version     1.2.2
// @run-at      document-start
// @grant       none
// @icon        http://animebytes.tv/favicon.ico
// ==/UserScript==

// Detect non-showdeleted URL before page load...
var tire = /^.*[&?]threadid=.*$/;
var frre = /^.*forums.php.*$/;
var dmre = /^.*[&?]showdeleted.*/;
var search = window.location.search;
var pathname = window.location.pathname;
if (search.match(tire) && pathname.match(frre) && !(search.match(dmre))){
   var loc = window.location.origin + pathname + search + '&showdeleted=1';
   if (window.location.hash.length > 1) loc += window.location.hash;
   console.log(loc);
   window.location = loc;
}

// ... and replace all links, after page load!
document.addEventListener("DOMContentLoaded", function () {
   // Add '&showdeleted=1' to all forum thread links on the current page
   var threadregex = /^((?:.+)?\/?forums\.php\?(?:[^&]+&)*action=viewthread(?:&[^#]*)?)(#[^#]*)?$/;
   var links = document.getElementsByTagName('a');
   for (var i = 0, link; (link = links[i]); i++) {
      var matches = threadregex.exec(link.getAttribute('href'));
      if (matches) {
         var href = matches[1] + '&showdeleted=1';
         if (matches.length > 2 && matches[2]) href += matches[2];
         link.setAttribute('href', href);
      }
   }
});
