실습 진행 순서 
-1) MongoDB 기본 지식 알아보기
-2) 작업환경 설정하기 
-3) mongoose 로 데이터베이스 연결하기 
-4) esm 으로 ES 모듈 import/export 문법 사용하기 
-5) 스키마와 모델 이해하기
-6) REST API 구현하기 
-7) 페이지네이션 구현하기 

0. MongoDB 설치.
MongoDB 공식 사이트 다운로드 페이지 에서 인스톨.
MongoDB Compass 라는 프로그램도 함께 설치된다.

1. mongoose 와 dotenv 설치.
yarn add mongoose dotenv

2. .env 환경변수 파일 생성

3. src/index.js 파일의 맨 위에 다음과 같이 dotenv 를 불러와서 
config() 함수를 호출. Node.js 에서 환경변수는 process.env 
값을 통해 조회.

4. .env 파일이 동작하는지 확인하기 위해 4001 로 바꾸고
콘솔창 확인하기. 포트가 바뀌면 4000으로 다시복구.

5. mongoose 를 이용해 서버와 DB 연결.
연결할땐 mongoose 의 connect 함수 사용.
connect 에 두번째 파라미터 안넣음.

6. import/export 문법을 사용하기 위한 esm 설치
yarn add esm

7. 기존 src/index.js 를 main.js 로 변경하고,
index.js 파일을 새로 생성해서 esm 을 적용하는 코드 작성.

8. esm 적용하기 위해 package.json 내용 추가.

9. eslint 에서 import/export 구문 사용해도 오류 간주하지 않도록
.eslint.json 에서 수정.

10. 서버를 종료하고 yarn start:dev 명령어를 입력하여 서버 구동.

11. api/posts/posts.ctrl.js 파일에 exports 를 
export const 로 모두변경.

12. src/api/posts/index.js 수정

13. src/api/index.js 수정

14. main.js 수정.

15. postman 으로 작동확인 해보기.

16. 루트 디렉터리에 jsconfig.json 작성.

17. 자동완성 되는지 확인해보기.

18. 스키마 파일을 작성해보기.

19. 모델 생성하기.

20. MongoDBcompass 실행시키고, posts.ctrl의 로직 새로 작성.

21. api/posts/index.js 에서 PUT 메서드를 설정한 부분 제거.

22. 블로그 포스트를 작성하는 API 인 write 구현.
save() 함수 사용.
23. Postman 으로 요청.
{
    "title": "제목",
    "body": "내용",
    "tags": ['태그1', '태그2']
}

24. Compass 에 잘 등록되었는가 확인. 

25. 데이터 조회를 위한 list API 작성.
find() 함수 사용.

26. postman 으로 GET 요청.

27. 특정 포스트 조회를 위한 read API 작성.
findById() 함수 사용.

28. postman 으로 GET 요청. URL에서 id 부분에 넣는 파라미터는
이전에 포스트 목록 조회시 나왔던 id 중 하나를 복사.

29. 일부러 잘못된 id 넣어보기. 

30. 데이터 삭제를 위한 remove API 작성.
findByIdAndRemove() 함수 사용.

31. Postman 으로 조금전 GET 요청한 주소로 DELETE 요청.
그다음 똑같은 주소로 GET 요청 해보면, 404 오류가 발생. 'Not Found'

32. 데이터 업데이트를 위한 update API 작성.
findByIdAndUpdate() 함수 사용.

33. Postman 에서 GET 해서 포스트 목록 받은후, 유효한 id값을 복사한후
해당 id의 포스트를 업데이트 해보기.

34. ObjectId 를 검증하기위한 코드를 작성하고, 원하는 API 에만 
적용하기 위해 미들웨어를 만듦.

35. apipst_index 에서 미들웨어 적용 

36. 방금 적용한 파일 리팩토링. 나는 적용안함.

37. Postman 에서 잘못된 id 로 GET 요청.

38. 객체를 검증하기 위한 각 값을 if 문으로 비교할수도 있지만,
여기서는 이를 수월하게 해주는 라이브러리 Joi 를 설치하여 사용.
$ yarn add joi

39. 설치후 write 함수에서 Joi 를 사용해 요청내용 검증.

40. Postman 에서 tags 를 제외하고 API 요청 해보기.

41. update API 에서도 비슷하게 요청내용 검증.
write API 와 비슷하지만, require가 없다.

42. Postman 에서 title 값에 숫자를 넣어서 보내보기.

43. 페이지네이션 실습을 위해 가짜 데이터를 채워넣을 스크립트 작성.

44. main.js 에서 방금 만든 함수 호출.

45. 잘 적용되었는가 터미널과 Compass 확인.

46. 적용이 되었다면 main 에서 함수 호출하는 코드 지우기.

47. 가짜 포스트를 역순으로 불러오기위해 sort 함수 사용.

48. postman 으로 GET 해보기.

49. 한번에 보이는 포스트 개수를 제한.
개수를 제한할땐 limit() 함수를 사용.

50. postman 으로 GET 해보기.

51. list API 에 페이지 기능 구현.
skip 함수 사용.

52. 마지막 페이지 번호 알림기능.
커스텀 헤더를 설정하는 방법 사용.

53. Postman 에서 GET 요청하여 Last-Page 헤더를 확인.

54. 내용 길이 제한 기능을 구현.
toJSON() 함수를 사용해서 mongoose 문서 인스턴스 를
JSON 형태로 변환시켜줌.

55. lean() 함수를 사용해서 같은 기능구현.

56. Postman 으로 list API 호출.