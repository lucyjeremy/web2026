# Note12 학생 배포용 — Firebase 실습

> Week 12 강의에서 다룬 Firebase Auth + Firestore + 보안 규칙을 직접 손으로 따라 해보는 실습 패키지.

---

## 시작하기 (10분)

### 1단계 — Firebase 프로젝트 (이미 했으면 skip)
이미 [[학생-사전준비-가이드]] 3단계에서 Firebase 프로젝트 + Auth + Firestore 만들었어야 함.
안 했다면 지금 5분:
1. https://console.firebase.google.com → 프로젝트 만들기 → 웹 앱 (`</>`) 등록
2. **Authentication** → Sign-in method → **Google 활성화**
3. **Firestore Database** → 데이터베이스 만들기 → **테스트 모드** (asia-northeast3 서울)

### 2단계 — config.js 설정
1. `config.example.js`를 같은 폴더에 `config.js`로 **복사**
2. Firebase 콘솔 → 프로젝트 설정 → "내 앱" 섹션 → `firebaseConfig` 객체 복사
3. `config.js` 안의 값에 붙여넣기

### 3단계 — 실행
- VS Code의 **Live Server** 확장 설치
- `01-init.html` 우클릭 → "Open with Live Server"
- 콘솔에 ✅ 초기화 성공 보이면 OK

---

## 학습 순서 (권장)

| 순서 | 파일 | 무엇을 배우나 | 시간 |
|------|------|--------------|------|
| 1 | `01-init.html` | Firebase 정상 연결 확인 | 5분 |
| 2 | `02-auth.html` | Google 로그인 + 로그아웃 + 상태 추적 | 10분 |
| 3 | `03-firestore-crud.html` | 글 추가/읽기/수정/삭제 4함수 | 15분 |
| 4 | `04-firestore-realtime.html` ⭐ | onSnapshot 실시간 — **두 탭으로 열어 보세요** | 15분 |
| 5 | `05-rules-test.html` | 보안 규칙이 왜 필요한지 — 4가지 시나리오 | 10분 |
| 6 | `06-mini-lab-starter.html` | **TODO 4곳 직접 채우기** — 공유 방명록 | 30분 |

총 1시간 30분 정도면 핵심 다 끝납니다.

---

## 미니 실습 (필수 과제)

`06-mini-lab-starter.html`의 **TODO 4곳**을 채워서 공유 방명록을 완성하세요:

1. **TODO 1** — 로그인 상태에 따른 UI 토글 (`onAuthStateChanged`)
2. **TODO 2** — 글 추가 (`addDoc`)
3. **TODO 3** — 실시간 구독 (`onSnapshot`)
4. **TODO 4** — 본인 글 삭제 (`deleteDoc`)

힌트는 각 TODO 블록 위 주석에 있습니다. 막히면 다음 파일들의 동작 코드 참고:
- `02-auth.html` ← TODO 1
- `03-firestore-crud.html` ← TODO 2
- `04-firestore-realtime.html` ← TODO 3, 4

---

## 다 끝낸 학생 (P1 도전)

보안 규칙 적용해 보기:
1. Firebase 콘솔 → Firestore Database → **규칙** 탭
2. `rules/secure.rules` 내용 전체 복사 → 콘솔에 붙여넣기 → **게시**
3. `05-rules-test.html` 다시 열어서 "▶ 4가지 시나리오 모두 시도" 클릭
4. 시나리오 ①·②·④가 모두 **❌ PERMISSION_DENIED**로 바뀌면 성공

→ 이게 학기 프로젝트 데이터 보안의 시작점입니다.

---

## 자주 막히는 곳

| 증상 | 해결 |
|------|------|
| `Firebase: No Firebase App` | `config.js` 미설정 또는 firebaseConfig 오타 |
| `auth/popup-blocked` | 브라우저 팝업 차단 — 주소창 옆 아이콘으로 허용 |
| `auth/operation-not-allowed` | Firebase 콘솔 → Auth → Sign-in method에서 Google 활성화 |
| `permission-denied` | 보안 규칙이 막음. 콘솔 → 규칙 탭 확인 (테스트 모드인지 secure인지) |
| 글 추가 후 화면 안 바뀜 | 03 데모는 한 번 읽기 — 다시 읽기 버튼. 04는 자동 |
| `serverTimestamp` "대기" 표시 | 정상 — 서버 도달 후 자동 갱신 |
| AI가 `firebase.auth()` 추천 | v8 옛 방식 — v9 modular(`getAuth(app)`)만 사용 |

---

## 보안 규칙 핵심 패턴 3가지

```
// 1) 로그인만 — 가장 기본 보호
allow read: if request.auth != null;

// 2) 자기 authorId로만 *작성* — 사칭 방지
allow create: if request.auth.uid == request.resource.data.authorId;

// 3) 자기 글만 *수정·삭제* — 남의 것 못 건드림
allow update, delete: if request.auth.uid == resource.data.authorId;
```

학기 프로젝트의 90%는 이 3가지 조합. 자세한 예시는 [`rules/secure.rules`](rules/secure.rules).

---

## 무료 티어 한도 (Spark plan)

| 항목 | 일일 한도 |
|------|-----------|
| 읽기 | 50,000 |
| 쓰기 | 20,000 |
| 삭제 | 20,000 |
| 저장 | 1 GB |

학기 프로젝트엔 절대 안 모자람. ⚠️ 단, **무한 루프로 onSnapshot 폭주**시키면 1시간에 한도 초과 가능 — 콘솔 → 사용량 메뉴에서 모니터링.
