$(function () {

	chrome.tabs.getSelected(null, function(tab) {
		var url = tab.url;
		$("#urlarea").val(url);
	});

	$("#scissorsBtn").on("click", function () {
		scissors($("#urlarea").val());
		$("#result").show();
	});

	$("#deleteBtn").on("click", function () {
		$("#urlarea").val("");
	});

	function scissors(url) {
		var path = url.split("?")[0];
		var query = url.split("?")[1];

		$("#path").text(path);
		$("tbody").empty();

		if (query) {
			var html = "";
			var queryArray = query.split("&");
			for (var i = 0; i < queryArray.length; i++) {
				var q = queryArray[i].split("=");
				html += getRowHtml(q[0], q[1]);
			}
			$("tbody").append(html);
		}
	}

	function getRowHtml(key, value) {
		return "<tr>" +
					"<td>" + key + "</td>" +
					"<td>" + decodeURIComponent(value) + "</td>" +
				"</tr>";
	}
});