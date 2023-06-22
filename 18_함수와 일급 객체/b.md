# 18장. 함수와 일급 객체

## 18-1 일급 객체

JavaScript에서 함수는 일급 객체로 간주됩니다. 이는 함수를 변수에 할당하거나, 함수를 다른 함수의 매개변수로 전달하거나, 함수를 다른 함수의 반환값으로 사용할 수 있다는 것을 의미합니다.

```jsx
// 19-1
// 1. 무명의 리터럴로 함수를 생성할 수 있습니다.
const increase = function (num){
  return ++num;
};

const decrease = function (num){
  return --num;
};

// 2. 함수는 변수에 저장할 수 있습니다.
const auxs = { increase, decrease };

// 3. 함수는 다른 함수의 매개변수로 전달할 수 있습니다.
// 4. 함수는 다른 함수의 반환값으로 사용할 수 있습니다.
function makeCounter(aux) {
  let num = 0;

  return function () {
    num = predicate(num);
    return num;
  };
}

// 3. 함수는 매개변수에게 함수를 전달할 수 있습니다.
const increaser = makeCounter(auxs.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// 3. 함수는 매개변수에게 함수를 전달할 수 있습니다.
const decreaser = makeCounter(auxs.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

**일급 객체의 특징**
- 함수는 무명의 리터럴로 생성할 수 있습니다.
- 함수는 변수에 저장할 수 있습니다.
- 함수는 다른 함수의 매개변수로 전달할 수 있습니다.
- 함수는 다른 함수의 반환값으로 사용할 수 있습니다.

```jsx
// 변수 할당문
const greet = function(name) {
  console.log(`Hello, ${name}!`);
};

// 객체의 프로퍼티 값
const obj = {
  greet: function(name) {
    console.log(`Hello, ${name}!`);
  }
};

// 배열의 요소
const arr = [
  function(name) {
    console.log(`Hello, ${name}!`);
  }
];

// 함수 호출의 인수
function greetPerson(greetFunc, name) {
  greetFunc(name);
}

greetPerson(function(name) {
  console.log(`Hello, ${name}!`);
}, "John");

// 함수 반환문
function createGreeter() {
  return function(name) {
    console.log(`Hello, ${name}!`);
  };
}

const greet = createGreeter();
greet("John");
```

- 함수가 일급 객체는 함수를 객체와 동일하게 다룰 수 있다는 의미이다.
- 함수는 값이므로 변수 할당문, 객체 프로퍼티 값, 배열 요소, 함수 호출 인수, 함수 반환문 등에서 리터럴로 정의될 수 있다. 평가 시 함수는 함수 객체로 평가된다.

```jsx
function calculate(func, num1, num2) {
  return func(num1, num2);
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

console.log(calculate(add, 3, 2)); // 출력: 5
console.log(calculate(subtract, 3, 2)); // 출력: 1
```

- 함수가 일급 객체로 가지는 가장 큰 특징은 다른 함수에게 매개변수로 전달되거나 반환 값으로 사용될 수 있다는 것이다. 이는 함수형 프로그래밍을 가능케 하는 자바스크립트의 장점 중 하나이다.

```jsx
function greet(name) {
  console.log(`Hello, ${name}!`);
}

// 함수 호출
greet("John"); // 출력: Hello, John!

// 함수 객체의 프로퍼티 할당
greet.language = "English";
console.log(greet.language); // 출력: English
```

- 함수는 객체지만, 일반 객체와는 차이가 있다. 함수 객체는 호출할 수 있지만 일반 객체는 그렇지 않다.
- 함수 객체는 일반 객체와 달리 함수 고유의 프로퍼티를 가지고 있다.

<br>

## 18-2 함수 객체의 프로퍼티

```jsx
// 18-2, 3
function square(number) {
  return number * number;
}

console.dir(square);
console.log(Object.getOwnPropertyDescriptors(square));

// __proto__는 square 함수의 프로퍼티가 아닙니다.
console.log(Object.getOwnPropertyDescriptors(square, '__proto__')); // undefined

// __proto__는 Object.prototype 객체의 접근자 프로퍼티입니다.
console.log(Object.getOwnPropertyDescriptors(Object.prototype, '__proto__'));
```

- 함수 객체는 `arguments`, `caller`, `length`, `name`, `prototype`과 같은 데이터 프로퍼티를 가진다. 이 프로퍼티들은 일반 객체에는 없는 함수 고유의 프로퍼티들이며, 함수 객체의 기능과 관련이 있다.
- `__proto__`는 함수 객체의 고유한 프로퍼티가 아니라 `Object.prototype`객체의 프로퍼티를 상속받은 것이다.
- 모든 객체는 `Object.prototype` 객체의 프로퍼티와 메서드를 상속받아 사용할 수 있다.
- `__proto__`를 직접 사용하는 대신 `Object.getPrototypeOf()` 메서드나 `class` 문법을 활용하여 프로토타입 체인과 상속 관계를 더 명확하게 다루는 것이 좋다.

<br>

### 18-2-1. `arguments` 프로퍼티

- `arguments` 프로퍼티 값은 `arguments` 객체이며, 함수 내부에서 매개변수와 관련된 정보를 담고 있다. 
- `arguments` 객체는 함수 내부에서만 유효한 지역 변수로 동작하므로 외부에서 직접 접근할 수 없다.

 
```jsx
// 18-4
function multiply(x, y) {
    console.log(arguments);
    return x * y;
}

console.log(multiply());        // NaN
console.log(multiply(1));       // NaN
console.log(multiply(1, 2));    // 2
console.log(multiply(1, 2, 3)); // 2
```

- ECMAScript 3 이후부터는 `arguments` 프로퍼티와 `Function.arguments`와 같은 사용법은 폐지되었다. 대신에 현대(?)의 자바스크립트에서는 매개변수를 명시적으로 사용하여 인수를 전달하는 것이 권장된다.

```jsx

function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10

const numbers = [1, 2, 3, 4];
console.log(sum(...numbers)); // 10
```

- 자바스크립트에서는 함수의 매개변수와 인수의 개수가 일치하는지 확인하지 않는다. 따라서 함수 호출 시 매개변수 개수만큼 인수를 전달하지 않아도 에러가 발생하지 않고, 누락된 인수는 `undefined`로 처리된다.

```jsx
function greet(name, age) {
  console.log(`Hello, ${name}! You are ${age} years old.`);
}

greet("John"); // 출력: Hello, John! You are undefined years old.
```

**[`arguments` 객체의 `Symbol(Symbol.iterator)` 프로퍼티]**

- `Symbol(Symbol.iterator)` 프로퍼티는 `arguments` 객체를 순회 가능한 자료구조인 이터러블로 만들기 위한 프로퍼티다.
- `Symbol(Symbol.iterator)`를 프로퍼티 키로 사용한 메서드를 구현하는 것에 의해 이터러블이된다.
```jsx
// 18-5
function muliply(x, y) {
    // 이터레이터
    const iterator = arguments[Symbol.iterator]();

    // 이터레이터의 next 메서드를 호출하여 이터러블 객체 arguments를 순회
    console.log(iterator.next()); // {value: 1, done: false}
    console.log(iterator.next()); // {value: 2, done: false}
    console.log(iterator.next()); // {value: undefined, done: true}
  
    return x * y;
}
muliply(1, 2);
```

- `arguments` 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다.

```jsx
// 18-6
function sum() {
    let res = 0;

    // arguments 객체는 length 프로퍼티가 있는 유사 배열 객체이므로 for 문으로 순회할 수 있습니다.
    for (let i = 0; i < arguments.length; i++) {
        res += arguments[i];
    }
    return res;
}

console.log(sum());        // 0
console.log(sum(1, 2));    // 3
console.log(sum(1, 2, 3)); // 6
```

- `arguments` 객체는 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체이다. 

<br>

**유사 배열 객체 (Array-like objects)와 이터러블 (Iterable)**
- 유사 배열 객체 (Array-like objects): 
  - 유사 배열 객체는 배열과 유사한 동작을 하는 객체로, `length` 프로퍼티를 가지고 있고 인덱스를 통해 요소에 접근할 수 있다.
  - 배열 메서드를 직접 사용할 수는 없지만 반복문을 통해 요소를 순회할 수 있다.
- 이터러블 (Iterable): 
  - 이터러블은 `Symbol.iterator` 메서드를 가진 객체로, 반복 가능한(iterable) 자료 구조를 말한다.
  - `이터레이터(iterator)`를 반환하고, `next` 메서드를 통해 순회 동작을 수행할 수 있다.
  - `for...of` 루프나 `Spread` 문법, `Array.from` 등을 사용하여 순회할 수 있다.

<br>

- 유사 배열 객체는 배열이 아니기 때문에 배열 메서드를 직접 사용할 수 없다. 따라서 배열 메서드를 사용하려면 `Function.prototype.call`, `Function.prototype.apply`, 또는 `Array.from`과 같은 방법을 사용하여 간접적으로 호출해야 한다.

```jsx
// 18-7
function sum() {
    // arguments 객체를 배열로 변환
    const array = Array.prototype.slice.call(arguments);
    return array.reduce(function (pre, cur) {
        return pre + cur;
    }, 0);
}
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

- 이러한 번거로움을 해결하기 위해 ES6에서는 `Rest 파라미터`를 도입되었다.

```jsx
// 18-8
function sum(...args) {
    return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

<br>

### 18-2-2. `caller` 프로퍼티

- `caller` 프로퍼티는 비표준이므로 대부분의 상황에서는 사용을 피하고, 대신 다른 방법을 활용하여 원하는 동작을 구현하는 것이 좋다.

```jsx
// 18-9
function foo(func) {
    return func();
}

function bar() {
    return "caller : " + bar.caller;
}

console.log(foo(bar)); // caller : function foo(func) {...}
console.log(bar()); // caller : null
```

> `caller` 프로퍼티는 함수 객체의 프로퍼티 중 하나로, 해당 함수를 호출한 함수를 가리킨다.

<br>

### 18-2-3. `length` 프로퍼티

- 함수 객체의 `length` 프로퍼티는 함수를 정의할 때 선언한 매개변수의 개수를 나타낸다.

```jsx
// 19-10
function foo() {}
console.log(foo.length); // 0

function bar(x) {
    return x;
}
console.log(bar.length); // 1

function baz(x, y) {
    return x * y;
}
console.log(baz.length); // 2
```

> `length` 프로퍼티는 함수 객체가 선언할 때 명시한 매개변수의 개수를 가리킨다. 이 값은 함수가 기대하는 매개변수의 개수를 나타내며, 함수를 호출할 때 실제로 전달되는 인수의 개수와는 관계가 없다.

<br>

### 18-2-4. `name` 프로퍼티

- `name` 프로퍼티를 사용하면 함수 객체의 이름을 확인할 수 있으며, 기명 함수 표현식과 함수 선언문의 경우 해당 이름이 `name` 프로퍼티에 할당된다.

```jsx
// 18-11
// 기명 함수 표현식
var namedFunc = function foo() {};
console.log(namedFunc.name); // foo

// 익명 함수 표현식
var anonymousFunc = function() {};
// ES5: name 프로퍼티는 빈 문자열을 값으로 갖습니다.
// ES6: name 프로퍼티는 함수 객체를 가리키는 변수 이름을 값으로 갖습니다.
console.log(anonymousFunc.name); // anonymousFunc

// 함수 선언문(Function declaration)
function bar() {}
console.log(bar.name); // bar
```

> 함수 객체의 `name` 프로퍼티는 함수 이름을 나타낸다. 이 프로퍼티는 ES6 이전까지는 비표준이었으나 ES6에서 공식 표준이 되었다.

<br>

### 18-2-5. `__proto__` 접근자 프로퍼티

- JavaScript의 객체는 `[[Prototype]]`이라는 내부 슬롯을 가지며,  `__proto__` 프로퍼티는 이 `[[Prototype]]` 내부 슬롯이 가리키는 프로토타입 객체에 간접적으로 접근하기 위해 사용된다.

```jsx
// 12-2
const obj = { a: 1 };

// 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
console.log(obj.__proto__ === Object.prototype); // true

// 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체 Object.prototype 프로퍼티를 상속 받니다.
// hasOwnProperty 메서드는 Object.prototype의 메서드다.
console.log(obj.hasOwnProperty("a")); // true
console.log(obj.hasOwnProperty("__prototype__")); // false
```

<br>

### 18-2-6. `prototype` 프로퍼티

- `prototype` 프로퍼티는 생성자 함수로 호출할 수 있는 함수 객체, 즉 `constructor`만이 소유하는 프로퍼티다.

```jsx
// 18-13
// 함수 객체는 prototype 프로퍼티를 소유한.
(function () {}).hasOwnProperty('prototype'); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}).hasOwnProperty('property'); / false
```
- 일반 객체와 생성자 함수로 호출할 수 없는 `non-constructor`에는 `prototype` 프로퍼티가 없다.
- `prototype` 프로퍼티는 함수 객체가 소유하는 프로퍼티로, 일반 객체는 해당 프로퍼티를 가지지 않는다.
- `prototype` 프로퍼티는 생성자 함수로 호출될 때 생성될 인스턴스의 프로토타입 객체를 가리키는 역할을 한다. 이를 통해 생성자 함수를 통해 생성된 인스턴스들은 해당 프로토타입 객체를 공유하여 프로토타입 기반의 상속과 프로퍼티 접근을 가능하게 한다.


## 요약

## 키워드

## Reference