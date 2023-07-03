# 24. 클로저

클로저는 **함수와 그 함수가 선언된 렉시컬 환경과의 조합**입니다.

```jsx
const x = 1;

function outerFunc(){
  const x = 10;
  
  function innerFunc() {
    console.log(x); // 10
  }
  
  innerFunc();
}

outerFunc();
```

```jsx
const x = 1;

function outerFunc(){
  const x = 10;

  innerFunc();
}

function innerFunc() {
  console.log(x); // 1
}
  
outerFunc();
```

## 24.1 렉시컬 스코프

자바스크립트 엔진이 함수를 어디서 호출했는지가 아니라, 함수를 어디에 정의했는지에 따라 상위 스코프를 결정합니다. 함수의 상위 스코프는 함수를 정의한 위치에 의해 정적으로 결정되고 변경되지 않습니다.

> **렉시컬 스코프는 렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장할 참조값, 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정됩니다.** 이것이 렉시컬 스코프입니다.


## 24.2 함수 객체의 내부 슬롯 `[[Environment]]`

전역에 정의된 함수 선언문은 전역 코드가 평가되는 시점에 평가되어 함수 객체를 생성합니다. 이때 생성된 함수 객체의 내부 슬롯인 `[[Environment]]` 에는 함수 정의가 평가되는 시점, 즉 전역 코드 평가 시점에 실행 중인 실행 컨텍스트의 렉시컬 환경인 외부 함수 렉시컬 환경의 참조가 저장됩니다.

함수 객체의 내부 슬롯 `[[Environment]]`에 저장된 현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조가 바로 상위 스코프입니다.


## 24.3 클로저와 렉시컬 환경

- 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있습니다. 이러한 중첩 함수를 클로저라고 부릅니다.

  ```jsx
  const x = 1;

  function outer() {
    const x = 10;
    const inner = function () { console.log(x) };
    return inner;
  }

  const innerFunc = outer();

  innerFunc();
  ```
  - `outer` 함수를 호출하면 `outer` 함수는 중첩함수 `inner`를 반환하고 생명 주기를 마감합니다.
  - 그리고 `outer` 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 pop되어 제거됩니다. 이때 `outer` 함수의 렉시컬 환경까지 소멸하는 것은 아닙니다.

- 자바스크립트의 모든 함수는 상위 스코프를 기억하므로 이론적으로 모든 함수는 클로저이지만, 상위 스코프의 어떤 식별자도 참조하지 않는 함수는 클로저가 아닙니다. 이런 경우에는 브라우저 최적화를 통해 상위 스코프를 기억하지 않습니다.

- 중첩함수가 외부함수보다 먼저 소멸되는 경우도 클로저라고 하지 않습니다.

- 만약 중첩 함수가 외부 함수의 모든 식별자를 사용하지 않는다면, 상위 스코프에는 사용하는 식별자만 저장됩니다. 이때 사용되는 식별자를 **자유 변수**라고 부릅니다.


## 24.4 클로저의 활용

클로저는 상태를 안전하게 변경하고 유지하기 위해 사용합니다. 즉, 상태를 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하기 위해 사용합니다.

> 동일한 렉시컬 스코프를 가지고, 자유 변수를 공유하도록 설계와 코딩을 잘 해야합니다.

- **예제 1**

  ```jsx
  // 카운트 상태 변수
  let num = 0;

  // 카운트 상태 변경 함수
  const increase = function() {
    // 카운트 상태를 1만큼 증가
    return ++num;
  };

  console.log(increase()); // 1
  console.log(increase()); // 2
  console.log(increase()); // 3
  ```
  
  - 예제가 바르게 동작하려면 다음의 전제 조건이 지켜져야 합니다.
    1. 카운트 상태(`num` 변수의 값)는 `increase` 함수가 호출되기 전까지 변경되지 않고 유지되어야 합니다.
    2. 이를 위해 카운트 상태(`num` 변수의 값)는 `increase` 함수만이 변경할 수 있어야 합니다.
  
  - 카운트 상태는 전역 변수를 통해 관리되고 있기 때문에 언제든지 누구나 접근할 수 있고 변경할 수 있습니다. 이는 의도치 않게 상태가 변경될 수 있음을 의미합니다.

- **예제 2**

  ```jsx
  const increase = function(){
    let num = 0;
    
    return ++num;
  }

  // 이전 상태를 유지 불가
  console.log(increase()); // 1
  console.log(increase()); // 1
  console.log(increase()); // 1
  ```

  - 전역 변수 `num`을 `increase` 함수의 지역 변수로 변경하여 의도치 않은 상태 변경 방지

  - 출력 결과가 항상 1인 문제 즉, 상태가 변경되기 이전 상태 유지 불가

- **예제 3**

  ```jsx
  const increase = (function () {
    let num = 0;
    
    // 클로저
    return function() {
      return ++num;
    };
  }());

  console.log(increase()); // 1
  console.log(increase()); // 2
  console.log(increase()); // 3
  ```

  - 즉시 실행 함수가 반환한 클로저는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억합니다. 
  
  - 즉시 실행 함수가 반환한 클로저는 카운트 상태를 유지하기 위한 자유 변수 `num`을 언제 어디서 호출하든지 참조하고 변경 가능합니다.

  - 즉시 실행 함수는 한 번만 실행되므로 초기화될 일이 없고, 외부에서 접근 할 수 없으므로 안정적인 프로그래밍이 가능합니다.

- **예제 4**

  ```jsx
  const counter = (function() {
    // 카운트 상태 변수
    let num = 0;
    
    // 클로저인 메서드를 갖는 객체를 반환
    // 객체 리터럴은 스코프를 만들지 X
    // 따라서 아래 메서드들의 상위 스코프는 즉시 실행 함수의 렉시컬 환경
    return {
      increase() {
        return ++num;
      },
      decrease() {
        return num > 0 ? --num : 0;
      }
    };
  }());

  console.log(counter.increase()); // 1
  console.log(counter.decrease()); // 0
  ```

  - 카운트 상태 감소 기능 추가

- **예제 5**

  ```jsx
  const counter = (function () {
    let counter = 0;
    
    return function (aux){
      counter = aux(counter);
      
      return counter;
    };
  }());

  // 보조함수
  function increase(n) {
    return ++n;
  }

  // 보조함수
  function decrease(n) {
    return --n;
  }

  console.log(counter(increase));
  ```

  - `makeCounter` 함수는 보조 함수를 인자로 전달받고 함수를 반환하는 고차 함수 입니다. `makeCounter` 함수가 반환하는 함수는 자신이 생성됐을 때의 렉시컬 환경인 `makeCounter` 함수의 스코프에 속한 `counter` 변수를 기억하는 클로저입니다.

  - `makeCounter`함수는 인자로 전달받은 보조 함수를 합성하여 자신이 반환하는 함수의 동작을 변경할 수 있습니다. 이때 `makeCounter` 함수를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다는 것에 주의해야 합니다.

## 24.5 캡슐화와 정보 은닉

- **캡슐화**
  
  객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말합니다.

- **정보 은닉**

  객체의 특정 프로퍼티나 메서드를 감추는 것으로 의도치않게 상태가 변경되는 것을 막고, 객체 간 상호 의존성을 낮춥니다.

- 자바스크립트는 접근 제한자를 제공하지 않으며, 객체의 모든 프로퍼티와 메서드는 기본적으로 외부에 공개되어 있습니다.

```jsx
const Person = (function () {
  let _age = 0; // private
  
  function Person(name , age){
    this.name = name; // public
    _age = age;
  }
  
  // 프로토타입 메서드
  Person.prototype.sayHi = function() {
    console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
  }
  
  // 생성자 함수 반환
  return Person;
}());

const me = new Person('Lee', 20);
me.sayHi(); // Hi! My name is Lee. I am 20.
console.log(me.name); // Lee
console.log(me._age); // undefined
```

- `sayHi` 메서드는 종료된 즉시실행함수의 지역변수 `_age`를 참조할 수 있는 클로저입니다. `sayHi`를 통해서만 `_age`에 접근 가능합니다.

```jsx
const me = new Person('Lee', 20);
me.sayHi(); // Hi! My name is Lee. I am 20.

const you = new Person('Kim', 30);
you.sayHi(); // Hi! My name is Kim. I am 30.

// _age 변수 값 변경
me.sayHi(); // Hi! My name is Lee. I am 30.
```

- `Person` 생성자 함수가 여러 개의 인스턴스를 생성할 경우 `_age`변수의 상태가 유지되지 않습니다.즉, 자바스크립트는 정보 은닉을 완전하게 지원하지 않습니다.

## 24.6 자주 발생하는 실수

```jsx
var funcs = [];

for (var i = 0 ; i < 3 ; i++){
  funcs[i] = function() {
    return i;
  }
}

for (var j = 0; j < funcs.length; j++){
  console.log(funcs[j]());
}
```
0, 1, 2가 차례대로 출력될 것 같지만, `i`가 전역변수로 선언되었기 때문에 3, 3 ,3이 출력됩니다.

이를 해결하기 위해 다음과 같은 방법을 사용할 수 있습니다.
- `let`, `const` 등의 ES6문법 사용
  
  ```jsx
  const funcs = [];

  for (let i = 0 ; i < 3 ; i++){
    funcs[i] = function() {
      return i;
    }
  }

  for (let j = 0; j < funcs.length; j++){
    console.log(funcs[j]());
  }
  ```

- 고차 함수 사용
  
  ```jsx
  // 요소가 3개인 배열을 생성하고 배열의 인덱스를 반환하는 함수를 요소로 추가
  // 배열의 요소로 추가된 함수들은 모두 클로저
  const funcs = Array.from(new Array(3), (_, i) => () => i);

  // 배열의 요소로 추가된 함수들을 순차적으로 호출
  funcs.forEach(f => console.log(f())); // 0 1 2
  ```
