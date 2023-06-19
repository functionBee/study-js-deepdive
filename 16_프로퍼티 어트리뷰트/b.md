# 16장. 프로퍼티 어트리뷰트

## 16-1. 내부 슬롯과 내부 메서드
- ECMA-262 사양(JavaScript의 표준 사양)에서는 내부 슬롯과 내부 메서드를 나타내기 위해 이중 대괄호 표기법([[...]])을 사용합니다. 이 표기법은 일반적으로 내부 동작을 정의하고 객체의 내부 상태를 나타내는 비공개 속성을 의미합니다.
- 내부 슬롯과 내부 메서드는 실제로 JavaScript 엔진에서 구현되어 동작합니다. 그러나 개발자는 직접적으로 내부 슬롯과 내부 메서드에 접근할 수 없습니다.
- 일부 내부 슬롯과 내부 메서드에 대해서는 간접적으로 접근할 수 있는 수단을 제공하기도 합니다. 예를 들어, `Object.getPrototypeOf(obj)`와 같은 메서드를 사용하여 `[[Prototype]]` 내부 슬롯에 접근할 수 있습니다. 또는 `Object.defineProperty(obj, prop, descriptor)`를 사용하여 `[[DefineOwnProperty]]` 내부 메서드의 동작을 간접적으로 조작할 수도 있습니다. 이러한 수단은 일부 내부 동작에 대한 커스터마이징이나 조작을 가능하게 합니다. 그러나 이는 예외적인 경우이며, 대부분의 내부 슬롯과 내부 메서드는 직접적인 접근을 허용하지 않습니다.
- JavaScript에서 "내부 슬롯(internal slot)"과 "내부 메서드(internal method)"는 객체의 내부적인 동작을 정의하는 개념입니다.

- **내부 슬롯 (Internal Slot)**:
    내부 슬롯은 객체의 내부적인 상태를 나타내는 비공개 속성입니다. 내부 슬롯은 해당 객체의 동작 및 내부 메커니즘에 필요한 정보를 저장합니다. 예를 들어, [[Prototype]]이나 [[Extensible]]과 같은 내부 슬롯은 상속 및 객체의 확장 가능 여부와 관련된 정보를 저장합니다. 내부 슬롯은 일반적으로 대괄호로 감싸여 표시되며, 직접 접근이 불가능합니다.

- **내부 메서드 (Internal Method)**:
    내부 메서드는 객체의 내부적인 동작을 구현하기 위해 사용되는 메서드입니다. 예를 들어, [[GetPrototypeOf]]나 [[DefineOwnProperty]]와 같은 내부 메서드는 객체의 프로토타입 체인 탐색이나 속성 정의 등과 같은 동작을 정의합니다. 내부 메서드는 해당 객체에 의해 호출되는 것이 아니라, JavaScript 엔진 내부에서 사용됩니다.

```jsx
// 16-1
const object = {}

// 내부 슬롯은 자바스크립트 엔진의 내부 로직의므로 직접 접근할 수 없다.
// 또 내부 슬롯에 접근하려고 할 때, 직접적으로 대괄호를 사용하여 접근하는 것은 문법 오류를 발생시킵니다.
o.[[Prototype]] // -> Uncaught SyntaxError: Unexpected token '['

// 대신, 간접적인 접근 방법을 사용해야 합니다. 
// 예를 들어, __proto__는 일부 환경에서는 객체의 내부 슬롯 [[Prototype]]에 간접적으로 접근하는 수단이 될 수 있습니다. 
// 하지만 이는 ECMAScript 사양에서 권장하지 않는 방법이며, 일부 환경에서만 동작하는 비표준 기능입니다.
o.__prototpye__ // -> Object.prototype
```
>  내부 슬롯에 직접적인 접근은 ECMAScript 사양에서 권장되지 않습니다. 내부 슬롯은 JavaScript 엔진의 내부 구현에 해당하며, 개발자가 직접 접근하거나 조작할 수 있는 공개된 API가 제공되지 않습니다.
> 내부 슬롯과 관련된 동작을 추상화된 공개 API인 `Object.getPrototypeOf(object)`를 사용하여 `[[Prototype]]`에 간접적으로 접근하거나, `Object.setPrototypeOf(object, prototype)`를 사용하여 프로토타입을 설정하는 것이 좋습니다. 

<br>

## 16-2. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

**프로퍼티 어트리뷰트**
- 자바스크립트 엔진은 프로퍼티를 생성할 때, 해당 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 자동으로 정의합니다.
- 프로퍼티 어트리뷰트는 프로퍼티의 값(value), 갱신 가능 여부(writable), 열거 가능 여부(enumerable), 재정의 가능 여부(configurable) 등을 나타냅니다.
- 프로퍼티의 어트리뷰트는 자바스크립트 엔진 내부에서 관리되는 내부 상태 값인 내부 슬롯 `[[Value]]`, `[[Writable]]`, `[[Enumerable]]`, `[[Configurable]]` 등으로 표현됩니다. 이러한 내부 슬롯은 프로퍼티의 상태와 관련된 정보를 저장합니다.
- 프로퍼티 어트리뷰트에는 직접적으로 접근할 수는 없지만, `Object.getOwnPropertyDescriptor` 메서드를 사용하여 간접적으로 확인할 수 있습니다. 이 메서드는 객체의 프로퍼티에 대한 어트리뷰트를 반환하여 프로퍼티의 상태를 알 수 있게 해줍니다. 이를 통해 프로퍼티의 갱신 가능 여부, 열거 가능 여부, 재정의 가능 여부 등을 확인할 수 있습니다.

```jsx
// 16-2
const person = {
    name: 'Lee'
}

// 프로퍼티 어트리 뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
console.log(Object.getOwnPropertyDescriptor(person, 'name))
```

**프로퍼티 디스크립터 객체(Property Descriptor Object)**
- 프로퍼티의 상태를 나타내는 속성들을 포함하는 JavaScript 객체입니다. 
- 이 객체는 `Object.defineProperty()` 또는 `Object.defineProperties()` 메서드를 사용하여 프로퍼티를 정의하거나 수정할 때 사용됩니다.
- 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대해 `Object.getOwnPropertyDescriptor()` 메서드를 사용하여 프로퍼티 디스크립터를 요구하면 `undefined`가 반환됩니다. 이는 해당 프로퍼티가 존재하지 않기 때문에 프로퍼티 디스크립터를 가져올 수 없는 것을 나타냅니다.


```jsx
// 16-3
const person = {
    name: 'Lee'
}

// 프로퍼티 동적 생성
person.age = 20;

// Object.getOwnPropertyDescriptor() 메서드를 사용하여 해당 프로퍼티의 디스크립터를 가져올 수 있습니다
const descriptor = Object.getOwnPropertyDescriptor(person, 'name')
console.log(descriptor);

const descriptor = Object.getOwnPropertyDescriptor(person, 'age')
console.log(descriptor);

// 그러나 존재하지 않는 프로퍼티에 대해 디스크립터를 요구하면 undefined가 반환됩니다
const descriptor = Object.getOwnPropertyDescriptor(person, 'isStudent')
console.log(descriptor);
```
> 또 `person` 객체가 다른 객체를 상속받았을 경우에도 해당 프로퍼티에 대한 디스크립터를 가져올 수 없으며 `undefined`가 반환됩니다.

<br>

## 16-3. 데이터 프로퍼티와 접근자 프로퍼티

프로퍼티는 데이터 프로퍼티(data property)와 접근자 프로퍼티(accessor property)로 구분할 수 있습니다.

1. 데이터 프로퍼티 (Data Property):
    - 데이터 프로퍼티는 키와 값으로 구성된 일반적인 프로퍼티입니다. 이는 우리가 지금까지 다룬 프로퍼티입니다.
    - 데이터 프로퍼티는 특정 객체에 직접 값을 저장하고, 이 값을 읽거나 쓸 수 있습니다.

    ```jsx
    // name이라는 데이터를 가진 프로퍼티 객체
    const obj = {
    name: 'John',
    };

    console.log(obj.name); 
    ```

2. 접근자 프로퍼티 (Accessor Property):
   - 접근자 프로퍼티는 자체적으로 값을 갖지 않으며, 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수(accessor function)로 구성된 프로퍼티입니다. 이는 `getter` 함수와 `setter` 함수로 구성됩니다.

    ```jsx
    // 16-6 
    const obj = {
        firstName: 'John',
        lastName: 'Doe',
        get fullName() {
            return `${this.firstName} ${this.lastName}`;
        },
        set fullName(value) {
            const [firstName, lastName] = value.split(' ');
            this.firstName = firstName;
            this.lastName = lastName;
        },
    };

    console.log(obj.fullName); // 출력: John Doe

    obj.fullName = 'Jane Smith';
    console.log(obj.firstName); // 출력: Jane
    console.log(obj.lastName); // 출력: Smith
    ```
    > `fullName`은 접근자 프로퍼티로, 값을 직접 갖지 않고 `get` 함수와 `set` 함수를 통해 `firstName`과 `lastName` 데이터 프로퍼티의 값을 읽거나 변경합니다.

<br>

### 16-3-1. 데이터 프로퍼티

- 데이터 프로퍼티(Data Property)는 프로퍼티 어트리뷰트(Property Attribute)를 가지며, JavaScript 엔진은 프로퍼티를 생성할 때 이러한 프로퍼티 어트리뷰트를 기본값으로 자동으로 정의합니다.

**프로퍼티 어트리뷰트**
프로퍼티 어트리뷰트는 프로퍼티의 상태를 나타내는 속성들로 구성됩니다.

- `value`:
  - 기본 프러퍼티 어트리뷰트 값: `value: undefined`
  - 프로퍼티에 저장된 실제 값입니다.
  - 프로퍼티 키를 통해 프로퍼티 값을 변경하면 `[[Value]]` 내부 슬롯에 새로운 값이 할당됩니다. 이때, 해당 프로퍼티가 이미 존재하는 경우는 해당 프로퍼티의 `[[Value]]`를 갱신하고, 존재하지 않는 경우에는 새로운 프로퍼티를 동적으로 생성하고 그 `[[Value]]`에 값을 저장합니다.
    
    ```jsx
    const obj = {};

    obj.name = 'John';
    console.log(obj.name); // 출력: John
    ```
    > 위의 예시에서 `obj` 객체에는 `name`이라는 프로퍼티가 처음에는 존재하지 않았습니다. 하지만 `obj.name`이라는 표현식을 사용하여 프로퍼티에 값을 할당하면 `[[Value]]` 내부 슬롯에 해당 값이 저장됩니다. 이로써 `name` 프로퍼티가 동적으로 생성되고 그 값을 읽을 수 있게 됩니다.

    ```jsx
    const obj = {
        name: 'John',
    };

    obj.name = 'Jane';
    console.log(obj.name); // 출력: Jane
    ```
    > 위의 예시에서 `obj` 객체의 `name` 프로퍼티가 이미 존재합니다. 이때 `obj.name = 'Jane'`과 같이 프로퍼티 키를 통해 값을 변경하면 `[[Value]]` 내부 슬롯에 새로운 값인 `'Jane'`이 할당되어 `name` 프로퍼티의 값이 `'John'`에서 `'Jane'`으로 변경됩니다.

- `writable`:
  - 기본 프러퍼티 어트리뷰트 값: `writable: true`
  - 프로퍼티의 값이 변경 가능한지 여부를 나타내는 불리언 값입니다.
  - `[[Writable]]`의 값이 `false`인 경우 해당 프로퍼티 `[[Value]]`의 값은 변경할 수 없는 읽기 전용 프로퍼티다 된다. `[[Writable]]`의 값이 `false`인 경우, 해당 프로퍼티는 읽기 전용(Read-only) 프로퍼티가 됩니다. 이는 프로퍼티의 `[[Value]]` 값이 변경될 수 없음을 의미합니다. 읽기 전용 프로퍼티는 초기에 값을 할당할 수 있지만, 이후에는 그 값을 변경할 수 없습니다. 다른 값으로 재할당하려고 하면 에러가 발생하게 됩니다.

    ```jsx
    const obj = {
        age: 25,
    };

    Object.defineProperty(obj, 'age', {
        value: 25,
        writable: false,
    });

    console.log(obj.age); // 출력: 25

    obj.age = 30; // 에러: TypeError: Cannot assign to read only property 'age' of object
    ```
    > `age` 프로퍼티는 `Object.defineProperty()`를 사용하여 `writable: false`로 정의되었습니다. 이로 인해 `age` 프로퍼티는 읽기 전용이 되었으며, 값을 변경할 수 없습니다. 따라서 `obj.age = 30`과 같이 재할당을 시도하면 `TypeError`가 발생합니다.

- `enumerable`:
  - 기본 프러퍼티 어트리뷰트 값: `enumerable: true`
  - 프로퍼티가 열거 가능한지 여부를 나타내는 불리언 값입니다.
  - `[[Enumerable]]`의 값이 `false`인 경우, 해당 프로퍼티는 열거 불가능(Non-enumerable) 프로퍼티가 됩니다. 이는 `for...in`문이나 `Object.keys()` 메서드 등을 사용하여 객체의 프로퍼티를 열거할 때 해당 프로퍼티가 포함되지 않음을 의미합니다.
  - 열거 가능한 프로퍼티만이 열거 작업에서 반복되며 접근될 수 있습니다. `[[Enumerable]]` 값이 `false`로 설정된 프로퍼티는 열거 작업에서 제외됩니다.

    ```jsx
    const obj = {
        name: 'John',
        age: 25,
    };

    Object.defineProperty(obj, 'age', {
        enumerable: false,
    });

    for (let key in obj) {
        console.log(key); // 출력: name
    }

    console.log(Object.keys(obj)); // 출력: ["name"]
    ```
    > `age` 프로퍼티는 `Object.defineProperty()`를 사용하여 `enumerable: false`로 정의되었습니다. 이로 인해 `age` 프로퍼티는 열거되지 않으며 `for...in`문이나 `Object.keys()` 메서드로 객체를 열거할 때 포함되지 않습니다. 따라서 `for...in`문의 반복 블록에서는 `name`만 출력되고, `Object.keys()` 메서드의 반환 값은 `["name"]`이 됩니다.

- `configurable`:
  - 기본 프러퍼티 어트리뷰트 값: `configurable: true`
  - 프로퍼티가 재정의 가능한지 여부를 나타내는 불리언 값입니다.
  - `[[Configurable]]`의 값이 false인 경우, 해당 프로퍼티는 변경이 불가능한(non-configurable) 프로퍼티가 됩니다. 이는 프로퍼티의 삭제와 프로퍼티 어트리뷰트 값의 변경을 금지합니다. 단, `[[Writable]]`이 `true`인 경우에는 `[[Value]]`의 변경과 `[[Writable]]`을 `false`로 변경하는 것은 허용됩니다.
  - 프로퍼티가 `[[Configurable]]`: `false`를 갖는다면, 다음과 같은 작업들이 금지됩니다.
    - 프로퍼티 삭제: `delete` 연산자를 사용하여 프로퍼티를 삭제할 수 없습니다.
    - 프로퍼티 어트리뷰트 값 변경: `Object.defineProperty()` 또는 `Object.defineProperties()` 메서드를 사용하여 프로퍼티의 어트리뷰트 값을 변경할 수 없습니다.
  - 하지만 `[[Writable]]`이 `true`인 경우에는 다음과 같은 작업들은 허용됩니다.
    - `[[Value]]` 변경: 해당 프로퍼티의 `[[Value]]` 값을 변경할 수 있습니다.
    - `[[Writable]]` 변경: 해당 프로퍼티의 `[[Writable]]`을 `false`로 변경하여 프로퍼티를 읽기 전용으로 변경할 수 있습니다.
  
  ```jsx
    const obj = {
        age: 25,
    };

    Object.defineProperty(obj, 'age', {
        configurable: false,
    });

    console.log(obj.age); // 출력: 25

    delete obj.age; // 에러: TypeError: Cannot delete property 'age' of #<Object>

    Object.defineProperty(obj, 'age', {
        writable: false,
    });

    obj.age = 30; // 에러: TypeError: Cannot assign to read only property 'age' of object
    ```
    > `age` 프로퍼티는 `Object.defineProperty()`를 사용하여 `configurable: false`로 정의되었습니다. 이로 인해 `age` 프로퍼티는 변경이 불가능한(non-configurable) 프로퍼티가 되었습니다. 따라서 `delete obj.age`와 같이 프로퍼티 삭제를 시도하면 `TypeError`가 발생합니다.
    > 또한, `Object.defineProperty()`를 사용하여 `writable: false`로 설정한 이후에는 `obj.age = 30`과 같이 프로퍼티 값을 변경하려고 하면 역시 `TypeError`가 발생합니다. 하지만, `[[Writable]]`이 `true`이므로 `obj.age`의 `[[Value]]` 값을 변경할 수 있습니다.

<br>

### 16-5-2. 접근자 프로퍼티

-  접근자 프로퍼티(accessor property)는 자체 값을 갖지 않으며, 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수(accessor function)으로 구성된 프로퍼티입니다.
-  접근자 프로퍼티는 `get`과 `set`과 같은 프로퍼티 어트리뷰트를 가지고 있습니다.
-  접근자 프로퍼티는 객체의 상태에 접근하는데 사용되며, 해당 프로퍼티의 값을 읽을 때 `get` 함수가 호출되고, 값을 저장할 때 `set` 함수가 호출됩니다.

```jsx
const obj = {
  firstName: 'John',
  lastName: 'Doe',
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(value) {
    const [firstName, lastName] = value.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  },
};

console.log(obj.fullName); // 출력: John Doe

obj.fullName = 'Jane Smith';
console.log(obj.firstName); // 출력: Jane
console.log(obj.lastName); // 출력: Smith
```
> `fullName`은 접근자 프로퍼티로, 자체 값을 갖지 않고 `get` 함수와 `set` 함수로 구성됩니다. `obj.fullName`을 읽을 때는 `get` 함수가 호출되어 `firstName`과 `lastName` 데이터 프로퍼티의 값을 조합하여 전체 이름을 반환합니다. `obj.fullName`에 값을 할당할 때는 `set` 함수가 호출되어 전체 이름을 받아 `firstName`과 `lastName` 데이터 프로퍼티를 갱신합니다.


**프로퍼티 어트리뷰트: [[Get]]**
- `[[Get]]`은 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수입니다. 즉, 접근자 프로퍼티의 키를 사용하여 프로퍼티 값을 읽을 때, 프로퍼티 어트리뷰트 `[[Get]]`의 값인 `getter` 함수가 호출되고 그 결과가 프로퍼티 값으로 반환됩니다.
- `[[Get]]`을 사용하여 접근자 프로퍼티를 정의하면, 해당 프로퍼티의 값을 읽을 때 특정 동작이 실행되도록 제어할 수 있습니다. 이를 통해 프로퍼티 값에 접근하는 동작을 가로채거나 필요한 추가 동작을 수행할 수 있습니다.

```jsx
const obj = {
  firstName: 'John',
  lastName: 'Doe',
  // fullName은 접근자 프로퍼티로, get 함수를 사용하여 정의
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log(obj.fullName); // 출력: John Doe
```
> `obj.fullName`을 통해 프로퍼티 값을 읽을 때 `[[Get]]`이 호출되고, `get` 함수 내부의 동작이 실행됩니다. 이 경우, `fullName` 프로퍼티를 읽을 때 `firstName`과 `lastName` 값을 조합하여 전체 이름을 반환하도록 설정되어 있습니다


**프로퍼티 어트리뷰트: [[Set]]**
- 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 함수를 접근자 함수(accessor function) 중의 하나인 `setter` 함수라고 합니다. 
- 접근자 프로퍼티의 키로 프로퍼티 값을 저장하면 프로퍼티 어트리뷰트 `[[Set]]`의 값, 즉 `setter` 함수가 호출되고 그 결과로 프로퍼티 값이 저장됩니다.
- `setter` 함수를 사용하여 접근자 프로퍼티를 정의하면, 해당 프로퍼티에 값을 할당할 때 특정 동작이 실행되도록 제어할 수 있습니다. 이를 통해 프로퍼티 값의 할당 동작을 가로채거나 필요한 추가 동작을 수행할 수 있습니다.

```jsx
const obj = {
    firstName: '',
    lastName: '',
    // fullName은 접근자 프로퍼티로, set 함수를 사용하여 정의
    set fullName(value) {
        const [firstName, lastName] = value.split(' ');
        this.firstName = firstName;
        this.lastName = lastName;
    },
};

obj.fullName = 'John Doe';
console.log(obj.firstName); // 출력: John
console.log(obj.lastName); // 출력: Doe
```
> `obj.fullName`에 값을 할당할 때 `[[Set]]`이 호출되고, `set` 함수 내부의 동작이 실행됩니다. 이 경우, `fullName` 프로퍼티에 값을 할당할 때 할당된 값을 분리하여 `firstName`과 `lastName` 데이터 프로퍼티에 저장하도록 설정되어 있습니다.


**접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법**
1. 속성 정의 방식:
    - 데이터 프로퍼티는 직접 값을 할당하는 방식으로 정의됩니다.
    - 접근자 프로퍼티는 get과 set 함수를 사용하여 정의됩니다.
2. 프로퍼티 어트리뷰트:
    - 데이터 프로퍼티는 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]과 같은 프로퍼티 어트리뷰트를 갖습니다.
    - 접근자 프로퍼티는 [[Get]], [[Set]], [[Enumerable]], [[Configurable]]과 같은 프로퍼티 어트리뷰트를 갖습니다.
3. 프로퍼티 값 접근 방식:
    - 데이터 프로퍼티는 프로퍼티 값에 직접 접근하여 값을 읽거나 수정할 수 있습니다. (obj.property)
    - 접근자 프로퍼티는 접근자 함수(get과 set)를 통해 프로퍼티 값을 읽거나 수정할 수 있습니다. (obj.property)

```jsx
// 16-7
// 일반 객체의 __prototype__는 접근자 프로퍼티다.
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
```
> 위는 `Object.prototype` 객체의 `__proto__` 프로퍼티에 대한 프로퍼티 디스크립터를 가져오는 예제입니다. `Object.getOwnPropertyDescriptor()` 메서드를 사용하여 프로퍼티 디스크립터를 얻을 수 있습니다. 이를 통해 `__proto__` 프로퍼티의 어트리뷰트들을 확인할 수 있습니다.

```jsx
// 16-7
// 함수 객체의 prototype은 데이터 프로퍼티다.
Object.getOwnPropertyDescriptor(fucntion(){}, 'prototype');
```
> 빈 함수 객체(`function(){}`)의 `prototype` 프로퍼티에 대한 프로퍼티 디스크립터를 가져오는 예제입니다. 마찬가지로 `Object.getOwnPropertyDescriptor()` 메서드를 사용하여 프로퍼티 디스크립터를 확인할 수 있습니다. `prototype` 프로퍼티가 데이터 프로퍼티인 경우, `[[Value]]`에 값이 정의되어 있을 것입니다.


**프로토타입(prototype)**
- 객체 지향 프로그래밍에서 객체 간의 상속을 구현하기 위한 메커니즘입니다. 
- 모든 JavaScript 객체는 다른 객체를 상속하는 프로토타입을 가지며, 이 프로토타입은 객체의 속성과 메서드를 공유할 수 있게 해줍니다.
- 객체의 프로토타입은 [[Prototype]]이라는 내부 슬롯을 통해 참조됩니다. [[Prototype]] 내부 슬롯은 객체를 생성할 때 자동으로 설정되며, 프로토타입 체인을 형성하는데 사용됩니다. 객체의 프로토타입은 다른 객체나 null 중 하나일 수 있습니다.

**프로토타입 체인**
- 프로토타입 체인은 객체에서 프로퍼티나 메서드를 찾을 때 사용되는 메커니즘입니다. 
- 해당 객체에서 프로퍼티나 메서드를 찾지 못하면, 자동으로 상위 프로토타입으로 이동하여 탐색을 계속합니다. 
- 이 과정은 프로토타입 체인을 따라 최상위 프로토타입인 Object.prototype까지 이동하거나, 찾는 프로퍼티나 메서드를 발견할 때까지 진행됩니다.

> 프로토타입을 사용하면 객체 간에 코드를 재사용하고 상속을 구현할 수 있으며, 프로토타입 체인을 통해 객체가 속성과 메서드를 상속하고 확장할 수 있습니다. 프로토타입을 사용하여 객체를 생성하면 해당 객체는 프로토타입의 프로퍼티와 메서드를 공유하며, 이를 통해 객체 간에 정보 및 동작을 공유할 수 있습니다.

<br>

## 16-4. 프로퍼티 정의

```jsx
const obj = {};

// 프로퍼티 디스크립터 객체를 사용하여 프로퍼티 정의
Object.defineProperty(obj, 'name', {
    value: 'John',
    writable: false,
    enumerable: true,
    configurable: true,
});

console.log(obj.name); // 출력: John
```
> `name` 프로퍼티는 읽기 전용이며, 열거 가능하고, 재정의 가능한 프로퍼티로 정의되었습니다.

- 프로퍼티 정의는 새로운 프로퍼티를 추가하거나 기존 프로퍼티의 어트리뷰트를 명시적으로 정의하거나 재정의하는 작업을 말합니다.
- `Object.defineProperty()` 메서드를 사용하면 객체의 프로퍼티 어트리뷰트를 정의할 수 있습니다.
  - 이 메서드는 객체의 참조, 프로퍼티의 키로 사용할 문자열, 그리고 프로퍼티 디스크립터 객체를 인수로 전달합니다.
  - 프로퍼티 디스크립터 객체는 해당 프로퍼티의 어트리뷰트를 설정하는 데 사용됩니다.
- `Object.defineProperty()` 메서드를 사용하여 프로퍼티를 정의할 때, 프로퍼티 디스크립터 객체의 일부 프로퍼티를 생략할 수도 있습니다. 생략된 프로퍼티는 기본값이 적용됩니다.
  - 예를 들어, `Object.defineProperty()` 메서드를 사용하여 `name`이라는 프로퍼티를 정의할 때 `value`와 `writable` 등의 프로퍼티를 생략하면, 기본적으로 `value`는 `undefined`, `writable`은 `false`로 설정됩니다.

    ```jsx
    const obj = {};

    // 프로퍼티 디스크립터 객체를 사용하여 프로퍼티 정의 (value와 writable 생략)
    Object.defineProperty(obj, 'name', {
    enumerable: true,
    configurable: true,
    });

    console.log(obj.name); // 출력: undefined
    console.log(Object.getOwnPropertyDescriptor(obj, 'name'));
    /*
    출력:
    {
        value: undefined,
        writable: false,
        enumerable: true,
        configurable: true
    }
    */
    ```

- `Object.defineProperty()` 메서드는 한 번에 하나의 프로퍼티만 정의할 수 있습니다. 이러한 제약을 극복하기 위해 O`bject.defineProperties()` 메서드가 제공됩니다. `Object.defineProperties()` 메서드를 사용하면 한 번에 여러 개의 프로퍼티를 한꺼번에 정의할 수 있습니다.
  - `Object.defineProperties()` 메서드는 첫 번째 인수로 프로퍼티를 정의할 객체를, 두 번째 인수로 프로퍼티 이름과 프로퍼티 디스크립터를 담은 객체를 받습니다. 각 프로퍼티 이름은 프로퍼티 디스크립터 객체와 매핑됩니다. 이를 통해 한 번의 호출로 여러 개의 프로퍼티를 정의할 수 있습니다.

    ```jsx
    const obj = {};

    Object.defineProperties(obj, {
        name: {
            value: 'John',
            writable: false,
            enumerable: true,
            configurable: true,
        },
        age: {
            value: 30,
            writable: true,
            enumerable: true,
            configurable: true,
        },
    });

    console.log(obj.name); // 출력: John
    console.log(obj.age); // 출력: 30
    ```
    > `Object.defineProperties()` 메서드를 사용하여 `name`과 `age` 프로퍼티를 동시에 정의하고 프로퍼티 어트리뷰트를 설정하였습니다. 이를 통해 한 번의 호출로 두 개의 프로퍼티를 정의할 수 있습니다. 이후에 `obj.name`과 `obj.age`를 통해 해당 프로퍼티 값을 확인할 수 있습니다.

```jsx
// 16-9
const person = {}

Object.defineProperties(person, {
    // 데이터 프로퍼티 정의
    firstName: {
        value: 'Crockford',
        writable: true,
        enumerable: true,
        configurable: true,
    },
    lastName: {
        value: 'Douglas',
        writable: true,
        enumerable: true,
        configurable: true,
    },
    // 접근자 프로퍼티 정의
    fullName:{
        // getter 함수
        get(){
            return `${this.firstName}${this.lastName}`
        },
        // setter 함수
        set(name){
            [this.firstName, this.lastName] = name.split(' ');
        },
        enumerable: true,
        configurable: true
    }
})

person.fullName = 'Douglas Crockford'
console.log(person)
```

<br>

## 16-5. 객체 변경 방지

- 객체는 변경 가능한 값이므로 재할당 없이 직접 변경할 수 있습니다. `Object.defineProperty()` 또는 `Object.defineProperties()` 메서드를 사용하여 프로퍼티 어트리뷰트를 명시적으로 정의하거나 재정의할 수 있습니다. 이를 통해 프로퍼티의 속성을 변경하거나 접근자 프로퍼티로 변환할 수 있습니다.

    ```jsx
    Object.defineProperty(obj, 'name', {
        writable: false, // 프로퍼티를 읽기 전용으로 변경
    });
    ```

- 자바스크립트에서는 객체의 변경을 방지하기 위해 다양한 메서드를 제공합니다. 이러한 메서드들은 객체의 변경을 금지하는 강도가 다를 수 있습니다.

|                	|             메서드            	| 프로퍼티 추가 	| 프로퍼티 삭제 	| 프로퍼티 값 읽기 	| 프로퍼티 값 쓰기 	| 프로퍼티 어트리뷰트 재정의 	|
|----------------	|:-----------------------------:	|:-------------:	|:-------------:	|:----------------:	|:----------------:	|:--------------------------:	|
| 객체 확장 금지 	| Object.preventExtensions(obj) 	|       X       	|       O       	|         O        	|         O        	|              O             	|
| 객체 밀봉      	| Object.seal(obj)              	|       X       	|       X       	|         O        	|         O        	|              X             	|
| 객체 동결      	| Object.freeze(obj)            	|       X       	|       X       	|         O        	|         X        	|              X             	|

<br>

### 16-5-1. 객체 확장 금지
- `Object.preventExtensions(obj)` 메서드는 객체의 확장을 금지하여 새로운 프로퍼티의 추가를 막는 역할을 합니다. 이 메서드를 사용하면 해당 객체에는 새로운 프로퍼티를 추가할 수 없게 됩니다.
- 하지만 `Object.preventExtensions(obj)` 메서드를 호출하여 객체의 확장을 방지하더라도 이미 존재하는 프로퍼티의 값은 수정할 수 있습니다. 즉, 프로퍼티 값을 갱신하는 것은 허용됩니다.
- 확장이 가능한 객체인지 여부는 `Object.isExtensible(obj)` 메서드로 확인할 수 있습니다.

```jsx
// 16-10
const obj = {
    name: 'John',
    age: 30,
};

Object.preventExtensions(obj); // 객체의 확장 금지

obj.name = 'Jane'; // 프로퍼티 값 갱신은 허용됨

obj.height = 180; // 새로운 프로퍼티 추가는 금지됨

console.log(Object.isExtensible(obj)); // 출력: false
```

<br>

### 16-5-2. 객체 밀봉
- `Object.seal(obj)` 메서드를 사용하면 객체를 밀봉(Seal)하여 객체의 확장을 막고, 프로퍼티의 삭제와 프로퍼티 어트리뷰트의 재정의를 방지합니다.
- 일반적으로 `Object.seal(obj)` 메서드를 호출하기 전에 `Object.preventExtensions(obj)` 메서드를 사용하여 객체의 확장을 금지하는 것이 권장됩니다. 그런 다음, `Object.seal(obj)` 메서드를 호출하여 객체를 밀봉합니다.
- 밀봉된(sealed) 객체의 프로퍼티는 삭제할 수 없으며, 프로퍼티 어트리뷰트를 재정의할 수 없습니다. 하지만 프로퍼티의 값은 변경할 수 있습니다.
- 밀봉된 객체인지 여부는 `Object.isSealed(obj)` 메서드로 확인할 수 있습니다.

```jsx
// 16-11
const obj = {
    name: 'John',
    age: 30,
};

Object.preventExtensions(obj); // 객체의 확장 금지

Object.seal(obj); // 객체 밀봉

delete obj.age; // 프로퍼티 삭제는 허용되지 않음

Object.defineProperty(obj, 'name', { enumerable: false }); // 프로퍼티 어트리뷰트 재정의는 허용되지 않음

obj.name = 'Jane'; // 프로퍼티 값 갱신은 허용됨

console.log(Object.isSealed(obj)); // 출력: true

```

<br>

### 16-5-3. 객체 동결
- `Object.freeze(obj)` 메서드를 사용하면 객체를 동결(Freeze)하여 객체의 프로퍼티를 변경할 수 없도록 만듭니다. 
- `Object.seal(obj)`를 호출한 후에 모든 프로퍼티의 `writable` 속성을 `false`로 설정하는 것과 같은 효과를 가지며, 프로퍼티 값이 객체인 경우 해당 객체의 변경도 방지됩니다.
- 동결된 객체의 프로퍼티는 값을 변경할 수 없으며, 프로퍼티의 어트리뷰트를 재정의할 수 없습니다. 또한, 프로퍼티 값이 객체인 경우에도 해당 객체의 변경이 방지됩니다.
- 동결된 객체인지 여부는 `Object.isFrozen(obj)` 메서드로 확인할 수 있습니다.

```jsx
const obj = {
    name: 'John',
    age: 30,
    address: {
        city: 'New York',
        country: 'USA',
    },
};

Object.seal(obj); // 객체 밀봉

Object.freeze(obj); // 객체 동결

obj.name = 'Jane'; // 프로퍼티 값 변경은 허용되지 않음

delete obj.age; // 프로퍼티 삭제는 허용되지 않음

obj.address.city = 'Los Angeles'; // 중첩된 객체의 변경도 방지됨

console.log(Object.isFrozen(obj)); // 출력: true
```

<br>

### 16-5-4. 불변 객체

- 변경 방지 메서드들인 `Object.preventExtensions()`, `Object.seal()`, `Object.freeze()`은 얕은 변경 방지(Shallow Only)로 작동합니다. 이는 직속 프로퍼티만 변경을 방지하며 중첩 객체까지는 영향을 주지 못합니다.
- 따라서 `Object.freeze()` 메서드를 사용하여 객체를 동결하더라도 중첩 객체까지 동결되지 않습니다. 동결된 객체의 프로퍼티 값이 객체인 경우에는 해당 객체의 변경을 방지하지 않습니다.

```jsx
const obj = {
    name: 'John',
    address: {
        city: 'New York',
        country: 'USA',
    },
};

Object.freeze(obj);

obj.name = 'Jane'; // 변경 방지됨
obj.address.city = 'Los Angeles'; // 중첩 객체는 변경 방지되지 않음

console.log(obj); // 출력: { name: 'John', address: { city: 'Los Angeles', country: 'USA' } }
```

<br>

## 요약


<br>

## 키워드

<br>

## Reference