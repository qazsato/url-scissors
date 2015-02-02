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

	function scissors(value) {
		var url = getUrl(value);
		var path = url.split("?")[0];
		var query = url.split("?")[1];

		$("#path").text(decode(path));
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
					"<td>" + decode(key) + "</td>" +
					"<td>" + decode(value) + "</td>" +
				"</tr>";
	}

	function getUrl(value) {
		if (value.substring(0, 4) === "http") {	// For URL
			return value;
		} else if (value.match("GET ") && value.match(" HTTP/")) {	// For AccessLog
			return value.split("GET ")[1].split(" HTTP/")[0];
		}
		return value;
	}

	function decode(value) {
		var str;
		try {
			str = decodeURIComponent(value);
		} catch(e) {
			str = value;
		}
		return str;
	}
});