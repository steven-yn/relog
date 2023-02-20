
실습진행순서
-1) 작업 환경 준비
-2) Koa 서버 띄우기
-3) 미들웨어 알아보기.
-4) Koa-router 를 통한 백엔드 라우팅.
-5) 라우트 모듈화하기

1. node --version

2. blog-backend 디렉터리에서 패키지 정보 생성.
yarn init -y

3. 해당 파일 잘 만들어졌는지 확인.
cat package.json 또는 에디터로 직접 확인.

4. Koa 웹 프레임워크 설치.
yarn add koa

5. ESLint 와 Prettier 설정.
yarn add --dev eslint

6. Prettier 에서 관리하는 코드 스타일은 ESLint 에서 관리하지 않도록
eslint-config-prettier 설치 및 적용.
yarn add eslint-config-prettier

7. 설치후 .eslintrc.json 파일에서 
"extends": ["eslint:recommended", "prettier"], 로 수정.

8. src/index.js 생성.

9. 
{
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": ["eslint:recommended", "prettier"],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "no-unused-vars" : "warn",
        "no-console" : "off",
    }
}

ESLint 와 Prettier 동작 확인.

10. 서버 열기위한 코드 작성.

11. 현재 요청을 받은 주소와 우리가 정해준 숫자를 기록하는
두개의 미들웨어 작성.

12. 첫번째 미들웨어 에서 호출하던 next 함수를 주석처리

13. 요청 경로에 authorized=1 이라는 쿼리 파라미터가 포함되면
이후 미들웨어를 처리해주고, 그렇지 않으면 이후 미들웨어를 처리하지 않음.
?authorized=1

14. next 함수 호출 이후에 then 을 사용해 Promise가 끝난다음
콘솔에 END 를 기록하도록 수정.

15. 기존 코드를 async/await 사용하는 형태로 수정하기.

16. nodemon 사용하기
npm install nodemon -g

17. package.json 에 scripts 에 추가하기.

18. yarn start:dev 명령어를 실행.
그다음 index.js 에서 기존 미들웨어 모두제거.
yarn start	# 재시작이 필요없을때
yarn start:dev # 재시작이 필요할때 

19. Koa-router 설치하기.
yarn add koa-router

20. 라우터를 불러와 적용해보기.

21. 파라미터와 쿼리를 사용하는 라우트 작성.

22. 라우터를 여러파일에 분리시켜 작성하고, 이를 불러와 적용하기
src 디렉터리에 api 디렉터리 를 생성하고, 그안에 index.js 파일 만들기.

23. 기존 라우트 제거하고 /api 로 연결.
http://localhost:4000/api/test 에서 확인.


24. 라우트에 여러 종류의 라우트를 설정한 후 
모두 printInfo 함수를 호출하도록 설정.
문자열이 아닌 JSON 객체를 반환하도록 설정하고, 
이 객체에는 현재 요청의 메서드, 경로, 파라미터를 담았다.

25. 기존 test 라우트는 지우고, posts 라우트를 불러와 설정.

26. Postman 의 설치 및 사용 

27. GET 셀렉트 박스를 클릭하여 메서드를 선택후 오른쪽 텍스트 박스에
주소를 입력하고 Send 버튼을 누르면 요청. POST /api/posts 로 요청 해보기
다른 API 도 입력 해보기. 메서드 변경하고 경로 끝에 /10 을 붙임.

28. koa-bodyparser 미들웨어 적용.
이 미들웨어는 POST/PUT/PATCH 같은 메서드의 Request Body에
JSON 형식으로 데이터를 넣어주면, 이를 파싱하여 서버에서 사용 할수 있게함.
yarn add koa-bodyparser

29. bodyparser 적용하기.
주의 사항 : router 를 적용하는 코드의 윗부분에서 적용.

30. 컨트롤러 파일 생성.
지금은 DB 에 연결하지 않았으므로 JS 배열기능만 사용하여 임시로 구현.

31. 만든 컨트롤러 함수들을 각 라우트에 연결

32. Postman 으로 JSON 객체 send 와 응답 보기.