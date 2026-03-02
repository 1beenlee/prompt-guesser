# Prompt Guessr — Project Ops Plan (PM)

## 0. 운영 원칙
- Linear로 단일 소스 오브 트루스(SSoT)
- Actor Label로 작업 주체(Agent/Human) 구분
- 배포는 main 기준 자동(Cloudflare Pages)

---

## 1. 일정(권장)
- Sprint 0 (1~2일): Repo/CI/CD/배포 파이프라인 확정
- Sprint 1 (3~5일): v1.0 기능 구현(데일리/3지선다/결과/공유/로컬 통계)
- Sprint 2 (2~3일): 퍼즐 운영 파이프라인/검증/소프트런치
- Sprint 3 (1주): 지표 기반 개선(온보딩/공유/성능)

---

## 2. Linear 운영 정책
### 2.1 상태
Backlog → In Progress → In Review → Done

### 2.2 Label Group: Actor
- Human
- Agent-Lead
- Agent-FE
- Agent-QA
- Agent-Ops
- Agent-Data

### 2.3 이슈 템플릿(요약)
- Problem
- Scope (In/Out)
- Acceptance Criteria
- Owner(Actor Label)
- Links(PR/Preview)

---

## 3. Definition of Done
- 요구사항 충족 + 모바일 확인
- 콘솔 에러 0
- 퍼즐 검증 스크립트 통과
- 공유 텍스트 정상 복사
- 기본 접근성(키보드/포커스) 확인

---

## 4. 리스크 레지스터(초기)
- 저작권/상표 이슈 → 콘텐츠 가드레일 문서 준수
- 운영비 증가 압력 → DB/스토리지 도입 금지(수익 전)
- 퍼즐 품질 편차 → 퍼즐 큐 30일분 확보 + 검수 체크리스트

---

## 5. 초기 Epic(권장)
- EPIC-01: Foundation (Repo/Deploy/CI)
- EPIC-02: Daily Simple Mode Gameplay
- EPIC-03: Stats + Share
- EPIC-04: Content Pipeline (Puzzle JSON/Assets/Validation)
- EPIC-05: Analytics (Events + Dashboard)

---

## 6. 소프트런치 체크리스트
- 데일리 전환(UTC 00:00) 정상
- 7일치 퍼즐 큐 존재
- 모바일(크롬/사파리) 확인
- 공유 텍스트 포맷 만족
