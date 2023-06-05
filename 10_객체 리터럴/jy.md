# 10장. 객체 리터럴

## 10-1. 객체란?

- 자바스크립트는 **객체 기반의 프로그래밍 언어**입니다. 
- **원시 값(숫자, 문자열, boolean 등)을 제외한 나머지 값**(함수, 배열, 정규 표현식 등)은 모두 객체입니다.
- 원시 타입은 하나의 값만 나타내지만 객체 타입은 **다양한 타입의 값을 하나의 단위로 구성한 복합적인 자료구조**입니다.
- 원시 값은 변경 불가능한 값이지만 객체는 **변경 가능한 값** 입니다.
- 객체는 **프로퍼티와 메서드로 구성된 집합체**입니다.
  
  - **프로퍼티**: 객체의 상태를 나타내는 값으로, 키(key)와 값(value)로 구성됩니다.
  - **메서드**: 프로퍼티를 참조하고 조작할 수 있는 동작으로, 프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 붙여진 이름입니다.
  
    ```jsx
    var counter = {
      num: 0, // 프로퍼티
      increase: function () { // 메서드
        this.num++;
      }
    }
    ```

<br>

## 10-2. 객체 리터럴에 의한 객체 생성

자바스크립트는 **프로토타입 기반 객체지향 언어**로서 클래스 기반 객체지향 언어와는 달리 다양한 객체 생성 방법을 지원합니다.

> **클래스 기반 객체지향 언어**: 클래스를 사전에 정의하고 필요한 시점에 `new` 연산자와 함께 생성자를 호출하여 인스턴스를 생성하는 방식으로 객체를 생성하는 언어
(C++, Java, C#, Python 등)

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

<br>

가장 일반적이고 간단한 방법은 **객체 리터럴**을 사용하는 방법입니다.

-  객체 리터럴은 중괄호`{...}` 내에 0개 이상의 프로퍼티를 정의합니다. 변수에 할당되는 시점에 자바스크립트 엔진은 객체 리터럴을 해석해 객체를 생성합니다.

    ```jsx
    var person = {
      name: 'Lee',
      sayHello: function() {
        console.log('Hello! My name is ${this.name}.`);
      }
    };
    ```

-  중괄호 내에 프로퍼티를 정의하지 않으면 빈 객체가 생성됩니다.

    ```jsx
    var empty = {}; // 빈 객체
    console.log(typeof empty); // object
    ```

- 객체 리터럴의 중괄호`{...}`는 코드 블록을 의미하지 않습니다. 코드 블록과 다르게 객체 리터럴은 값으로 평가되는 표현식이므로 닫는 중괄호 뒤에는 세미콜론을 붙입니다.

<br>

## 10-3. 프로퍼티

**객체는 프로퍼티의 집합**이며, 프로퍼티는 키와 값으로 구성됩니다.

- **프로퍼티 키**: 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
- **프로퍼티값**: 자바스크립트에서 사용할 수 있는 모든 값
- 프로퍼티를 나열할 때는 쉼표`,` 로 구분합니다.

  ```jsx
  var person = {
    name: 'Lee', // key: name, value: 'Lee'
    age: 20, // key: age, value: 20
  };
  ```

- 식별자 네이밍 규칙을 따르지 않는 이름에는 반드시 따옴표를 사용해야 합니다.

  ```jsx
  var person = {
    firstName: 'Juyeong', // 식별자 네이밍 규칙을 준수하는 프로퍼티 키
    'last-name': 'Lee' // 식별자 네이밍 준수하지 않는 프로퍼티 키
  };
  ```

- 문자열 또는 문자열로 평가할 수 있는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수도 있습니다.
  이때, 프로퍼티 키로 사용할 표현식을 대괄호`[...]` 로 묶습니다.

  ```jsx
  var person = {};
  var key = 'name';

  obj[key] = 'Lee';

  console.log(person); // {name: 'Lee'}
  ```

- 프로퍼티 키에 문자열이나 심벌 값 외의 값을 사용하면 암묵적 타입 변환을 통해 문자열이 됩니다.
 
  ```jsx
  var foo = {
    0: 1,
    1: 2,
    2: 3
  };
  ```

- `var`, `function`과 같은 예약어를 프로퍼티 키로 사용해도 에러가 발생하지 않지만, 예상치 못한 에러 발생 여지가 있으므로 권장하지 않습니다.

  ```jsx
  var foo = {
    var: '',
    function: ''
  };

  console.log(foo); // {var: "", function:""}
  ```

- 이미 존재하는 프로퍼티 키를 중복 선언하면 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어씁니다.

  ```jsx
  var foo = {
    name: 'Juyeong',
    name: 'Lee'
  };

  console.log(foo); // {name:"Lee"}
  ```

<br>

## 10-4. 메서드

프로퍼티가 함수일 경우 일반 함수와 구분하기 위해 메서드라고 부릅니다. 즉, 메서드는 객체에 묶여 있는 함수를 의미합니다.

```jsx
var circle = {
  radius: 5, // 프로퍼티
  getDiameter: function () { // 메서드
    return 2 * this.radius;
  }
};

console.log(circle.getDiameter()); // 10
```

<br>

## 10-5. 프로퍼티 접근

프로퍼티에 접근하는 방법에는 두 가지가 있습니다.

- **마침표 표기법**: 마침표 프로퍼티 접근 연산자 `.` 사용
- **대괄호 표기법**: 대괄호 프로퍼티 접근 연산자 `[...]` 사용

  ```jsx
  var person = {
    name = 'Lee'
  };

  // **마침표 표기법**에 의한 프로퍼티 접근
  console.log(person.name); // Lee

  // **대괄호 표기법**에 의한 프로퍼티 접근
  console.log(person['name']); // Lee

  // 식별자 네이밍 규칙을 준수하는 이름이면 둘 다 사용 가능
  ```

- 대괄호 프로퍼티 접근 연산자 내부에 지정하는 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 합니다.
  따옴표로 감싸지 않은 이름을 프로퍼티 키로 사용하면 자바스크립트 엔진은 식별자로 해석합니다.
  
  ```jsx
  var person = {
    name = 'Lee'
  };

  console.log(person[name]); // ReferenceError: name is not defined
  ```

- 객체에 존재하지 않는 프로퍼티에 접근하면 `undefined`를 반환합니다. 이때 ReferenceError가 발생하지 않는 점에 주의해야 합니다.
  
  ```jsx
  var person = {
    name = 'Lee'
  };

  console.log(person.age); // undefined
  ```
  
 - Node.js 환경과 브라우저 환경에서의 차이
 
    ```jsx
    var person = {
      'last-name': 'Lee',
      1: 10,
    };

    person.'last-name';   // SyntaxError: Unexpected string
    person.last-name;     // 브라우저 환경: NaN
                          // Node.js 환경: 참조 에러: name is not defined

    person[last-name];    // ReferenceError: last is not defined
    person['last-name'];  // Lee

    // 식별자 네이밍 규칙을 준수하지 않을 때 대괄호 프로퍼티로 접근
    person.1; // SyntaxError: Unexpected number
    person.'1'; // SyntaxError: Unexpected string

    // 프로퍼티 키가 숫자로 이뤄진 문자열인 경우 따옴표를 생략 가능
    person[1]; // 10
    person['1'] // 10
    ```

<br>

## 10-6. 프로퍼티 값 갱신

이미 존재하는 프로퍼티에 값을 할당하면 프로퍼티 값이 갱신됩니다.

```jsx
var person = {
  name = 'Lee'
};

person.name = 'Kim';

console.log(person.name); // Kim
```

<br>

## 10-7. 프로퍼티 동적 생성

존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고 프로퍼티 값이 할당됩니다.

```jsx
var person = {
  name = 'Lee'
};

// person 객체에는 age 프로퍼티가 존재하지 않으므로 age 프로퍼티가 동적으로 생성되고 값 할당
person.age = 20;

console.log(person.age); // 20
```

<br>

## 10-8. 프로퍼티 삭제

`delete` 연산자를 통해 객체의 프로퍼티를 삭제할 수 있습니다. 이때, 존재하지 않는 프로퍼티를 삭제 시도하면 아무런 에러 없이 무시됩니다.

```jsx
var person = {
  name = 'Lee'
};

person.age = 20;

delete person.age;
delete person.address;

console.log(person); // {name: "Lee"}
```

<br>

## 10-9. ES6에서 추가된 객체 리터럴의 확장 기능

ES6에서는 더욱 간편하고 표현력 있는 객체 리터럴의 확장 기능을 제공합니다.

<br>

### 10-9-1. **프로퍼티 축약 표현**

프로퍼티 값은 변수에 할당된 값, 즉 식별자 표현식일 수도 있습니다.

- ES6에서는 프로퍼티 값으로 변수를 사용하는 경우 변수 이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키를 생략할 수 있습니다.
이때 프로퍼티 키는 변수 이름으로 자동 생성됩니다.

```jsx
// ES5
var x = 1, y = 2;

const obj = { 
  x: x,
  y: y
};

console.log(obj); // {x: 1, y: 2};
```

```jsx
var x = 1, y = 2;

const obj = { x, y };

console.log(obj); // {x: 1, y: 2};
```

<br>

### 10-9-2. **계산된 프로퍼티 이름**

- 문자열 또는 문자열로 타입 변환할 수 있는 값으로 평가되는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수도 있습니다.
  이때, 프로퍼티 키로 사용할 표현식을 대괄호`[...]`로 묶어야 합니다. 이를 계산된 프로퍼티 이름이라 합니다.

  ```jsx
  var prefix = 'prop';
  var i = 0;

  // 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
  obj[prefix + "-" + ++i] = i;
  obj[prefix + "-" + ++i] = i;
  obj[prefix + "-" + ++i] = i;

  console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
  ```

- ES6에서는 객체 리터럴 내부에서도 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성할 수 있습니다.
  
  ```jsx
  const prefix = 'prop';
  let i = 0;

  // 객체 리터럴 내부에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성
  obj[`${prefix} - ${++i}`] = i;
  obj[`${prefix} - ${++i}`] = i;
  obj[`${prefix} - ${++i}`] = i;

  console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
  ```

<br>

### 10-9-3. **메서드 축약 표현**

- ES5에서 메서드를 정의하려면 프로퍼티 값으로 함수를 할당합니다.

  ```jsx
  var person = {
    name = 'Lee',
    sayHi: function () {
      console.log("Hi! " + this.name);
    },
  };
  
  person.sayHi(); // Hi! Lee
  ```

- ES6에서는 메서드를 정의할 때 `function` 키워드를 생략한 축약 표현을 사용할 수 있습니다.

  ```jsx
  const person = {
    name = 'Lee',
    sayHi() {
      console.log("Hi! " + this.name);
    },
  };
  
  person.sayHi(); // Hi! Lee
  ```
