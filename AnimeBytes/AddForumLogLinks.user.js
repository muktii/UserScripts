// ==UserScript==
// @name        AnimeBytes Link Forum Log
// @author      mukti, eider, Potatoe
// @description Add links to threads and posts from the forum log page.
// @include     *://animebytes.tv/log.php*
// @match       *://animebytes.tv/log.php*
// @version     2.3.1
// @downloadURL https://github.com/muktii/Userscripts/raw/master/AnimeBytes/AddForumLogLinks.user.js
// @updateURL   https://github.com/muktii/Userscripts/raw/master/AnimeBytes/AddForumLogLinks.user.js
// @icon        http://animebytes.tv/favicon.ico
// ==/UserScript==

// Function to load new page with ajax callback
function loadPost(e) {
	if (e.button === 0 || e.button === 1) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			 	var fixedPostLink = this.responseText.replace(/\&amp\;/g, "&").replace(/["]/g, "");
			 	window.open("https://animebytes.tv/" + fixedPostLink, e.button === 1 ? '_blank' : '_self');
			}
		};
		xhttp.open("GET", "https://animebytes.tv/ajax.php?action=forums&type=d_postid&pID="+ this.innerHTML, true);
		xhttp.send();
	}
}

// Define variables
var fltables = document.getElementsByTagName('table');
var forumlog = fltables[fltables.length - 1];
var tpre = /.*(Thread|Post|Posts)\s#([\d,]+)\s(\(Thread\s(\d+)\))?.*/;

// Loop through rows linking threads, and adding function anchors to posts
for (var i = 0, row; row = forumlog.rows[i]; i++)
{
	for (var j = 0, cell; cell = row.cells[j]; j++)
	{
		if(cell.innerHTML.match(tpre))
		{
			var matches = tpre.exec(cell.innerHTML);

			// Link threads
			if(matches[1].match(/Thread/)) {
				var strreplace = matches[2];
				cell.innerHTML = cell.innerHTML.replace(strreplace, "<a href='https://animebytes.tv/forums.php?action=viewthread&threadid=" + strreplace + "'>" + strreplace + "</a>");
			}
			// Add functions to posts
			if(matches[1].match(/Post/)) {
				if(matches[1] == 'Posts') {
					var posts = matches[2].split(",");
					for (var k = 0, post; post = posts[k]; k++) {
						cell.innerHTML = cell.innerHTML.replace(post, '<a href="javascript: return false;" class="ABLoadPostUserscript">' + post + '</a>');
					}
				} else {
					post = matches[2];
					cell.innerHTML = cell.innerHTML.replace(post, '<a href="javascript: return false;" class="ABLoadPostUserscript">' + post + '</a>');
				}
				var strreplace = matches[4];
				cell.innerHTML = cell.innerHTML.replace(strreplace, "<a href='https://animebytes.tv/forums.php?action=viewthread&threadid=" + strreplace + "'>" + strreplace + "</a>");
			}
		}
	}
}

var list = document.getElementsByClassName("ABLoadPostUserscript");
for (var i = 0; i < list.length; i++) {
	list[i].addEventListener("mouseup", loadPost);
	list[i].addEventListener("click", function (e) { e.preventDefault(); });
}
