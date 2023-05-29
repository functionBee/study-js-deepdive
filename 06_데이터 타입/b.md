# 6장. 데이터 타입
JavaScript에는 여러 가지 데이터 유형이 있습니다.

**[목차]**
- **6장. 데이터 타입**
  - [6-1. 원시 값(Primitive values)](#6-1-원시-값primitive-values)
  - [6-2. 원시 값(Primitive values): 숫자(Number)](#6-2-원시-값primitive-values-숫자number)
  - [6-3. 원시 값(Primitive values): 문자열](#6-3-원시-값primitive-values-문자열)
    - [6-3-1. 템플릿 리터럴(Template literals)](#6-3-1-템플릿-리터럴template-literals)
  - [6-4. 원시 값(Primitive values): 불리언](#6-4-원시-값primitive-values-불리언)
  - [6-5. 원시 값(Primitive values): undefined](#6-5-원시-값primitive-values-undefined)
  - [6-6. 원시 값(Primitive values): null](#6-6-원시-값primitive-values-null)
  - [6-7. 원시 값(Primitive values): 심벌(Symbol)](#6-7-원시-값primitive-values-심벌symbol)
  - [6-8. 객체(Object)](#6-8-객체object)
  - [6-9. 동적 타이핑](#6-9-동적-타이핑)
  - [6-10. 데이터 타입의 필요성](#6-10-데이터-타입의-필요성)
  - [요약](#요약)
  - [키워드](#키워드)
  - [Reference](#reference)

## 6-1. 원시 값(Primitive values)
객체를 제외한 모든 타입에서 직접적으로 표현되는 변경 불가능한 값입니다. 이러한 값들은 메모리에 고정되어 있고, 한 번 생성되면 직접적으로 수정할 수 없습니다. 대신, 새로운 값을 할당하거나 새로운 원시 값을 생성해야 합니다.

```jsx
let undefinedValue = undefined;
let nullValue = null;
let booleanValue = true;
let numberValue = 10;
let stringValue = "안녕하세요, 세계!";
let symbolValue = Symbol("고유");

console.log(undefinedValue);  // 출력: undefined
console.log(nullValue);       // 출력: null
console.log(booleanValue);    // 출력: true
console.log(numberValue);     // 출력: 10
console.log(stringValue);     // 출력: 안녕하세요, 세계!
console.log(symbolValue);     // 출력: Symbol(고유)
```
원시 값은 변경 불가능하므로 기존 값에 대한 수정이 아니라 새로운 값으로 대체됩니다. 따라서, 원시 값을 사용하는 경우에는 기존 값을 직접 수정하는 대신 새로운 값을 할당하여 처리해야 합니다. 이러한 원시 값의 불변성(immutable)은 값의 안정성과 예상치 못한 부작용을 방지하는 데 도움이 됩니다.

## 6-2. 원시 값(Primitive values): 숫자(Number)
데이터 타입 숫자(Number)는 정수와 부동 소수점 숫자를 모두 나타낼 수 있습니다. 이 숫자(Number)은 숫자 값을 저장하고 처리하는 데 사용됩니다.

```jsx
let integerNumber = 42;            // 정수
let floatingPointNumber = 3.14;    // 부동 소수점
let scientificNotation = 5e3;      // 지수 표기법 (5 * 10^3 = 5000)
```

- **연산(Arithmetic Operations)**: 숫자 값들 간의 연산자들을 사용하여 값을 계산 할 수 있습니다. 이때 연산자 우선 순위에 따라 연산이 수행되며, 괄호를 사용하여 우선 순위를 지정할 수도 있습니다.
    - 덧셈(`+`), 뺄셈(`-`), 곱셈(`*`), 나눗셈(`/`), 나머지(`%`)
        ```jsx
        // 연산
        let x = 3.14;
        let y = 2;

        let sum = x + y;           // 덧셈: 5.14
        let difference = x - y;    // 뺄셈: 1.14
        let product = x * y;       // 곱셈: 6.28
        let quotient = x / y;      // 나눗셈: 1.57
        let modulo = x % y;        // 나머지: 1.1400000000000001

        console.log(sum, difference, product, quotient, modulo);  // 출력: 5.14 1.14 6.28 1.57, 1.1400000000000001
        ```
    - 증가(`++`), 감소(`--`)
        ```jsx
        let count = 0;
        count++; 
        console.log(count++) // 1 - 숫자를 1씩 증가시킵니다

        let count = 10;
        count--; 
        console.log(count--) // 9 - 숫자를 1씩 감소시킵니다
        ```

- **NaN**: NaN은 숫자로 해석될 수 없거나 정의되지 않은 수학적 연산의 결과로 나타납니다.
    ```jsx
    // 해석할 수 없는 수식
    let result = 0 / 0;     // NaN
    let invalidNumber = parseInt("abc");   // NaN

    // 유효하지 않은 연산
    let invalidOperation = Math.sqrt(-1);   // NaN (음수의 제곱근은 정의되지 않음)

    // NaN과 다른 값의 연산:
    let calculation = NaN + 5;   // NaN
    ```
    NaN을 확인하기 위해 `isNaN()` 함수를 사용할 수 있습니다. 이 함수는 주어진 값이 NaN인지 확인하여 불리언(Boolean) 값을 반환합니다.
    ```jsx
    let result = isNaN(10);       // false (숫자)
    let result2 = isNaN("Hello"); // true (NaN)
    ```
    NaN은 비교 연산자(`==` 또는 `===`)로 다른 값과 비교해도 항상 `false`를 반환합니다. 따라서 NaN을 확인하기 위해서는 isNaN() 함수를 사용하는 것이 좋습니다.

- **Infinity와 -Infinity**: 양의 무한대와 음의 무한대를 나타냅니다.
    ```jsx
    let positiveInfinity = Infinity;
    let negativeInfinity = -Infinity;
    ```

- **Math Object and Functions**: 내장된 숫자 관련 함수(Math 객체)를 사용하여 숫자를 반올림, 절댓값, 제곱근 등 연산을 수행할 수 있습니다.
    ```jsx
    let roundedValue = Math.round(3.7);   // 반올림: 4
    let ceilingNumber = Math.ceil(3.2); // 4
    let floorNumber = Math.floor(3.8); // 3
    let absoluteValue = Math.abs(-10); // 10
    let maxNumber = Math.max(5, 8, 3); // 8
    let minNumber = Math.min(5, 8, 3); // 3
    let randomValue = Math.random(); // 0 이상 1 미만의 난수 (예: 0.123456789)
    let powerValue = Math.pow(2, 3); // 8 (2의 3제곱)
    let squareRoot = Math.sqrt(16); // 4 (16의 제곱근)
    ```
  - `Math.round()`: 숫자를 가장 가까운 정수로 반올림합니다.
  - `Math.ceil()`: 숫자를 올림하여 가장 가까운 큰 정수로 반환합니다.
  - `Math.floor()`: 숫자를 내림하여 가장 가까운 작은 정수로 반환합니다.
  - `Math.abs()`: 숫자의 절댓값을 반환합니다.
  - `Math.max()`: 주어진 숫자 중에서 가장 큰 값을 반환합니다.
  - `Math.min()`: 주어진 숫자 중에서 가장 작은 값을 반환합니다.
  - `Math.random()`: 0 이상 1 미만의 난수를 반환합니다.
  - `Math.pow()`: 숫자의 거듭제곱 값을 계산하여 반환합니다.
  - `Math.sqrt()`: 숫자의 제곱근을 계산하여 반환합니다.

- 타입 변환(Type Conversion)
    ```jsx
    let number = 42;
    let stringNumber = number.toString(); // "42"
    ```
- 비교 연산 Comparisons
    ```jsx
    let a = 5;
    let b = 10;
    let isGreaterThan = a > b; // false
    ```
- 숫자 파싱: Parsing a string to a number
    ````jsx
    let numberString = "42";
    let parsedNumber = parseInt(numberString); // 42
    ````

## 6-3. 원시 값(Primitive values): 문자열 
데이터 유형 중 문자열(String)은 텍스트 데이터를 나타내는 데 사용됩니다. 문자열은 작은따옴표('')나 큰따옴표("")로 둘러싸여 있으며, 작은따옴표와 큰따옴표는 구별하지 않습니다.
```jsx
let name = 'John';      // 작은따옴표로 둘러싸인 문자열
let message = "Hello";  // 큰따옴표로 둘러싸인 문자열
```
JavaScript에서 문자열(String) 데이터는 변수를 선언하고 문자열 값을 할당함으로써 생성됩니다. 이 때 문자열은 JavaScript에서 객체(Object)로 취급되며, 문자열 객체의 메서드와 속성을 사용하여 문자열을 조작할 수 있습니다.
```jsx
// 문자열을 할당하는 방법
let name = "John"; // 문자열 값을 변수 name에 할당
```
문자열을 조작하거나 접근하기 위해 JavaScript는 문자열 객체의 메서드를 제공합니다. 이러한 메서드는 문자열을 변경하거나 정보를 추출하는 데 사용됩니다.

```jsx
let greeting = "Hello, World!";
console.log(greeting.length);         // 출력: 13
console.log(greeting.toUpperCase());  // 출력: HELLO, WORLD!
console.log(greeting.charAt(0));       // 출력: H
console.log(greeting.substring(7, 12)); // 출력:
```

- `length`: 문자열의 길이를 반환합니다.
- `toUpperCase()`: 문자열을 대문자로 변환합니다.
- `toLowerCase()`: 문자열을 소문자로 변환합니다.
- `charAt()`: 주어진 인덱스에 해당하는 문자를 반환합니다.
- `substring()`: 지정된 범위에 해당하는 부분 문자열을 반환합니다.
- `indexOf()`: 특정 문자열이 처음으로 등장하는 인덱스를 반환합니다.
- `concat()`: 문자열을 연결하여 새로운 문자열을 반환합니다.

이 외에도 문자열 객체는 다양한 메서드와 속성을 제공합니다. 문자열 객체의 메서드와 속성을 사용하여 문자열을 조작하고 원하는 형식으로 변경할 수 있습니다.

```jsx
let message = 'He said, "Hello!"';  // 큰따옴표를 문자열에 포함
let path = "C:\\Programs\\File.txt";  // 백슬래시를 문자열에 포함
let multiLine = "Line 1\nLine 2\nLine 3";  // 여러 줄을 포함한 문자열
```
- `\'`: 작은따옴표를 나타냅니다.
- `\"`: 큰따옴표를 나타냅니다.
- `\\`: 백슬래시를 나타냅니다.
- `\n`: 새 줄(줄 바꿈)을 나타냅니다.
- `\t`: 탭을 나타냅니다.

문자열 데이터는 다양한 문자를 포함할 수 있으며, 이스케이프 시퀀스를 사용하여 특수 문자를 나타낼 수도 있습니다.

### 6-3-1. 템플릿 리터럴(Template literals)

템플릿 리터럴은 ES6(ES2015)부터 도입된 기능으로, JavaScript의 문자열(String) 데이터 유형을 생성하고 조작하는 데 사용되는 특수한 문자열 형식입니다. 템플릿 리터럴은 역따옴표(backtick) ` (grave accent)로 둘러싸여 있습니다.

1. **변수 보간(Variable interpolation)**: ${} 문법을 사용하여 변수의 값을 문자열 안에 삽입할 수 있습니다.
   ```jsx
    let name = "B";
    let age = 333;
    let message = `My name is ${name} and I am ${age} years old.`;
    console.log(message);  // 출력: My name is B and I am 333 years old.
   ```
2. **표현식 삽입(Expression interpolation)**: ${} 내에 표현식을 넣고 해당 표현식의 결과를 문자열 안에 삽입할 수 있습니다.
   ```jsx
    let a = 5;
    let b = 3;
    let sum = `The sum of ${a} and ${b} is ${a + b}.`;
    console.log(sum);  // 출력: The sum of 5 and 3 is 8.
   ```
3. **여러 줄 문자열(Multi-line strings)**: 템플릿 리터럴은 여러 줄에 걸친 문자열을 간편하게 표현할 수 있습니다. 따옴표나 특수 문자(줄바꿈 등)를 사용하지 않고 여러 줄의 텍스트를 그대로 작성할 수 있습니다.
   ```jsx
    let multiline = `
    This is a
    multi-line
    string.
    `;
    console.log(multiline);
    /* 출력:
    This is a
    multi-line
    string.
    */
   ```
4. **표현식 평가(Expression evaluation)**: ${} 내에 표현식을 넣어 해당 표현식을 평가하고 문자열 안에 결과를 삽입할 수 있습니다.
   ```jsx
    let x = 5;
    let y = 3;
    let equation = `${x} + ${y} = ${x + y}`;
    console.log(equation);  // 출력: 5 + 3 = 8
   ```

## 6-4. 원시 값(Primitive values): 불리언
데이터 유형중 불리언(Boolean)은 JavaScript에서 `true`와 `false` 두 가지 값만을 가질 수 있는 데이터 유형입니다.
```jsx
let isTrue = true;   // true 값을 가지는 변수 isTrue 선언
let isFalse = false; // false 값을 가지는 변수 isFalse 선언
```
불리언은 주로 조건문, 논리 연산, 제어 흐름 등에서 사용되며, 어떤 조건이 참인지 아닌지를 나타내는 데에 사용됩니다.
```jsx
let age = 25;

if (age > 18) {
  console.log("성인입니다.");  // 출력: 성인입니다.
} else {
  console.log("미성년자입니다.");
}
```
불리언 데이터는 논리 연산자와 함께 사용되어 복잡한 조건식을 구성하는 데에도 활용됩니다. 
```jsx
let hasPermission = true;
let isAuthenticated = false;

if (hasPermission && isAuthenticated) {
  console.log("접근이 허용되었습니다.");
} else {
  console.log("접근이 거부되었습니다.");  // 출력: 접근이 거부되었습니다.
}
```
- 논리 연산자
  - `&&`(논리곱): 양쪽의 피연산자가 모두 true일 때 true를 반환합니다.
  - `||`(논리합): 양쪽의 피연산자 중 하나라도 true이면 true를 반환합니다.
  - `!`(논리 부정): 피연산자의 불리언 값을 반전시킵니다.

## 6-5. 원시 값(Primitive values): undefined
`undefined`는 변수가 선언되었지만 값이 할당되지 않은 상태를 나타냅니다.
```jsx
let name;
console.log(name);  // 출력: undefined
```
JavaScript에서는 변수를 선언 후 변수 값이 초기화되기 전 `undefined` 값을 할당합니다. 이는 변수가 존재하지만 아직 어떤 값도 가지고 있지 않음을 의미합니다.
```jsx
function multiply(a, b) {
  let result = a * b;
  // 반환문이 없으므로 암묵적으로 undefined를 반환한다.
}

let product = multiply(5, 3);
console.log(product);  // 출력: undefined
```
함수에서 명시적으로 반환값을 설정하지 않으면 해당 함수는 `undefined`를 반환합니다.

## 6-6. 원시 값(Primitive values): null
`null`은 변수에 의도적으로 "아무 값도 없음"을 나타내기 위해 할당되는 값입니다. null은 "비어 있음"을 나타내며, 변수가 null 값을 가질 때는 아무런 객체나 값도 참조하지 않음을 나타냅니다.
```jsx
let person = null;
console.log(person);  // 출력: null

let element = document.getElementById("myElement");
// ...

// element가 더 이상 유효하지 않을 때
element = null;
```
`null`은 변수에 명시적으로 할당해야 하며, 자바스크립트는 `null`을 값으로 가지는 변수에 대해 특별한 의미를 부여하지 않습니다. `null`은 `typeof` 연산자를 사용하면 "object"로 분류되기 때문에 주의해야 합니다.

## 6-7. 원시 값(Primitive values): 심벌(Symbol)
심벌(Symbol)은 유일하고 변경 불가능한 값입니다. 심벌은 고유한 식별자(identifier)를 생성하기 위해 사용되며, 주로 객체의 속성 이름으로 사용될 때 충돌을 피하기 위해 활용됩니다.
```jsx
let symbol = Symbol();
console.log(typeof symbol);  // 출력: symbol
```
심벌(Symbol)은 `Symbol()` 생성자 함수를 사용하여 생성합니다.
```jsx
const RED = Symbol();
const GREEN = Symbol();
const BLUE = Symbol();

let color = RED;
if (color === RED) {
  console.log("The color is red.");
}
```
심벌을 사용하여 상수를 정의할 수 있습니다. 심벌은 유일하고 변경할 수 없는 값을 가지므로, 상수의 값이 실수로 변경되는 것을 방지할 수 있습니다.
```jsx
const Direction = {
  UP: Symbol("UP"),
  DOWN: Symbol("DOWN"),
  LEFT: Symbol("LEFT"),
  RIGHT: Symbol("RIGHT")
};

let move = Direction.RIGHT;
if (move === Direction.RIGHT) {
  console.log("Move to the right.");
}
```
심벌을 사용하여 열거형을 정의할 수 있습니다. 열거형은 연관된 상수 값들의 집합을 나타내는 데 사용되며, 각각의 심벌은 고유한 값을 가지므로 상수 간의 충돌을 방지할 수 있습니다.
```jsx
const PRIVATE_KEY = Symbol("private");

let obj = {
  [PRIVATE_KEY]: "secret value"
};

console.log(obj[PRIVATE_KEY]);  // 출력: secret value
```
심벌은 객체의 속성 식별자로 사용될 때 유용합니다. 심벌을 객체 속성으로 사용하면 다른 속성과 충돌하지 않고 고유한 키를 가질 수 있습니다. 심벌은 다른 데이터 유형과 달리 암묵적으로 문자열로 변환되지 않습니다. 

## 6-8. 객체(Object)
객체는 프로퍼티(Property)와 메서드(Method)로 구성되어 있으며, 프로퍼티는 이름(key)과 값(value)으로 구성되어 해당 객체의 상태를 나타내고, 메서드는 함수로서 객체의 동작을 정의합니다.
```jsx
let person = {
  name: "John",
  age: 30,
  greet: function() {
    console.log("Hello!");
  }
};
```
객체는 중괄호({})를 사용하여 생성하며, 프로퍼티와 메서드는 객체 내에서 쉼표로 구분됩니다. 각 프로퍼티는 이름과 값을 가지며, 이름은 문자열이나 심벌(Symbol)로 작성됩니다.
```jsx
console.log(person.name);  // 출력: John
console.log(person["age"]);  // 출력: 30
person.greet();  // 출력: Hello!
```
객체의 프로퍼티와 메서드는 점 표기법(dot notation)이나 대괄호 표기법(bracket notation)을 사용하여 접근할 수 있습니다.
```jsx
person.job = "Developer";  // 프로퍼티 추가
person.age = 35;  // 프로퍼티 수정
delete person.name;  // 프로퍼티 삭제
```
객체는 동적으로 프로퍼티를 추가, 수정, 삭제할 수 있습니다.
객체는 다른 객체를 포함하거나 객체 간의 상속과 관련된 개념도 포함하고 있어서 객체지향 프로그래밍(Object-Oriented Programming)의 기반이 됩니다.

## 6-9. 동적 타이핑
동적 타이핑은 변수의 데이터 유형을 선언 시점이 아닌 실행 시점에 결정하는 방식을 의미합니다.
JavaScript는 동적 타이핑을 가지므로 변수를 선언할 때 명시적으로 데이터 유형을 지정하지 않아도 됩니다. 대신, 변수에 할당되는 값의 데이터 유형에 따라 변수의 데이터 유형이 동적으로 결정됩니다.
```jsx
let name = "John";  // 문자열을 할당하여 name 변수의 데이터 유형은 자동으로 문자열로 결정됨
let age = 25;      // 숫자를 할당하여 age 변수의 데이터 유형은 자동으로 숫자로 결정됨

name = 42;   // 변수 name에 숫자를 다시 할당하여 데이터 유형이 동적으로 변경됨
age = "Jane"; // 변수 age에 문자열을 다시 할당하여 데이터 유형이 동적으로 변경됨
```
동적 타이핑은 유연성을 제공하며, 변수의 데이터 유형을 자유롭게 변경할 수 있다는 장점이 있습니다. 이는 동일한 변수가 다양한 데이터 유형의 값을 가질 수 있다는 의미이기도 합니다. 하지만 데이터 유형이 동적으로 결정되므로 잘못된 데이터 유형이 할당될 경우 예기치 않은 동작이 발생할 수 있습니다. 따라서 변수의 데이터 유형을 항상 주의하여 관리해야 합니다.

## 6-10. 데이터 타입의 필요성
데이터 타입은 프로그래밍 언어에서 필수적인 요소로서, 데이터를 구분하고 처리하는 데 필요합니다. 데이터 타입은 데이터의 특성과 목적에 따라 값을 해석하고 다룰 수 있는 규칙을 제공합니다. 

1. **메모리 할당과 최적화**: 데이터 타입은 변수나 상수가 메모리에서 차지하는 공간을 결정합니다. 각 데이터 타입은 일정한 크기를 가지며, 이를 기반으로 메모리 할당과 최적화가 이루어집니다. 적절한 데이터 타입을 선택하여 메모리 사용을 최적화할 수 있습니다.

2. **데이터 유효성과 일관성**: 데이터 타입은 데이터가 특정 범위나 규칙을 따르도록 강제할 수 있습니다. 예를 들어, 숫자 데이터 타입은 정수인지 또는 부동 소수점인지를 정의하여 숫자의 유효성을 보장할 수 있습니다. 데이터 유효성을 검사하고 유지함으로써 프로그램의 정확성과 일관성을 유지할 수 있습니다.

3. **연산과 동작의 결정**: 데이터 타입은 연산자와 함수의 동작을 결정합니다. 예를 들어, 숫자 데이터 타입에서는 숫자 간의 산술 연산을 수행할 수 있고, 문자열 데이터 타입에서는 문자열 연결과 같은 문자열 관련 연산을 수행할 수 있습니다. 올바른 데이터 타입을 사용하여 원하는 동작을 수행할 수 있습니다.

4. **오류 감지와 디버깅**: 데이터 타입은 프로그램에서 발생하는 오류를 감지하고 디버깅하는 데 도움을 줍니다. 예를 들어, 데이터 타입을 명시적으로 선언하고 부적절한 데이터 유형의 할당을 방지함으로써 오류를 사전에 방지할 수 있습니다. 데이터 타입의 일관성을 유지함으로써 예기치 않은 동작이나 버그를 방지할 수 있습니다.
  
## 요약 
- 원시값(Primitive Values):
  - 원시값은 변경 불가능(immutable)한 값입니다. 이는 원시값을 직접 수정할 수 없고, 새로운 값을 할당할 때마다 새로운 원시값이 생성된다는 의미입니다.
  - 원시값은 값 자체를 나타내며, 메서드나 속성을 가지지 않습니다. 따라서 원시값을 조작하거나 다룰 때는 해당 원시값을 변수에 할당하거나 직접 값을 사용합니다.
  - JavaScript에서 제공하는 원시값에는 숫자(Number), 문자열(String), 불리언(Boolean), null, undefined, 심벌(Symbol)이 있습니다.
    - **숫자(Number)**: 정수 또는 부동 소수점 숫자를 나타냅니다. JavaScript는 숫자를 표현하고 계산하기 위해 [IEEE 754 표준](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_encoding)을 사용합니다.
    - **문자열(String)**: 작은따옴표('') 또는 큰따옴표("")로 둘러싸인 문자의 시퀀스를 나타냅니다.
    - **불리언(Boolean)**: 참(True) 또는 거짓(False) 값을 나타냅니다.
    - **null**: 값이 없음을 나타냅니다. 종종 변수가 값을 가지지 않거나 객체 참조가 일부러 비어있음을 명시적으로 표시하는 데 사용됩니다.
    - **undefined**: 값이 할당되지 않음을 나타냅니다. 변수가 선언되었지만 값을 할당받지 않은 경우, 자동으로 undefined로 할당됩니다.
    - **심볼(Symbol)**: ECMAScript 2015 (ES6)에서 도입된 심볼은 고유하고 변경할 수 없는 데이터 유형입니다.
      ```jsx
      let undefinedValue = undefined;
      let nullValue = null;
      let booleanValue = true;
      let numberValue = 10;
      let stringValue = "안녕하세요, 세계!";
      let symbolValue = Symbol("고유");

      console.log(undefinedValue);  // 출력: undefined
      console.log(nullValue);       // 출력: null
      console.log(booleanValue);    // 출력: true
      console.log(numberValue);     // 출력: 10
      console.log(stringValue);     // 출력: 안녕하세요, 세계!
      console.log(symbolValue);     // 출력: Symbol(고유)
      ```
- 객체(Object):
  - 객체는 변경 가능(mutable)한 값입니다. 이는 객체의 속성을 변경하거나 메서드를 호출하여 객체를 수정할 수 있다는 의미입니다.
  - JavaScript에서 객체는 중괄호({})로 정의되며, 속성과 해당 속성에 대한 값으로 구성됩니다.
  - 객체는 여러 속성과 메서드를 가질 수 있으며, 속성은 이름과 값의 쌍으로 구성됩니다.
  객체는 참조(reference)에 의해 전달되며, 변수에 할당될 때는 실제 객체의 메모리 주소가 할당됩니다.

## 키워드
## Reference
