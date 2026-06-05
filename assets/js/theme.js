(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  // 현재 적용 중인 테마 (명시값 없으면 OS 설정 기준)
  function current() {
    var explicit = root.getAttribute('data-theme');
    if (explicit) return explicit;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Giscus 댓글 iframe 테마 동기화
  function syncGiscus(theme) {
    var frame = document.querySelector('iframe.giscus-frame');
    if (!frame) return;
    frame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: theme } } },
      'https://giscus.app'
    );
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    syncGiscus(theme);
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      apply(current() === 'dark' ? 'light' : 'dark');
    });
  }

  // Giscus가 로드되면(메시지 수신) 현재 테마로 맞춤
  window.addEventListener('message', function (e) {
    if (e.origin === 'https://giscus.app' && e.data && e.data.giscus) {
      syncGiscus(current());
    }
  });

  // OS 테마 변경 시(사용자가 직접 토글한 적 없으면) 따라가기
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (!localStorage.getItem('theme')) syncGiscus(current());
  });
})();
