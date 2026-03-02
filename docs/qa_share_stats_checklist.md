# Prompt Guessor QA Checklist (Local stats + Share flow)

## Scope
- LocalStorage stats and daily result persistence
- Share text copy behavior
- Daily puzzle load fallback behavior

## Test Matrix
1. First visit on puzzle day
- Expect puzzle image and 3 choices visible.
- Select one choice.
- Expect immediate result and full prompt disclosure.

2. Reload after solving same day
- Reload page after a solved state.
- Expect selected choice and result state restored.
- Expect stats not double-counted on reload.

3. Share copy behavior
- Click "결과 텍스트 복사".
- Expect clipboard payload format:
  - `PromptGuessr #YYYY-MM-DD ✅ (1/1)` or
  - `PromptGuessr #YYYY-MM-DD ❌ (0/1)`
- Verify no full prompt text is copied.

4. UTC day mismatch / missing file
- Set date context where daily file does not exist.
- Expect fallback puzzle load without runtime crash.

5. Regression after local clear
- Clear browser LocalStorage.
- Expect clean stats state and playable puzzle flow.

## Pass Criteria
- No runtime errors in browser console.
- Share flow and stats flow behave as specified above.
- Result persistence remains consistent for same puzzle day.
