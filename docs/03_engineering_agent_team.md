# Prompt Guessr — Engineering + AI Agent Team Strategy

## 0. 기술 방향(승인 기준 반영)
- Framework: Next.js (정적 우선)
- Hosting: Cloudflare Pages
- Data: GitHub repo 내 JSON + assets (puzzles/)
- No backend / No paid services pre-revenue
- Analytics: 무료 도구 + 개인 통계는 LocalStorage
- Release: UTC 00:00 daily puzzle swap

---

## 1. 구현 전략(핵심)
### 1.1 퍼즐 로딩
- 빌드 타임에 `puzzles/daily`를 읽어 정적 페이지/정적 데이터로 제공
- 런타임에는 “오늘 날짜(UTC)” 기준으로 해당 JSON을 선택해 렌더

### 1.2 정답 판정
- v1.0(Simple): 선택지 key 비교(A/B/C)
- v1.1(Pro): 키워드 선택 점수화(Precision/Recall/F1 → %)

### 1.3 Full Prompt 공개
- 결과 화면에서 Collapsible로 표시
- 복사 버튼 제공
- 퍼즐 JSON에 fullPrompt/negativePrompt/recipe 포함

---

## 2. 스크립트/운영 자동화(운영비 0원)
- `scripts/validate_puzzles.ts` : JSON 스키마/경로 검증
- `scripts/build_share_text.ts` : 공유 텍스트 템플릿 검증
- GitHub Actions:
  - PR 시 validate 실행
  - main merge 시 Cloudflare Pages 자동 배포

---

## 3. AI Agent Team 구성(Claude Code Agent Teams 기준)
### 3.1 Team 구성(최소)
- Agent Lead (Tech Lead/Integrator)
- Frontend Agent (Next.js UI)
- Design-to-Code Agent (컴포넌트/스타일 반영)
- QA Agent (테스트/접근성/크로스브라우저)
- Ops/Content Agent (퍼즐 JSON/에셋 파이프라인, 검증 스크립트)
- Analytics Agent (이벤트 설계/대시보드)

> Linear Actor Label로 작업 주체를 구분:
- Actor: Human / Agent-Lead / Agent-FE / Agent-QA / Agent-Ops / Agent-Data

### 3.2 운영 원칙
- Agent Lead가 요구사항을 “작은 이슈”로 쪼개 Linear에 등록
- 각 이슈는 Actor Label로 소유(작업 주체) 식별
- 병렬 작업 후 PR로 합치고, Agent Lead가 통합/리뷰

---

## 4. Claude Code용 ‘팀 리드 프롬프트’ 템플릿(예시)
- 목적: 레포 생성부터 배포까지 end-to-end 오케스트레이션

### Agent Lead System Prompt(초안)
- 목표: Prompt Guessr v1.0을 Next.js + Cloudflare Pages에 배포한다.
- 제약: 운영비 0원, DB/유료 서비스 금지, 데이터는 repo 파일로만 관리.
- 출력: Linear 이슈 분해, 구현 PR 생성, 배포 성공 확인 체크리스트.

### Sub-agent Task Prompts(예시)
- FE Agent:
  - "Home/Result/Stats 화면을 Next.js로 구현, puzzle JSON 로딩, LocalStorage 통계 구현"
- QA Agent:
  - "키보드 접근성, 모바일 뷰, Lighthouse 점검 체크리스트/수정 PR"
- Ops Agent:
  - "puzzles JSON 스키마 정의/검증 스크립트 작성, 샘플 퍼즐 7일치 생성"
- Data Agent:
  - "이벤트 스키마 정의(view_puzzle, pick_choice, view_result, copy_share, expand_prompt)"

---

## 5. 테스트 전략
- 유닛: puzzle loader, stats store
- E2E(선택): Playwright (가능하면), 최소는 manual QA checklist
- 퍼즐 검증: PR 단계에서 스키마/경로 검사

---

## 6. 보안/리스크
- 퍼즐 JSON에 민감정보 금지(API 키/내부 URL 등)
- Full Prompt 공개로 인한 “모방”은 제품 컨셉 상 허용하되,
  - 저작권/상표/인물/NSFW 관련 콘텐츠는 큐에서 원천 배제
