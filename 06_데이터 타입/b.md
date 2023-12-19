# 6장. 데이터 타입(Data Types)
'모던 자바스크립트 Deep Dive'를 읽고 정리한 내용입니다.

<br>

- [6장. 데이터 타입(Data Types)](#6장-데이터-타입data-types)
  - [6장. 데이터 타입(Data Types)](#6장-데이터-타입data-types-1)
  - [6-1. 숫자타입(Number)](#6-1-숫자타입number)
  - [6-2. 문자열(String)](#6-2-문자열string)
    - [6-2-1. 템플릿 리터럴(Template literals)](#6-2-1-템플릿-리터럴template-literals)
    - [6-2-2. 표현식 삽입(Expression interpolation)](#6-2-2-표현식-삽입expression-interpolation)
  - [6-3. 불리언(Boolean)](#6-3-불리언boolean)
  - [6-4. undefined](#6-4-undefined)
  - [6-5. null](#6-5-null)
  - [6-6. 심벌(Symbol)](#6-6-심벌symbol)
  - [6-7. 객체(Object)](#6-7-객체object)
  - [6-8. 데이터 타입의 필요성](#6-8-데이터-타입의-필요성)
    - [6-8-1. 데이터 타입에 의한 메모리 공간의 확보와 참조](#6-8-1-데이터-타입에-의한-메모리-공간의-확보와-참조)
    - [6-8-2. 데이터 타입에 의한 값의 해석](#6-8-2-데이터-타입에-의한-값의-해석)
  - [6-9. 동적 타입(Dynamic typing)](#6-9-동적-타입dynamic-typing)
  - [요약](#요약)
  - [키워드](#키워드)
  - [Reference](#reference)

<br>

## 6장. 데이터 타입(Data Types)
데이터 타입(Data Types)은 프로그래밍 언어에서 다루는 데이터의 종류를 말합니다.
JavaScript에서는 다양한 데이터 타입을 제공하며, 이러한 데이터 타입은 메모리에 저장되고 참조되는 방식에 따라 크게 원시 값(Primitive values)과 객체(Object)로 나눌 수 있습니다.

- 원시 값(Primitive values): 변경 불가능한 값(immutable value)
- 객체(Object): 변경 가능한 값(mutable value)
- 원시 값과 객체의 가장 큰 차이점은 변경 가능성(mutable/immutable)입니다.
- 원시 값은 값이 변경되면 새로운 값을 가진 새로운 메모리 주소를 가리키고, 객체는 값이 변경되어도 메모리 주소가 변경되지 않습니다.
- 원시 값은 값에 의한 전달(pass by value)이고, 객체는 참조에 의한 전달(pass by reference)입니다.
- 원시 값은 값 자체를 할당하고 복사하며, 객체는 참조 주소를 할당하고 참조를 복사합니다.


<br>

## 6-1. 숫자타입(Number)
숫자 타입은 정수와 부동 소수점 숫자를 나타내는 데 사용됩니다. 숫자 타입은 64비트 형식의 IEEE-754 표준에 따라 배정밀도 2진 부동 소수점 형식으로 저장됩니다.

```jsx
let integer = 10;       // 정수
let double = 10.12;     // 부동 소수점
let negative = -20;     // 음의 정수
```

자바스크립트는 숫자 타입을 나타내는 데에도 다양한 리터럴을 제공합니다. 숫자 리터럴은 10진수, 2진수, 8진수, 16진수를 나타낼 수 있습니다.

```jsx
let integer = 100;      // 10진수
let double = 10.12;     // 10진수
let negative = -20;     // 10진수
let binary = 0b01000001; // 2진수
let octal = 0o101;      // 8진수
let hex = 0x41;         // 16진수
```

자바스크립트 숫자 타입은 정수만을 위한 타입이 없기 때문에 모든 수를 실수로 처리합니다. 따라서 정수로 표시되는 값도 내부적으로는 실수로 처리됩니다.

```jsx
console.log(1 === 1.0); // true
console.log(4 / 2);     // 2
console.log(3 / 2);     // 1.5
```


자바스크립트는 숫자 타입의 값으로 Infinity, -Infinity, NaN을 사용할 수 있습니다. 이 값들은 숫자 타입이지만 실제로는 숫자가 아닌 특수한 값입니다.

- Infinity: 양의 무한대
- -Infinity: 음의 무한대
- NaN: 산술 연산 불가(not-a-number)

```jsx
let positiveInfinity = Infinity;
let negativeInfinity = -Infinity;
let notANumber = NaN;
```

```jsx
console.log(10 / 0);  // Infinity
console.log(10 / -0); // -Infinity
console.log(1 * "String"); // NaN
```

자바스크립트는 또 다른 특별한 숫자 값으로 BigInt를 제공합니다. BigInt는 정수의 안전한 표현을 위해 도입된 새로운 원시 숫자 타입입니다. BigInt는 숫자 뒤에 n을 붙여서 생성합니다.

```jsx
const bigInt = 1234567890123456789012345678901234567890n;
```

추가적으로 자바스크립트는 대소문자를 구별하므로 NaN, NAN, nan은 모두 서로 다른 값입니다.

```jsx
console.log(NaN === NaN); // false
console.log(isNaN(NaN)); // true
console.log(isNaN(10)); // false
console.log(isNaN(1 + undefined)); // true
```

<br>

## 6-2. 문자열(String)
문자열 타입은 텍스트 데이터를 나타내는 데 사용됩니다. 문자열은 작은따옴표('')나 큰따옴표("")로 둘러싸여 있으며, 작은따옴표와 큰따옴표는 구별하지 않습니다.

```jsx
let firstName = "John";
let lastName = 'Smith';
```

자바스크립트에서 문자열은 유사 배열 객체이면서 이터러블 객체입니다. 따라서 배열과 유사하게 인덱스를 사용하여 각 문자에 접근할 수 있습니다.

```jsx
let str = "Hello";

console.log(str[0]); // H
console.log(str[1]); // e
console.log(str[4]); // o
```

> 유사 배열 객체(array-like object)는 length 프로퍼티를 가진 객체를 말합니다. 유사 배열 객체는 배열이 아니므로 배열 메서드를 사용할 수 없습니다.

<br>

### 6-2-1. 템플릿 리터럴(Template literals)
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

> 템플릿 리터럴은 문자열을 생성하는 데 사용되지만, 템플릿 리터럴 자체는 문자열이 아닌 템플릿(Template)입니다. 따라서 템플릿 리터럴은 문자열과 마찬가지로 변수에 할당할 수 있습니다.
> ```jsx
> let template = `Template literal`;
> console.log(typeof template);  // 출력: string
> ```

<br>

> 일반 문자열 내에서 줄바꿈 등의 공백(white space)을 표현하려면 백슬래시(\)로 시작하는 이스케이프 시퀀스(Escape sequence)를 사용해야 합니다.
> 이스케이프 시퀀스는 문자열 내에서 특수 문자를 나타내기 위해 사용되며, 백슬래시(\)로 시작합니다.
> ```jsx
> let message = "This is a \
> long message";
> console.log(message);  // 출력: This is a long message
> ```
> 이스케이프 시퀀스 종류:
> - `\'`: 작은따옴표를 나타냅니다.
> - `\"`: 큰따옴표를 나타냅니다.
> - `\\`: 백슬래시를 나타냅니다.
> - `\n`: 새 줄(줄 바꿈)을 나타냅니다.
> - `\t`: 탭을 나타냅니다.
> - `\u{XXXXXX}`: 유니코드 코드 포인트를 나타냅니다.
> - `\xXX`: 라틴-1 문자의 16진수 코드를 나타냅니다.
> - `\0`: 널(null)을 나타냅니다.
> - `\v`: 수직 탭을 나타냅니다.
> - `\b`: 백스페이스를 나타냅니다.
> - `\r`: 캐리지 리턴을 나타냅니다.
> - `\f`: 폼 피드를 나타냅니다.

<details>
<summary>라인 피드와 캐리지 리턴</summary>

- 라인 피드(Line feed): 줄바꿈을 나타내는 제어 문자로, 줄바꿈을 위해 사용됩니다. 줄바꿈은 커서를 다음 줄로 이동시키는 것을 의미합니다.
- 캐리지 리턴(Carriage return): 줄바꿈을 나타내는 제어 문자로, 줄바꿈을 위해 사용됩니다. 줄바꿈은 커서를 현재 줄의 맨 앞으로 이동시키는 것을 의미합니다.
- 라인 피드와 캐리지 리턴은 줄바꿈을 위해 사용되는 제어 문자입니다. 이 둘은 줄바꿈을 위해 사용되지만, 줄바꿈을 나타내는 방식이 다릅니다.
- 유닉스 계열 운영체제(Linux, macOS 등)에서는 줄바꿈을 나타내기 위해 라인 피드만 사용합니다.
- 윈도우 운영체제에서는 줄바꿈을 나타내기 위해 라인 피드와 캐리지 리턴을 함께 사용합니다.
- 자바스크립트에서는 라인 피드(\n)만 줄바꿈을 나타내는 제어 문자로 사용합니다.
- 자바스크립트에서는 캐리지 리턴(\r)은 줄바꿈을 나타내는 제어 문자로 사용되지 않습니다.
</details>

<br>

### 6-2-2. 표현식 삽입(Expression interpolation)
템플릿 리터럴 내에는 표현식을 삽입할 수 있습니다. ${} 내에 표현식을 넣고 해당 표현식의 결과를 문자열 안에 삽입할 수 있습니다.

```jsx
// 표현식 삽입(ES5: 문자열 연결)
let name = "B";
let greeting = "Hello, " + name + ".";
console.log(greeting);  // 출력: Hello, B.

// 표현식 삽입(템플릿 리터럴 내에 표현식을 삽입)
let a = 5;
let b = 3;
let sum = `The sum of ${a} and ${b} is ${a + b}.`;
console.log(sum);  // 출력: The sum of 5 and 3 is 8.

// 표현식 평가(템플릿 리터럴 내에 표현식을 삽입하면 표현식이 평가되어 문자열이 됨)
let x = 5;
let y = 3;
let equation = `${x} + ${y} = ${x + y}`;
console.log(equation);  // 출력: 5 + 3 = 8
```

표현식 삽입은 템플릿 리터럴 내에 표현식을 삽입해야 하며, 일반 문자열 내에는 표현식 삽입을 문자열로 처리합니다.

```jsx
let x = 1;
let y = 2;
let result = `1 + 2 = ${x + y}`;
console.log(result);  // 출력: 1 + 2 = 3
```

<br>

## 6-3. 불리언(Boolean)
불리언(Boolean)은 논리적 참, 거짓을 나타내는 데 사용됩니다. 불리언 타입은 true와 false 두 가지 값만을 가질 수 있습니다.

```jsx
let logical = true;
let illogical = false;
```

불리언 타입은 주로 조건문, 논리 연산, 제어 흐름 등에서 사용되며, 어떤 조건이 참인지 아닌지를 나타내는 데에 사용됩니다.

```jsx
let age = 25;

if (age > 18) {
  console.log("성인입니다.");  // 출력: 성인입니다.
} else {
  console.log("미성년자입니다.");
}
```

<br>

## 6-4. undefined
undefined 타입은 값이 할당되지 않은 상태를 나타냅니다. 즉, 변수를 선언하고 값을 할당하지 않은 경우를 말합니다.

```jsx
let name;
console.log(name);  // 출력: undefined
```

var 키워드로 선언한 변수는 암묵적으로 undefined 값으로 초기화됩니다. 이는 자바스크립트 엔진이 변수 선언을 소스코드에서 찾아내 변수를 초기화하기 때문입니다.

```jsx
var name;
console.log(name);  // 출력: undefined
```

undefined는 개발자가 의도적으로 할당하기 위한 값이 아닌, 자바스크립트 엔진이 변수를 초기화할 때 사용하는 값입니다. 따라서 개발자가 의도적으로 undefined를 할당하는 것은 바람직하지 않습니다.

```jsx
// 개발자가 의도적으로 undefined를 할당한 경우
let name = undefined;
console.log(name);  // 출력: undefined
```

변수에 값이 없다는 것을 명시적으로 나타내고 싶다면 null을 할당하는 것이 좋습니다.

```jsx
// 개발자가 의도적으로 null을 할당한 경우
let name = null;
console.log(name);  // 출력: null
// null은 개발자가 의도적으로 값이 없음을 나타내는 데 사용됩니다.
```

> ECMAScript 사양에 따르면 undefined는 원시 타입이며, null은 객체 타입입니다. 하지만 typeof 연산자로 null을 연산해보면 "object"가 출력됩니다. 이는 자바스크립트의 설계상 오류로, ECMAScript 사양에는 수정되지 않고 있습니다.
> ```jsx
> console.log(typeof undefined);  // 출력: undefined
> console.log(typeof null);       // 출력: object
> ```
> 따라서 typeof 연산자를 사용하여 변수의 타입을 확인할 때는 null 타입을 제대로 확인할 수 없습니다. 이러한 문제를 해결하기 위해 null 타입을 확인하는 방법이 제안되었지만, 아직까지는 typeof 연산자를 사용하여 null 타입을 확인하는 것이 불가능합니다.

<br>

> ECMAScript 사양에서 변수는 선언(Declaration)한다'라고 표현하고, 함수는 '정의(Definition)한다'라고 표현합니다. 변수는 선언과 동시에 undefined로 초기화되지만, 함수는 정의되기 전까지는 호출할 수 없습니다. 따라서 함수를 호출하기 전에 함수를 정의해야 합니다.


<br>

## 6-5. null
null 타입은 값이 없다는 것을 의도적으로 명시할 때 사용합니다. 즉, 변수를 선언하고 null로 초기화하면 이 변수는 빈 값을 가지게 됩니다.

```jsx
let name = null;
console.log(name);  // 출력: null
```

함수가 유효한 값을 반환할 수 없는 경우, 명시적으로 null을 반환하기도 합니다.

```jsx
function getVowels(str) {
  const m = str.match(/[aeiou]/gi);
  if (m === null) {
    return null;
  }
  return m;
}

console.log(getVowels("sky"));  // 출력: null
console.log(getVowels("earth"));  // 출력: ["e", "a"]
```

<br>

## 6-6. 심벌(Symbol)
심벌(Symbol)은 ES6(ES2015)에서 도입된 7번째 타입으로, 변경 불가능한 원시 타입의 값입니다. 심벌은 주로 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키(property key)를 만들기 위해 사용됩니다.

```jsx
let symbol = Symbol();
console.log(typeof symbol);  // 출력: symbol

let firstName = Symbol("first name");
let person = {};
person[firstName] = "B";
console.log(person[firstName]);  // 출력: B
```

심벌은 유일성(unique)이 보장되는 자료형입니다. 따라서 심벌을 생성할 때마다 새로운 심벌 값이 생성됩니다.

```jsx
let symbol1 = Symbol();
let symbol2 = Symbol();

console.log(symbol1 === symbol2);  // 출력: false
```

심벌은 문자열과 연결된 설명(description)을 제공할 수 있습니다. 이 설명은 디버깅 시 유용하며, Symbol.for() 메서드를 사용하여 심벌을 생성할 때만 사용할 수 있습니다.

```jsx
let symbol = Symbol.for("name");
console.log(Symbol.keyFor(symbol));  // 출력: name
```

<br>

## 6-7. 객체(Object)
객체(Object)는 데이터와 그 데이터에 관련한 동작을 모두 포함할 수 있는 개체(Entity)입니다. 객체는 데이터를 의미하는 프로퍼티(property)와 데이터를 참조하고 조작할 수 있는 동작인 메서드(method)를 포함합니다.

```jsx
let person = {
  name: "B",
  age: 33,
  sayHello: function () {
    console.log("Hello!");
  },
};

console.log(person.name);  // 출력: B
console.log(person.age);   // 출력: 33
person.sayHello();         // 출력: Hello!
```

객체는 중괄호({}) 내에 0개 이상의 프로퍼티를 포함하는 컨테이너(Container)입니다. 프로퍼티는 키(key)와 값(value)으로 구성되며, 키는 프로퍼티에 접근하기 위한 이름으로 사용됩니다. 값은 프로퍼티에 저장된 데이터를 의미합니다.

```jsx
let person = {
  name: "B",
  age: 33,
};
// 프로퍼티 키: name, age
// 프로퍼티 값: "B", 33
```

프로퍼티 키는 프로퍼티 값에 접근하기 위한 식별자로 사용됩니다. 따라서 프로퍼티 키는 식별자 네이밍 규칙을 따라야 합니다. 하지만 자바스크립트에서는 예약어를 프로퍼티 키로 사용할 수 있습니다.

```jsx
let person = {
  name: "B",
  age: 33,
  var: "A",
  const: "B",
  function: "C",
};
console.log(person);  // 출력: {name: "B", age: 33, var: "A", const: "B", function: "C"}
```

프로퍼티 키는 문자열 또는 심벌이어야 합니다. 만약 프로퍼티 키가 문자열이 아닌 경우, 자바스크립트 엔진은 암묵적으로 문자열로 변환합니다.

```jsx
let person = {
  1: "A",
  false: "B",
};

console.log(person);  // 출력: {1: "A", false: "B"}
console.log(person.1);  // Uncaught SyntaxError: Unexpected number
console.log(person.false);  // 출력: B

// 암묵적으로 문자열로 변환
console.log(person["1"]);  // 출력: A
console.log(person["false"]);  // 출력: B
```

<br>

## 6-8. 데이터 타입의 필요성

### 6-8-1. 데이터 타입에 의한 메모리 공간의 확보와 참조
변수는 데이터 타입에 따라 확보해야 할 메모리 공간의 크기가 결정됩니다. 예를 들어, 숫자 타입의 경우 8바이트의 메모리 공간을 확보해야 하고, 문자열 타입의 경우 문자열의 길이에 따라 확보해야 할 메모리 공간의 크기가 결정됩니다.

```jsx
let foo = 123;    // 숫자 타입
foo = "ABC";      // 문자열 타입

// 숫자 타입의 경우 8바이트의 메모리 공간을 확보해야 하고,
// 문자열 타입의 경우 문자열의 길이에 따라 확보해야 할 메모리 공간의 크기가 결정됩니다.
```

### 6-8-2. 데이터 타입에 의한 값의 해석
데이터 타입은 자바스크립트 엔진에게 변수에 할당된 값을 해석하는 방법을 알려줍니다. 예를 들어, 숫자 타입의 경우 2진수로 해석하고, 문자열 타입의 경우 유니코드 코드 포인트의 나열로 해석합니다.

```jsx
let foo = 123;    // 숫자 타입
foo = "ABC";      // 문자열 타입

// 숫자 타입의 경우 2진수로 해석하고,
// 문자열 타입의 경우 유니코드 코드 포인트의 나열로 해석합니다.
```

<br>

## 6-9. 동적 타입(Dynamic typing)
자바스크립트는 동적 타입 언어(Dynamically typed language)입니다. 따라서 변수에 할당된 값에 따라 자동으로 데이터 타입이 결정됩니다.

```jsx
let foo = 123;    // 숫자 타입
foo = "ABC";      // 문자열 타입
foo = true;       // 불리언 타입
foo = null;       // null 타입
foo = Symbol();   // 심벌 타입
foo = {};         // 객체 타입
foo = [];         // 배열 타입
foo = function () {};  // 함수 타입
```

자바스크립트는 동적 타입 언어이므로 변수의 타입을 미리 지정할 필요가 없습니다. 하지만 자바스크립트는 변수의 타입을 미리 지정하지 않는 대신, 실행 시점(runtime)에 변수에 할당된 값에 따라 변수의 타입을 동적으로 결정합니다. 이러한 특징은 자바스크립트의 유연성을 제공하지만, 동시에 예상치 못한 결과를 초래할 수 있습니다.

```jsx
let foo = 123;
foo = "ABC";
console.log(foo * 2);  // 출력: NaN
```

<br>

## 요약
- 자바스크립트는 동적 타입 언어이며, 변수의 타입을 미리 지정할 필요가 없습니다.
- 자바스크립트는 7개의 데이터 타입을 제공합니다.
- 원시 값(Primitive values)은 변경 불가능한 값(immutable value)이며, 원시 값을 변수에 할당하면 변수에는 실제 값이 저장됩니다.
- 객체(Object)는 변경 가능한 값(mutable value)이며, 객체를 변수에 할당하면 변수에는 참조 값이 저장됩니다.


<br>

## 키워드
- 변수: 변수는 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름을 말합니다.
- 기본형: 기본형은 변경 불가능한 값(immutable value)이며, 원시 값(primitive value)이라고도 합니다.
- 참조형: 참조형은 변경 가능한 값(mutable value)이며, 객체(object)라고도 합니다.

<br>

## Reference

- [**JavaScript data types and data structures - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [**Dynamic Programming Language**](https://en.wikipedia.org/wiki/Dynamic_programming_language)
- [**Dynamic type checking and runtime type information**](https://en.wikipedia.org/wiki/Type_system#DYNAMIC)
- [**Strong and weak typing**](https://en.wikipedia.org/wiki/Strong_and_weak_typing)