$(document).ready(function() {

	var terms = [];
	$(".flexsearch-results-list").hide();

///////////////////////////////////////////////////////////////////////////////

	$.ajax({

		url: "http://www.mattbowytz.com/simple_api.json?data=all",

		success: function(data) {

			var data_array = data["data"];
			var interests = data_array["interests"];
			var programming = data_array["programming"];

			$.each(interests, function(index, value) {
				terms.push(value);
			});

			$.each(programming, function(index, value) {
				terms.push(value);
			});
		}
	});

///////////////////////////////////////////////////////////////////////////////

	$(".flexsearch-input").on("keyup", function() {

		var text = $(this).val();

		$(".flexsearch-results-list").empty();

		if (text.length == 0) {
			$(".flexsearch-results-list").hide();
			return;
		}

		var counter = 0;

		$.each(terms, function(index, value) {
			if ((value.length >= text.length) && (value.substring(0, text.length).toLowerCase() == text.toLowerCase())) {
				$(".flexsearch-results-list").append("<li><a href=\"https://www.google.com/search?q=" + value + "\"><p>" + value + "</p></a></li>");
				counter++;
			}
		});

		if (counter > 0) {
			$(".flexsearch-results-list").show();
		}
	});

///////////////////////////////////////////////////////////////////////////////

	$("#mainForm").on("submit", function(e) {
		document.location = "https://www.google.com/search?q=" + $(".flexsearch-input").val();
		return false;
	});
});
