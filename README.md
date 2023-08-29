# [리액트 심화 주차] 주류 레시피 공유 웹사이트, Shaker

스파르타코딩클럽 6기_React

<div align="center">

![header](https://capsule-render.vercel.app/api?type=Cylinder&color=000000&height=150&section=header&text=Shaker&fontColor=FFD99B&fontSize=70&animation=fadeIn&fontAlignY=55)

</div>

## 목차

-   프로젝트 소개
-   프로젝트 링크
-   기술스택
-   사용한 라이브러리
-   사용한 API
-   버전 관리시스템
-   사용 툴
-   구현 페이지

## 프로젝트 소개

React-query, firebase auth 를 활용하여 제작한 주류, 칵테일 레시피 공유 웹사이트 Shaker 입니다.
과거 호주에서 워킹홀리데이 중, 호텔 칵테일 바에서 근무했던 경험을 살려 레시피를 잊지 않고 보관 및 공유하기 위해 웹페이지를 제작하였습니다.

1. 메인 페이지 - framer-motion 라이브러리를 이용해 hover 시 메인 text 가 움직이는 효과를 나타냈습니다.
2. 칵테일 리스트 페이지 - 다른 유저들이 작성한 칵테일 레시피를 불러오고, 칵테일 레시피를 작성할 수 있습니다. 칵테일 이름으로 검색이 가능하고 기본 베이스주에 따라 원하는 베이스주가 들어간 칵테일도 검색이 가능합니다.
3. 칵테일 상세 페이지 - 해당 칵테일 레시피에 유저들이 댓글을 달 수 있고, 댓글을 삭제할 수 있습니다. 
4. 로그인 및 회원가입 페이지 - firebase auth 를 사용하여 구글, 깃허브 소셜로그인과 이메일 로그인을 구현했으며 회원가입을 할 때 이메일 중복확인 기능을 합니다.
5. 마이페이지 - 작성한 글 목록을 불러오고 수정 및 삭제를 할 수 있습니다.

## 프로젝트 링크

배포: https://shakers.vercel.app/

<div align=“center”>
	  <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
  </div>

## 기술스택
  * Javascript
  * html/css
  * react
  * Firebase
    
  <div align=“center”>
	  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
    <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
 <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">     
  </div>
  </div>
  

## 사용한 라이브러리
  * react-router-dom
  * json-server
  * styled-component
  * react-query
  * framer-motion

## 버전 관리 시스템
   * Git/Github
   <div align=“center”>
	  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
    <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  </div>
  
## 사용 툴
  * Visual Studio
  * 
<div align=“center”>
	  <img src="https://img.shields.io/badge/visualstudio-5C2D91?style=for-the-badge&logo=visualstudio&logoColor=white">
  </div>
   
## 구현 페이지


### 1) 메인 페이지

<img width="1440" alt="image" src="https://github.com/Passionhruit/Shaker/assets/92542456/6023a596-83d2-4b43-951c-907a392b464f">


### 2) 칵테일 리스트 페이지

<img width="1440" alt="image" src="https://github.com/Passionhruit/Shaker/assets/92542456/3d0e7ac8-e7aa-4ce4-b882-a2fca1b0d4bf">


### 3) 칵테일 상세 페이지

<img width="1440" alt="image" src="https://github.com/Passionhruit/Shaker/assets/92542456/7564034d-6c62-4cf9-a814-94cf152ba796">

### 3) 로그인 모달

<img width="1440" alt="image" src="https://github.com/Passionhruit/Shaker/assets/92542456/581217db-3183-4cd3-90fb-e7e024395b6e">


### 4) 회원가입 모달

<img width="1440" alt="image" src="https://github.com/Passionhruit/Shaker/assets/92542456/cdef3e8d-4a27-404f-8dd6-2d30aa6e26a5">


### 5) 마이 페이지

<img width="1440" alt="image" src="https://github.com/Passionhruit/Shaker/assets/92542456/57431e66-9928-4bd9-83d2-39c0ac4741c0">

### 6) 글 수정 모달

<img width="1440" alt="image" src="https://github.com/Passionhruit/Shaker/assets/92542456/d5812e5b-7240-4644-b017-34251b96557c">
