---
layout: default
title: 소개
permalink: /about/
---

# 소개

안녕하세요, **{{ site.author.name }}**입니다.

이 블로그는 배운 것과 생각을 기록하기 위한 공간입니다.
Jekyll로 만들었고, GitHub Pages 등으로 배포할 수 있습니다.

## 연락처

- 이메일: [{{ site.author.email }}](mailto:{{ site.author.email }})

## 이 블로그에 글 쓰는 법

`_posts/` 폴더에 `YYYY-MM-DD-제목.md` 형식으로 파일을 만들면 됩니다.
파일 맨 위에 아래와 같은 머리말(front matter)을 넣어주세요.

```yaml
---
layout: post
title: "글 제목"
date: 2026-06-05 10:00:00 +0900
tags: [태그1, 태그2]
---
```
