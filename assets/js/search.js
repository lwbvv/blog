(function () {
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var status = document.getElementById('search-status');
  var script = document.currentScript;
  var indexUrl = script.getAttribute('data-index');
  var data = [];
  var ready = false;

  // 검색 인덱스 불러오기
  fetch(indexUrl)
    .then(function (res) { return res.json(); })
    .then(function (json) {
      data = json;
      ready = true;
      // 인덱스 로드 전에 이미 입력한 경우 대비
      if (input.value.trim()) run(input.value);
      // ?q=검색어 쿼리 지원
      var q = new URLSearchParams(window.location.search).get('q');
      if (q) { input.value = q; run(q); }
    })
    .catch(function () {
      status.textContent = '검색 인덱스를 불러오지 못했습니다.';
    });

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function snippet(content, term) {
    var lower = content.toLowerCase();
    var i = lower.indexOf(term.toLowerCase());
    if (i === -1) return escapeHtml(content.slice(0, 120)) + '…';
    var start = Math.max(0, i - 40);
    var end = Math.min(content.length, i + 80);
    var text = (start > 0 ? '…' : '') + content.slice(start, end) + (end < content.length ? '…' : '');
    return escapeHtml(text);
  }

  function run(query) {
    var term = query.trim().toLowerCase();
    results.innerHTML = '';
    if (!term) { status.textContent = ''; return; }
    if (!ready) { status.textContent = '검색 준비 중…'; return; }

    var matches = data.filter(function (item) {
      return (
        item.title.toLowerCase().indexOf(term) !== -1 ||
        item.content.toLowerCase().indexOf(term) !== -1 ||
        (item.tags || '').toLowerCase().indexOf(term) !== -1 ||
        (item.categories || '').toLowerCase().indexOf(term) !== -1
      );
    });

    status.textContent = '“' + query.trim() + '” 검색 결과 ' + matches.length + '건';

    matches.forEach(function (item) {
      var li = document.createElement('li');
      li.className = 'search-result';
      var meta = item.date + (item.categories ? ' · ' + item.categories : '');
      li.innerHTML =
        '<a href="' + item.url + '">' + escapeHtml(item.title) + '</a>' +
        '<p class="post-meta">' + escapeHtml(meta) + '</p>' +
        '<p class="excerpt">' + snippet(item.content, term) + '</p>';
      results.appendChild(li);
    });
  }

  input.addEventListener('input', function () { run(input.value); });
})();
