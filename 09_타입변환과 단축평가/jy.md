# 9장. 타입 변환과 단축 평가

## 9-1. 타입 변환이란?

자바스크립트의 모든 값은 타입이 있습니다. 값의 타입은 개발자의 의도에 따라 다른 타입으로 변환할 수 있습니다.

- **명시적 타입 변환 / 타입 캐스팅** : 개발자가 의도적으로 값의 타입을 변환하는 경우
- **암묵적 타입 변환 / 타입 강제 변환** : 개발자의 의도와 관계없이 자바스크립트 엔진에 의해 암묵적으로 타입이 변환되는 경우

```jsx
var x = 10;

// 명시적 타입 변환
var str = x.toString();
console.log(typeof str, typeof x) // string number

// 암묵적 타입 변환
var str = x + '';
console.log(typeof str, typeof x) // string numer
```

타입 변환은 기존 원시 값을 직접 변경하지 않습니다. 기본 원시값을 사용해 다른 타입의 새로운 원시 값을 생성합니다. 
자바스크립트 엔진은 피연산자의 값을 암묵적 타입 변환해 새로운 값을 만들어 단 한 번 사용하고 버립니다.

<br>

## 9-2. 암묵적 타입 변환

표현식을 평가할 때 코드의 문맥에 부합하지 않는 다양한 상황이 발생할 수 있습니다. 
이때 자바스크립트는 가급적 에러를 발생시키지 않도록 암묵적 타입 변환을 통해 표현식을 평가합니다.

```jsx
// 피연산자가 모두 문자열 타입
'10' + 2 // '102'

// 피연산자가 모두 숫자 타입
5 * '10' // 50

// 피연산자 또는 표현식이 불리언 타입
!0 // true
if (1) {}
```

<br>

### 9-2-1. **문자열 타입으로 변환**

자바스크립트 엔진은 문자열 연결 연산자 표현식을 평가하기 위해 문자열 연결 연산자의 피연산자 중 문자열 타입이 아닌 피연산자를 문자열 타입으로 암묵적 타입 변환합니다.

```jsx
1 + '2' // '12'
```

- 숫자 + 문자열 = 문자열
- 불리언 + 문자열 = 문자열
- null + 문자열 = 문자열
- undefined + 문자열 = 문자열
- 심벌 + 문자열 = TypeError
- 객체 + 문자열 = 문자열

<br>

### 9-2-2. **숫자 타입으로 변환**

**산술 연산자**의 모든 피연산자는 문맥상 숫자 타입이어야 합니다. 따라서 자바스크립트 엔진은 산술 연산자의 피연산자들은 숫자 타입으로 암묵적 타입 변환합니다. 

```jsx
1 - '1' // 0
1 * '10' // 10
```

이때, 숫자 타입으로 변환할 수 없는 피연산자인 경우 평가 결과는 `NaN`이 됩니다.

```jsx
1 / 'one' // NaN
```

**비교 연산자**는 피연산자의 크기를 비교하므로 모든 피연산자는 문맥상 숫자 타입이어야 합니다. 따라서 자바스크립트 엔진은 산술 연산자의 피연산자들은 숫자 타입으로 암묵적 타입 변환합니다.

```jsx
1 > '0' // true
```

`+` 단항 연산자는 피연산자가 숫자 타입의 값이 아니면 숫자 타입의 값으로 암묵적 타입 변환을 수행합니다.

```jsx
+'' // 0
+'0' // 0
+'1' // 1
+'string' // NaN

+true // 1
+false // 0

+null // 0
+undefined // NaN

+Symbol() // TypeError

+{} // NaN
+[] // 0
+[10, 20] // NaN
+(function(){}) // NaN
```

<br>

### 9-2-3. **불리언 타입으로 변환**

자바스트립트 엔진은 조건식의 평가 결과를 불리언 타입으로 암묵적 타입 변환합니다.

```jsx
if ('') console.log('1');
if (true) console.log('2');
if (0) console.log('3');
if ('str') console.log('4');
if (null) console.log('5');
 // 2 4
```

자바스트립트 엔진은 불리언 타입이 아닌 값을 Truthy 값 또는 Falsy 값으로 구분합니다. Falsy 값 외의 모든 값은 모두 true로 평가되는 Truthy 값 입니다.

-  **Falsy 값**
   - false
   - undefined
   - null
   - 0, -0
   - NaN
   - ''
    
<br>

## 9-3. **명시적 타입 변환**

### 9-3-1. **문자열 타입으로 변환**

1. String 생성자 함수를 new 연산자 없이 호출하는 방법
    ```jsx
    String(1); // '1'
    String(NaN); // 'NaN'
    String(Infinity); // 'Infinity'
    String(true); // 'true'
    String(false); // 'false'
    ```

2. Object.prototype.toString 메서드를 사용하는 방법
    ```jsx
    (NaN).toString(); // 'NaN'
    (true).toString(); // 'true'
    (Infinity).toString(); // 'Infinity'
    ```

3. 문자열 연결 연산자를 이용하는 방법
    ```jsx
    1 + ''; // '1'
    NaN + ''; // 'NaN'
    true + ''; // 'true'
    Infinity + ''; // 'Infinity'
    ```

<br>

### 9-3-2. **숫자 타입으로 변환**

1. `Number` 생성자 함수를 `new` 연산자 없이 호출하는 방법
    ```jsx
    Number('0'); // 0
    Number(true); // 1
    ```

2. `parseInt`, `parseFloat` 함수를 사용하는 방법 (문자열만 숫자 타입으로 변환 가능)
    ```jsx
    parseInt('0'); // 0
    parseInt('-1'); // -1
    ```

3. `+` 단항 산술 연산자를 이용하는 방법
    ```jsx
    +'0'; // 0
    +true; // 1
    +false; // 0
    ```

4. `*` 산술 연산자를 이용하는 방법
    ```jsx
    '0' * 1; // 0
    true * 1; // 1
    ```

<br>

### 9-3-3. **불리언 타입으로**

1. `Boolean` 생성자 함수를 `new` 연산자 없이 호출하는 방법
    ```jsx
    Boolean('x'); // true
    Boolean(''); // false
    Boolean('false'); // true
    Boolean(NaN); // false
    Boolean(Infinity); // true
    Boolean(null); // false
    Boolean([]); // true
    Boolean({}); // true
    ```

2. `!` 부정 논리 연산자를 두번 사용하는 방법
    ```jsx
    !!'x'; // true
    !!''; // false
    !!NaN; // false
    !!null; // false
    !!{}; // true
    !![]; // true
    ```

<br>

## 9-4. **단축 평가**

### 9-4-1. **논리 연산자를 사용한 단축 평가**

단축 평가란 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 말합니다.

|단축 평가 표현식 | 평가 결과 |
|-----|----|
|`true \|\| anything` | true |
|`false \|\| anything` | anything |
|`true && anything` | anything |
|`false && anything` | false |

<br>

### 9-4-2. **옵셔널 체이닝 연산자**

옵셔널 체이닝 연산자 `?.`는 좌항의 피연산자가 `null` 또는 `undefined`인 경우 `undefined`를 반환 그렇지 않는 경우 프로퍼티 참조를 이어갑니다.

<br>

### 9-4-3. **null 병합 연산자**

좌항의 피연산자가 `null` 또는 `undefined`인 경우 우항의 연산자를 반환 그렇지 않으면 피연산자를 반환 변수에 기본값을 설정할 때 유용합니다.
