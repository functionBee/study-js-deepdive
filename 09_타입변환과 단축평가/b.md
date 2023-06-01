# 9장. 타입변환


**[목차]**
- **9장. 타입변환**
  - [9-1. 타입변환](#9-1-타입변환)
  - [9-2. 암묵적 타입변환](#9-2-암묵적-타입변환)
  - [9-3. 명시적 타입변환](#9-3-명시적-타입변환)
  - [9-4. 단축평가](#9-4-단축평가)
  - [9-5. 요약](#9-5-요약)
  - [9-6. 키워드](#9-6-키워드)
  - [9-7. Reference](#9-7-reference)

## 9-1. 타입변환
타입 변환(Type Conversion)은 JavaScript에서 값을 한 데이터 타입에서 다른 데이터 타입으로 변환하는 과정을 의미합니다. 

<br>


## 9-2. 암묵적 타입 변환(Implicit Type Conversion) 
JavaScript에서 암묵적 타입 변환(Implicit Type Conversion) 또는 타입 강제 변환(Type Coercion)은   연산이나 비교가 수행될 때 JavaScript 엔진에 의해 자동으로 수행됩니다.

### 9-2.1. **산술 연산자(Arithmetic Operators)** 
다른 데이터 타입의 피연산자가 사용될 때 암묵적 타입 변환이 발생합니다.
```jsx
var num = 10;
var str = "숫자는: " + num; // `num`을 암묵적으로 문자열로 변환합니다.
console.log(str); // 출력: "숫자는: 10"
```
### 9-2.2. **논리 연산자(Logical Operators)**
논리 연산자(`&&`, `||`)는 주어진 값이 불리언이 아닌 경우 암묵적 타입 변환을 수행합니다.
```jsx
var num = 10;
var result = num && true; // `num`이 불리언으로 암묵적 타입 변환됩니다.
console.log(result); // 출력: true
```

### 9-2.3. **비교 연산자(Comparison Operators)**
다른 데이터 타입의 값 간의 비교 시 암묵적 타입 변환이 발생합니다.
```jsx
var num = 10;
var str = "5";
var result = num > str; // `str`이 숫자로 암묵적 타입 변환됩니다.
console.log(result); // 출력: true
```

<br>


## 9-3. 명시적 타입 변환(Explicit Type Conversion)
JavaScript에서 값을 의도적으로 한 데이터 타입에서 다른 데이터 타입으로 변환하는 것을 말합니다. 

### 9-3-1. **문자열 변환**
- `String(value)`: `String()` 함수는 값을 문자열 데이터 타입으로 명시적으로 변환합니다. 숫자, 부울, 객체, 배열 등 어떤 값이든 문자열로 변환할 수 있습니다.
  ```jsx
  var num = 10;
  var str = String(num); // `num`을 문자열로 명시적으로 변환
  console.log(typeof str); // 출력: "string"
  ```

### 9-3-2. **숫자 변환**
- `Number(value)`: `Number()` 함수는 값을 숫자 데이터 타입으로 명시적으로 변환합니다. 주어진 값을 숫자로 변환하려고 시도합니다.
  ```jsx
  var num = 10;
  var str = String(num); // `num`을 문자열로 명시적으로 변환
  console.log(typeof str); // 출력: "string"
  ```

- `parseInt(string, radix)`: `parseInt()` 함수는 문자열 인자를 구문 분석하고 정수를 반환합니다. 선택적인 radix 매개변수는 문자열에서 숫자의 기본을 지정합니다.
  ```jsx
  var str = "10";
  var num = parseInt(str); // `str`을 정수로 명시적으로 변환
  console.log(typeof num); // 출력: "number"
  ```

- `parseFloat(string)`: `parseFloat()` 함수는 문자열 인자를 구문 분석하고 부동 소수점 숫자를 반환합니다.
  ```jsx
  var str = "3.14";
  var num = parseFloat(str); // `str`을 부동 소수점 숫자로 명시적으로 변환
  console.log(typeof num); // 출력: "number"
  ```
### 9-3-3. **boolean 변환**

- `Boolean(value)`: `Boolean()` 함수는 값을 부울 데이터 타입으로 명시적으로 변환합니다. 주어진 값을 true 또는 false로 변환합니다.
```jsx
var num = 0;
var bool = Boolean(num); // `num`을 부울로 명시적으로 변환
console.log(typeof bool); // 출력: "boolean"
```

<br>

## 9-4. 단축평가(Short-circuit Evaluation)
 논리 연산자를 사용하여 표현식을 평가할 때, 평가 중인 표현식의 결과에 따라 평가를 끝내고 결과를 결정하는 동작을 말합니다. 

## 9-4-1.**논리곱(&&)의 단축평가**
논리곱 연산자 &&는 왼쪽 피연산자와 오른쪽 피연산자를 평가하고, 다음과 같은 규칙에 따라 동작합니다.
```jsx
var a = 10;
var b = 5;
var result = a > 0 && b > 0; // a와 b가 모두 양수인지 확인합니다.

console.log(result); // 출력: true
```
- 왼쪽 피연산자가 false로 평가되면, 전체 표현식은 왼쪽 피연산자가 되며 오른쪽 피연산자는 평가하지 않습니다.
- 왼쪽 피연산자가 true로 평가되면, 전체 표현식의 결과는 오른쪽 피연산자의 평가 결과가 됩니다.
이러한 동작은 조건문에서 특정 조건이 충족될 때만 다음 동작을 수행하도록 할 때 유용하게 사용될 수 있습니다.

## 9-4-2.**논리합(||)의 단축평가**
논리합 연산자 `||`는 왼쪽 피연산자와 오른쪽 피연산자를 평가하고, 다음과 같은 규칙에 따라 동작합니다.

```jsx
var a = null;
var b = 5;
var result = a || b; // a가 falsy 값이므로 b의 값을 선택합니다.

console.log(result); // 출력: 5
```
- 왼쪽 피연산자가 true로 평가되면, 전체 표현식은 왼쪽 피연산자가 되며 오른쪽 피연산자는 평가하지 않습니다.
- 왼쪽 피연산자가 false로 평가되면, 전체 표현식의 결과는 오른쪽 피연산자의 평가 결과가 됩니다.

<br>

## 9-6. 옵셔널 체이닝 연산자(optional chaining): `?.`
옵셔널 체이닝 연산자(Optional Chaining Operator)는 JavaScript에서 도입된 연산자로, 객체 체인 중에 존재하지 않는 중첩된 속성에 안전하게 접근하기 위해 사용됩니다. 옵셔널 체이닝 연산자는 `?.`으로 표현되며, 객체의 속성이나 메서드에 접근할 때 사용됩니다.

옵셔널 체이닝 연산자를 사용하면, 체인 중간에 `null` 또는 `undefined`인 속성이 있더라도 에러가 발생하지 않고 코드 실행을 계속할 수 있습니다. 연산자의 왼쪽 피연산자가 `null` 또는 `undefined`인 경우, `undefined`를 반환하며 오른쪽 피연산자를 평가하지 않습니다.

```jsx
var user = {
  name: "John",
  address: {
    street: "123 Main St",
    city: "London"
  }
};

var street = user?.address?.street;
console.log(street); // 출력: "123 Main St"

var country = user?.address?.country;
console.log(country); // 출력: undefined
// user 객체의 address 속성이 null 또는 undefined인 경우, undefined가 반환됩니다.
```
옵셔널 체이닝 연산자는 속성 접근뿐만 아니라 함수 호출에서도 사용할 수 있습니다.

```jsx
var user = {
  name: "John",
  getAddress: function() {
    return {
      street: "123 Main St",
      city: "London"
    };
  }
};

var street = user?.getAddress?.()?.street;
console.log(street); // 출력: "123 Main St"
//  옵셔널 체이닝 연산자를 사용하여 user?.getAddress?.()?.street와 같이 함수 호출을 안전하게 체이닝할 수 있습니다. 이때 함수가 없거나 null 또는 undefined인 경우, undefined가 반환됩니다.
```

<br>

## 9-7. null 병합(Nullish coalescing) 연산자: `??`
`null` 또는 `undefined`일 때만 대체 값을 반환하는 역할을 합니다. 이 연산자는 왼쪽 피연산자가 `null` 또는 `undefined`인 경우에만 오른쪽 피연산자를 반환하고, 그렇지 않은 경우에는 왼쪽 피연산자를 반환합니다.

```jsx
var name = null;
var defaultName = "John";

var result = name ?? defaultName;
console.log(result); // 출력: "John"
```

## 9-5. 요약

<br>

## 9-6. 키워드

<br>

## 9-7. Reference