$(document).ready(function() {
    $('div.body img').colorbox({
	href: function () {
	    return $(this).attr('src'); 
	}
    });
});
