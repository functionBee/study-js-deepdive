[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fgather-around-and-code%2Fstudy-js-deepdive&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)


# study-deepdive-js
Javascript Deep Dive와 MDN문서를 토대로 자바스크립트 개념을 공부하는 스터디 기록입니다.

<br>

## 📋 Study Approach

1. 참여 인원은 각자 해당 챕터를 정리한 내용을 마크다운 파일로 작성하여 GitHub에 업로드합니다.
2. 발표는 각자가 작성한 내용을 기반으로 진행합니다.
3. 주차별 발표자는 랜덤으로 정합니다.
4. 각자 챕터와 관련된 질문 갯수를 2개씩 정한 후, 그 내용을 meeting 당일 13:00까지 q&a.md 파일에 추가합니다.
5. 폴더 및 구조

``` bash
.
├── [Number] Chapter Title 
├── 04_변수
│   ├── userName.md # userName으로 파일을 명명합니다.
│   └── q&a.md # 챕터와 관련된 질문 목록
├── 05_표현식과 문
├── 06_데이터 타입
├── 07_연산자
├── 08_제어문
├── 09_타입변환과 단축평가
├── 10_객체 리터럴
├── 11_원시값과 객체의 비교
├── 12_함수
├── 13_스코프
├── 14_전역변수의 문제점
├── 15_let,cosnt 키워드와 블록레벨 스코프
├── ...
├── Projects # 토이 프로젝트 
│   └── [Number]_Assignment
│   └── 01_Assignment # 차시별 같이 고민해본 과제
│       ├── b
│       │   └── ex_assignment_finished.html # 완성 시 `_finished`
│       └── ex_assignment.html # 과제 예시 코드
└── public # 이미지
```

<br>

## 🤔 Pull Request와 Commit Convention

한글 커밋 메시지를 사용하고 커밋의 의도를 나타내기 위해 적절한 접두사를 사용하여 Commit Convention을 준수합니다.

```bash
# 개인의 이름을 사용하여 새로운 브랜치를 생성합니다
git branch user-b

# 새로 생성된 브랜치로 이동합니다
git checkout user-b

# 적절한 커밋 메시지로 변경 사항을 커밋합니다
git commit -m "create: #1 4장 변수"

# 브랜치를 원격 저장소로 푸시합니다
git push origin user-b

# 메인 브랜치로 전환합니다
git checkout master

# user-b 브랜치를 master 브랜치로 병합합니다
git merge user-b

```

**Commit Convention**:

- 커밋 메시지는 한글로 작성합니다.
- 커밋 메시지는 챕터명을 기준으로 작성합니다 (예: "4장 변수").
- 다음과 같은 접두사를 사용하여 커밋의 의도를 표시합니다:
  - `create`: 새로운 내용을 추가하는 경우
  - `update`: 기존 내용을 수정하는 경우
  - `delete`: 기존 내용을 삭제하는 경우
  - `docs`: README.md 파일을 수정하는 경우
  - `chore`: 기타 작업 및 변경 사항
  - `fix`: 버그 수정
  - `chore`: 일반적인 유지보수 또는 도구 변경
  - `test`: 테스트 추가 또는 수정
  - `refactor`: 동작을 변경하지 않고 코드 재구성
  - `style`: 코드 스타일 변경 (공백, 형식 등)

```
feat: 사용자 인증 기능 추가
fix: 데이터 처리 중 발생한 널 포인터 예외 수정
docs: 설치 안내서에 README 업데이트
```


<br>


## ✨ Meeting 
- 월요일과 목요일: 23:00~24:30 (1시간 30분)


<br>

## 🔖 Content
|   	| 날짜           	| 챕터    	| 발표자 	| 불참자 	| 과제                   	|
|---	|----------------	|---------	|--------	|--------	|------------------------	|
| 1 	| 2023-05-25(목) 	 | 4장,5장   	|        	|        	| [상품 리스트 만들기](https://github.com/gather-around-and-code/study-js-deepdive/issues/3) 	|
| 2 	| 2023-05-29(월)  	| 6장,7장 	 |        	|        	|                        	|
| 3 	| 2023-06-01(목)  	| 8장,9장  	|        	|        	|                        	|
| 5 	| 2023-06-05(월)  	| 10장,11장   	|        	|        	|                        	|
| 6 	| 2023-06-08(목)  	| 12장   	|        	|        	|                        	|
| 4 	| 2023-06-12(월)  	| 13장,23장   	|        	|        	|                        	|
| 7 	| 2023-06-15(목)  	| 14장,15장   	|        	|        	|                        	|
| 8 	| 2023-06-19(월)  	| 16장,17장   	|        	|        	|                        	|
| 9 	| 2023-06-22(목)  	| 18장   	|        	|        	|                        	|
| 10 	| 2023-06-26(월)  	| 19장   	|       	|        	|                        	|
| 11	| 2023-06-29(목)  	| 20장,21장, 22장	|        	|        	|                        	|
| 12	| 2023-07-03(월)  	| 24장   	|        	|        	|                        	|
| 13	| 2023-07-06(목)  	| 25장   	|        	|        	|                        	|
| 14	| 2023-07-10(월)  	| 26장   	|        	|        	|                        	|
| 15	| 2023-07-13(목)  	| 27장   	|        	|        	|                        	|
| 16	| 2023-07-17(월)  	| 28장, 29장, 30장, 31장   	|        	|        	|                        	|
| 17	| 2023-07-20(목)  	| 32장,33장   	|        	|        	|                        	|
| 18	| 2023-07-25(월)  	| 38장   	|        	|        	|                        	|
| 19	| 2023-07-27(목)  	| 39장   	|        	|        	|                        	|
| 20	| 2023-07-31(월)  	| 34장, 35장, 36장 	|        	|        	|                        	|
| 21	| 2023-08-03(목)  	| 37장, 42장   	|        	|        	|                        	|
| 22	| 2023-08-07(월)  	| 40장   	|        	|        	|                        	|
| 23	| 2023-08-10(목)  	| 41장, 43장   	|        	|        	|                        	|
| 24	| 2023-08-14(월)  	| 45장   	|        	|        	|                        	|
| 25	| 2023-08-17(목)  	| 46장   	|        	|        	|                        	|
| 26	| 2023-08-21(월)  	| 47장, 48장   	|        	|        	|                        	|

<br>

## 💪 Participants

<a href="https://github.com/gather-around-and-code/study-js-deepdive/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=gather-around-and-code/study-js-deepdive" />
</a>
