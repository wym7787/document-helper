# 문서도우미 (Document Helper)

간단한 PDF 병합 및 분리 작업을 도와주는 웹 서비스

## 소개

문서도우미는 브라우저에서 직접 PDF 파일을 병합할 수 있는 웹 애플리케이션입니다.
모든 작업이 브라우저에서 처리되므로 파일이 서버로 전송되지 않아 개인정보 걱정 없이 안전하게 사용할 수 있습니다.

## 주요 기능

- **PDF 첫 페이지 추출 병합** — 여러 PDF의 첫 페이지만 모아 하나의 PDF로 합치기
- **PDF 전체 페이지 병합** — 여러 PDF를 통째로 하나의 PDF로 합치기
- **드래그앤드롭 파일 업로드** — 파일을 끌어다 놓기만 하면 업로드 완료
- **파일 순서 변경** — 드래그앤드롭으로 병합 순서 조정
- **다크모드 지원** — 라이트/다크 테마 전환

### Coming Soon

- 문서 정리
- 문서 변경

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 19, TypeScript |
| 빌드 도구 | Vite 7 |
| 스타일링 | Tailwind CSS 4 |
| PDF 처리 | pdf-lib |

## 시작하기

### 필수 요구사항

- Node.js 20 이상

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 프로젝트 구조

```
src/
├── components/
│   ├── FileDropZone.tsx    # 드래그앤드롭 파일 업로드 영역
│   ├── FileList.tsx        # 업로드된 파일 목록
│   ├── Footer.tsx          # 푸터
│   ├── HomePage.tsx        # 홈 페이지 (기능 선택)
│   ├── MergeWorkView.tsx   # PDF 병합 작업 화면
│   ├── Navbar.tsx          # 네비게이션 바
│   └── PdfMergePage.tsx    # PDF 병합 페이지
├── hooks/
│   └── usePdfMerger.ts     # PDF 병합 로직 훅
├── types/
│   └── index.ts            # 타입 정의
├── utils/
│   └── pdfUtils.ts         # PDF 유틸리티 함수
├── App.tsx                 # 앱 루트 컴포넌트
├── index.css               # 글로벌 스타일
└── main.tsx                # 엔트리 포인트
```

## 배포

`main` 브랜치에 푸시하면 GitHub Actions를 통해 GitHub Pages로 자동 배포됩니다.

배포 워크플로우: `.github/workflows/deploy.yml`

## 라이선스

MIT
