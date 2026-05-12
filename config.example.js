// Firebase 프로젝트 설정 (수업 + 학생 공통)
// ──────────────────────────────────────────
// 사용법:
//   1) 이 파일을 같은 폴더에 config.js 로 복사
//   2) 본인 Firebase 프로젝트의 firebaseConfig를 console.firebase.google.com에서 복사해 붙여넣기
//   3) 모든 데모(01~06)에서 자동으로 사용
//
// 발급 절차: [[학생-사전준비-가이드]] 3단계
//   1. console.firebase.google.com → 프로젝트 만들기
//   2. 웹 앱 추가 (`</>` 아이콘)
//   3. 표시되는 firebaseConfig 객체 복사
//   4. Auth → Sign-in method → Google 활성화
//   5. Firestore → 데이터베이스 만들기 → 테스트 모드 (asia-northeast3 서울)
//
// ⚠️ apiKey는 노출돼도 OK (인증이 아닌 식별자) — 진짜 보안은 보안 규칙
// ⚠️ 단, 보안 규칙을 반드시 짜라 (06-mini-lab-starter 참고)

window.firebaseConfig = {
  apiKey: "AIza여기에_본인_apiKey",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};

// ──────────────────────────────────────────
// Cloudinary 설정 (07b-image-cloudinary.html 에서만 사용)
// ──────────────────────────────────────────
// Firebase Spark 요금제는 Storage가 막혀 있어서, 이미지 호스팅은 외부 무료 서비스로 대체.
// Cloudinary는 25GB 저장 + 25GB 대역폭/월 무료 (카드 등록 불필요).
//
// 발급 절차:
//   1. cloudinary.com 가입 (이메일 또는 Google 로그인)
//   2. Dashboard에서 Cloud name 확인 (예: "dxxxxx")
//   3. Settings → Upload → "Add upload preset"
//        Preset name: 자유 (예: "note12_unsigned")
//        Signing mode: ⭐ Unsigned ← 반드시 이 설정
//        Folder: note12-demo  (선택, 정리용)
//      → Save
//
// ⚠️ Unsigned upload는 누구나 너의 cloud에 업로드 가능 → 학습용으로만.
//    실서비스는 서버 측 signed upload 또는 IP/도메인 제한 필요.
window.cloudinaryConfig = {
  cloudName: "여기에_본인_cloud_name",
  uploadPreset: "여기에_본인_unsigned_preset_이름"
};
