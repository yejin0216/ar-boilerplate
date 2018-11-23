# ar_boilerplate
 - 2018/11/15, 신규 작업

# 목적
 - 본 패키지는 자바스크립트, ARToolkit 등을 활용하여 브라우저 기반 AR을 생성할 수 있도록 지원하는 Boilerplate입니다.
 - 2019년 KT 소프트웨어개발단 신입사원의 교육용 프로젝트를 위하여 작업했습니다.

# 프로젝트 구성
 1. 디렉토리 구성
   - dist/ (배포용 소스 버전)
   - src/  (작업용 소스 버전으로 css, js, font, image 등 정적 파일이 위치합니다.)
   - src/assets  (css, font, image 등이 위치합니다.)
   - src/example (예제 소스가 위치합니다.)
   - src/utils   (jsartoolkit, KT IoTMakers Open API 등의 공통기능을 제공합니다.)

# 환경 구성
 - Nodejs
 - Web Task Manager: Webpack

# 시작하기
 1. 사전 설치
     - git 설치
     - nodejs 설치
     - 터미널에 차례대로 실행
     ```
        cd C:\Users\yejin\WebstormProjects\ar_boilerplate
        npm install
        bower install
     ```
 2. 시작
     - Build
     ```
        npm run build
     ```
     - Running
     ```
        npm run dev
     ```
     - `http://localhost:9000` 접속

# important issues
 1. [Webpack : high CPU usage](https://github.com/webpack/webpack/issues/701#issuecomment-70654775)