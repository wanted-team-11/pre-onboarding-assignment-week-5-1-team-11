# 원티드 프리온보딩 5주차 과제

## 💡 11팀

> 참여 인원 (이미지 클릭시 개인 레포지토리로 이동)

| [<img src="https://avatars.githubusercontent.com/u/16061038?v=4" width="120px" /> ](https://www.github.com/GUGIG) | [<img src="https://avatars.githubusercontent.com/u/62875596?v=4" width="120px" /> ](https://www.github.com/dlsxody1) | [<img src="https://avatars.githubusercontent.com/u/57490711?v=4" width="120px" /> ](https://www.github.com/gkdfo40) | [<img src="https://avatars.githubusercontent.com/u/97019802?v=4" width="120px" /> ](https://www.github.com/hjpark625) | [<img src="https://avatars.githubusercontent.com/u/46833758?v=4" width="120px" /> ](https://www.github.com/ggsno) | [<img src="https://avatars.githubusercontent.com/u/111843724?v=4" width="120px" /> ](https://www.github.com/lee12779) | [<img src="https://avatars.githubusercontent.com/u/66675699?v=4" width="120px" /> ](https://www.github.com/happyeveryone96) | [<img src="https://avatars.githubusercontent.com/u/62886997?v=4" width="120px" />](https://www.github.com/HyunSeungBeom) |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **[팀장]정재훈**                                                                                                  | **김인태**                                                                                                           | **김항래**                                                                                                          | **박희주**                                                                                                            | **오강산**                                                                                                        | **이미란**                                                                                                            | **정진우**                                                                                                                  | **현승범**                                                                                                               |

---

> 역할

각자 구현해보고 BestPractice를 산출한뒤에 리팩토링하거나 부족한 부분을 채우는 형식으로 진행하였습니다.

<br />

<br />
<br />

## 🌈 실행 방법

```bash
    $ git clone https://github.com/wanted-team-11/pre-onboarding-assignment-week-5-1-team-11.git

    # 프로젝트 root에 있는 "assignment-api.zip"파일의 압축을 풀어 서버 실행(해당 readme 참고)

    $ cd pre-onboarding-assignment-week-5-1-team-11
    $ npm install
    $ npm start
```

<br />
<br />

---

<br />

## 📚 기술스택

<br />

![react](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react)
![typescript](https://img.shields.io/badge/typescript-4.8.2-3178C6?logo=typescript)
![styledComponents](https://img.shields.io/badge/styled--components-5.3.5-DB7093?logo=styledcomponents)

- 선정 이유

  - React
    - Virtual DOM을 활용하여 빠른 렌더링이 가능
    - 단방향 데이터 바인딩을 통한 디버깅이 용이
  - TypeScript
    - 정적 타입 지원하므로 컴파일 단계에서 오류를 사전에 포착할 수 있으며 이를 통해 미리 디버깅이 가능함
    - 여러가지 패러다임을 활용할 수 있음 (절차지향, 객체지향, 함수형)
  - Styled-Components
    - CSS-in-JS는 짧은 길이의 유니크한 클래스를 자동적으로 생성하기에 코드 경량화에 효과적
    - 스크립트에성의 상수와 함수를 쉽게 공유하여 props를 활용한 조건부 렌더링에 용이
    - 컴포넌트화 시켜 다른곳에서 사용 가능
    - 컴포넌트 기반 개발 방법에 적합하고 가장 많이 사용되는 CSS-in-JS 라이브러리

<br>

---

## 📁 폴더 구조

```
//src
├── App.tsx
├── assets
│   ├── Doctors.svg
│   ├── Engineer1.svg
│   ├── Engineer2.svg
│   └── SearchIcon.svg
├── components
│   ├── BlueArea.layout.tsx
│   ├── DoctorImage.component.tsx
│   ├── EngineersImage.component.tsx
│   ├── HighlightedText.component.tsx
│   ├── SearchBox.component.tsx
│   └── SearchResultList.component.tsx
├── hooks
│   └── useDebounce.ts
├── index.tsx
├── react-app-env.d.ts
├── styles
│   └── GlobalStyles.styled.tsx
├── types.ts
└── utils
    └── search-result-cache.ts
```

<br>

---

## 📝 요구 사항

### 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

- 사용자가 입력한 텍스트와 일치하는 부분 볼드처리
  - 예)
    - 사용자 입력: 담낭
      추천 검색어:  **담낭**의 악성 신생물, **담낭**염, **담낭**의 기타 질환, 달리 분류된 질환에서의 **담낭**, 담도 및 췌장의 장애
- 검색어가 없을 시 “검색어 없음” 표출

### API 호출 최적화

- API 호출별로 로컬 캐싱 구현
  - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
  - 캐싱을 어떻게 기술했는지에 대한 내용 README에 기술
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
  - README에 전략에 대한 설명 기술
- API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

### 키보드만으로 추천 검색어들로 이동 가능하도록 구현

- 사용법 README에 기술

<br>

---

## 🚩 구현 기능

### API 호출 최적화

1. cache 구현

- 캐싱 기능을 하는 클래스 구현
  - localCache(멤버변수): 캐시 데이터를 담고있는 private 멤버 변수.
  - query(메소드): 새 데이터를 요청하거나 캐시의 값을 리턴한다
  - getSearchResults(메소드): 주어진 uri에 대한 데이터를 요청한다(GET).
  - setCache(메소드): 캐시값을 localCache에 할당하고 invalidate시간(1분)을 설정한다.
  - invalidate(메소드): 캐시값을 localCache로부터 제거한다.
  - 클래스 인스턴스 생성 & export => 이를 활용해 데이터 요청

2. debounce

- 입력이 완료된 후 200ms가 지났을 때 서버에 데이터를 요청하도록 한다.
- 만일 200ms가 지나기 전 input change가 발생할 경우, 타이머를 리셋시킨다.

<br>

### 추천검색어 키보드컨트롤

> **사용법** :: 검색어 입력창에 focus가 있는 상태에서 키보드 방향키 아래 키나 위 키를 입력.

- 검색창 아래에 출력된 검색 목록에서 선택된 항목의 배경 색상 변함

- 실제 focus가 변하는 것은 아니지만 키보드로 선택된 값을 새로 쿼리를 보내지 않으면서 input value를 수정해 사용자 경험 개선을 도모함

### 검색어 강조

- 검색어를 기준으로 문자열을 split한 뒤 나뉘어진 원소들 뒤에 각각 map으로 검색어를 붙인다. 가장 마지막 원소는 제외한다.

<br>

---

## 🙏 Commit Convention

|   Type   | Description                   |
| :------: | ----------------------------- |
|   feat   | Add a new feature             |
|   fix    | Fix the bug                   |
|  design  | UI design changes such as CSS |
|  style   | code formatting               |
| refactor | Refactoring the code          |
|   docs   | Modify the document           |
|  chore   | etc.                          |
