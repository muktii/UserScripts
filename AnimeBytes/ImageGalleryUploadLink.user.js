// ==UserScript==
// @name        AnimeBytes Mei Upload Linkback
// @author      mukti
// @description Add link to go back to previous upload page, or main upload page.
// @include     *animebytes.tv/user.php?action=mei_uploads*
// @version     1
// @icon 		http://animebytes.tv/favicon.ico
// ==/UserScript==

iure = /^.*imageupload.php.*$/
if(document.referrer.match(iure)){
	url = document.referrer
} else {
	url = 'https://animebytes.tv/imageupload.php'
}

var lnk = document.createElement('a');
lnk.href = url;
lnk.appendChild(document.createTextNode('Upload images to mei'));
maincol = document.getElementsByClassName('main_column')[0];
maincol.parentNode.insertBefore(lnk, maincol)
