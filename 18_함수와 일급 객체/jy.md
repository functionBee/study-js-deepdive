# 18. 함수와 일급 객체

## 18.1 일급 객체

> **일급 객체의 조건**
> - 무명의 리터럴로 생성 가능. 즉, 런타임에 생성 가능
> - 변수나 자료구조(객체, 배열 등)에 저장 가능
> - 함수의 매개변수에 전달 가능
> - 함수의 반환값으로 사용 가능

자바스크립트에서의 함수는 위의 조건을 모두 만족하므로 일급 객체입니다.

```jsx
// 1. 함수는 무명의 리터럴로 생성할 수 있습니다.
// 2. 함수는 변수에 저장할 수 있습니다.
// 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당됩니다.
const increase = function (num){
  return ++num;
};

const decrease = function (num){
  return --num;
};

// 2. 함수는 객체에 저장할 수 있습니다.
const auxs = { increase, decrease };

// 3. 함수의 매개변수에 전달할 수 있습니다.
// 4. 함수의 반환값으로 사용할 수 있습니다.
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

- 함수는 일급 객체이므로 객체와 동일하게 사용할 수 있으며, 값을 사용할 수 있는 곳이라면 어디서든지 리터럴로 정의할 수 있고, 런타임에 함수 객체로 평가됩니다.

- 일급 객체로서 함수가 가지는 가장 큰 특징은 일반 객체와 같이 함수의 매개변수에 전달할 수 있으며, 함수의 반환값으로 사용 가능합니다.

- 함수는 객체이지만 일반 객체와 다르게 호출할 수 있고, 일반 객체에는 없는 함수 고유의 프로퍼티를 소유합니다.

## 18.2 함수 객체의 프로퍼티

함수도 객체이므로 프로퍼티를 가질 수 있습니다.

```jsx
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

- `argumnets`, `caller`, `length`, `name`, `prototype` 프로퍼티는 모두 함수 객체의 데이터 프로퍼티로, 일반 객체에는 없는 함수 고유의 프로퍼티입니다.
- `__proto__`는 단순히 접근자 프로퍼티이고, 함수 객체 고유의 프로퍼티가 아닙니다.
- `__proto__`는 `Object.prototype` 객체의 프로퍼티를 상속받은 것입니다.
- `Object.prototype` 객체의 프로퍼티는 모든 객체가 상속받아 사용할 수 있습니다.

### 18.2.1 `arguments` 프로퍼티

함수 객체의 `arguments` 프로퍼티 값은 `arguments` 객체입니다.

- `arguments` 객체는 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체입니다.

  - 유사 배열 객체란 `length` 프로퍼티를 가진 객체로 `for` 문으로 순회할 수 있는 객체를 말합니다.
  - 유사 배열 객체는 배열이 아니므로 배열 메서드를 사용할 경우 에러가 발생합니다. 따라서 배열 메서드를 사용하려면 `Function.prototype.call`, `Function.prototype.apply`를 사용해 간접 호출해야 하는 번거로움이 있습니다.

    ```jsx
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

  - 이러한 번거로움을 해결하기 위해 ES6에서는 Rest 파라미터를 도입했습니다.

    ```jsx
    function sum(args...) {
      return args.redece((pre, cur) => pre + cur, 0);
    }
    console.log(sum(1, 2)); // 3
    console.log(sum(1, 2, 3, 4, 5)); // 15
    ```

- `arguments` 객체는 함수 내부에서 지역 변수처럼 사용되므로 함수 외부에서는 참조할 수 없습니다.
- `arguments` 프로퍼티는 ES3부터 표준에서 폐지되었습니다. 따라서 `Function.arguments`와 같은 사용법은 권장되지 않습니다.
- 자바스크립트는 함수의 매개변수와 인수의 개수가 일치하는지 확인하지 않습니다. 따라서 함수 호출 시 매개변수 개수만큼 인수를 전달하지 않아도 에러가 발생하지 않습니다.

  - 선언된 매개변수의 개수보다 인수를 적게 전달한 경우, 인수가 전달되지 않는 매개변수는 `undefined`로 초기화된 상태를 유지합니다.
  - 선언된 매개변수의 개수보다 더 많이 전달한 경우, 초과된 인수는 무시됩니다. 이때, 그냥 버려지지 않고 `arguments` 객체의 프로퍼티로 보관됩니다.

  ```jsx
  function multiply(x, y) {
    console.log(arguments);
    return x * y;
  }

  console.log(multiply());        // NaN
  console.log(multiply(1));       // NaN
  console.log(multiply(1, 2));    // 2
  console.log(multiply(1, 2, 3)); // NaN
  ```
- `arguments` 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용합니다.

  ```jsx
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

- `arguments` 객체의 `Symbol(Symbol.iterator)` 프로퍼티

  `Symbol(Symbol.iterator)` 프로퍼티는 `arguments` 객체를 순회 가능한 자료구조인 이터러블로 만들기 위한 프로퍼티입니다.
  `Symbol(Symbol.iterator)`를 프로퍼티 키로 사용한 메서드를 구현하는 것에 의해 이터러블이 됩니다.

  ```jsx
  function symboltest(x, y) {
    // 이터레이터
    const iterator = arguments[Symbol.iterator]();

    // 이터레이터의 next 메서드를 호출하여 이터러블 객체 arguments를 순회
    console.log(iterator.next()); // {value: 1, done: false}
    console.log(iterator.next()); // {value: 2, done: false}
    console.log(iterator.next()); // {value: undefined, done: true}
  
    return x * y;
  }
  symboltest(1, 2);
  ```

### 18.2.2 `caller` 프로퍼티

함수 객체의 `caller` 프로퍼티는 함수 자신을 호출한 함수를 가리킵니다.

> `caller` 프로퍼티는 ECMAScript 사양에 포함되지 않은 비표준 프로퍼티이고, 이후 표준화될 예정도 없으므로 사용하지 말고 참고로만 알아두면 됩니다.

```jsx
function foo(func) {
  return func();
}

function bar() {
  return "caller : " + bar.caller;
}

console.log(foo(bar)); // caller : function foo(func) {...}
console.log(bar()); // caller : null
```

### 18.2.3 `length` 프로퍼티

함수 객체의 `length` 프로퍼티는 함수를 정의할 때 선언한 매개변수의 개수를 가리킵니다.

> `arguments` 객체의 `length` 프로퍼티는 인자의 개수를 가리키고, 함수 객체의 `length` 프로퍼티는 매개변수의 개수를 가리킵니다.

```jsx
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

### 18.2.4 `name` 프로퍼티

함수 객체의 name 프로퍼티는 함수 이름을 나타냅니다.

- ES6이전까지는 비표준이었다가 ES6에서 정식 표준이 되었습니다.
- 익명 함수 표현식의 경우 ES5, ES6의 동작방식이 다릅니다.
  - ES5에서는 name 프로퍼티는 빈 문자열을 값으로 갖습니다.
  - ES6에서는 함수 객체를 가리키는 식별자를 값으로 갖습니다.
 
```jsx
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

### 18.2.5 `__proto__` 접근자 프로퍼티

> 모든 객체는 [[Prototype]]이라는 내부 슬롯을 가지며, 이는 객체지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킵니다.

`__proto__` 프로퍼티는 [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 간접적으로 접근하기 위해 사용하는 접근자 프로퍼티입니다.

- 내부 슬롯에는 직접 접근할 수 없고 간접적인 접근 방법을 제공하는 경우에 한하여 접근할 수 있습니다.
- [[Prototype]] 내부 슬롯에도 직접 접근할 수 없으며 `__proto__` 접근자 프로퍼티를 통해 간접적으로 프로토타입 객체에 접근할 수 있습니다.

```jsx
const obj = { a: 1 };

// 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype입니다.
console.log(obj.__proto__ === Object.prototype); // true

// 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체 Object.prototype 프로퍼티를 상속 받습니다.
// hasOwnProperty 메서드는 Object.prototype의 메서드입니다.
console.log(obj.hasOwnProperty("a")); // true
```

### 18.2.6 `prototype` 프로퍼티

`prototype` 프로퍼티는 생성자 함수로 호출할 수 있는 함수 객체, 즉 constructor만이 소유하는 프로퍼티입니다.

- 일반 객체와 생성자 함수로 호출할 수 없는 non-constructor에는 `prototype` 프로퍼티가 없습니다.
- `prototype` 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.

```jsx
// 함수 객체는 prototype 프로퍼티를 소유합니다.
(function () {}).hasOwnProperty('prototype'); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않습니다.
({}).hasOwnProperty('property'); / false
```
