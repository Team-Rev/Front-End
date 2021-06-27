## Front-end
React 와 Redux로 만든 캡스톤 디자인 프론트엔드 파트입니다.

## 설치 방법
- Node.js 설치
https://nodejs.org/ko/
- Create React App 설치
```
  npm install -g create-react-app
```  
- Create React App 이용해 개발환경 구축
```
  cd [생성한 경로]
  create-react-app .
```
- React 웹엡 실행
```
  npm run start / npm start
```
- 배포
```
  npm run build
```

## 기능
- 완료
   - 인증기능(로그인, 회원가입)
   - 문제 풀이
   - 푼 문제 기록 조회
   - 공지사항 조회
- 개발중
   - 질문 게시판
- 예정
   - ID/PW 찾기
   - 문의 게시판
   - 사용자 본인 작성글 조회
   - 포인트
   - 관리자 페이지
   - 취약점 분석

## Repository 구조
```
  ├─ src/
│  ├─ component/    # 컴포넌트 폴더
│  │  ├─ App/       # 로그인 정보 처리 및 라우팅 폴더
│  │  ├─ Container/ # 항시 같은 크기에 맞는 재사용성 컨테이너 폴더 
│  │  ├─ icon/      # img파일 저장 폴더
│  │  ├─ Main/      # 각각의 기능 컴포넌트를 담고있는 메인 
|  |  |  |- Createques  # 사용자가 문제를 생성할 수 있게 해주는 문제 생성 컴포넌트 
|  |  |  |- Join        # 회원가입을 위한 회원가입 컴포넌트 
|  |  |  |- Learning    # 사용자의 초기 진단을 위한 진단평가 컴포넌트
|  |  |  |- Learnrecord # 사용자의 푼 모든 기록이 저장되어 있는 컴포넌트 
|  |  |  |- Login       # 로그인을 위한 로그인 컴포넌트
|  |  |  |- Notice      # 주요 사항들을 공지하는 공지사항 게시판 컴포넌트
|  |  |  |- Pointrecord # 지금까지 모으거나 사용한 포인트를 조회하는 컴포넌트
|  |  |  |- Question    # 사용자들의 질문들을 게시하는 질문게시판 컴포넌트
|  |  |  |- Sidebar     # 각각의 기능들을 목록화 해서 보여주는 네비게이션바 컴포넌트
|  |  |  |- Solveques   # 추천 or 키워드 선택으로 문제 푸는 방식 두가지를 보여주는 컴포넌트
|  |  |  |- StartExam   # 사용자가 문제를 풀기 시작하면 문제와 보기들을 보여주는 컴포넌트
|  |  |  |- TotalPage   # 문제를 다 풀고 제출을 하면 전체 정답/오답 개수와 문제들을 보여주는 컴포넌트
|  |  |  |- Vulnerable  # 취약점 분석을 위한 컴포넌트
|  |  |  |- Writer      # Writer Component
├─ .gitignore        # List of files and folders not tracked by Git
├─ package.json      # Project manifest
└─ README.md         # This file
```

