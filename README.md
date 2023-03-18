# 실행방법

- .env파일을 nestjs 안에 추가해줘야 합니다. (gitrepo에는 올리지 않았습니다.)
- docker로 실행할 경우
    - docker가 실행 가능한 상태여야 합니다.
    - 실행 가능한 상태라면, Makefile을 사용해 실행시켜주세요.
        
        ```bash
        make up
        ```
        
- local 환경에서 실행할 경우
    - 각 ./frontend, ./nestjs 폴더 경로에서 다음 명령어를 사용해 각각 실행시켜주세요.
        
        ```bash
        npm install
        npm start run
        ```
        

정상적으로 컨테이너들이 혹은 node 모듈들이 실행됐다면, 브라우저로 화면을 확인할 수 있습니다.

Front: [localhost:4000](http://localhost:4000)

Back: [localhost:3000](http://localhost:3000)