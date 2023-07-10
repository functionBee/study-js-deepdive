# 24장 클로저

클로저는 자바스크립트 고유의 개념이 아니므로 정의가 ECMAScript 사양에 등장하지 않는다. MDN에서는 클로저에 대해 다음과 같이 정의하고 있다.
>클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

```javascript
const x = 1;

function outerFunc() {
  const x = 10;

  function innerFunc() {
    console.log(x); // 10
  }

  innerFunc();
}

outerFunc();
```
outerFunc 함수 내부에서 중첩 함수 innerFunc가 정의되고 호출되었다. 이때 중첩함수 innerFunc의 상위스코프는 외부 함수 outerFunc의 스코프다. 따라서 중첩함수 innerFunc내부에서 자신을 포함하고 있는 외부함수 outerFunc의 x변수에 접근할 수 있다. 만약 innerFunc함수가 outerFunc 함수의 내부에서 정의된 중첩 함수가 아니라면 innerFunc함수를 outerFunc함수의 내부에서 호출한다 하더라도 outerFunc함수의 변수에 접근할 수 없다.

```javascript
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
이 같은 현상이 발생하는 이유는 자바스크립트가 렉시컬 스코프를 따르는 프로그래밍 언어이기 때문이다.


## 24.1 렉시컬 스코프
자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 함수를 어디에 정의했는지에 따라 상위 스코프를 결정한다. 이를 `렉시컬 스코프 (정적스코프)`라 한다.

```javascript
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

foo함수와 bar함수의 상위 스코프는 전역이다. 함수를 어디서 호출하는지는 함수의 상위 스코프 결정에 어떠한 영향도 주지 못한다. 즉 함수의 상위 스코프는 함수를 정의한 위치에 의해 정적으로 결정되고 변하지 않는다. <br>
렉시컬 환경은 자신의 "외부 렉시컬 환경에 대한 참조"를 통해 상위 렉시컬 환경과 연결된다. 이것이 바로 스코프 체인이다. 따라서 "함수의 상위 스코프를 결정한다"는 것은 "렉시컬 환경의 외부 렉시컬 환경에 대한 참조에 저장할 참조값을 결정한다"는 것과 같다. <br>
**렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장할 참조값, 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정된다. 이것이 바로 렉시컬 스코프다.**

## 24.2 함수 객체의 내부 슬롯 [[Environment]]
함수는 자신의 내부 슬롯 [[Environment]]에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장한다. 다시 말해, 함수 정의가 평가되어 함수 객체를 생성할 때 자신이 정의된 환경(위치)에 의해 결정된 상위 스코프의 참조를 함수 객체 자신의 내부 슬롯[[Environment]]에 저장한다. 이때 자신의 내부 슬롯 [[Environment]]에 저장된 상위 스코프의 참조는 현재 실행 중인 실행 컨텍스트의 렉시컬 환경을 가리킨다. 

```javascript
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

함수가 호출되면 함수 내부로 코드의 제어권이 이동한다. 그리고 함수 코드를 평가하기 시작한다. 함수 코드평가 아래 순서로 진행한다.

1. 함수 실행 컨텍스트 생성
2. 함수 렉시컬 환경 생성
    1. 함수 환경 레코드 생성
    2. this 바인딩
    3. 외부 렉시컬 환경에 대한 참조 결정

함수 객체의 내부 슬롯에 저장된 렉시컬 환경의 참조는 바로 함수의 상위 스코프를 의미한다. 이것이 바로 함수 정의 위치에 따라 상위 스코프를 결정하는 렉시컬 스코프의 실체다.

## 24.3 클로저와 렉시컬 환경

```javascript
const x = 1;

// ①
function outer() {
  const x = 10;
  const inner = function () { console.log(x); }; // ②
  return inner;
}

// outer 함수를 호출하면 중첩 함수 inner를 반환한다.
// 그리고 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 팝되어 제거된다.
const innerFunc = outer(); // ③
innerFunc(); // ④ 10
```
이처럼 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다. 이러한 중첩 함수를 클로저라고 부른다.

```html
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
위 예제의 중첩함수 bar는 외부함수 foo보다 더 오래 유지되지만 상위 스코프의 어떤 식별자도 참조하지 않는다. 참조하지도 않는 식별자를 기억하는 것은 메모리 낭비이기 떄문에 bar함수는 클로저라고 할 수 없다. 


```html
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

위 예제의 중첩함수 bar는 상위 스코프의 식별자를 참조하고 있으므로 클로저다. 하지만 외부함수 foo의 외부로 중첩함수 bar가 반환되지 않아 외부함수보다 일찍 소멸되기 때문에 생명 주기가 종료된 외부 함수의 식별자를 참조할 수 있다는 클러저의 본질에 부합하지 않는다. 따라서 중첩함수 bar는 일반적으로 클러저라 하지 않는다.

```html
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

위 예제는 중첩함수 bar는 상위 스코프의 식별자를 참조하고, 외부함수의 외부로 반환되어 외부함수보다 오래 살아남아 클로저다. 다만 상위 스코프의 x,y 식별자 중에서 x만 참조하고 있다. 이런 경우 대부분의 모던 브라우저는 최적화를 통해 클로저가 참조하고 있는 식별자만을 기억한다. <br>
클로저에 의해 참조되는 상위 스코프의 변수를 `자유 변수`라고 부른다. 클로저란 "함수가 자유 변수에 대해 닫혀있다"라는 의미다. 이를 더 알기 쉽게 의역하면 "자유 변수에 묶여 있는 함수"라 할 수 있다.


## 24.4 클로저의 활용

클로저는 상태를 안전하게 변경하고 유지하기 위해 사용한다. 상태를 안전하게 은닉하고 특정 함수에만 상태 변경을 허용하기 위해 사용한다.

```javascript
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

위 코드는 잘 동작하지만 오류를 발생시킬 가능성이 있는 좋지않은 코드다. 
1. 카운트 상태(num 변수의 값)는 increase함수가 호출되기 전까지 변경되지 않고 유지되어야 한다.
2. 이를 위해 카운트 상태(num 변수의 값)는 increase 함수만이 변경할 수 있어야 한다.

전역 변수는 누군가에 의해 의도치 않게 카운트 상태, 즉 전역 변수 num의 값이 변경되면 이는 오류로 이어진다. 따라서 increse함수만이 num 변수를 참조하고 변경할 수 있게 하는것이 바람직하다. 

```javascript
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

num변수를 increase 함수의 지역 변수로 상태 변경을 하여 increase함수만이 변경할 수 있지만 함수가 호출할 때마다 지역 변수 num은 다시 선언되고 0으로 초기화되기 때문에 출력 결과는 언제나 1이다. 

```javascript
// 카운트 상태 변경 함수
const increase = (function () {
  // 카운트 상태 변수
  let num = 0;

  // 클로저
  return function () {
    // 카운트 상태를 1만큼 증가 시킨다.
    return ++num;
  };
}());

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

즉시 실행 함수는 한번만 실행되므로 increase가 호출될 때마다 num 변수가 재차 초기화될 일은 없을 것이다. 또한 num 변수는 외부에서 직접 접근할 수 없는 은닉된 private변수이므로 전역 변수를 사용했을 때와 같이 의도되지 않은 변경을 걱정할 필요도 없기 때문에 더 안정적인 프로그램이 가능하다. 

```javascript
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
    }
  };
}());

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2

console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```
생성자함수 Counter는 프로토타입을 통해 increase, decrease 메서드를 상속받은 인스턴스를 생성한다. increase, decrease 메서드는 모두 자신의 함수 정의가 평가되어 함수 객체가 될때 실행 중인 실행 컨텍스트인 즉시 실행 함수 실행 컨텍스트의 렉시컬 환경을 기억하는 클로저다. 따라서 프로토타입을 통해 상속되는 프로토타입 메서드일지라도 즉시 실행 함수의 자유 함수 num을 참조할 수 있다. 다시 말해, num 변수의 값은 increase, decrease 메서드만이 변경할 수 있다.

```javascript
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

makeCounter 함수는 보조 함수를 인자로 전달받고 함수를 반환하는 고차 함수다. makeCounter 함수가 반환하는 함수는 자신이 생성됐을 때의 렉시컬 환경인 makeCounter함수의 스코프에 속한 counter변수를 기억하는 클로저다. <br>

makeCounter 함수는 인수로 전달받은 보조 함수를 합성하여 자신이 반환하는 함수의 동작을 변경할 수 있다. 이때 주의해야 할 것은 **makeCounter 함수를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다**는 것이다.


## 24.5 캡슐화와 정보 은닉

`캡슐화`는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말한다. 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 `정보 은닉`이라 한다. <br>
정보 은닉은 외부에 공개할 필요가 없는 구현의 일부를 외부에 공개되지 않도록 감추어 적절치 못한 접근으로부터 객체의 상태가 변경되는 것을 방지해 정보를 보호하고, 객체 간의 상호 의존성을 낮추는 효과가 있다.<br>
대부분의 객체지향 프로그래밍 언어는 public, private, protected와 같은 접근 제한자를 제공하지만 자바스크립트는 제공하지 않는다. 즉 모든 프로퍼티와 메서드는 public이다.

```javascript
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
}());

const me = new Person('Lee', 20);
me.sayHi(); // Hi! My name is Lee. I am 20.
console.log(me.name); // Lee
console.log(me._age); // undefined

const you = new Person('Kim', 30);
you.sayHi(); // Hi! My name is Kim. I am 30.
console.log(you.name); // Kim
console.log(you._age); // undefined
```

즉시 실행 함수로 감싸서 그 안에 지역 변수 _age를 선언하고 그 안에 Person생성자 함수와 프로토타입 메서드를 선언하고 생성자 함수를 반환하도록 한다.
그렇게되면 즉시 실행 함수는 종료되었지만 반환된 Person생성자 함수는 여전히 지역 변수_age를 참조할 수 있는 클로저이다.<br>
하지만 위 예제도 완벽하진 않다. Person생성자 함수가 여러 개의 인스턴스를 생성할 경우 _age변수의 상태가 유지되지 않는다.

```javascript
const me = new Person('Lee', 20);
me.sayHi(); // Hi! My name is Lee. I am 20.

const you = new Person('Kim', 30);
you.sayHi(); // Hi! My name is Kim. I am 30.

// _age 변수 값이 변경된다!
me.sayHi(); // Hi! My name is Lee. I am 30.
```




## 24.6 자주 발생하는 실수
for문을 사용할 때 for문 내부에 함수를 선언하는 경우 기대하지 않은 결과가 나타난다.

```javascript
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = function () { return i; }; // ①
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]()); // ②
}
```

0 1 2가 출력될 것을 기대하였지만 3 3 3이 출력된다.<br>
이유는 var로 선언된 i변수는 전역 변수로 선언되었기 때문에 함수 선언문에 i값을 전달하였더라도, 호출하는 시점에는 i값이 3이기 때문에 3 3 3이 출력된다.<br><br>

위 예제를 클로저를 사용해 바르게 고치면 아래와 같다.

```javascript
var funcs = [];

for (var i = 0; i < 3; i++){
  funcs[i] = (function (id) { // ①
    return function () {
      return id;
    };
  }(i));
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]());
}

```

for문 내부에 함수를 선언할 때 즉시 실행 함수로 감싸고 i값을 전달해 주도록 수정하였다. <br>
이렇게 하면 새로운 함수 레벨 스코프가 반복문을 반복하면서 계속 생겨 각각의 스코프에 i값이 id 매개변수에 저장되게 된다.<br>
즉 id는 즉시 실행 함수가 반환한 중첩 함수에 묶여있는 자유 변수가 되어 그 값이 유지된다.<br><br>

위 예제 보다 더욱 간단하게 하는 방법은 ES6의 let키워드를 사용하는 것이다.
```javascript
const funcs = [];

for (let i = 0; i < 3; i++) {
  funcs[i] = function () { return i; };
}

for (let i = 0; i < funcs.length; i++) {
  console.log(funcs[i]()); // 0 1 2

```
let 키워드는 블록 레벨 스코프를 따르기 때문에 for문이 반복될 때 마다 새로운 렉시컬 환경이 생성된다.
<br><br>

함수형 프로그래밍 기법인 고차 함수를 사용하는 방법도 있다.

```javascript

// 요소가 3개인 배열을 생성하고 배열의 인덱스를 반환하는 함수를 요소로 추가한다.
// 배열의 요소로 추가된 함수들은 모두 클로저다.
const funcs = Array.from(new Array(3), (_, i) => () => i); // (3) [ƒ, ƒ, ƒ]

// 배열의 요소로 추가된 함수 들을 순차적으로 호출한다.
funcs.forEach(f => console.log(f())); // 0 1 2

```