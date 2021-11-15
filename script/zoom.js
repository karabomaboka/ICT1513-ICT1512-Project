
"use strict"; // interpret document contents in JavaScript strict mode

/* populate img element and create event listener */
function pageSetup() {
   var figFilename = window.opener.document.getElementsByTagName("img")[2].src;
   var filename = figFilename.substring(figFilename.lastIndexOf('/') + 1);
   document.getElementsByTagName("img")[0].src = "images/" + filename; // assign filename to img element
   createEventListener();
}

/* close window */
function closeWin() {
   window.close();
}

/* create event listener for close button */
function createEventListener() {
   var closeWindowDiv =
   document.getElementsByTagName("button")[0];
   if (closeWindowDiv.addEventListener) {
      closeWindowDiv.addEventListener("click", closeWin, false);
   } else if (closeWindowDiv.attachEvent) {
      closeWindowDiv.attachEvent("onclick", closeWin);
   }
}

/* add img src value and create event listener when page finishes loading */
window.onload = pageSetup;