# 12장. 함수

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
// 함수 정의(생성):
// square 함수는 두 개의 인수를 곱하여 결과를 출력하는 함수입니다.
function square(width, height) { // 매개 변수(parameter): width, height
  // 함수 내부에 포함된 문들은 순차적으로 실행되며, 함수가 호출될 때마다 이 문들이 실행됩니다.
  var result = width * height; // 두 개의 인수가 곱셈을 수행하고, 결과값을 result 변수에 저장합니다.
  return result; // 반환 값(result value): result
  console.log("사각형의 너비는 " + result + "입니다."); // 결과를 콘솔에 출력합니다. 예: "사각형의 너비는 12입니다."
}

// 함수 호출(실행):
// square 함수를 호출하여 결과를 확인합니다.
// a에 3을, b에 4를 전달합니다.
square(3, 4); // 인수(argument): 3, 4
```

**매개 변수(parameter):**
- 함수 정의에서 매개 변수는 함수가 입력으로 받는 값을 나타냅니다.
- 매개 변수는 함수 내부에서 사용되는 변수로, 함수를 호출할 때 전달된 값이 해당 매개 변수에 할당됩니다.
- 매개 변수는 함수 내에서 사용되는 임시 변수로 취급됩니다.
- 예를 들어, `function square(width, height)`에서 `width`와 `height`가 매개 변수입니다.

**인수(argument):**
- 함수 호출 시 전달되는 값으로, 매개 변수에 할당됩니다.
- 함수를 호출할 때 인수를 전달하여 함수 내부에서 사용될 값이 됩니다.
- 예를 들어, `square(3, 4)`에서 `3`과 `4`가 인수입니다.
- 함수 정의에서 정의된 매개 변수에 대응하여 순서대로 전달됩니다.

**반환 값(return value):**
- 함수가 수행한 작업의 결과로서, 함수의 실행이 완료되면 반환 값이 반환됩니다.
- 반환 값은 함수 호출자에게 전달되어 다른 작업에서 사용할 수 있습니다.
- `return` 문을 사용하여 함수 내에서 반환 값을 명시적으로 지정합니다.
- 예를 들어, `return result`에서 `result`가 반환 값입니다.

**함수 정의 (function definition):**
- 함수 정의는 함수의 구조와 동작을 정의하는 것을 말합니다.
- 함수 정의는 함수의 이름, 매개 변수, 함수 내에서 수행되는 작업 및 반환 값 등을 포함합니다.
- 함수 정의를 작성하면 해당 함수가 메모리에 저장되며, 필요할 때 호출할 수 있습니다.

**함수 호출 (function call/function invoke):**
- 함수 호출은 함수를 실행하는 것을 말합니다.
- 함수를 호출할 때는 함수 이름과 필요한 인수(arguments)를 전달합니다.
- 호출된 함수는 해당 호출을 처리하고, 정의된 작업을 수행한 후에는 필요한 경우 반환 값을 반환합니다.

```jsx
// 자바스크립트 함수는 다양한 방법으로 생성할 수 있습니다.
// 1. 함수 선언문(function Declaration):
function square(width, height) {
  var result = width * height;
  return result;
};

// 2. 함수 표현식 (Function Expression):
const square = function(width, height) {
  var result = width * height;
  return result;
};

// 3. 함수 생성자 (Function Constructor):
const square = new Function('width', 'height', 'var result = width * height; return result;');

// 4. 화살표 함수 (Arrow Function):
const square = (width, height) => {
  var result = width * height;
  return result;
};

// 4. 화살표 함수 (with implicit return):
const square = (width, height) => width * height;
```

<br>

## 12-2. 함수를 사용하는 이유

- **코드의 재사용:**
  - 함수를 사용하면 비슷한 작업을 반복해서 수행하는 코드를 재사용할 수 있습니다.
  - 함수를 작성하고 필요할 때 호출함으로써 중복을 피하고 개발 시간을 단축할 수 있습니다.
- **유지보수의 편의성 향상:**
  - 함수는 코드를 모듈화하고 구성 요소로 분리하여 관리하기 쉽게 만들어줍니다.
  - 함수를 사용하면 수정이 필요한 경우 해당 함수만 변경하면 되므로 코드 전체를 수정할 필요가 없어 유지보수가 용이해집니다.
- **코드의 신뢰성 향상:**
  - 함수를 사용하면 코드를 작은 블록으로 나누어 각각 독립적으로 테스트할 수 있습니다. 이는 코드의 신뢰성을 높이는 데 도움이 됩니다.
  - 함수는 개별적으로 테스트할 수 있으며, 버그를 수정하거나 기능을 추가할 때도 해당 함수만 수정하면 되므로 다른 부분에 영향을 주지 않습니다.
- **코드의 가독성 향상:**
  - 함수를 사용하면 코드를 논리적인 단위로 분리하여 가독성을 높일 수 있습니다.
  - 함수의 이름은 해당 함수가 하는 작업을 설명하며, 함수 내부의 코드는 해당 작업을 수행하는 방법을 자세히 설명할 수 있습니다. 이렇게 하면 코드를 이해하기 쉽고 유지보수하기 쉬운 구조로 만들 수 있습니다.

<br>

## 12-3. 함수 리터럴
- 함수 리터럴은 JavaScript에서 함수를 작성하는 표기법입니다.
- 함수 리터럴은 함수를 정의하고 생성하는 방법을 나타냅니다.

```jsx
// 함수 선언문,
// 기명 함수(named function)
function functionName(parameter1, parameter2, ...) {
  // 함수의 실행 코드
  return result; // 선택적으로 반환 값 지정 가능
}

// 함수 표현식,
// 익명 함수(anonymous function)
const functionName = function(parameter1, parameter2, ...) {
  // 함수의 실행 코드
  return result; // 선택적으로 반환 값 지정 가능
};
```

- `function`: 함수를 정의하기 위해 `function` 키워드를 사용합니다.
- `functionName`: 함수의 이름을 지정합니다. 함수의 이름은 선택적으로 사용할 수 있습니다.
- `parameter1, parameter2, ...`: 함수에 전달되는 매개 변수의 목록을 지정합니다. 매개 변수는 함수 내부에서 사용할 수 있는 변수입니다.
- `// 함수의 실행 코드`: 함수의 동작을 정의하는 실행 코드를 작성합니다.
- `return result;`: 선택적으로 함수가 값을 반환할 수 있습니다. `return` 키워드를 사용하여 반환할 값을 지정합니다.

<br>

## 12-4. 함수 정의

### 12-4-1. 함수 선언문
### 12-4-2. 함수 표현식
### 12-4-3. 함수 생성 시점과 함수 호이스팅
### 12-4-4. Function 생성자 함수
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

<br>

## Reference
- [**Functions - MDN Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
- [**Functions - MDN Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [**Functions - MDN Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)
- [**Functions - MDN Docs**](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions)
- [**자바스크립트 함수를 선언하는 여섯가지 방법**](https://yceffort.kr/2020/10/6-different-ways-to-declare-javascript-function)
- [**함수 표현식 vs 함수 선언식**](https://joshua1988.github.io/web-development/javascript/function-expressions-vs-declarations/)
- [**How JavaScript works: the different ways of declaring a function + 5 best practices**](https://medium.com/sessionstack-blog/how-javascript-works-the-different-ways-of-declaring-a-function-5-best-practices-8a0324c06fe2)