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

- 함수는 객체 타입의 값이므로 값의 성질을 갖습니다. 따라서 함수도 리터럴을 통해 생성할 수 있습니다.
- 함수 리터럴은 function 키워드, 함수 이름, 매개변수 목록, 함수 몸체로 구성됩니다.

```jsx
// 예제 12-04: 변수에 함수 리터럴을 할당
var f = function add(x, y) {
  return x + y;
};
```

**함수 리터럴의 구성요소**:

- 함수 이름:
  - 함수 이름은 식별자로 구성된다.
  - 함수 이름은 함수 몸체 내에서만 참조할 수 있는 식별자이다.
  - 함수 이름의 생략이 가능하다. 이때 함수를 익명 함수(anonymous function)이라 한다.
  - 함수 이름이 있는 함수를 기명 함수(named function)라 한다.
- 매개변수 목록:
  - 매개변수는 함수 몸체 내에서 변수와 동일하게 취급된다.
  - 함수를 호출할 때 지정한 인수는 매개변수에 할당된다.
  - 매개변수는 쉼표로 구분하며, 0개 이상의 매개변수를 선언할 수 있다.
- 함수 몸체:
  - 함수가 호출되었을 때 일괄적으로 실행될 문들을 하나의 실행 단위로 정의한 코드 블록이다.
  - 함수 몸체는 함수 호출에 의해 실행된다. 이때 함수 몸체의 문들은 실행되어야 할 시점이 결정된다.

```jsx
// 함수 리터럴 syntax
function [함수 이름](매개변수1, 매개변수2, ...) {
  [함수 몸체]
}
```

- **함수는 객체다.** 따라서 함수도 객체처럼 프로퍼티를 가질 수 있다.
- 함수는 일반 객체와 달리 호출할 수 있으므로, 함수는 일반 객체가 가지지 못한 함수 객체만의 특징을 갖는다.

```jsx
// 함수 객체의 프로퍼티
function greet(name) {
  console.log(`안녕하세요, ${name}님!`);
}

// 함수 객체는 prototype 프로퍼티를 소유합니다.
// 함수 객체가 생성자로 사용될 때 이 함수를 통해 생성될 객체의 부모 역할을 하는 프로토타입 객체를 가리킵니다.
greet.prototype; // {constructor: ƒ}

// 함수 객체는 arguments 프로퍼티를 소유합니다.
// arguments 객체는 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한(iterable) 유사 배열 객체이며, 함수 내부에서 지역 변수처럼 사용됩니다.
greet.arguments; // null

// 함수 객체는 caller 프로퍼티를 소유합니다.
// caller 프로퍼티는 자신을 호출한 함수를 가리킵니다.
greet.caller; // null

// 함수 객체는 name 프로퍼티를 소유합니다.
// name 프로퍼티는 함수 이름을 나타냅니다.
greet.name; // "greet"
```

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

```

```
