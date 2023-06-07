# 4장. 변수(Variables)

'모던 자바스크립트: 딥다이브'의 4장에서 변수에 대한 내용과 MDN 문서들을 참고하였습니다.
참고한 문서의 링크 정보는 아래에서 확인하실 수 있습니다.

<br>

**[목차]**
- 4장. 변수(Variables)
- [1. 식별자(JavaScript identifier)](#1-식별자javascript-identifier)
  - [1-1. 식별자 명명(Identifier Naming)](#1-1-식별자-명명identifier-naming)
  - [1-2. 좋은 식별자를 위한 스타일 가이드](#1-2-좋은-식별자를-위한-스타일-가이드)
- [2. 변수(Variable)](#2-변수variable)
  - [2-1. 변수(Variable) 선언과 값의 할당](#2-1-변수variable-선언과-값의-할당)
    - [2-1-1. 변수 선언](#2-1-1-변수-선언)
    - [2-1-2. 값의 할당](#2-1-2-값의-할당)
    - [2-1-3. 값의 재할당](#2-1-3-값의-재할당)
    - [2-1-4. 변수의 스코프(Variable scope)](#2-1-4-변수의-스코프variable-scope)
    - [2-1-5. 변수의 호이스팅(Variable Hoisting)](#2-1-5-변수의-호이스팅variable-hoisting)
- [식별자와 변수의 차이?](#식별자와-변수의-차이)
- [키워드](#키워드)
- [Reference](#reference)



<br>

# 1. 식별자(JavaScript identifier)
  
- 식별자는 값 또는 개체를 고유하게 식별하는 데 사용되는 이름입니다.
- 식별자는 변수, 함수, 객체, 클래스 등의 이름을 지정하는 데 사용됩니다.
- 변수나 함수의 이름으로 사용되며, 코드에서 해당 값을 참조하거나 호출할 때 식별자를 사용합니다.

```jsx

// 변수 식별자
let firstName = "B"; 
const MAX_VALUE = 100;

// 객체 식별자
let person = {
    name: "B",
    age: 30,
    isStudent: false,
};

console.log(person.name); // 출력: B
console.log(person.age); // 출력: 30
console.log(person.isStudent); // 출력: false

// 함수 식별자
function greet(name) {
    console.log("Hello!, " + name + " :)");
}

greet("B") // 출력: Hello!, B :)

```

<br>

## 1-1. 식별자 명명(Identifier Naming)

: 식별자는 코드의 가독성과 유지 보수성에 중요한 역할을 합니다. 때문에 명확하고 의미 있는 식별자를 사용하여 코드를 작성하는 것이 좋습니다.

```jsx
// 유효한 식별자
var myVariable;
var _privateVariable;
var $specialVariable;
var firstName;
var calculateTotal;

// 유효하지 않은 식별자
var 123abc; // 숫자로 시작
var my-variable; // 하이픈 포함
var function; // 예약어
var user Name; // 공백을 포함

// 식별자의 대소문자 구분 
let myVariable = 10;
let myvariable = 11;
console.log(myVariable === myvariable) // 출력: false
```

- 특수 문자(예: `!`, `@`, `#`, `%`)는 식별자 내에서 사용할 수 없습니다. 단, 언더스코어(`_`)와 달러 기호(`$`)는 사용할 수 있습니다.
- 식별자는 대소문자를 구분합니다. - `myVariable`과 `myvariable`은 서로 다른 식별자입니다.
- 식별자는 공백을 포함할 수 없습니다.
- [예약어(reserved keyword)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#reserved_words)를 식별자로 사용할 수 없습니다. 예약어들은 JavaScript에서 특정한 역할을 수행하기 위해 예약되어 있으므로, 변수 또는 함수 이름으로 사용할 수 없습니다.


<br>

## 1-2. 좋은 식별자를 위한 스타일 가이드
JavaScript에서 식별자(변수, 함수, 클래스 등)에 이름을 지을 때는 다음과 같은 규칙과 관례를 가집니다. 아래는 일반적인 관례와 가이드라인입니다.
일관된 네이밍 관례는 코드의 가독성과 유지보수성을 향상시키는 데 도움이 됩니다.

| | 스타일 관례 | 상세 |
|:----: | :---- | :--- |
| 1 | **명확하고 의미 있는 이름 사용** | 식별자의 목적이나 역할을 정확하게 설명하는 이름을 선택합니다. 약어나 너무 짧은 이름을 사용하지 않는 것이 좋습니다. 다른 개발자들도 쉽게 이해할 수 있도록 명확하고 간결한 이름을 사용하는 것이 좋습니다. |
| 2 | **예약어 피하기** | JavaScript에는 언어에서 특별한 의미를 가지는 예약어를 식별자로 사용하지 않도록 주의 합니다.  - 예: `var`, `function`, `if`, `else`, `for` |
| 3 | **숫자가 아닌 글자나 밑줄로 시작** | 식별자는 숫자로 시작할 수는 없습니다. 때문에 식별자는 글자(a-z, A-Z)나 밑줄(_)로 시작해야 합니다. |
| 4 | **의미 있는 변수 접두사 사용** | 변수의 용도를 나타내기 위해 의미 있는 접두사를 사용할 수 있습니다. |
| 5 | **소문자를 사용한 변수명과 함수명** | 변수와 함수 이름은 소문자로 시작해야 합니다. 이렇게 하면 생성자 함수와 구분하기 쉽습니다. 생성자 함수는 일반적으로 대문자로 시작하는 이름을 사용합니다. |
| 6 | **카멜 케이스(Camel Case) 사용** | JavaScript에서는 변수와 함수 이름에 카멜 케이스를 일반적으로 사용합니다. 카멜 케이스는 식별자의 첫 글자가 소문자로 시작하고, 이후 연결된 단어의 첫 글자는 대문자로 표기하는 네이밍 스타일입니다. - 예: `myVariable`, `calculateSum()`, `getUserData()` |
| 7 | **생성자 함수에 대문자 사용** | 생성자 함수나 클래스를 정의할 때는 이름을 대문자로 시작합니다. 이는 생성자로 사용되는 식별자임을 나타내는 관례입니다. |
| 8 | **상수** | 코드에서 상수를 사용하는 경우, 대문자와 밑줄을 사용하여 단어를 구분합니다. - 예: `MAX_VALUE`, `PI`, `DEFAULT_COLOR` |
| 9 | **일관성 유지** | 코드에서 식별자를 일관성 있게 사용하는 것이 중요합니다. 변수와 함수에 동일한 규칙과 스타일을 적용하여 일관성 있는 코드를 유지하는 것이 좋습니다. |
| 10 | **자세한 설명 주석 추가** | 식별자의 역할이나 의도를 명확히 이해하기 어려운 경우, 주석을 추가하여 설명해주는 것이 좋습니다. |


```jsx
// 좋은 예: 설명적인 변수 이름
const totalPrice = calculatePrice(quantity, price);

// 좋은 예: 의미 있는 함수 이름
function getUserData() {
  // 코드 로직
}

// 좋은 예: 명확하고 설명적인 클래스 이름
class ShoppingCart {
  // 클래스 구현
}

// 좋은 예: 카멜 케이스로 변수와 함수 이름 작성
const myVariable = 42;
function calculateSum(a, b) {
  return a + b;
}

// 좋은 예: 대문자로 시작하는 생성자 함수
function Person(name) {
  this.name = name;
}

// 좋은 예: 대문자로 시작하는 클래스 이름
class Circle {
  // 클래스 구현
}
```
```jsx
// 나쁜 예: 분명하지 않은 변수 이름
const x = 42;

// 나쁜 예: 의미 없는 함수 이름
function xyz() {
  // 코드 로직
}

// 나쁜 예: 모호한 클래스 이름
class ABC {
  // 클래스 구현
}

// 나쁜 예: 대문자로 시작하는 변수와 함수 이름
const MyVariable = 42;
function CalculateSum(a, b) {
  return a + b;
}

// 나쁜 예: 소문자로 시작하는 클래스 이름
class circle {
  // 클래스 구현
}

// 나쁜 예: 변수 이름으로 예약어 사용
const var = 42;

// 나쁜 예: 함수 이름으로 예약어 사용
function function() {
  // 코드 로직
}

// 나쁜 예: 클래스 이름으로 예약어 사용
class if {
  // 클래스 구현
}
```
> **참조:** <br>
> [구글, 스타일 가이드: 식별자 명명 규칙](https://google.github.io/styleguide/jsguide.html#naming-rules-by-identifier-type) <br>
> [에어비엔비, 스타일 가이드: 변수](https://github.com/airbnb/javascript#variables)


<br>

# 2. 변수(Variable)

- 변수는 프로그래밍에서 데이터를 저장하고 참조하기 위해 사용되는 이름이 할당된 메모리 공간입니다.
- 변수는 값을 저장하기 위한 메모리 공간을 가리키는 식별자입니다.
- 변수는 데이터를 저장하고 참조하기 위해 사용됩니다.
- 변수는 값을 할당하거나 업데이트할 수 있으며, 코드에서 해당 변수의 값을 사용할 수 있습니다.
- 변수는 선언과 함께 데이터 유형을 지정하거나, 자바스크립트의 동적 타입 시스템에서는(자바스크립트는 동적 언어로) 데이터 유형을 추론하여 할당될 수도 있습니다.

    <details>
    <summary><u>동적 타입 언어(Dynamically Typed Language)인 JavaScript</u></summary>

    * JavaScript는 동적 타입 언어(Dynamically Typed Language)로 분류됩니다. 동적 타입 시스템은 변수의 타입을 명시적으로 선언하지 않고, 실행 시간(runtime)에 변수의 타입이 결정되는 특징을 가지고 있습니다.
    * JavaScript에서 변수는 선언할 때 타입을 명시적으로 선언하지 않습니다. 대신, 변수에 할당되는 값에 따라 자동으로 타입이 결정됩니다.

      ```jsx
      let x = 5; // x는 숫자 타입으로 추론됩니다.
      let message = "안녕하세요"; // message는 문자열 타입으로 추론됩니다.
      let isValid = true; // isValid는 불리언 타입으로 추론됩니다.
      ```

    * 동적 타입 시스템은 변수의 데이터 유형이 실행 중에 변경될 수 있음을 의미합니다. 같은 변수는 다른 데이터 유형의 값을 할당받을 수 있습니다.

      ```jsx
      let variable = 5; // variable는 숫자 타입으로 추론됩니다.
      variable = "안녕하세요"; // 문자열 타입으로 변경
      variable = false; // 불리언 타입으로 변경
      ```

    * 동적 타입 시스템은 자유로운 유연성을 제공하지만, 잘못된 타입의 사용으로 인한 오류가 발생할 수도 있습니다. 따라서 JavaScript 개발자는 변수의 타입을 주의하고, 변수의 값과 연산에 따른 타입 변환을 고려해야 합니다.

      ```jsx
      let num1 = 5;
      let num2 = "10";

      let sum = num1 + num2;
      console.log(sum) // 510 반환
      console.log(typeof sum) // string
      // JavaScript는 연산 시 자동으로 타입 변환을 수행하며, 숫자와 문자열의 덧셈 연산은 문자열 연결(concatenation)을 수행하여 510을 출력합니다.
      ```
      이러한 상황에서 개발자는 의도하지 않은 결과를 방지하기 위해 명시적인 타입 변환을 사용할 수 있습니다.
      ```jsx
      let num1 = 5;
      let num2 = "10";

      let sum = num1 + Number(num2);
      console.log(sum); // 15
      console.log(typeof sum) // number
      ```

    * **변수의 타입과 타입 변환에 주의하고, 연산이 예상한 대로 수행되는지 확인하기 위한 방법**
      1. 변수를 선언하고 초기화할 때, 해당 변수가 어떤 타입의 값을 저장할 것인지 명확하게 지정하는 것이 좋습니다.
      2. JavaScript에서는 `Number()`, `String()`, `Boolean()`과 같은 내장 함수를 사용하여 명시적인 타입 변환을 수행할 수 있습니다. 이러한 함수를 활용하여 원하는 타입으로의 변환을 명시적으로 처리할 수 있습니다.
      3. 다양한 연산자를 사용할 때, JavaScript는 필요에 따라 타입 변환을 수행합니다. 이러한 타입 변환이 의도한 대로 이루어지지 않을 수 있으므로, 연산자를 사용할 때 타입 변환이 어떻게 이루어지는지 이해하고 예상 결과를 확인해야 합니다.
      4. 일치 비교 연산자(`===`)를 사용하여 값과 타입을 동시에 비교할 수 있습니다. 이를 통해 예상치 못한 타입 변환으로 인한 오류를 방지할 수 있습니다.
      5. `typeof` 연산자를 사용하여 변수의 타입을 확인할 수 있습니다. 이를 통해 변수에 저장된 값의 타입을 확인하고, 적절한 처리를 수행할 수 있습니다.

    </details>

<br>

## 2-1. 변수(Variable) 선언과 값의 할당

- 변수는 값을 변경할 수 있으며, 다른 값을 할당할 수도 있습니다.
- 변수 값은 어떤 유형의 데이터든지 할당할 수 있습니다.
  ```jsx
  let age = 25; // 숫자 값을 변수에 할당합니다.
  let message = "안녕하세요"; // 문자열 값을 변수에 할당합니다.
  let isValid = true; // 불리언 값을 변수에 할당합니다.
  let person = { name: "John", age: 30 }; // 객체를 변수에 할당합니다.
  let numbers = [1, 2, 3, 4, 5]; // 배열을 변수에 할당합니다.

  let x = 10;
  let y = 5;
  let sum = x + y; // 변수 x와 y의 값을 사용하여 sum 변수에 값을 할당합니다.
  console.log(sum); // 출력: 15
  ```
- 변수의 선언, 값 할당, 사용은 아래의 내용에 따라서 이루어집니다.

<br>

### 2-1-1. 변수 선언

JavaScript에서 변수는 사용하기 전에 항상 선언되어야 합니다. 이는 변수를 선언하지 않고 사용하는 것을 피하기 위해 중요한 규칙입니다. 이전의 JavaScript 버전에서는 선언되지 않은 변수에 값을 할당하는 것을 허용했습니다. 그러나 이렇게 할 경우 선언되지 않은 전역 변수가 생성되어 예기치 않은 결과를 초래할 수 있습니다.

```jsx
function unforeseenConsequence(){
  num = 10; // num은 선언되지 않은 변수
  console.log(num);
}

unforeseenConsequence(); // 10
console.log(num) // 10
```
함수 unforeseenConsequence num에 값을 할당하면 num는 암묵적으로 전역 변수로 선언되어 전역 스코프에서 사용됩니다. 따라서 unforeseenConsequence와 console.log(num)는 모두 동일한 전역 변수 num를 참조합니다.

<details>
<summary>참조(Reference)</summary>
프로그래밍에서 한 변수가 다른 변수 또는 객체를 가리키는 것을 의미합니다. 즉, 변수가 메모리상의 다른 변수나 객체를 참조하면, 해당 변수는 참조를 통해 해당 값에 접근하거나 조작할 수 있습니다.
일반적으로, 참조는 두 변수가 같은 메모리 위치를 가리키는 것을 의미합니다. 따라서 한 변수를 통해 해당 메모리 위치에 접근하면 다른 변수도 동일한 값을 참조할 수 있습니다.
자바스크립트에서는 객체와 배열과 같은 복합적인 데이터 유형이 참조로 처리됩니다. 이는 객체 또는 배열을 변수에 할당할 때, 실제 데이터가 아닌 메모리상의 위치(참조)가 변수에 저장되기 때문입니다.

```jsx
let person1 = { name: 'John', age: 30 };
let person2 = person1;
```

위의 코드에서 person1은 객체를 참조하는 변수입니다. 그리고 person2는 person1과 동일한 객체를 참조합니다. 따라서 person1 또는 person2를 통해 객체의 속성에 접근하거나 변경할 경우, 동일한 객체가 수정됩니다. 이는 두 변수가 동일한 객체를 참조하기 때문입니다.

참조는 메모리 공간을 절약하고 객체 또는 배열의 복사를 방지하기 위해 사용됩니다. 또한, 참조를 통해 객체나 배열을 공유하고 동일한 데이터를 다른 변수에서도 사용할 수 있습니다.
그러나 주의해야 할 점은 참조는 얕은 복사(shallow copy)로 작동하여 객체나 배열이 변경될 경우 참조하는 모든 변수에 영향을 미친다는 것입니다. 따라서 참조를 사용할 때에는 데이터의 변경이 예상치 못한 결과를 초래하지 않도록 주의해야 합니다.

* **얕은 복사(shallow copy)**: 객체나 배열을 복사할 때, 복사된 객체나 배열이 원본 객체나 배열의 참조를 공유하는 것을 의미합니다. 즉, 새로운 변수에 할당된 객체나 배열은 원본 객체나 배열의 주소를 참조하게 됩니다. 얕은 복사는 복합 데이터 유형인 객체나 배열을 다룰 때 주로 발생하는 개념입니다. 이는 객체나 배열이 참조 타입으로 동작하기 때문입니다. 따라서 원본 객체나 배열의 변경이 복사된 객체나 배열에 영향을 미칠 수 있습니다.

    ```jsx
    let originalArray = [1, 2, 3];
    let copiedArray = originalArray; // 얕은 복사

    originalArray[0] = 10;

    console.log(copiedArray); // [10, 2, 3]
    ```
    
    위의 코드에서 `originalArray`와 `copiedArray`는 동일한 배열을 참조합니다. 따라서 `originalArray`의 첫 번째 요소를 변경하면 `copiedArray`도 동일한 변경을 반영합니다. 이는 두 배열이 같은 메모리 위치를 참조하기 때문입니다.

    얕은 복사는 객체에도 동일하게 적용됩니다. 객체의 속성을 변경하면 복사된 객체의 속성도 변경되며, 두 객체는 동일한 객체를 참조합니다.

    얕은 복사는 원본 객체나 배열이 큰 경우 메모리 사용량을 줄일 수 있는 장점이 있습니다. 그러나 원본 데이터를 보존하려는 목적으로 사용하는 경우 예상치 못한 결과를 초래할 수 있으므로 주의해야 합니다. 이러한 경우에는 깊은 복사(Deep Copy)를 사용하여 원본 데이터와 복사본이 서로 독립된 객체나 배열을 가지도록 해야 합니다.

* **깊은 복사(Deep Copy)**: 깊은 복사(Deep Copy)는 객체나 배열을 복사할 때, 복사된 객체나 배열이 완전히 새로운 객체 또는 배열을 생성하여 원본과는 독립적인 복사본을 만드는 것을 의미합니다. 깊은 복사를 수행하면 원본 객체나 배열의 변경이 복사본에 영향을 주지 않습니다. 깊은 복사는 복합 데이터 유형인 객체나 배열의 모든 속성을 재귀적으로 탐색하여 각 속성의 값을 복사하는 방식으로 작동합니다. 따라서 복사본은 원본과는 다른 메모리 위치에 저장되며, 원본과 복사본은 독립적으로 동작합니다. 자바스크립트에서 깊은 복사를 수행하는 방법은 여러 가지가 있습니다. 일반적으로는 `JSON.parse()`와 `JSON.stringify()` 함수를 조합하여 깊은 복사를 수행할 수 있습니다.

    ```jsx
    let originalObject = { name: 'John', age: 30 };
    let copiedObject = JSON.parse(JSON.stringify(originalObject)); // 깊은 복사

    originalObject.age = 40;

    console.log(copiedObject); // { name: 'John', age: 30 }
    ```

    위의 코드에서 `originalObject`는 원본 객체를 나타내고, `copiedObject`는 `JSON.stringify()`를 통해 원본 객체를 JSON 문자열로 변환하고, 다시 `JSON.parse()`를 사용하여 새로운 객체로 변환함으로써 깊은 복사를 수행합니다. 따라서 원본 객체의 `age` 속성을 변경하더라도 복사본에는 영향을 주지 않습니다. 
        
    깊은 복사를 수행할 때에는 객체나 배열의 규모가 큰 경우 성능상의 이슈가 있을 수 있으므로 주의해야 합니다. 또한, 객체나 배열 내에 순환 참조가 있는 경우 무한 루프에 빠질 수 있으므로 이에 대한 처리가 필요할 수 있습니다.

</details>


이러한 동작은 예기치 않은 문제를 발생시킬 수 있으므로, 변수는 항상 선언 후 사용하는 것이 좋습니다. 또한 [엄격 모드(strict mode)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#assigning_to_undeclared_variables)를 사용하여 이러한 실수를 방지할 수 있습니다. 엄격 모드에서는 선언되지 않은 변수에 값을 할당하는 것이 오류로 처리되므로, 미리 선언하지 않은 변수를 사용하는 실수를 줄일 수 있습니다. 엄격 모드는 코드 상단에 `"use strict";`를 추가하여 활성화할 수 있습니다.

**[Syntax]**
```jsx
//변수명 = 값;
let 변수명;
const 변수명;
var 변수명;
```

자바스크립트에서 변수는 **`var`**, **`let`**, **`const`** 키워드를 사용하여 선언할 수 있으며, 값을 할당하고 참조할 수 있습니다.

- **`var`**: 실행 컨텍스트에 따라 지역 변수와 전역 변수를 모두 선언하는 데 사용할 수 있습니다. ES6 이전에 주로 사용되었으며, 현재는  `let`과 `const`가 권장됩니다.
- **`let`**, **`const`**:
  - 블록 범위 지역 변수를 선언하는 데 사용됩니다. ([변수 범위(Variable scope)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variable_scope) 참조)
  - [구조 분해 할당 구문(Destructuring assignment)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)을 사용하여 값들을 변수로 언팩하여 선언할 수도 있습니다.


<br>

### 2-1-2. 값의 할당
변수에 값을 할당하여 값을 저장합니다.

```jsx
let x;
console.log(x); // 출력: undefined
// x는 초기화 없이 선언되었기 때문에 undefined로 할당됩니다
```
이는 변수 x가 선언되었지만 값을 할당하기 전이기 때문에 `undefined` 값이 반환됩니다.

  - `var`와 `let`선언에서는 초기화가 선택적입니다. 변수를 초기화 하지 않고 선언하는 경우, 해당 변수는 `undefined`라는 값이 할당됩니다. 반면, `const` 선언은 항상 초기화가 필요합니다. 이는 `const` 변수가 선언 후 재할당 할 수 없기 때문입니다.

    <details>
      <summary>초기화(Initializer)</summary>
      초기화(Initializer)는 변수를 특정 값으로 설정하는 과정을 의미합니다. 변수 선언 시 초기값을 할당하여 변수를 초기화할 수 있습니다.

      ```jsx
      let x = 42;
      ```

      `x` 변수는 선언과 동시에 초기화되었습니다. 초기화 구문인 `= 42`는 변수 `x`에 값 `42`를 할당하는 역할을 합니다. 이렇게 초기화된 변수는 선언된 이후에도 해당 값을 유지하며, 이후에 해당 변수를 참조하거나 사용할 때 이 초기값이 사용됩니다.

      변수 선언 시 초기값을 생략하고 선언만 하는 경우, 변수는 `undefined`로 초기화됩니다. 이는 변수에 아직 어떤 값도 할당되지 않았음을 나타냅니다.

      ```jsx
      let y;
      console.log(y) // undefined
      ```
      `y` 변수는 초기값이 없이 선언되었으므로 `undefined`로 초기화되었습니다. 이후에 `y` 변수를 참조하면 `undefined`가 출력됩니다.
      
      > 요약: 초기화는 변수를 선언한 후에 해당 변수에 값을 할당하여 사용할 수 있도록 하는 과정을 의미합니다.
    </details>

```jsx
x = 10; // 변수 x에 10을 할당합니다.
name = "B"; // 변수 name에 "B"이라는 문자열을 할당합니다.
```
값을 할당할 때는 `=` 연산자를 사용합니다.

<br>

### 2-1-3. 값의 재할당
변수는 값을 변경할 수 있으므로, 다른 값을 할당할 수도 있습니다.
```jsx
x = 3
x = 20; // 변수 x의 값을 20으로 변경합니다.
y = 3
let z = x + y;
console.log(z) // 23

// 변수명;
name = 3;
name = "Alice"; // 변수 name의 값을 "Alice"로 변경합니다.
console.log(name) // Alice
```

<br>

### 2-1-4. 변수의 스코프(Variable scope)
스코프(scope)는 변수 및 함수에 접근할 수 있는 유효 범위를 나타냅니다. 스코프는 변수와 함수가 어디서 정의되었는지에 따라 결정됩니다. 변수와 함수는 자신이 속한 스코프 내에서만 접근할 수 있으며, 외부 스코프에서는 직접적으로 접근할 수 없습니다.

```jsx
var globalVariable = "저는 전역 변수입니다.";

function exampleFunction() {
  // 함수 내부에서만 사용할 수 있는 지역 변수(local variable)입니다.
  var outerVariable = "저는 외부 변수입니다.";

  if (true) {
    // 블록 내부에서 선언된 변수는 블록 스코프를 가지지 않고, 함수 스코프를 공유합니다.
    var innerVariable = "저는 내부 변수입니다.";
    console.log(innerVariable);  // 출력: 저는 내부 변수입니다.
    console.log(outerVariable);  // 출력: 저는 외부 변수입니다.
  }

  console.log(innerVariable);  // 출력: 저는 내부 변수입니다.
  console.log(outerVariable);  // 출력: 저는 외부 변수입니다.
}

exampleFunction();
console.log(innerVariable);  // 에러 발생: ReferenceError: innerVariable이 정의되지 않았습니다.
console.log(outerVariable);  // 에러 발생: ReferenceError: outerVariable이 정의되지 않았습니다.
```

**스코프 유형(Scope type)**
|   |         스코프(scope)        |                        요약                                 |
|:-:|:----------------------------|:------------------------------------------------------------|
| 1 | 전역 스코프(Global scope)    | 스크립트 모드에서 실행되는 모든 코드의 기본 스코프입니다.    |
| 2 | 블록 스코프(Block scope)     | 중괄호 {}로 둘러싸인 블록을 생성할 때 생성되는 스코프입니다. |
| 3 | 함수 스코프 (Function Scope) | 함수가 생성될 때 생성되는 스코프입니다.                      |
| 4 | 모듈 스코프(Module scope)    | 모듈 모드에서 실행되는 코드의 스코프입니다.                  |

**`let`과 `const`**: ES6부터 `let`과 `const`를 사용하여 선언된 변수는 블록 스코프에 해당합니다.
  1. **블록 스코프 (Block Scope):**
      - 중괄호 `{}`로 둘러싸인 블록문이나 제어문(`if`, `for`, `while` 등) 내에서 생성되는 스코프입니다.
      - 블록 스코프에 선언된 변수는 해당 블록 내부에서만 접근할 수 있습니다.
      - 블록 스코프는 변수의 범위를 제한하여 변수 누출을 방지하고, 코드의 가독성과 유지보수성을 향상시킵니다.
```jsx
if (Math.random() > 0.5) {
  const y = 5;
}
console.log(y); // ReferenceError: y is not defined
```

**`var`**: JavaScript에서 `var`로 선언된 변수는 블록 스코프가 아니라 `함수 스코프` 또는 `전역 스코프`에 속합니다. `var` 변수의 스코프는 즉시 속한 블록에 제한되지 않고, 가장 가까운 둘러싸는 함수 스코프 또는 전역 스코프에 속합니다.
  1. **함수 스코프 (Function Scope):**
      - 함수가 생성될 때마다 새로운 스코프가 생성됩니다.
      - 함수 스코프에 선언된 변수와 함수는 해당 함수 내부에서만 접근할 수 있습니다.
      - 함수 스코프는 변수의 충돌을 방지하고, 변수의 수명을 제어하는 데 사용됩니다.
  2. **전역 스코프(Global Scope)**:
     - 스크립트 모드에서 실행되는 코드의 기본 스코프입니다.
     - 전역 스코프에 선언된 변수와 함수는 스크립트 어디에서나 접근할 수 있습니다.

```jsx
if (true) {
  var x = 5;
}
console.log(x); // x는 5입니다.
```
변수 x는 if 문 내에서 선언되었지만, var로 선언되었기 때문에 그 범위는 해당 블록으로 제한되지 않습니다. x는 가장 가까운 함수 스코프 또는 전역 스코프로 호이스팅되게 됩니다.

<br>

### 2-1-5. 변수의 호이스팅(Variable Hoisting)

`var`로 선언된 변수는 호이스팅(hoisting)되어 해당 스코프 내에서 어디서든지 참조할 수 있습니다. 즉, 변수의 선언이 아직 도달하지 않았더라도 변수를 참조할 수 있습니다. `var` 선언은 해당 함수나 전역 스코프의 맨 위로 "끌어올려집니다"라고 생각할 수 있습니다. 그러나 변수를 선언하기 전에 변수에 접근하면, 초기화되지 않았으므로 값은 항상 `undefined`가 됩니다. 호이스팅은 변수의 선언만 끌어올리고 초기화는 끌어올려지지 않기 때문입니다.

호이스팅 때문에 함수 내의 모든 `var` 문은 함수의 맨 위에 위치하는 것이 좋습니다. 이렇게 함으로써 코드의 가독성을 높일 수 있습니다.
반면, `le`t과 `const`는 호이스팅 여부가 정의에 따라 다를 수 있습니다. 변수 선언 이전에 해당 블록에서 변수를 참조하면 항상 `ReferenceError`가 발생합니다. 이는 변수가 블록의 시작부터 선언이 처리될 때까지 "[임시적으로 사용할 수 없는 영역(temporal dead zone)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz)"에 있다는 것을 의미합니다. 이는 `le`t과 `const` 변수가 호이스팅되지만 초기화는 호이스팅되지 않기 때문입니다.

```jsx
console.log(x); // undefined
var x = 10;
console.log(x); // 10

console.log(y); // ReferenceError: y is not defined
let y = 20;
console.log(y); // 20

console.log(z); // ReferenceError: z is not defined
const z = 30;
console.log(z); // 30
```

위의 코드에서 `var`로 선언된 변수 `x`는 호이스팅에 의해 선언이 스코프의 맨 위로 끌어올려집니다. 따라서 변수 선언 이전에 `console.log(x)` 문을 실행하면 `undefined`가 출력됩니다. 변수 선언 이후에 `x`에 값 `10`이 할당되고, `console.log(x)` 문을 실행하면 `10`이 출력됩니다. 반면, `let`과 `const`로 선언된 변수 `y와` `z`는 호이스팅되지만 초기화는 호이스팅되지 않습니다. 따라서 변수 선언 이전에 `console.log(y)`와 `console.log(z)`문을 실행하면 `ReferenceError`가 발생합니다. 변수가 선언된 이후에 해당 변수에 값이 할당되고, `console.log(y)`와 `console.log(z)`문을 실행하면 각각의 변수 값이 출력됩니다.


<br>

# 식별자와 변수의 차이?

식별자는 값을 고유하게 식별하는 이름이며,<br>
변수는 값을 저장하기 위한 메모리 공간을 가리키는 식별자입니다.


<br>

# 키워드

| 키워드 | 의미 |
| :--- | :--- |
| 변수 (variable) | 변수는 값을 저장하기 위해 사용되는 이름이 있는 메모리 공간입니다. 프로그램에서 데이터를 저장하고 조작하는 데 사용됩니다. 변수는 값을 할당하고 변경할 수 있습니다. |
| 상수 (constant) | 상수는 한 번 할당된 후에는 변경할 수 없는 변수입니다. 일반적으로 변하지 않는 값을 저장하기 위해 사용됩니다. |
| 표현식 (expression) | 표현식은 값을 생성하거나 결과를 반환하는 코드 조각입니다. 표현식은 숫자, 문자열, 연산자, 함수 호출 등으로 구성될 수 있습니다. 예를 들어, 2 + 3은 두 개의 숫자를 더하는 표현식입니다. |
| 파싱 (parsing) | 파싱은 프로그램이 소스 코드를 읽고 구문을 분석하여 이해하는 과정을 말합니다. 소스 코드를 해석하여 프로그램이 실행될 수 있도록 구문 트리 또는 추상 구문 트리로 변환됩니다. |
| 식별자 (identifier) | 식별자는 변수, 함수, 객체 등을 식별하기 위해 사용되는 이름입니다. 예를 들어, 변수의 이름, 함수의 이름, 객체의 속성 이름 등이 식별자입니다. |
| 변수 선언 (variable declaration) | 변수 선언은 변수를 생성하고 해당 변수의 이름을 프로그램에 알립니다. 변수를 사용하기 전에 변수를 선언해야 합니다. 예를 들어, let x;는 변수 x를 선언합니다. |
| 가비지 콜렉터 (garbage collector) | 가비지 콜렉터는 사용하지 않는 메모리를 자동으로 회수하는 프로그램의 구성 요소입니다. 가비지 콜렉터는 더 이상 사용되지 않는 객체나 변수를 감지하고, 해당 메모리를 회수하여 자원을 최적화합니다. |
| 쓰레기 값 (garbage value) | 쓰레기 값은 할당되지 않은 또는 초기화되지 않은 변수에 저장된 값을 말합니다. 쓰레기 값은 예상하지 못한 동작을 유발할 수 있으므로 변수를 초기화하거나 할당하는 것이 중요합니다. |
| 런타임 (runtime) | 런타임은 프로그램이 실행되고 동작하는 시간입니다. 프로그램이 실제로 실행되는 동안 발생하는 모든 작업을 포함합니다. |
| 변수 호이스팅 (variable hoisting) | 변수 호이스팅은 변수 선언이 스코프의 상단으로 끌어올려지는 동작을 말합니다. JavaScript에서 변수 선언은 실제 코드 위치와는 관계없이 스코프의 맨 위로 끌어올려집니다. 이로 인해 변수를 선언하기 전에 변수를 사용할 수 있는 독특한 동작이 발생합니다. |
| 할당 (assignment) | 할당은 변수에 값을 할당하는 작업을 말합니다. 예를 들어, x = 10;은 변수 x에 값 10을 할당합니다. |
| 참조 (reference) | 참조는 변수나 값이 메모리 상의 위치를 가리키는 것을 의미합니다. 변수가 객체, 배열, 함수 등을 가리킬 때, 해당 변수는 그 값의 메모리 위치를 참조합니다. 참조를 통해 변수는 실제 데이터에 대한 접근을 가능하게 합니다. |
| 참조 에러 (ReferenceError) | 변수가 선언되지 않았거나 스코프 내에서 사용할 수 없는 경우 발생합니다. 이는 변수가 존재하지 않거나 올바르게 참조되지 않은 경우를 나타냅니다. 예를 들어, 정의되지 않은 변수를 사용하려고 할 때 ReferenceError가 발생합니다. |
| Unmanaged Language vs Managed Language | Unmanaged Language는 개발자가 메모리 관리를 수동으로 처리해야 하는 언어를 의미합니다. 예를 들어, C나 C++는 Unmanaged Language입니다. Managed Language는 메모리 관리를 자동으로 처리하는 언어를 의미합니다. 예를 들어, Java나 C#은 Managed Language입니다. |
| 예약어 (reserved word) | 예약어는 프로그래밍 언어에서 특별한 의미를 가지고 있어 변수나 함수 이름으로 사용할 수 없는 단어입니다. 예를 들어, JavaScript에서 if, for, while과 같은 예약어는 특정 문법 규칙과 관련된 용도로 사용됩니다. |
| 네이밍 컨벤션 (naming convention) | 네이밍 컨벤션은 변수, 함수, 클래스 등의 이름을 정하는 규칙입니다. 일반적으로 카멜 케이스(camel case)나 스네이크 케이스(snake case)와 같은 명명 규칙을 따릅니다. 이는 코드의 가독성과 일관성을 유지하기 위한 것입니다. |


<br>

# Reference
- [**Storing the information you need — Variables**](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables)
- [**JavaScript Variables - CodeGuage**](https://www.codeguage.com/courses/js/variables)
- [**Declaring Variables without Var, Let, Const - What Would Happen?**](https://www.youtube.com/watch?v=6UAKBYpUC-Y)
- [**How to declare variables in different ways in JavaScript?**](https://www.geeksforgeeks.org/how-to-declare-variables-in-different-ways-in-javascript/)
- [**JavaScript Variables**](https://javascript.info/variables)
- [**How to declare variables in different ways in JavaScript?**](https://www.geeksforgeeks.org/how-to-declare-variables-in-different-ways-in-javascript/)
- [**Identifier - MDN Web Docs Glossary**](https://developer.mozilla.org/en-US/docs/Glossary/Identifier)
- [**Variable - MDN Web Docs Glossary**](https://developer.mozilla.org/en-US/docs/Glossary/Variable)
- [**const - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [**var - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
- [**let - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [**Variable (computer science) - Wikipedia**](https://en.wikipedia.org/wiki/Variable_(computer_science))
- [**Declarations - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations)
- [**Variables - Airbnb JavaScript Style Guide**](https://github.com/airbnb/javascript#variables)
- [**Identifier - MDN Web Docs Glossary**](https://developer.mozilla.org/en-US/docs/Glossary/Identifier)
- [**Variable scope - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variable_scope)
- [**Destructuring assignment - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [**Scope - MDN Web Docs Glossary**](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
- [**Hoisting - MDN Web Docs Glossary**](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
- [**Global variables - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#global_variables)
- [**Keywords - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#keywords)
- [**Scope - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Glossary/Scope)