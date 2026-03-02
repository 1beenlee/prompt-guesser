# Prompt Guessr — Design Strategy (v1.0)

## 0. 디자인 목표
- “이미지 한 장”으로 즉시 이해되는 게임
- 30초 내 플레이 가능(인지 부하 최소화)
- 공유하고 싶은 결과 카드(Wordle 감성)
- 신뢰감 있는 “정답 프롬프트 전문” 공개 UI(접힘/펼침)

---

## 1. IA(정보 구조)
- Home (오늘의 퍼즐)
- Result (정답/오답 + Full Prompt + 통계 + 공유)
- Stats (개인 기록 상세)
- Archive(옵션, v1.1+)
- About/Rules

---

## 2. 핵심 화면 설계
### 2.1 Home
- 상단: 날짜(UTC 기준 표기 + 지역시간 보조표기)
- 중앙: 이미지(1:1, 최대 폭)
- 하단: 선택지 3개 카드(A/B/C)
  - 각 카드: 매우 짧은 프롬프트(1~2줄)
  - 탭 시 즉시 Lock + 결과 화면으로 전환

### 2.2 Result
- 상단: ✅/❌ 결과 배지 + “다시보기(오늘 이미지는 유지)”
- 중단: Full Prompt 섹션(기본 접힘)
  - “Full Prompt 보기” 버튼
  - 펼치면: Prompt / Negative Prompt / Recipe(모델·사이즈 등)
  - “복사” 버튼(프롬프트만 / 네거티브만 / 둘 다)
- 하단: 개인 통계(스트릭, 승률)
- 하단 고정: 공유 버튼(복사/공유)

---

## 3. 컴포넌트 가이드
- ChoiceCard: A/B/C, hover/pressed, 선택 후 disabled
- ResultBadge: success/fail
- CollapsiblePanel: Full Prompt
- StatTile: Streak, Win rate, Played
- SharePanel: Copy, Share

---

## 4. 시각 톤
- 미니멀, 대비 명확
- 이미지가 주인공(과한 배경/장식 최소화)
- 타이포: 읽기 쉬운 산세리프(시스템 폰트 우선)
- 컬러:
  - 성공: 녹색(접근성 고려)
  - 실패: 적색(접근성 고려)
  - 중립 UI: 회색 스케일

---

## 5. 공유 카드(스포일러 방지)
- v1.0은 텍스트 공유 중심
- (옵션) 이미지 카드 생성 시:
  - 썸네일은 blur/mosaic
  - 결과 배지 + 날짜 + 1행 요약만 표시
  - 정답 프롬프트/이미지 원본이 유출되지 않도록 설계

---

## 6. Pro Mode(v1.1) UI 원칙(미리 반영)
- Pill(토글) 형태의 키워드 선택
- 상단에 “최대 N개 선택” 가이드
- 제출 후 Score% + 등급 메시지
- Full Prompt는 동일하게 접힘 공개

---

## 7. 접근성/반응형
- 모바일 우선(thumb reach)
- ChoiceCard는 최소 44px 터치 영역
- CollapsiblePanel 키보드 포커스/스크린리더 지원

---

## 8. 디자이너 산출물(To-do)
- v1.0: Home/Result/Stats 3종 화면 + 상태(선택 전/후, 접힘/펼침)
- 컴포넌트 스펙(Spacing/Radius/Shadow)
- 공유 텍스트 포맷(국문/영문 2종)
