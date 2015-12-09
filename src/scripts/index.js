'use strict';

chrome.tabs.getSelected(null, tab => {
  let str = tab.url;
  document.getElementById('urlarea').value = str;
  document.getElementById('urlbox').classList.add('is-dirty');
  scissors(str);
});

document.getElementById('scissors-btn').addEventListener('click', () => {
  let str = document.getElementById('urlarea').value;
  scissors(str);
});

document.getElementById('delete-btn').addEventListener('click', () => {
  document.getElementById('urlarea').value = '';
  document.getElementById('urlbox').classList.remove('is-dirty');
});

document.getElementById('copy-btn').addEventListener('click', () => {
  var textArea = document.createElement("textarea");
  textArea.style.cssText = "position:absolute;left:-100%";
  document.body.appendChild(textArea);
  textArea.value = document.getElementById("query-table").innerText;
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
});

let scissors = value => {
  if (isUrl(value)) {
    let url = getUrl(value);
    let path = url.split('?')[0];
    let query = url.split('?')[1];
    let html = '';
    if (query) {
      let queryArray = query.split('&');
      for (let i = 0; i < queryArray.length; i++) {
        let q = queryArray[i].split('=');
        html += getRowHtml(q[0], q[1]);
      }
    } else {
      html += getRowHtml('---', '---');
    }
    document.getElementById('path').innerText = decode(path);
    document.getElementsByTagName('tbody')[0].innerHTML = html;
  } else {
    document.getElementById('path').innerText = '---';
    document.getElementsByTagName('tbody')[0].innerHTML = getRowHtml('---', '---');
  }
};

let isUrl = value => {
  return value.substring(0, 4) === 'http';
};

let isAccessLog = value => {
  return (value.match('GET ') && value.match(' HTTP/'));
};

let getUrl = value => {
  if (isUrl(value)) {
    return value;
  } else if (isAccessLog(value)) {
    return value.split('GET ')[1].split(' HTTP/')[0];
  }
  return value;
};

let decode = value => {
  let str;
  try {
    str = decodeURIComponent(value);
  } catch(e) {
    str = value;
  }
  return str;
};

let getRowHtml = (key, value) => {
  return `<tr>
            <td class="mdl-data-table__cell--non-numeric">${decode(key)}</td>
            <td class="mdl-data-table__cell--non-numeric">${decode(value)}</td>
          </tr>`;
};
