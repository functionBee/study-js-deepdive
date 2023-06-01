# 8장. 제어문

**[목차]**
- **8장. 제어문**
  - [8-1. 블록문](#8-1-블록문)
  - [8-2. 조건문](#8-2-조건문)
    - [8-2-1. **`if..else` Statement**](#8-2-1-ifelse-statement)
    - [8-2-2. **`switch` Statement**](#8-2-2-switch-statement)
  - [8-3. 반복문](#8-3-반복문)
  - [8-4. break 문](#8-4-break-문)
  - [8-5. continue 문](#8-5-continue-문)
  - [8-6.](#8-6)
  - [키워드](#키워드)
  - [Reference](#reference)


## 8-1. 블록문
가장 기본적인 문(basic statement)으로 0개 이상의 문을 그룹화하는 데 사용됩니다. 블록은 한 쌍의 중괄호(`{}`)로 구분됩니다.
```jsx
// syntax
{
  statement1;
  statement2;
  // …
  statementN;
}
```
블록 문장은 일반적으로 제어 흐름 문(Control flow statement; `if`, `for`, `while`)과 함께 사용됩니다.
```jsx
while (x < 10) {
  x++;
}
```

<br>

## 8-2. 조건문
조건문은 지정된 조건이 참인 경우에만 실행되는 문입니다.

### 8-2-1. **`if..else` Statement**
JavaScript에서는 `if` 문을 사용하여 조건부 분기를 수행할 수 있습니다.
`if` 문은 지정된 조건이 `true`로 평가될 경우에만 코드 블록을 실행할 수 있게 해줍니다.
```jsx
if (조건) {
  // 조건이 true일 때 실행되는 코드
}
```

```jsx
var num = 10;

// 변수 num이 0보다 큰 경우, 중괄호 내에 있는 코드 블록이 실행
if (num > 0) {
  console.log("숫자는 양수입니다."); // 출력: 
}
```
조건이 `false`로 평가될 경우 실행할 코드 블록을 지정하기 위해 `else` 문을 사용할 수도 있습니다.
```jsx
if (조건) {
  // 조건이 true일 때 실행되는 코드
} else {
  // 조건이 false일 때 실행되는 코드
}
```

```jsx
var num = -5;

// 변수 num이 0보다 크면 첫 번째 코드 블록이 실행
// 그렇지 않으면 "else" 문 내에 있는 코드 블록이 실행
if (num > 0) {
  console.log("숫자는 양수입니다.");
} else {
  console.log("숫자는 양수가 아닙니다.");
}
```
또한, `else if` 문을 사용하여 여러 조건을 연결할 수도 있습니다.
```jsx
if (조건1) {
  // 조건1이 true일 때 실행되는 코드
} else if (조건2) {
  // 조건2가 true일 때 실행되는 코드
} else {
  // 모든 조건이 false일 때 실행되는 코드
}
```
```jsx
var num = 0;

// num이 0보다 크면 첫 번째 코드 블록이 실행
// num이 0보다 작으면 두 번째 코드 블록이 실행
// 그 외의 경우에는 "else" 문 내에 있는 코드 블록이 실행
if (num > 0) {
  console.log("숫자는 양수입니다.");
} else if (num < 0) {
  console.log("숫자는 음수입니다.");
} else {
  console.log("숫자는 0입니다.");
}
```
조건 내에서 `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=` 등의 비교 연산자를 사용하여 값을 비교하거나 `&&` (AND), `||` (OR), `!`(NOT)와 같은 논리 연산자를 사용하여 조건을 결합할 수 있습니다.
```jsx
var age = 25;
var income = 50000;

if (age >= 18 && income > 30000) {
  console.log("성인이며 수입이 많습니다.");
}

if (age < 18 || income < 30000) {
  console.log("미성년자이거나 수입이 적습니다.");
}

if (!(age >= 60)) {
  console.log("나이가 60세 이상이 아닙니다.");
}
```
**연산자**
  - 비교 연산자:
    - `==` : 등호 연산자는 두 값이 동등한지 확인합니다. 데이터 형식이 다를 경우 형 변환을 수행하고 비교합니다.
    - `===` : 일치 연산자는 두 값이 동등하고 데이터 형식도 같은지 확인합니다.
    - `!=` : 부등호 연산자는 두 값이 다른지 확인합니다.
    - `!==` : 불일치 연산자는 두 값이 다르거나 데이터 형식이 다른지 확인합니다.
    - `>` : 크다 연산자는 왼쪽 값이 오른쪽 값보다 큰지 확인합니다.
    - `<` : 작다 연산자는 왼쪽 값이 오른쪽 값보다 작은지 확인합니다.
    - `>=` : 크거나 같다 연산자는 왼쪽 값이 오른쪽 값보다 크거나 같은지 확인합니다.
    - `<=` : 작거나 같다 연산자는 왼쪽 값이 오른쪽 값보다 작거나 같은지 확인합니다.
  - 논리 연산자:
    - `&&` : 논리 AND 연산자는 두 조건이 모두 true인 경우에만 true를 반환합니다.
    - `||` : 논리 OR 연산자는 두 조건 중 하나라도 true인 경우 true를 반환합니다.
    - `!` : 논리 NOT 연산자는 조건의 반대 값을 반환합니다. true는 false로, false는 true로 변환됩니다.

### 8-2-2. **`switch` Statement**
JavaScript에서는 `switch` 문을 사용하여 다양한 경우(case)에 따라 코드의 실행을 분기할 수 있습니다. `switch` 문은 하나의 표현식을 평가하고 그 결과에 따라 여러 가지 경우를 비교합니다. 해당하는 경우에 따라 실행할 코드 블록을 선택할 수 있습니다.
```jsx
switch (표현식) {
  case 값1:
    // 표현식이 값1과 일치하는 경우 실행되는 코드
    break;
  case 값2:
    // 표현식이 값2와 일치하는 경우 실행되는 코드
    break;
  case 값3:
    // 표현식이 값3과 일치하는 경우 실행되는 코드
    break;
  default:
    // 표현식이 어떤 case와도 일치하지 않는 경우 실행되는 코드
}
```
`switch` 문은 표현식을 평가하고, 그 결과와 각 `case`의 값을 비교합니다. 일치하는 경우 해당 `case`에 정의된 코드 블록이 실행되며, `break` 문을 사용하여 다음 `case`로 이동하거나 `switch` 문을 종료합니다. 만약 일치하는 `case`를 찾지 못하면 `default case`의 코드 블록이 실행됩니다.
```jsx
var day = 4;
var dayName;

switch (day) {
  case 1:
    dayName = "월요일";
    break;
  case 2:
    dayName = "화요일";
    break;
  case 3:
    dayName = "수요일";
    break;
  case 4:
    dayName = "목요일";
    break;
  case 5:
    dayName = "금요일";
    break;
  default:
    dayName = "주말";
}

console.log("오늘은 " + dayName + "입니다.");
```

<br>

## 8-3. 반복문
JavaScript에서는 반복적으로 코드 블록을 실행하기 위해 다양한 종류의 루프 문을 사용할 수 있습니다.

### 8-3.1 **`for`**
JavaScript에서 `for` 루프는 반복적으로 코드 블록을 실행하는 제어 흐름 문입니다. `for` 루프는 주어진 조건에 따라 반복 횟수를 제어할 수 있습니다.

```jsx
for (초기화식; 조건식; 증감식) {
  // 실행할 코드
}
```

- 초기화식: 반복 시작 시 한 번 실행되는 초기화 코드입니다. 일반적으로 반복 변수를 초기화하는 역할을 합니다.
- 조건식: 각 반복마다 평가되는 조건입니다. 조건이 true인 경우에만 코드 블록이 실행됩니다.
- 증감식: 각 반복이 실행된 후에 한 번 실행되는 코드로, 일반적으로 반복 변수를 업데이트하는 역할을 합니다.

> for 루프는 반복 횟수를 명확하게 지정하거나 배열 등의 컬렉션 요소를 반복할 때 유용합니다. 초기화식, 조건식, 증감식 등을 적절히 사용하여 반복 흐름을 제어할 수 있습니다.


```jsx
for (let i = 0; i < 5; i++) {
  console.log("Count: " + i);
}
```
이 예시에서는 `i`라는 반복 변수를 0으로 초기화합니다. `i`가 5보다 작을 동안 코드 블록이 실행되고, 반복마다 `i`를 1씩 증가시킵니다.


- **선택적 표현식(Optional Expression)**
  - JavaScript에서 for 루프의 초기화식, 조건식, 증감식은 모두 선택적으로 사용할 수 있습니다. 특정한 상황에 따라 이러한 표현식을 생략할 수 있습니다.
    1. **초기화 표현식 생략**: 초기화식을 생략하면 명시적인 초기화 단계가 없다는 의미입니다. 따라서 루프 이전에 반복 변수가 정의되어 있거나 외부에서 값을 할당해야 합니다.
    ```jsx
    let i = 0;

    for (; i < 5; i++) {
      console.log("Count: " + i);
    }
    ```
    2. **조건 표현식 생략**: 조건식을 생략하면 기본적으로 true로 가정됩니다. 이는 break 문이나 다른 방법을 사용하여 루프를 종료하지 않는 이상 무한 루프가 생성됩니다.
    ```jsx
    let i = 0;

    for (;;) {
      console.log("Count: " + i);
      i++;
      if (i >= 5) {
        break;
      }
    }
    ```
    3. **증간 표현식 생략**: 증감식을 생략하면 루프 블록 내에서 반복 변수를 직접 업데이트하거나 다른 방법을 사용해야 합니다. 증감 표현식이 없으면 루프 조건이 충족되지 않을 경우 무한 루프가 발생할 수 있습니다.
    ```jsx
    let i = 0;

    for (; i < 5;) {
      console.log("Count: " + i);
      // 반복 변수를 업데이트하기 위해 다른 로직을 수행합니다.
      i += 2;
    }
    ```
  > 표현식을 생략할 때 무한 루프나 의도하지 않은 동작이 발생하지 않도록 주의해야 합니다.


### 8-3.2 **`for...in`**
`for...in` 구문은 JavaScript에서 객체의 속성을 반복하거나 열거하기 위해 사용되는 반복문입니다. 이 구문을 사용하여 객체의 속성을 가져와 반복적으로 처리할 수 있습니다.
```jsx
for (변수(variable) in 객체(object)) {
  // 실행할 코드
}
```
- 변수: 현재 반복하는 속성의 이름이 할당되는 변수입니다.
- 객체: 속성을 반복할 객체입니다.
```jsx
const person = {
  name: "John",
  age: 30,
  occupation: "Developer"
};

for (let key in person) {
  console.log(key + ": " + person[key]);
}
```
이 예시에서는 person 객체의 각 속성을 반복하고, 콘솔 로그를 이용해 각 속성의 이름과 값을 출력합니다. 

> `for...in` 구문은 객체의 모든 열거 가능한 속성을 반복하며, 상속된 속성은 제외합니다. 또한, 반복 순서는 일반적으로 속성이 추가된 순서와 동일합니다. 그러나 객체의 속성 순서는 보장되지 않으므로 반복 순서에 의존해서는 안 됩니다.

> `for...in` 구문을 사용하여 객체의 속성을 반복하고 해당 속성에 접근할 수 있습니다. 그러나 배열 등 다른 자료 구조에 대해서는 `for...in`을 사용하는 것보다 `for...of` 루프를 사용하는 것이 더 적합합니다.


### 8-3.3 **`for...of`**
`for...of` 구문은 JavaScript에서 배열 및 이터러블 객체의 요소를 반복하기 위해 사용되는 반복문입니다. 이 구문은 `for...in` 구문과는 달리 속성 이름이 아닌 실제 값을 가져옵니다.
```jsx
for (변수(variable) of 배열 또는 이터러블(object)) {
  // 실행할 코드
}
```
- 변수: 각 반복에서 현재 요소의 값이 할당되는 변수입니다.
- 배열 또는 이터러블: 반복할 배열이나 이터러블 객체입니다.

  <details>
    <summary>이터러블(iterable)</summary>

    이터러블(iterable)은 JavaScript에서 반복 가능한 객체를 말합니다. 이터러블은 반복 가능한 속성을 가지고 있어 `for...of` 루프와 같은 반복 구문에서 사용될 수 있습니다. 이터러블 객체는 내부적으로 `Symbol.iterator`라는 특별한 메서드를 가지며, 이 메서드를 통해 반복자(iterator)를 반환합니다. 반복자는 객체의 각 요소를 순차적으로 반복하면서 접근하는 역할을 합니다.

    일부 JavaScript 내장 객체들은 기본적으로 이터러블을 구현하고 있습니다. 예를 들면 `배열(Array)`, `문자열(String)`, `Map`, `Set` 등이 있습니다. 이외에도 사용자 정의 객체에서도 이터러블을 구현할 수 있습니다.

    - `Symbol.iterator 메서드`: 이터러블 객체는 `Symbol.iterator`라는 특수한 메서드를 가지고 있어야 합니다. 이 메서드는 반복자(iterator)를 반환하며, 반복자는 `next() 메서드`를 가지고 있어야 합니다.
    - `next() 메서드`: 반복자는 `next() 메서드`를 가지고 있어야 합니다. 이 메서드는 `{ value, done }` 형태의 객체를 반환하며, value에는 다음 순서의 요소 값이 할당되고, done은 반복이 완료되었는지 여부를 나타냅니다.

    ```jsx
    const arr = [1, 2, 3];

    // 이터러블 객체인 배열은 Symbol.iterator 메서드를 가지고 있습니다.
    const iterator = arr[Symbol.iterator]();

    // 반복자를 통해 요소에 접근할 수 있습니다.
    console.log(iterator.next()); // { value: 1, done: false }
    console.log(iterator.next()); // { value: 2, done: false }
    console.log(iterator.next()); // { value: 3, done: false }
    console.log(iterator.next()); // { value: undefined, done: true }
    ```

    이 예시에서는 배열을 이터러블 객체로 만들기 위해 `Symbol.iterator` 메서드를 호출하여 반복자를 가져왔습니다. `next() 메서드`를 통해 반복자를 통해 배열의 각 요소에 접근하고, `{ value, done }` 형태의 객체를 반환합니다.

    이터러블 객체는 `for...of` 루프와 같은 반복 구문에서 사용할 수 있어 객체의 요소에 접근하고 처리하는 데 유용합니다.
  </details>

```jsx
const numbers = [1, 2, 3, 4, 5];

for (let num of numbers) {
  console.log(num);
}
```
이 예시에서는 numbers 배열의 각 요소를 반복하고, 각 요소의 값을 출력합니다.

> `for...of` 구문은 배열과 같은 이터러블 객체를 반복하는 데에 적합합니다. 그러나 객체의 속성을 반복하기 위해 `for...of` 구문을 사용하는 것은 적절하지 않습니다. 객체를 반복하기 위해서는 여전히 `for...in` 구문을 사용해야 합니다.

> `for...of` 구문은 배열 뿐만 아니라 `Map`, `Set`, `String` 등 다양한 이터러블 객체에서도 사용할 수 있습니다. 이 구문을 사용하여 요소를 반복하고 해당 요소에 접근할 수 있습니다.

### 8-3.4 **`for await...of`**
`for await...of` 구문은 JavaScript에서 비동기적인 이터러블 객체를 반복하기 위해 사용되는 반복문입니다. 이 구문은 `for...of`와 유사하지만, 비동기적인 값을 반환하는 이터러블 객체를 처리할 수 있습니다. `for await...of` 구문은 `await` 키워드와 함께 사용되며, 각 반복에서 비동기적인 값을 대기하고 처리합니다.
```jsx
for await (변수 of 비동기 이터러블) {
  // 실행할 코드
}
```
- 변수: 각 반복에서 비동기 값의 결과가 할당되는 변수입니다.
- 비동기 이터러블: 비동기적으로 반복할 이터러블 객체입니다.

```jsx
async function getData() {
  const response = await fetch('https://api.example.com/data');
  const dataStream = await response.body;

  for await (const chunk of dataStream) {
    // 비동기 데이터 처리
    console.log(chunk);
  }
}

getData();
```
예를 들어, `fetch()` 함수를 사용하여 비동기적으로 데이터를 가져오고 Response 객체의 body를 이터러블로 사용하는 경우, for await...of 구문을 사용하여 비동기적으로 데이터를 반복적으로 처리할 수 있습니다.

### 8-3.5 **`while`**
`while` 문은 JavaScript에서 주어진 조건이 `true`인 동안 반복적으로 코드 블록을 실행하는 반복문입니다. `while` 문은 반복 횟수를 예측하기 어려울 때 유용하며, 조건을 만족하는 동안 계속해서 코드를 실행할 수 있습니다.
```jsx
while (조건) {
  // 실행할 코드
}
```
- 조건: 반복문이 실행되는 동안 평가되는 조건입니다. 조건이 true인 경우 코드 블록이 실행되고, 조건이 false가 되면 반복문이 종료됩니다.

```jsx
let count = 1;

while (count <= 5) {
  console.log(count);
  count++;
}
```

위의 예시에서 count 변수가 1부터 5 이하인 동안 while 문의 코드 블록이 반복적으로 실행됩니다. 각 반복에서 count 값을 출력하고, count를 1씩 증가시킵니다.

> while 문은 반복 횟수를 사전에 정확히 알 수 없는 경우에 유용합니다. 하지만 조건이 항상 true로 평가되지 않도록 주의해야 합니다. 무한 루프를 피하기 위해 반복문 안에서 조건이 변경되도록 구성해야 합니다.

### 8-3.6 **`do...while`**
JavaScript에서 do-while 루프는 지정된 조건이 false로 평가될 때까지 반복하여 코드 블록을 실행하는 제어 흐름 문입니다.
```jsx
do {
  // 실행할 코드
} while (조건);
```
**작동 방식**
- do 블록 내의 코드는 조건과 상관없이 먼저 실행됩니다.
- 코드가 실행된 후에 조건이 평가됩니다.
- 조건이 true인 경우 루프는 반복되고 do 블록 내의 코드가 다시 실행됩니다. 조건이 false인 경우 루프가 종료되고 루프 다음의 코드로 계속 진행됩니다.
> 무한 루프를 만들지 않도록 주의해야 합니다. do-while 루프를 사용할 때는 반드시 조건이 언젠가는 false가 되도록 해야 합니다. 이렇게 함으로써 루프가 종료되도록 보장할 수 있습니다.

```jsx
let count = 0;

do {
  console.log("Count: " + count);
  count++;
} while (count < 5);
```
이 예시에서는 루프가 최소한 한 번은 실행됩니다. `do` 블록 내의 코드가 실행되고 `count`의 값을 출력하며 반복마다 `count`를 1씩 증가시킵니다. `count`가 5보다 작지 않을 때까지 반복됩니다.


<br>

## 8-4. break 문
`break` 문은 JavaScript에서 `반복문`이나 `switch` 문에서 실행을 중단하고 현재의 반복 또는 조건문을 빠져나가는 역할을 합니다. `break` 문을 사용하여 특정 조건이 충족되면 `반복문`을 종료하거나 `switch 문`에서의 실행 흐름을 변경할 수 있습니다.

**`break` 문을 사용하는 Cases**:
- **반복문에서의 break**: 반복문 내에서 특정 조건을 만족하면 반복문을 즉시 종료하고 반복을 중지합니다.
  ```jsx
  for (let i = 0; i < 10; i++) {
    console.log(i);
    if (i === 5) {
      break;
    }
  }
  ```
  위의 예시에서는 `i`가 5일 때 `break` 문이 실행되어 반복문을 종료합니다.
- **switch 문에서의 break**: switch 문에서 각 case 블록을 실행한 후 break 문을 사용하여 switch 문을 종료하고 다음 코드 블록으로 실행 흐름을 이동합니다.
  ```jsx
  const fruit = "apple";

  switch (fruit) {
    case "apple":
      console.log("It's an apple");
      break;
    case "banana":
      console.log("It's a banana");
      break;
    default:
      console.log("It's some other fruit");
  }
  ```
  위의 예시에서 fruit 변수가 "apple"일 경우 첫 번째 case 블록이 실행됩니다. break 문이 없다면 실행은 계속되어 다음 case 블록도 실행될 것입니다. 하지만 break 문을 사용하여 switch 문을 종료하므로 해당 case 블록만 실행되고 다음 코드로 이동합니다.

> 조건을 만족하거나 특정 상황에서 코드 실행을 중지하고 다음으로 넘어갈 때 break 문을 사용할 수 있습니다.

<br>

## 8-5. continue 문
`continue` 문은 JavaScript에서 반복문 내에서 실행되는 코드에서 현재 반복을 중단하고 다음 반복으로 건너뛰는 역할을 합니다. `continue` 문을 만나면 현재 반복의 나머지 부분은 실행되지 않고, 다음 반복으로 이동하여 실행이 계속됩니다.

`continue` 문은 주로 조건에 따라 특정 조건을 만족하는 경우 현재 반복을 건너뛰고 다음 반복으로 이동하는데 사용됩니다.

```jsx
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 1) {
    continue; // 홀수인 경우 다음 반복으로 이동
  }
  console.log(i); // 짝수만 출력
}
```
위의 예시에서 for 반복문은 1부터 10까지의 숫자를 반복합니다. if 조건문에서 i가 홀수인 경우 continue 문을 만나 현재 반복을 중단하고 다음 반복으로 이동합니다. 따라서 홀수 숫자를 건너뛰고 짝수만 출력됩니다.

> continue 문을 사용하여 특정 조건을 만족하는 경우 현재 반복을 건너뛰고 다음 반복으로 이동할 수 있습니다. 이를 통해 반복문 내에서 특정 상황에 따라 코드의 실행을 제어할 수 있습니다.

<br>

## 8-6.

<br>


## 키워드

<br>

## Reference
- [Statments & declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements)
- [if와 ?를 사용한 조건처리](https://ko.javascript.info/ifelse)
- [Control flow & error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [loop & iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [continue](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue)