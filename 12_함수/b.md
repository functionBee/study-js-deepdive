# 12장. 함수(Function)

'모던 자바스크립트 Deep Dive'를 읽고 정리한 내용입니다.

**[목차]**

- 12장. 함수
  - [12-1. 함수란?](#12-1-함수란)
  - [12-2. 함수를 사용하는 이유](#12-2-함수를-사용하는-이유)
  - [12-3. 함수 리터럴](#12-3-함수-리터럴)
  - [12-4. 함수 정의](#12-4-함수-정의)
    - [12-4-1. 함수 선언문](#12-4-1-함수-선언문)
    - [12-4-2. 함수 표현식](#12-4-2-함수-표현식)
    - [12-4-3. 함수 생성 시점과 함수 호이스팅](#12-4-3-함수-생성-시점과-함수-호이스팅)
    - [12-4-4. Function 생성자 함수](#12-4-4-function-생성자-함수)
    - [12-4-5. 화살표 함수](#12-4-5-화살표-함수)
  - [12-5. 함수 호출](#12-5-함수-호출)
    - [12-5-1. 매개변수와 인수](#12-5-1-매개변수와-인수)
    - [12-5-2. 인수 확인](#12-5-2-인수-확인)
    - [12-5-3. 매개변수와 최대 개수](#12-5-3-매개변수와-최대-개수)
    - [12-5-4. 반환문](#12-5-4-반환문)
  - [12-6. 참조에 의한 전달과 외부 상태의 변경](#12-6-참조에-의한-전달과-외부-상태의-변경)
  - [12-7. 다양한 함수의 형태](#12-7-다양한-함수의-형태)
    - [12-7-1. 즉시 실행 함수](#12-7-1-즉시-실행-함수)
    - [12-7-2. 재귀 함수](#12-7-2-재귀-함수)
    - [12-7-3. 중첩 함수](#12-7-3-중첩-함수)
    - [12-7-4. 콜백 함수](#12-7-4-콜백-함수)
    - [12-7-5. 순수함수와 비순수 함수](#12-7-5-순수함수와-비순수-함수)
  - [요약](#요약)
  - [키워드](#키워드)
  - [Reference](#reference)

## 12-1. 함수란?

```jsx
// 예제 12-01
// f(x,y) = x + y
function sum(x, y) {
  return x + y;
}

// f(1,2) = 3
sum(1, 2); // 3
```

- 프로그래밍 언어의 함수는 일련의 과정을 문(statement)으로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것입니다.

```jsx
// 함수의 정의(function definition)
function 함수이름(매개변수1, 매개변수2, ...) {
  // 함수의 실행 코드
  return 반환값;
}

// 함수 호출(function call/invoke)
함수이름(인수1, 인수2, ...);
```

- 함수는 함수의 정의와 함수의 호출로 구성됩니다.
- 함수를 호출하면 함수의 정의에 지정된 매개변수(parameter)에 인수(argument)가 순서대로 할당되고, 함수의 실행 코드가 실행됩니다.

<br>

## 12-2. 함수를 사용하는 이유

- 함수는 코드의 재사용을 가능하게 합니다. 이는 유지보수의 편의성을 높이고, 코드의 신뢰성을 높이고, 코드의 가독성을 높이는 효과가 있습니다.
- 적절한 함수 이름은 함수의 내용을 파악하기 쉽게 해주므로, 코드의 가독성을 높이는 효과가 있습니다.

```jsx
// 함수를 사용하지 않은 코드: 1부터 n까지의 합을 구하는 코드
let sum = 0;
for (let i = 1; i <= n; i++) {
  sum += i;
}

// 함수를 사용한 코드: 1부터 n까지의 합을 구하는 함수
function sum(n) {
  let result = 0;
  for (let i = 1; i <= n; i++) {
    result += i;
  }
  return result;
}

sum(100); // 5050
```

<br>

## 12-3. 함수 리터럴

<br>

## 12-4. 함수 정의

### 12-4-1. 함수 선언문(function declaration)

### 12-4-2. 함수 표현식(function expression)

### 12-4-3. 함수 생성 시점과 함수 호이스팅

### 12-4-4. Function 생성자 함수(Constructor function)

### 12-4-5. 화살표 함수

<br>

## 12-5. 함수 호출

### 12-5-1. 매개변수와 인수

### 12-5-2. 인수 확인

### 12-5-3. 매개변수와 최대 개수

### 12-5-4. 반환문

<br>

## 12-6. 참조에 의한 전달과 외부 상태의 변경

<br>

## 12-7. 다양한 함수의 형태

### 12-7-1. 즉시 실행 함수

### 12-7-2. 재귀 함수

### 12-7-3. 중첩 함수

### 12-7-4. 콜백 함수

### 12-7-5. 순수함수와 비순수 함수

<br>

## 요약

<br>

## 키워드

- 함수(function)
- 매개변수(parameter)
- 인수(argument)
- 반환 값(return value)
- 함수 호출(function call/invoke)
- 코드의 재사용
- 유지보수의 편의성
- 코드의 신뢰성
- 코드의 가독성
- 함수 리터럴
- 기명 함수(named function)
- 익명 함수(anonymous function)
- 의사 코드(pseudo code)
- 함수 선언문(function declaration)
- 함수 표현식(function expression)
- 객체 리터럴
- 일급 객체
- 함수 호이스팅(function hoisting)
- 생성자 함수(constructor function)
- 클로저(Closure)
- 화살표 함수(arrow function)
- 값에 의한 전달
- 참조에 의한 전달
- 옵저버 패턴(observer pattern)
- 불변 객체(immutable object)
- 방어적 복사(defensive copy)
- 깊은 복사(deep copy)
- 즉시 실행 함수
- 재귀 함수
- 중첩 함수
- 콜백 함수
- 고차 함수
- 순수 함수
- 비순수 함수

<br>

## Reference

- [**Functions - MDN Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
- [**Defining functions - MDN Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#defining_functions)
- [**Functions - MDN Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [**Functions - MDN Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)
- [**Functions - MDN Docs**](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions)
- [**자바스크립트 함수를 선언하는 여섯가지 방법**](https://yceffort.kr/2020/10/6-different-ways-to-declare-javascript-function)
- [**함수 표현식 vs 함수 선언식**](https://joshua1988.github.io/web-development/javascript/function-expressions-vs-declarations/)
- [**How JavaScript works: the different ways of declaring a function + 5 best practices**](https://medium.com/sessionstack-blog/how-javascript-works-the-different-ways-of-declaring-a-function-5-best-practices-8a0324c06fe2)
- [**Function Expression**](https://www.geeksforgeeks.org/javascript-function-expression/)

```

```
