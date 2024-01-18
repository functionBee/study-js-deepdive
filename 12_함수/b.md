# 12장. 함수(Function)

'모던 자바스크립트 Deep Dive'를 읽고 정리한 내용입니다.

<br>

- [12장. 함수(Function)](#12장-함수function)
  - [12-1. 함수란?](#12-1-함수란)
  - [12-2. 함수를 사용하는 이유](#12-2-함수를-사용하는-이유)
  - [12-3. 함수 리터럴](#12-3-함수-리터럴)
  - [12-4. 함수 정의](#12-4-함수-정의)
    - [12-4-1. 함수 선언문(function declaration)](#12-4-1-함수-선언문function-declaration)
    - [12-4-2. 함수 표현식(function expression)](#12-4-2-함수-표현식function-expression)
    - [12-4-3. 함수 생성 시점과 함수 호이스팅](#12-4-3-함수-생성-시점과-함수-호이스팅)
    - [12-4-4. Function 생성자 함수(Constructor function)](#12-4-4-function-생성자-함수constructor-function)
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

<br>

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

### 12-7-4. 콜백 함수(Callback function)

```jsx
// 콜백 함수
function callback() {
  console.log("callback");
}

// 함수의 매개변수를 통해 콜백 함수를 전달받음
function higherOrderFunction(func) {
  // 전달받은 콜백 함수를 호출
  func();
}

// 함수를 호출하면서 콜백 함수를 전달함
higherOrderFunction(callback); // callback
```

- 콜백 함수는 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수를 말합니다.
- 콜백 함수는 제어권을 다른 함수에게 넘겨줌으로써 특정 코드의 실행을 위임할 수 있습니다.
- 매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수를 함수형 프로그래밍에서는 고차 함수(higher-order function)라고 부릅니다.
- 고차함수에 콜백 함수를 전달할 때 콜백 함수를 호출하지 않고, 함수 자체를 전달해야 합니다.

```jsx
// 콜백 함수를 호출하지 않고 함수 자체를 전달해야 하는 이유:
// 콜백 함수를 호출하면서 인수를 전달할 수 없기 때문입니다.
function forEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}

const arr = [1, 2, 3];
forEach(arr, console.log); // 1 2 3
forEach(arr, alert); // 1 2 3
```

- 콜백 함수가 고차 함수 내부에서만 호출된다면 콜백 함수를 익명 함수 리터럴로 정의하면서 곧바로 고차 함수에 전달할 수 있습니다.

```jsx
// 콜백 함수를 익명 함수 리터럴로 정의하면서 곧바로 고차 함수에 전달
const arr = [1, 2, 3];

forEach(arr, function (item) {
  console.log(item);
}); // 1 2 3
```

```jsx
// 콜백 함수를 사용하는 고차 함수 map, filter, reduce
// map: 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출하고, 그 결과를 배열에 담아 반환합니다.
// filter: 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출하고, 그 결과가 참인 요소만을 배열에 담아 반환합니다.
// reduce: 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출하고, 그 결과를 반환합니다.
const arr = [1, 2, 3];

// map
const mappedArr = arr.map(function (item) {
  return item * 2;
});

console.log(mappedArr); // [2, 4, 6]

// filter
const filteredArr = arr.filter(function (item) {
  return item % 2;
});

console.log(filteredArr); // [1, 3]

// reduce
const reducedArr = arr.reduce(function (acc, cur) {
  return acc + cur;
}, 0);

console.log(reducedArr); // 6
```

- 콜백 함수도 고차 함수에 전달되는 함수이므로 일급 객체의 특징을 모두 갖습니다.
- 일급 객체의 특징을 갖는 함수를 일급 함수(first-class function)라고 부릅니다.
- 일급 함수란 다음과 같은 조건을 만족하는 함수를 말합니다.
- 일급 객체의 특징은 다음과 같습니다:
  - 무명의 리터럴로 표현이 가능하다.
  - 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
  - 함수의 매개변수에 전달할 수 있다.
  - 함수의 반환값으로 사용할 수 있다.

```jsx
// 일급 함수의 특징
// 1. 무명의 리터럴로 표현이 가능하다.
const increase = function (num) {
  return ++num;
};

const decrease = function (num) {
  return --num;
};

// 2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
const predicates = { increase, decrease };

// 3. 함수의 매개변수에 함수를 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.
function makeCounter(predicate) {
  let num = 0;

  return function () {
    num = predicate(num);
    return num;
  };
}

const increaser = makeCounter(predicates.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2
const decreaser = makeCounter(predicates.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

- 콜백함수는 함수형 프로그래밍 패러다임뿐만 아니라 비동기 처리에도 많이 사용됩니다.
- 비동기 처리란 처리가 종료할 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성을 의미합니다.

```jsx
// 비동기 처리
function getData(callback) {
  // 비동기 처리를 수행하는 비동기 함수
  setTimeout(function () {
    const data = 10;
    callback(data);
  }, 1000);
}

getData(function (data) {
  // 콜백 함수
  console.log(data); // 10
});
```

```jsx
// 콜백 함수를 이용한 이벤트 처리
const $button = document.querySelector("button");

$button.addEventListener("click", function (event) {
  console.log("button is clicked!");
});
```

```jsx
// 콜백함수를 사용한 비동기 처리
function getData(callback) {
  // 비동기 처리를 수행하는 비동기 함수
  setTimeout(function () {
    const data = 10;
    callback(data);
  }, 1000);
}

getData(function (data) {
  // 콜백 함수
  console.log(data); // 10
});
```

(미리) 45-1. 비동기 처리를 위한 콜백 함수의 단점

- 45-1-1. 콜백 지옥(callback hell)
  - setTimeout 함수는 비동기 함수이므로 콜백 함수를 전달받아 비동기 처리를 수행합니다.
  - setTimeout의 콜백 함수는 setTimeout 함수의 처리가 종료된 이후에 호출됩니다.
  - 이에 setTimeout 함수 내부의 콜백 함수에서 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않습니다.

```jsx
// 비동기 처리를 위한 콜백 함수의 단점
// 콜백 지옥(callback hell)
function add10(a, callback) {
  setTimeout(function () {
    callback(a + 10);
  }, 1000);
}

add10(5, function (res) {
  add10(res, function (res) {
    add10(res, function (res) {
      console.log(res); // 35
    });
  });
});
```

- 콜백 지옥을 해결하는 밥법은 익명의 콜백 함수를 모두 기명 함수로 전환하는 것입니다.

```jsx
// 콜백 지옥 해결 - 기명 함수로 전환
let list = "";

const addList = (res) => {
  list = res;
  console.log(list);

  setTimeout(addList2, 1000);
};

const addList2 = () => {
  list += res;
  console.log(list);

  setTimeout(addList3, 1000);
};

setTimeout(addList, 1000);
```

- 45-1-2. 에러 처리의 한계
  - 비동기 함수의 처리 결과를 콜백 함수를 통해 전달받는다면 에러 처리를 위해 콜백 함수를 추가로 전달받아야 합니다.
  - 이는 콜백 지옥을 야기할 수 있습니다.

```jsx
// 비동기 처리를 위한 콜백 함수의 단점
// 에러 처리의 한계
function add20(a, callback) {
  setTimeout(function () {
    callback(a + 20);
  }, 1000);
}

add20(5, function (res) {
  try {
    add20(res, function (res) {
      try {
        add20(res, function (res) {
          console.log(res); // 65
        });
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
});
```

- 이를 해결하기 위해 Promise가 등장했습니다.
- Promise는 비동기 처리를 위한 콜백 함수의 단점을 보완하고 개선하기 위해 ES6에서 도입된 비동기 처리에 사용되는 객체입니다.
- Promise 생성자 함수는 비동기 처리를 수행할 콜백 함수를 인수로 전달받습니다. 이 함수는 resolve와 reject 함수를 인수로 전달받습니다.

```jsx
// Promise 객체의 생성
const promise = new Promise((resolve, reject) => {
  // 비동기 처리를 수행하는 콜백 함수
  if (/* 비동기 처리 성공 */) {
    resolve('result');
  } else { /* 비동기 처리 실패 */
    reject('failure reason');
  }
});
```

```jsx
// GET 요청을 위한 비동기 함수
const promiseGet = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        // 비동기 처리가 성공하면 resolve 메서드를 호출합니다.
        resolve(JSON.parse(xhr.response));
      } else {
        // 비동기 처리가 실패하면 reject 메서드를 호출합니다.
        reject(new Error(xhr.status));
      }
    };
  });
};
// promiseGet 함수는 Promise 객체를 반환합니다.
// Promise 객체는 then 메서드를 갖고 있습니다.
// then 메서드는 Promise 객체의 비동기 처리가 성공했을 때, 실패했을 때 호출할 콜백 함수를 인수로 전달받습니다.
const printUsers = () => {
  promiseGet("https://jsonplaceholder.typicode.com/users")
    .then((users) => {
      console.log(users);
    })
    .catch((err) => {
      console.error(err);
    });
};
```

- 비동기 작업의 동기적 표현:
  - 비동기 작업의 동기적 표현이란 비동기 작업을 동기적으로 표현하되, 비동기 작업의 결과를 반환하는 것을 말합니다.
  - Promise 객체의 then 메서드는 Promise 객체를 반환합니다.
  - 따라서 then 메서드를 호출하면 Promise 객체를 반환하므로, then 메서드를 호출한 Promise 객체의 then 메서드를 호출할 수 있습니다.
  - 이를 통해 비동기 작업을 동기적으로 표현할 수 있습니다.

```jsx
// 비동기 작업의 동기적 표현
promiseGet("https://jsonplaceholder.typicode.com/users")
  .then((users) => {
    console.log(users);
    return promiseGet(
      "https://jsonplaceholder.typicode.com/posts?userId=" + users[0].id
    );
  })
  .then((posts) => {
    console.log(posts);
    return promiseGet(
      "https://jsonplaceholder.typicode.com/comments?postId=" + posts[0].id
    );
  })
  .then((comments) => {
    console.log(comments);
  })
  .catch((err) => {
    console.error(err);
  });
```

- 비동기 작업의 동기적 표현: Generator
  - Generator는 비동기 작업의 동기적 표현을 위해 ES6에서 도입된 함수입니다.
  - Generator 함수는 비동기 처리를 수행하는 yield 키워드를 사용할 수 있습니다.
  - yield 키워드는 함수의 실행을 멈추고 함수 호출자에게 제어권을 양도합니다.
  - Generator 함수는 호출하면 함수의 실행을 제어할 수 있는 제너레이터 객체를 반환합니다.
  - 제너레이터 객체의 next 메서드를 호출하면 Generator 함수의 yield 키워드를 만날 때까지 함수의 실행을 진행합니다.
  - next 메서드가 반환하는 객체는 value와 done 프로퍼티를 갖습니다.
  - value 프로퍼티는 yield 키워드 뒤에 오는 표현식의 평가 결과를 값으로 갖습니다.
  - done 프로퍼티는 Generator 함수의 실행이 종료되었는지를 나타내는 불리언 값입니다.

```jsx
// Generator 함수
function* gen() {
  yield 1;
  yield 2;
  yield 3;
  return 100;
}

// Generator 함수를 호출하면 제너레이터 객체를 반환합니다.
const generator = gen();

// 제너레이터 객체의 next 메서드를 호출하면 yield 키워드를 만날 때까지 함수의 실행을 진행합니다.
console.log(generator.next()); // {value: 1, done: false}
console.log(generator.next()); // {value: 2, done: false}
console.log(generator.next()); // {value: 3, done: false}
console.log(generator.next()); // {value: 100, done: true}
```

```jsx
// Generator 함수를 사용한 비동기 처리
function* asyncFunc() {
  console.log("asyncFunc");
  const data = yield $.get("https://jsonplaceholder.typicode.com/users");
  console.log(data);
}

const generator = asyncFunc();
generator.next().value.then((res) => {
  generator.next(res).value.then((res) => {
    generator.next(res);
  });
});
```

- 비동기 작업의 동기적 표현: Promise + Async/await
  - async/await는 비동기 작업의 동기적 표현을 위해 ES8에서 도입된 문법입니다.
  - async 함수는 비동기 처리를 수행하는 함수를 동기적으로 표현할 수 있게 해주는 함수입니다.
  - async 함수는 함수 몸체 내부에서 await 키워드를 사용할 수 있습니다.
  - await 키워드는 async 함수의 실행을 일시 중지하고, await 키워드 뒤에 오는 Promise 객체가 처리될 때까지 기다린 다음 async 함수의 실행을 재개합니다.
  - await 키워드는 async 함수 내부에서만 사용할 수 있습니다.
  - await 키워드는 Promise 객체를 반환합니다.
  - async 함수는 항상 Promise 객체를 반환합니다.

```jsx
// async/await를 사용한 비동기 처리
async function asyncFunc() {
  console.log("asyncFunc");
  const data = await $.get("https://jsonplaceholder.typicode.com/users");
  console.log(data);
}

asyncFunc();
```

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
