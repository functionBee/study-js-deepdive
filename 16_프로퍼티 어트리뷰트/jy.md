# 16. 프로퍼티 어트리뷰트

## 16.1 내부 슬롯과 내부 메서드

내부 슬롯과 내부 메서드`[[...]]`는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티와 의사 메서드입니다.

- 내부 슬롯과 내부 메서드는 자바스크립트 엔진에서 실제로 동작하지만 외부로 공개된 객체의 프로퍼티는 아닙니다.
- 모든 객체는 `[[Prototype]]`이라는 내부 슬롯과 내부 메서드를 갖습니다. 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 원칙적으로 직접 접근할 수 없지만, `[[Prototype]]` 내부 슬롯의 경우, `__proto__`를 통해 간접적으로 접근할 수 있습니다.

  ```jsx
  const o = {};

  // 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 직접 접근 불가
  o.[[Prototype]] // Uncaught SyntaxError: Unexpected token '['
  
  // 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공
  o.__proto__ // Object.prototype
  ```

## 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의합니다.

> - 프로퍼티 어트리뷰트 : 프로터피 상태를 나타내는 것
> - 프로퍼티의 상태 : 프로퍼티의 값, 값의 갱신 가능 여부, 열거 가능 여부, 재정의 가능 여부
> - 프로퍼티 디스크립터 객체 : 프로퍼티 어트리뷰트 정보를 제공하는 것

- 프로퍼티 어트리뷰트는 자바스크립트 엔진이 관리하는 내부 상태 값인 내부 슬롯 `[[Value]]`, `[[Writable]]`, `[[Enumerable]]`, `[[Configurable]]`입니다. 프로퍼티 어트리뷰트는 `Object.getOwnPropertyDescriptor` 메서드를 사용하여 간접적으로 확인할 수 있습니다.

- `Object.getOwnPropertyDescriptor` 메서드를 호출할 때 첫 번째 매개변수에는 객체의 참조를 전달하고, 두 번째 매개변수에는 프로퍼티 키를 문자열로 전달합니다.

- ES8의 `Object.getOwnPropertyDescriptors` 메서드를 호출하면 프로퍼티 디스크립터 객체들을 반환합니다.

  ```jsx
  const person = {
    name: 'Lee'
  };

  // 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체 반환
  // 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한 프로퍼티 디스크르립터를 요구하면 undefined를 반환
  console.log(Object.getOwnPropertyDescriptor(person, 'name'));
  // {value: "Lee", writable: true, enumerable: true, configurable: true}

  person.age = 20;

  console.log(Object.getOwnPropertyDescriptors(person);
  /*
  { 
    name: {value: "Lee", writable: true, enumerable: true, configurable: true},
    age: {value: 20, writable: true, enumerable: true, configurable: true}
  }
  */
  ```

## 16.3 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분할 수 있습니다.

- 데이터 프로퍼티 : 키와 값으로 구성된 일반적인 프로퍼티
- 접근자 프로퍼티 : 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티


### 16.3.1 데이터 프로퍼티

다음과 같은 프로퍼티 어트리뷰트를 갖습니다. 자바스크립트 엔진이 프로퍼티를 생성할 때 기본값으로 자동 정의됩니다.

| 프로퍼티 어트리뷰트 | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                      |
| :------------------: | :------------------: | ---------------------------------------- |
| **`[[Value]]`**           | value                               | - 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값<br>- 프로퍼티 키를 통해 프로퍼티 값을 변경하면 값을 재할당합니다. 이때 프로퍼티가 없으면 프로퍼티를 동적 생성하고 `[[Value]]`에 값을 저장합니다. |
| **`[[Writable]]`**        | writable                            | - 프로퍼티 값의 변경 가능 여부<br>- `false`인 경우 읽기 전용 |
| **`[[Enumerable]]`**      | enumerable                          | - 프로퍼티의 열거 가능 여부<br>- `false`인 경우 `for...in`, `Object.keys` 등으로 열거할 수 없습니다. |
| **`[[Configurable]]`**    | configurable                        | - 프로퍼티의 재정의 가능 여부<br>- `false`인 경우 프로퍼티 삭제/프로퍼티 어트리뷰트 값 변경이 금지됩니다. 단, `[[Writable]]`이 `true`인 경우 `[[Value]]` 변경과 `[[Writable]]`을 false로 변경하는 것이 허용됩니다. |

```jsx
const person = {
  name: 'Lee'
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체 취득
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value: "Lee", writable: true, enumerable: true, configurable: true}

// 프로퍼티 동적 생성
person.age = 20;

console.log(Object.getOwnPropertyDescriptors(person);
/*
{
	name: {value: "Lee", writable: true, enumerable: true, configurable: true},
    age: {value: 20, writable: true, enumerable: true, configurable: true}
}
*/
```

### 16.3.2 접근자 프로퍼티

접근자 프로퍼티는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티입니다.

| 프로퍼티 어트리뷰트 | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                      |
| ------------------- | ----------------------------------- | ------------------------------------------------------- |
| **`[[Get]]`** | get | 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수. getter 함수가 호출되고 결과가 반환됩니다.   |
| **`[[Set]]`** | set | 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수. setter 함수가 호출되고 결과가 저장됩니다. |
| **`[[Enumerable]]`** | enumerable | 데이터 프로퍼티와 같습니다.                                                                             |
| **`[[Configurable]]`** | configurable | 데이터 프로퍼티와 같습니다.                                                                         |

- 내부 슬롯/메서드 관점
  - 프로퍼티 키가 유효한지(문자열, 심벌) 확인합니다.
  - 프로토타입 체인에서 프로퍼티를 검색합니다.
  - 검색된 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인합니다.
  - 프로퍼티의 프로퍼티 어트리뷰트의 값을 반환합니다.
  
  ```jsx
  const person = {
    // 데이터 프로퍼티
    firstName: "Juyeong",
    lastName: "Lee",

    // getter
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    },

    // setter
    set fullName() {
      [this.firstName, this.lastName] = name.split(' ');
    }
  };

  // 데이터 프로퍼티를 통한 프로퍼티 값의 참조
  console.log(person.firstName + ' ' + person.lastName); // Juyeong Lee

  // 접근자 프로퍼티를 통한 프로퍼티 값의 저장
  person.fullName = 'Juyeong Lee';
  console.log(person); // {firstName: "Juyeong", lastName: "Lee"}

  // 접근자 프로퍼티를 통한 프로퍼티 값의 참조 (getter 호출)
  console.log(person.fullName); // Juyeong Lee

  let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
  console.log(descriptor);
  // {value: "juyeong", writable: true, enumerable: true, configurable: true}

  descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
  console.log(descriptor);
  // {get: f, set: f, enumerable: true, configurable: true}
  ```
 
- 접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법
  Object.getOwnPropertyDescriptor가 반환한 프로퍼티 디스크립터 객체에서 살펴볼 수 있습니다.
  
  ```jsx
  Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");
  // {get: f, set: f, enumerable: false, configurable: true}
  Object.getOwnPropertyDescriptor(function () {}, "prototype");
  // {value: {...}, writable: true, enumerable: false, configurable: false}
  ```
  
## 16.4 프로퍼티 정의

새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것을 말합니다.

- `Object.defineProperty` 메서드를 사용하면 프로퍼티의 어트리뷰트를 정의할 수 있습니다.
- `Object.defineProperty` 메서드로 프로퍼티를 정의할 때, 프로퍼티 디스크립터 객체의 프로퍼티 일부를 생략할 수 있습니다.
- 프로퍼티 디스크립터 객체에서 생략된 어트리뷰트는 다음과 같이 기본값이 적용됩니다.

  | 프로퍼티 디스크립터 객체의 프로퍼티 | 대응하는 프로퍼티 어트리뷰트 | 생략했을 때의 기본값 |
  | ----------------------------------- | ---------------------------- | -------------------- |
  | value                               | `[[Value]]`                  | `undefined`          |
  | get                                 | `[[Get]]`                    | `undefined`          |
  | set                                 | `[[Set]]`                    | `undefined`          |
  | writable                            | `[[Writable]]`               | `false`              |
  | enumerable                          | `[[Enumerable]]`             | `false`              |
  | configurable                        | `[[Configurable]]`           | `false`              |
  
## 16.5 객체 변경 방지

객체는 변경 가능한 값이므로 재할당 없이 직접 변경할 수 있습니다.


### 16.5.1 객체 확장 금지

`Object.preventExtensions` 메서드는 확장을 금지합니다. 확장이 금지된 객체는 프로퍼티 추가가 금지됩니다. 
(프로퍼티 동적 추가와 `Object.defineProperty` 메서드 추가 금지)

```jsx
const person = { name: "Juyeong" };

console.log(Object.isExtensible(person)); // true

Object.preventExtensions(person);

console.log(Object.isExtensible(person)); // false

person.age = 20; // 무시. strict mode에서는 에러
console.log(person); // {name: "Juyeong"}

delete person.name;
console.log(person); // {}

Object.defineProperty(person, "age", { value: 20 });
// TypeError: Cannot define property age, object is not extensible
```

### 16.5.2 객체 밀봉

`Object.seal` 메서드는 객체를 밀봉합니다. 밀봉된 객체는 읽기와 쓰기만 가능합니다.

```jsx
const person = { name: "Juyeong" };

console.log(Object.isSealed(person)); // false

Object.seal(person);

console.log(Object.isSealed(person)); // true

console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Juyeong", writable: true, enumerate: true, configurable: false},
}
*/

person.age = 20; // 무시. strict mode에서는 에러
console.log(person); // {name: "Juyeong"}

delete person.name; // 무시. strict mode에서는 에러
console.log(person); // {name: "Juyeong"}

person.name = "Lee"; // 가능
console.log(person); // {name: "Lee"}

Object.defineProperty(person, "name", { configurable: true });
// TypeError: Cannot redefine property: name
```

### 16.5.3 객체 동결

`Object.freeze` 메서드는 객체를 동결합니다. 즉, 읽기만 가능합니다.

```jsx
const person = { name: "Juyeong" };

console.log(Object.isFrozen(person)); // false

Object.freeze(person);

console.log(Object.isFrozen(person)); // true

console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Juyeong", writable: false, enumerate: true, configurable: false},
}
*/

person.age = 20; // 무시. strict mode에서는 에러
console.log(person); // {name: "Juyeong"}

delete person.name; // 무시. strict mode에서는 에러
console.log(person); // {name: "Juyeong"}

person.name = "Juyeong"; // 무시. strict mode에서는 에러
console.log(person); // {name: "Juyeong"}

Object.defineProperty(person, "name", { configurable: true });
// TypeError: Cannot redefine property: name
```

### 16.5.4 불변 객체

지금까지 살펴본 변경 방지 메서드들은 얕은 변경 방지로 직속 프로퍼티만 변경되고 중첩 객체까지 영향을 주지 못합니다.
따라서 동결 객체도 중첩 객체까지 동결할 수는 없습니다.

> 불변 객체를 구현하려면 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 Object.freeze 메서드를 호출해야 합니다.

```jsx
const person = {
  name: 'Lee',
  address: { city: 'Seoul' }
},

Object.freeze(person);

console.log(Object.isFrozen(person)); // true

console.log(Object.isFrozen(person.address)); // false

person.address.city = "Daejeon";
console.log(person); // {name: "Lee", address: {city: "Daejeon"}}
```
