
var currrentPage = location.href;
currrentPage = currrentPage.substring(currrentPage.indexOf('?') + 1);
if(currrentPage == "schooltimes") {
    $('#content').load('schooltimes.html');
} else  
    if(currrentPage == "schoolfees") {
        $('#content').load('schoolfees.html');
} else 
    if(currrentPage == "whythisschool") {
        $('#content').load('whythisschool.html');
} else {
    $('#content').load('schoolhistory.html');
}

/* Loads pages into article section */
/*
$(document).ready(function () {
    // load school history page when index.html loads
    $('#content').load('schoolhistory.html');   

    // load school history page when school history is clicked
    $('#_history').click(function () {
        $('#content').load('schoolhistory.html'); 
    });
    
    // load school times page when school times is clicked
    $('#_times').click(function () {
        $('#content').load('schooltimes.html'); 
    });

    // load school fees page when school fees is clicked
    $('#_fees').click(function () {
        $('#content').load('schoolfees.html'); 
    });

    // load why this school page when why this school is clicked
    $('#_whyschool').click(function () {
        $('#content').load('whythisschool.html');
    });
 });*/


// show dropdown menu
function display() {
    $(event.currentTarget).children("ul").slideDown("fast");
}

// hide dropdown menu
function hide(event) {
    $(event.currentTarget).children("ul").hide();
}

// on hover display or hide dropdown menu
$(".myMenu ul li").hover(display,hide);

