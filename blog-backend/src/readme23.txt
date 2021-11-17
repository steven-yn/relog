실습 진행 순서
-1) User 스키마 / 모델 만들기 
-2) 회원 인증 API 만들기
-3) 토큰 발급 및 검증하기 
-4) posts API 에 회원 인증 시스템 도입하기 
-5) username/tags 로 포스트 필터링 하기.

1. 사용자 계정명과 비밀번호 를 담는 스키마 작성.

2. 해시를 만드는 함수와 해시를 검증하는 함수를 만들기 위해 bcrypt 설치.
yarn add bcrypt

3. 파라미터로 받은 비밀번호가 해당 계정의 비밀번호와 일치하는지
검증 하는 setPassword 와 checkPassword 인스턴스 메서드 작성.

4. findByUsername 이라는 스태틱 메서드 작성.

5. 회원 인증 API 를 위한 새로운 라우트 정의. 틀만 잡음.

6. auth 라우터 생성.

7. auth 라우터를 api 라우터에 적용.

8. register API 작성.

9. serialize 인스턴스 메서드 만들기.

10. hashedPassword 삭제한 부분 serialize 로 교체.

11. postman 으로 POST 해서 register 해보기.

12. 그대로 재등록 해서 conflict 오류보기

13. login API 구현하기

14. postman 으로 로그인 요청해보기. 틀린 비밀번호로도 요청.

15. JWT 토큰을 만들기 위해서 jsonwebtoken 모듈 설치.
yarn add jsonwebtoken

16. JWT 토큰을 만들때 사용할 비밀키 JWT_SECRET 만들기.
문자열 아무거나 입력.
JWT_SECRET=13524632586u5389gnefjgnethjtb34thf2h238ehfsdfsd

17. user 모델 파일에서 generateToken 이라는 인스턴스 메서드 생성.

18. 사용자 토큰을 쿠키에 담아 사용. register 와 login API 를 수정.

19. postman 으로 로그인 요청 시도 해보기.
Cookie 헤더 확인하기.

20. 사용자의 토큰을 확인한 후 검증하는 작업.
이 작업은 미들웨어를 통해 처리.

21. 미들웨어를 만든뒤 main.js 에서 app 에 미들웨어를 적용.
jwtMiddleware 를 적용하는 작업은 app 에 router 미들웨어를 
적용하기 전에 이뤄져야 함.

22. postman 으로 check 경로로 GET 요청하고, 터미널확인
나타나지 않는다면 로그인 API 를 성공적으로 호출하고서 다시해보기.
현재 토큰이 해석된 결과가 나타남.

23. 해석된 결과를 이후 미들웨어 에서 사용하려면 ctx 의 state 안에 넣어줌.

24. check API 구현.

25. 다시 postman 으로 GET 요청.

26. exp 에 표현된 날짜가 3.5일 미만이라면
토큰을 새로 재발급 해주는 기능 구현.

27. generateToken 함수에서 토큰 유효 기간을 2일로 설정

28. postman 에서 다시 login API 를 요청한다음 check API 를 요청해보자.
재발급이 잘 이뤄지면, check API 를 요청할때 Headers 에서 
새 토큰이 Cookie 를 통해 설정된다. 확인후 다시 7일로 설정.

29. 로그아웃 기능 구현. 이 API 는 쿠키를 지워주기만 하면 끝남.

30. postman 으로 logout API 호출.

31. Post 스키마에 user의 id와 username 전부 넣어줌.

32. 우리가 이전에 DB에 생성한 데이터들은 
더이상 유효하지 않으므로 모두 삭제. drop collection

33. checkLoggedIn 이라는 미들웨어 만들어서 로그인 해야만 
글쓰기, 수정, 삭제를 할수있도록 구현하기.

34. checkLoggedIn 미들웨어를 posts 라우터 에서 사용.

35. 로그인된 사용자만 포스트를 작성할수 있게 했으니, 
포스트 작성시 사용자 정보를 넣어서 DB에 저장하도록 구현.

36. Postman 으로 포스트 작성 API 요청하기.
조금전에 로그아웃 했다면, 다시로그인후 API 요청.

37. 작성자만 포스트를 수정하거나 삭제 할수 있도록 구현.
id로 포스트를 조회하는 작업도 미들웨어로 해줘야 한다.

38. posts 라우터에 getPostById 반영.

39. read 함수 내부에서 id로 포스트 찾는 코드 간소화.

40. checkOwnPost 미들웨어 만들기.
id로 찾은 포스트가 로그인 중인 사용자의 게시물 인지
확인해줌. 만약 사용자의 포스트가 아니라면 403 에러 발생.

41. 만든 미들웨어를 update 및 remove API 에 적용.

42. postman 으로 새계정 만들고 그 계정으로 다른계정 포스트 삭제해보기.
403 에러가 나타난다.

43. 특정 사용자가 작성한 포스트만 조회하거나 특정 태그가 있는
포스트만 조회하는 기능을 만듦.

44. postman 에서 username 쿼리와 tag 쿼리로 게시물 조회하기.

