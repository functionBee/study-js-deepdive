# 4장. 변수(Variables)

'모던 자바스크립트: 딥다이브'의 4장에서 변수에 대한 내용과 MDN 문서들을 참고하였습니다.
참고한 문서의 링크 정보는 아래에서 확인하실 수 있습니다.

- [4장. 변수(Variables)](#4장-변수variables)
  - [4-1. 변수(Variable)란 무엇인가? 왜 필요한가?](#4-1-변수variable란-무엇인가-왜-필요한가)
  - [4-2. 식별자(JavaScript identifier)](#4-2-식별자javascript-identifier)
  - [4-3. 변수 선언(Variable declaration)](#4-3-변수-선언variable-declaration)
  - [4-4. 변수 선언의 실행 시점과 변수 호이스팅(Variable hoisting)](#4-4-변수-선언의-실행-시점과-변수-호이스팅variable-hoisting)
  - [4-5. 값의 할당(Variable assignment)](#4-5-값의-할당variable-assignment)
  - [4-6. 값의 재할당(Variable re-assignment)](#4-6-값의-재할당variable-re-assignment)
  - [4-7. 식별자 네이밍 규칙(Identifier naming rules)](#4-7-식별자-네이밍-규칙identifier-naming-rules)
  - [좋은 식별자를 위한 스타일 가이드](#좋은-식별자를-위한-스타일-가이드)
- [식별자와 변수의 차이?](#식별자와-변수의-차이)
- [키워드](#키워드)
- [Reference](#reference)
- [추가적으로 알아두면 좋은 내용](#추가적으로-알아두면-좋은-내용)


<br>

## 4-1. 변수(Variable)란 무엇인가? 왜 필요한가?
- <u>변수는 프로그래밍에서 데이터를 저장하고 참조하기 위해 사용되는 이름이 할당된 메모리 공간입니다.</u>
- 변수는 값을 저장하기 위한 메모리 공간을 가리키는 식별자입니다.
- 변수는 데이터를 저장하고 참조하기 위해 사용됩니다.

```jsx
// syntax: 
// keyword variableName = value;
let x = 10;
```

<br>

## 4-2. 식별자(JavaScript identifier)
- <u>식별자는 값 또는 개체를 고유하게 식별하는 데 사용되는 이름</u>입니다.
- 식별자는 변수, 함수, 객체, 클래스 등의 이름을 지정하는 데 사용됩니다.
- **식별자는 값이 아니라 메모리 주소를 참조합니다.**
- 변수나 함수의 이름으로 사용되며, 코드에서 해당 값을 참조하거나 호출할 때 식별자를 사용합니다.

> **참조(reference)**: 프로그래밍에서 한 변수가 다른 변수 또는 객체를 가리키는 것을 의미합니다. 즉, 변수가 메모리상의 다른 변수나 객체를 참조하면, 해당 변수는 참조를 통해 해당 값에 접근하거나 조작할 수 있습니다.
> 일반적으로, 참조는 두 변수가 같은 메모리 위치를 가리키는 것을 의미합니다. 따라서 한 변수를 통해 해당 메모리 위치에 접근하면 다른 변수도 동일한 값을 참조할 수 있습니다.
> 자바스크립트에서는 객체와 배열과 같은 복합적인 데이터 유형이 참조로 처리됩니다. 이는 객체 또는 배열을 변수에 할당할 때, 실제 데이터가 아닌 메모리상의 위치(참조)가 변수에 저장되기 때문입니다.

<br>


## 4-3. 변수 선언(Variable declaration)
- <u>변수 선언이란 변수를 생성하는 것을 의미합니다.</u>
- 변수를 사용하려면 먼저 변수를 선언해야 합니다.
- 변수 선언은 `var`, `let`, `const` 키워드를 사용하여 수행할 수 있습니다.
- 만약 변수를 선언하지 않고 사용하면, `ReferenceError`가 발생합니다.

```jsx
// 변수 선언
let x; 
const y;
var z;

// 변수 선언과 동시에 초기화
let x = 10;
const y = 20;
var z = 30;

// 변수 선언과 초기화를 동시에 수행하지 않으면, 변수는 undefined로 초기화됩니다.
let x;
console.log(x); // undefined

// reference error
console.log(a); // ReferenceError: a is not defined
```

<br>

## 4-4. 변수 선언의 실행 시점과 변수 호이스팅(Variable hoisting)

```jsx
console.log(x); // undefined
var x = 10;
```

- 자바스크립트는 코드를 실행하기 전에 코드를 실행하기 위한 준비 과정을 거칩니다. 이 과정에서 변수 선언은 스코프의 최상단으로 끌어올려지게 됩니다. 이러한 동작을 호이스팅이라고 합니다.
- 호이스팅은 변수 선언과 초기화가 분리되어 있을 때, 변수 선언이 스코프의 최상단으로 끌어올려지는 것을 의미합니다.
- 호이스팅은 변수 선언만 끌어올려지며, 변수의 할당은 끌어올려지지 않습니다.
- 호이스팅은 `var` 키워드로 선언된 변수에만 적용됩니다. `let`과 `const` 키워드로 선언된 변수는 호이스팅이 발생하지 않습니다.

```jsx
// 호이스팅이 발생하지 않는 경우
console.log(x); // ReferenceError: x is not defined
let x = 10;

// 호이스팅이 발생하는 경우
console.log(x); // undefined
var x = 10;
```

- 변수 선언뿐 아니라 `var`, `let`, `const`, `function`, `function*`, `class` 키워드로 선언된 모든 식별자는 호이스팅이 발생합니다. 
  
```jsx
// 변수 선언의 호이스팅
console.log(x); // undefined
var x = 10;

// 함수 선언의 호이스팅
console.log(sum(1, 2)); // 3
function sum(a, b) {
  return a + b;
}

// 함수 표현식의 호이스팅
console.log(sum(1, 2)); // TypeError: sum is not a function
var sum = function (a, b) {
  return a + b;
};

// 클래스 선언의 호이스팅
const circle = new Circle(); // ReferenceError: Cannot access 'Circle' before initialization
class Circle {}

// 클래스 표현식의 호이스팅
const circle = new Circle(); // TypeError: Circle is not a constructor
var Circle = class {};
```

```jsx
// let, const 키워드로 선언된 변수는 호이스팅이 발생하지 않아 초기화 전에 참조할 수 없습니다.
console.log(x); // ReferenceError: x is not defined
let x = 10;
console.log(x); // 10

console.log(y); // ReferenceError: y is not defined
const y = 20;
console.log(y); // 20

// var 키워드로 선언된 변수는 선언 전에 호이스팅이 발생하여 초기화 전에 참조할 수 있습니다.
console.log(x); // undefined
var x = 10;
console.log(x); // 10
```

<br>

## 4-5. 값의 할당(Variable assignment)
- 할당은 변수에 값을 저장하는 것을 의미합니다.
- 변수에 값을 할당할 때는 `=` 연산자를 사용합니다.
- 변수 선언은 소스 코드가 순차적으로 실행되는 런타임 이전에 실행되지만, 변수 할당은 런타임에 실행됩니다.

```jsx
let x; // 변수 선언
x = 10; // 값의 할당
```

- 변수 선언과 값의 할당은 하나의 문(statement)으로 표현할 수 있습니다.

```jsx
let x = 10; // 변수 선언과 값의 할당
```

> **문(Statement)**: 자바스크립트에서 문은 실행 가능한 최소한의 코드 단위를 의미합니다. 문은 여러 개의 토큰으로 구성되며, 토큰은 문법적으로 더 이상 나눌 수 없는 코드의 기본 요소를 의미합니다. 예를 들어, 변수 선언은 `let` 키워드와 변수 이름, `=` 연산자, 값, `;` 세미콜론 등으로 구성됩니다. 이러한 토큰들이 모여 하나의 문을 구성하게 됩니다. 자바스크립트에서 문은 선언문, 할당문, 조건문, 반복문 등으로 구분할 수 있습니다.

```jsx 
let x = 10; // 변수 선언문
x = 20; // 할당문
if (x > 10) {} // 조건문
for (let i = 0; i < 10; i++) {} // 반복문
```


<br>

## 4-6. 값의 재할당(Variable re-assignment)
- 재할당은 변수에 이미 할당된 값을 새로운 값으로 변경하는 것을 의미합니다.
- 변수는 값을 변경할 수 있으며, 다른 값을 할당할 수도 있습니다.
- 상수(constant)는 변하지 않는 값으로, 재할당이 금지된 변수를 의미합니다. 상수는 `const` 키워드로 선언하며, 선언과 동시에 초기화해야 합니다.

```jsx
let x = 10;
x = 20; // 재할당
console.log(x); // 20
```

```jsx
const y = 10;
y = 20; // TypeError: Assignment to constant variable.
console.log(y);
```

```jsx
const z; // SyntaxError: Missing initializer in const declaration
const w = 10; // 상수는 선언과 동시에 초기화해야 합니다.
```

- `const` 키워드는 재할당을 금지하는 것이지, 변수의 값을 변경하는 것을 금지하는 것은 아닙니다. 따라서 `const` 키워드로 선언된 변수가 객체나 배열을 참조하는 경우, 객체나 배열의 내부 속성은 변경할 수 있습니다.

```jsx
const person = { name: "John" };
person.name = "Jane"; // 객체의 속성은 변경할 수 있습니다.
console.log(person); // { name: 'Jane' }
```

```jsx
const numbers = [1, 2, 3, 4, 5];
numbers.push(6); // 배열의 내부 속성은 변경할 수 있습니다.
console.log(numbers); // [1, 2, 3, 4, 5, 6]
```

> 참조 카운트 방식(Reference counting)의 가비지 컬렉션(Garbage collection)은 객체를 참조하는 변수가 없을 때, 해당 객체를 메모리에서 제거하는 방식입니다. 이 방식은 객체를 참조하는 변수가 없을 때, 객체를 메모리에서 제거합니다. 따라서 객체를 참조하는 변수가 없을 때, 객체의 속성을 변경하더라도 메모리에서 제거되지 않습니다. 이는 객체를 참조하는 변수가 없을 때, 객체의 속성을 변경할 수 있음을 의미합니다.

<br>

## 4-7. 식별자 네이밍 규칙(Identifier naming rules)

**식별자 명명(Identifier Naming):**
식별자는 코드의 가독성과 유지 보수성에 중요한 역할을 합니다. 때문에 명확하고 의미 있는 식별자를 사용하여 코드를 작성하는 것이 좋습니다.

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

## 좋은 식별자를 위한 스타일 가이드
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
- [변수 범위(Variable scope)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variable_scope)
- [구조 분해 할당 구문(Destructuring assignment)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)


<br>


# 추가적으로 알아두면 좋은 내용

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
