chrome.tabs.getSelected(null, function(tab) {
  var url = tab.url;
  document.getElementById("urlarea").value = url;
});

document.getElementById("scissorsBtn").addEventListener("click", function() {
  scissors(document.getElementById("urlarea").value);
  document.getElementById("result").style.display = "block";
});

document.getElementById("deleteBtn").addEventListener("click", function() {
  document.getElementById("urlarea").value = "";
});

function scissors(value) {
  var url = getUrl(value);
  var path = url.split("?")[0];
  var query = url.split("?")[1];

  document.getElementById("path").innerText = decode(path);
  document.getElementsByTagName("tbody")[0].innerHTML = "";

  if (query) {
    var html = "";
    var queryArray = query.split("&");
    for (var i = 0; i < queryArray.length; i++) {
      var q = queryArray[i].split("=");
      html += getRowHtml(q[0], q[1]);
    }
    document.getElementsByTagName("tbody")[0].innerHTML = html;
  }
}

function getRowHtml(key, value) {
  return "<tr>" +
        "<td>" + decode(key) + "</td>" +
        "<td>" + decode(value) + "</td>" +
      "</tr>";
}

function getUrl(value) {
  if (value.substring(0, 4) === "http") {  // For URL
    return value;
  } else if (value.match("GET ") && value.match(" HTTP/")) {  // For AccessLog
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
