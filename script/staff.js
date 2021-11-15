
// staff.js

"use strict";

//load xml file
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xhttp.open("GET", "school_staff.xml", true);
    xhttp.send();
}

//read and display contents of xml file
function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table="<tr><th>TITLE</th><th>INITIAL</th><th>SURNAME</th><th>DESIGNATION</th></tr>";
  var x = xmlDoc.getElementsByTagName("MEMBER");
  for (i = 0; i <x.length; i++) { 
      table += "<tr><td>" +
      x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("INITIAL")[0].childNodes[0].nodeValue +
      "</td><td>" + 
      x[i].getElementsByTagName("SURNAME")[0].childNodes[0].nodeValue +
      "</td><td>" + 
      x[i].getElementsByTagName("DESIGNATION")[0].childNodes[0].nodeValue +
      "</td></tr>";
  }
  document.getElementById("staff").innerHTML = table;
}

/* run loadDoc() function when page finishes loading */
if (window.addEventListener) {
  window.addEventListener("load", loadDoc, false); 
} else if (window.attachEvent)  {
  window.attachEvent("onload", loadDoc);
}
