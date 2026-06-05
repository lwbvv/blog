# Lee's Nest

Jekyll로 만든 개인 블로그입니다.

## 로컬에서 실행하기

```bash
bundle install          # 최초 1회 (의존성 설치)
bundle exec jekyll serve # 개발 서버 실행
```

실행 후 브라우저에서 <http://localhost:4000> 으로 접속하세요.
파일을 수정하면 자동으로 다시 빌드됩니다(`--livereload` 옵션을 주면 자동 새로고침까지).

## 새 글 쓰기

`_posts/` 폴더에 `YYYY-MM-DD-제목.md` 형식으로 파일을 만듭니다.

```markdown
---
layout: post
title: "글 제목"
date: 2026-06-05 10:00:00 +0900
tags: [태그1, 태그2]
---

여기에 마크다운으로 본문을 작성합니다.
```

## 구조

```
.
├── _config.yml        # 사이트 설정
├── _layouts/          # 페이지 템플릿 (default, post)
├── _posts/            # 블로그 글
├── assets/css/        # 스타일 (SCSS)
├── index.html         # 홈 (글 목록 + 페이지네이션)
├── about.md           # 소개 페이지
└── Gemfile            # 의존성
```

## 배포 (GitHub Pages)

1. GitHub 저장소를 만들고 코드를 푸시합니다.
2. 저장소 Settings → Pages 에서 빌드 소스를 GitHub Actions로 설정합니다.
3. `_config.yml`의 `url`/`baseurl`을 실제 주소에 맞게 수정합니다.
   - 프로젝트 사이트라면 `baseurl: "/저장소이름"`.
```
