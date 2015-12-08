'use strict';

chrome.tabs.getSelected(null, tab => {
  let url = tab.url;
  document.getElementById('urlarea').value = url;
  scissors(url);
});

document.getElementById('scissors-btn').addEventListener('click', () => {
  scissors(document.getElementById('urlarea').value);
});

document.getElementById('delete-btn').addEventListener('click', () => {
  document.getElementById('urlarea').value = null;
  document.getElementById('urlbox').classList.remove('is-dirty');
});

let scissors = value => {
  let url = getUrl(value);
  let path = url.split('?')[0];
  let query = url.split('?')[1];

  document.getElementById('path').innerText = decode(path);
  document.getElementsByTagName('tbody')[0].innerHTML = '';

  if (query) {
    let html = '';
    let queryArray = query.split('&');
    for (let i = 0; i < queryArray.length; i++) {
      let q = queryArray[i].split('=');
      html += getRowHtml(q[0], q[1]);
    }
    document.getElementsByTagName('tbody')[0].innerHTML = html;
    document.getElementById('result').style.display = 'block';
  }
}

let getRowHtml = (key, value) => {
  return `<tr>
            <td class="mdl-data-table__cell--non-numeric">${decode(key)}</td>
            <td class="mdl-data-table__cell--non-numeric">${decode(value)}</td>
          </tr>`;
}

let getUrl = value => {
  if (value.substring(0, 4) === 'http') {  // For URL
    return value;
  } else if (value.match('GET ') && value.match(' HTTP/')) {  // For AccessLog
    return value.split('GET ')[1].split(' HTTP/')[0];
  }
  return value;
}

let decode = value => {
  let str;
  try {
    str = decodeURIComponent(value);
  } catch(e) {
    str = value;
  }
  return str;
}
