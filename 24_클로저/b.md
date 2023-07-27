# 24장. 클로저(Closure)

<br>

**[목차]**

- 24장. 클로저
  - [24-1. 렉시컬 스코프](#24-1-렉시컬-스코프)
  - [24-2. 함수 객체의 내부 슬록 \[Environment\]](#24-2-함수-객체의-내부-슬록-environment)
  - [24-3. 클로저와 렉시컬 환경](#24-3-클로저와-렉시컬-환경)
  - [24-4. 클로저의 활용](#24-4-클로저의-활용)
  - [24-5. 캡슐화와 정보 은닉](#24-5-캡슐화와-정보-은닉)
  - [24-6. 자주 발생하는 실수](#24-6-자주-발생하는-실수)

<br>

- 클로저는 주로 하스켈(Haskell)이나 스칼라(Scala)와 같은 함수형 프로그래밍 언어에서 사용됩니다.
- 클로저는 일급 함수를 지원하는 프로그래밍 언어에서 개념입니다.
  - `일급 함수`란 함수를 변수로 취급하여 할당하고, 인자로 전달하며, 다른 함수에서 반환할 수 있는 성질을 말합니다.
- 클로저를 활용하면 함수가 해당 범위 외부에서 호출되더라도, 그 범위 내의 변수들에 접근하고 조작할 수 있습니다.

<br>

> `24-01`과 `24-02`의 코드는 자바스크립트에서 렉시컬 스코프가 어떻게 동작하는지를 보여주는 예시:<br>
> 함수가 선언된 위치에 따라 변수의 스코프가 결정되며, 이를 통해 예측 가능하고 명확한 변수의 유효 범위를 제공합니다.

```jsx
// 24-01.
// 함수가 선언된 렉시컬 환경
const x = 1;

function outerFunc() {
  const x = 10;

  function innerFunc() {
    `console.log(x)`; // 10
  }

  innerFunc();
}

outerFunc();
```

```jsx
// 24-02
// 자바스크립트는 렉시컬 스코프를 따르는 프로그래밍 언어
const x = 1;

function outerFunc() {
  const x = 10;
  innerFunc();
}

function innerFunc() {
  console.log(x); // 1
}

outerFunc();
```

<br>

## 24-1. 렉시컬 스코프(정적 스코프)

- 렉시컬 스코프(정적 스코프): 자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 함수를 어디에 정의했는지에 따라 상위 스코프를 결정한다.
- 렉시컬 환경의 '외부 렉시컬 환경에 대한 참조'에 저장할 참조 값, 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정된다.

```jsx
// 24-03
// : 렉시컬 스코프(정적 스코프)의 동작 원리
const x = 1;

function foo() {
  const x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?
```

위 예제에 따라 다음 아래와 같이 결과는 출력됩니다.

```jsx
foo(); // 1
bar(); // 1
```

> `foo()` 함수가 호출되면 `bar()` 함수가 호출됩니다.<br> > `bar()` 함수는 `console.log(x)` 구문을 실행하고 `x`를 출력합니다.<br><br>
> 마지막으로, `x` 변수는 `bar()` 함수 내에서 선언되지 않았기 때문에 상위 스코프에서 값을 찾아야 합니다.<br>
> 렉시컬 스코프 규칙에 따라 `bar()` 함수의 상위 스코프는 `bar()` 함수가 정의된 위치에 의해 결정됩니다.<br><br> > `bar()` 함수는 전역 범위에서 정의되었으므로 상위 스코프는 전역 스코프입니다.<br><br> > `console.log(x)` 구문은 전역 스코프에서 `x` 값을 찾아 출력합니다.<br>
> 전역 스코프에서의 `x` 값은 `1`이기 때문에 예상 결과는 `1`입니다.<br>
> 이 동작은 `foo()` 함수를 호출한 이후에도 동일하게 적용됩니다.

<br>

## 24-2. 함수 객체의 내부 슬롯(Internal Slots) [Environment]

- JavaScript의 표준 규격인 ECMAScript 사양에서 정의되는 내부적인 슬롯들로, 객체의 내부 동작과 상태를 구현하기 위해 사용됩니다.
- 내부 슬롯과 내부 메서드는 ECMAScript 사양에 기술적으로 명시되어 있지만, 실제 JavaScript 엔진의 구현과 내부 동작을 설명하기 위한 것입니다.
- JavaScript 코드에서 직접 내부 슬롯에 접근하거나 내부 메서드를 호출할 수는 없습니다. 대신 특정 규칙과 메서드를 통해 간접적으로 사용됩니다.
- 내부 슬롯은 함수의 렉시컬 환경 (lexical environment)에 대한 참조를 포함하고 있습니다.
- 렉시컬 환경은 함수가 정의된 시점의 외부 스코프(lexical scope)를 캡처하고 저장하는 데 사용됩니다.
- 함수가 호출될 때 이 렉시컬 환경은 함수의 실행 컨텍스트를 형성하는 데 사용되며, 함수가 참조할 변수, 함수 및 스코프 체인을 결정하는 데 중요한 역할을 합니다.

```jsx
// 책 이외 예제
function outerFunction() {
  const x = 10;

  function innerFunction(y) {
    return x + y;
  }

  return innerFunction;
}

const innerFunc = outerFunction();
console.log(innerFunc(5)); // 15
```

여기서 `innerFunction`은 `outerFunction`의 렉시컬 환경을 기억합니다.
그래서 `innerFunction`은 `x` 변수를 사용할 수 있으며, 호출 시 `x`에 접근하여 값을 사용합니다.

```jsx
// 24-04
const x = 1;

function foo() {
  const x = 10;

  // 상위 스코프는 함수 정의 환경(위치)에 따라 결정된다.
  // 함수 호출 위치와 상위 스코프는 아무런 관계가 없다.
  bar();
}

// 함수 bar는 자신의 상위 스코프, 즉 전역 렉시컬 환경을 [[Environment]]에 저장하여 기억한다.
function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?
```

<br>

## 24-3. 클로저와 렉시컬 환경

```jsx
// 24-05
const x = 1;

// ①
function outer() {
  const x = 10;
  const inner = function () {
    console.log(x);
  }; // ②
  return inner;
}

// outer 함수를 호출하면 중첩 함수 inner를 반환한다.
// 그리고 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 팝되어 제거된다.
const innerFunc = outer(); // ③
innerFunc(); // ④ 10
```

```html
<!-- 24-06 -->
<!DOCTYPE html>
<html>
  <body>
    <script>
      function foo() {
        const x = 1;
        const y = 2;

        // 일반적으로 클로저라고 하지 않는다.
        function bar() {
          const z = 3;

          debugger;
          // 상위 스코프의 식별자를 참조하지 않는다.
          console.log(z);
        }

        return bar;
      }

      const bar = foo();
      bar();
    </script>
  </body>
</html>
```

```html
<!-- 24-07 -->
<!DOCTYPE html>
<html>
  <body>
    <script>
      function foo() {
        const x = 1;

        // 일반적으로 클로저라고 하지 않는다.
        // bar 함수는 클로저였지만 곧바로 소멸한다.
        function bar() {
          debugger;
          // 상위 스코프의 식별자를 참조한다.
          console.log(x);
        }
        bar();
      }

      foo();
    </script>
  </body>
</html>
```

```html
<!-- 24-08 -->
<!DOCTYPE html>
<html>
  <body>
    <script>
      function foo() {
        const x = 1;
        const y = 2;

        // 클로저
        // 중첩 함수 bar는 외부 함수보다 더 오래 유지되며 상위 스코프의 식별자를 참조한다.
        function bar() {
          debugger;
          console.log(x);
        }
        return bar;
      }

      const bar = foo();
      bar();
    </script>
  </body>
</html>
```

<br>

## 24-4. 클로저의 활용

```jsx
// 24-09
// 카운트 상태 변수
let num = 0;

// 카운트 상태 변경 함수
const increase = function () {
  // 카운트 상태를 1만큼 증가 시킨다.
  return ++num;
};

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

```jsx
// 24-10
// 카운트 상태 변경 함수
const increase = function () {
  // 카운트 상태 변수
  let num = 0;

  // 카운트 상태를 1만큼 증가 시킨다.
  return ++num;
};

// 이전 상태를 유지하지 못한다.
console.log(increase()); // 1
console.log(increase()); // 1
console.log(increase()); // 1
```

```jsx
// 24-11
// 카운트 상태 변경 함수
const increase = (function () {
  // 카운트 상태 변수
  let num = 0;

  // 클로저
  return function () {
    // 카운트 상태를 1만큼 증가 시킨다.
    return ++num;
  };
})();

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

```jsx
// 24-12
const counter = (function () {
  // 카운트 상태 변수
  let num = 0;

  // 클로저인 메서드를 갖는 객체를 반환한다.
  // 객체 리터럴은 스코프를 만들지 않는다.
  // 따라서 아래 메서드들의 상위 스코프는 즉시 실행 함수의 렉시컬 환경이다.
  return {
    // num: 0, // 프로퍼티는 public하므로 은닉되지 않는다.
    increase() {
      return ++num;
    },
    decrease() {
      return num > 0 ? --num : 0;
    },
  };
})();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2

console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```

```jsx
// 24-13
const Counter = (function () {
  // ① 카운트 상태 변수
  let num = 0;

  function Counter() {
    // this.num = 0; // ② 프로퍼티는 public하므로 은닉되지 않는다.
  }

  Counter.prototype.increase = function () {
    return ++num;
  };

  Counter.prototype.decrease = function () {
    return num > 0 ? --num : 0;
  };

  return Counter;
})();

const counter = new Counter();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2

console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```

```jsx
// 24-14
// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
function makeCounter(aux) {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  // 클로저를 반환
  return function () {
    // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
    counter = aux(counter);
    return counter;
  };
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다
const increaser = makeCounter(increase); // ①
console.log(increaser()); // 1
console.log(increaser()); // 2

// increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
const decreaser = makeCounter(decrease); // ②
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

```jsx
// 24-15
// 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
const counter = (function () {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  // 함수를 인수로 전달받는 클로저를 반환
  return function (aux) {
    // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
    counter = aux(counter);
    return counter;
  };
})();

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 보조 함수를 전달하여 호출
console.log(counter(increase)); // 1
console.log(counter(increase)); // 2

// 자유 변수를 공유한다.
console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0
```

<br>

## 24-5. 캡슐화와 정보 은닉

```jsx
// 24-16
function Person(name, age) {
  this.name = name; // public
  let _age = age; // private

  // 인스턴스 메서드
  this.sayHi = function () {
    console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
  };
}

const me = new Person("Lee", 20);
me.sayHi(); // Hi! My name is Lee. I am 20.
console.log(me.name); // Lee
console.log(me._age); // undefined

const you = new Person("Kim", 30);
you.sayHi(); // Hi! My name is Kim. I am 30.
console.log(you.name); // Kim
console.log(you._age); // undefined
```

```jsx
// 24-17
function Person(name, age) {
  this.name = name; // public
  let _age = age; // private
}

// 프로토타입 메서드
Person.prototype.sayHi = function () {
  // Person 생성자 함수의 지역 변수 _age를 참조할 수 없다
  console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
};
```

```jsx
//  24-18
const Person = (function () {
  let _age = 0; // private

  // 생성자 함수
  function Person(name, age) {
    this.name = name; // public
    _age = age;
  }

  // 프로토타입 메서드
  Person.prototype.sayHi = function () {
    console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
  };

  // 생성자 함수를 반환
  return Person;
})();

const me = new Person("Lee", 20);
me.sayHi(); // Hi! My name is Lee. I am 20.
console.log(me.name); // Lee
console.log(me._age); // undefined

const you = new Person("Kim", 30);
you.sayHi(); // Hi! My name is Kim. I am 30.
console.log(you.name); // Kim
console.log(you._age); // undefined
```

```jsx
// 24-19
const me = new Person("Lee", 20);
me.sayHi(); // Hi! My name is Lee. I am 20.

const you = new Person("Kim", 30);
you.sayHi(); // Hi! My name is Kim. I am 30.

// _age 변수 값이 변경된다!
me.sayHi(); // Hi! My name is Lee. I am 30.
```

## 24-6. 자주 발생하는 실수

```jsx
// 24-20
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = function () {
    return i;
  }; // ①
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]()); // ②
}
```

```jsx
// 24-21
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = (function (id) {
    // ①
    return function () {
      return id;
    };
  })(i);
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]());
}
```

```jsx
// 24-22
const funcs = [];

for (let i = 0; i < 3; i++) {
  funcs[i] = function () {
    return i;
  };
}

for (let i = 0; i < funcs.length; i++) {
  console.log(funcs[i]()); // 0 1 2
}
```

```jsx
// 24-23
// 요소가 3개인 배열을 생성하고 배열의 인덱스를 반환하는 함수를 요소로 추가한다.
// 배열의 요소로 추가된 함수들은 모두 클로저다.
const funcs = Array.from(new Array(3), (_, i) => () => i); // (3) [ƒ, ƒ, ƒ]

// 배열의 요소로 추가된 함수 들을 순차적으로 호출한다.
funcs.forEach((f) => console.log(f())); // 0 1 2
```

<br>

## Reference

- [Closuers](https://developer.mozilla.org/en-US/docs/Web/jsx/Closures)
