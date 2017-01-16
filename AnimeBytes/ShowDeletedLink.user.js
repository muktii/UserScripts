// ==UserScript==
// @name        AnimeBytes ShowDeleted Link
// @namespace   mukti.moe
// @author      mukti
// @description Add a button to append "&showdeleted=1" to all forum post URLs
// @include     *animebytes.tv/forums.php*&threadid=*
// @include     *animebyt.es/forums.php*&threadid=*
// @version     1.3
// @icon        http://animebytes.tv/favicon.ico
// ==/UserScript==

var lnk = document.createElement('a');
var cururl = window.location.href;
ptre = /(.*)(#post\d+)/;
var matches = ptre.exec(cururl);
if(matches) {
	
	lnk.href = matches[1] + '&showdeleted=1' + matches[2];
	
} else {
	
	lnk.href = cururl + '&showdeleted=1'
	
}
lnk.appendChild(document.createTextNode('[Show Deleted Posts]'));
linkbox = document.getElementsByClassName('linkbox')[0];
linkbox.appendChild(lnk);