# 10장. 객체 리터럴

**[목차]**
10장. 객체 리터럴
- [10장. 객체 리터럴](#10장-객체-리터럴)
  - [10-1. 객체란?](#10-1-객체란)
  - [10-2. 객체 리터럴에 의한 객체 생성](#10-2-객체-리터럴에-의한-객체-생성)
  - [10-3. 프로퍼티](#10-3-프로퍼티)
  - [10-4. 메서드](#10-4-메서드)
  - [10-5. 프로퍼티 접근](#10-5-프로퍼티-접근)
  - [10-6. 프로퍼티 값 갱신](#10-6-프로퍼티-값-갱신)
  - [10-7. 프로퍼티 동적 생성](#10-7-프로퍼티-동적-생성)
  - [10-8. 프로퍼티 삭제](#10-8-프로퍼티-삭제)
  - [10-9. ES6에서 추가된 객체 리터럴의 확장 기능](#10-9-es6에서-추가된-객체-리터럴의-확장-기능)
  - [자바스크립트는 객체지향 프로그래밍(OOP)을 완벽하게 구현한 언어가 아닌 이유](#자바스크립트는-객체지향-프로그래밍oop을-완벽하게-구현한-언어가-아닌-이유)
  - [요약](#요약)
  - [키워드](#키워드)
  - [Reference](#reference)

<br>

## 10-1. 객체란?
- 자바스크립트에서 변경 불가능한 값인 원시 타입(primitive types)을 제외한 모든 것(함수, 배열, 정규표현식 등)은 객체로 취급됩니다.
  - 원시 타입(primitive types)은 숫자(Number), 문자열(String), 불리언(Boolean), null, undefined, 심볼(Symbol)로 구성되며, 이러한 원시 타입은 객체가 아닙니다.
  - 그러나 숫자, 문자열, 불리언 등도 객체처럼 동작할 수 있습니다. 이러한 기본 타입에는 `래퍼(wrapper)` 객체인 `Number`, `String`, `Boolean` 등이 있어 객체처럼 속성과 메서드를 사용할 수 있습니다.
    ```jsx
    let message = 'Hello, World!'; // 문자열 생성

    // String 객체의 메서드 사용
    console.log(message.length); // length 속성에 접근
    console.log(message.toUpperCase()); // toUpperCase() 메서드 호출
    console.log(message.substring(0, 5)); // substring() 메서드 호출

    // String 객체의 속성 사용
    console.log(message.constructor); // constructor 속성에 접근
    console.log(message.valueOf()); // valueOf() 메서드 호출
    ```
    위 예제 코드에서 `message` 변수는 문자열입니다. 이 문자열은 원시 타입이지만, 자바스크립트는 `String` 객체의 속성이나 메서드를 사용할 때 암묵적으로 `String` 객체로 변환합니다. `String` 객체의 속성과 메서드를 사용함으로써, 자바스크립트에서 문자열에 대해 다양한 작업을 수행할 수 있습니다.
- 원시 타입은 단 하나의 값만 나타내지만 객체 타입(object/reference type)은 다양한 타입의 값(원시 값 또는 다른 객체)을 하나의 단위로 구성한 복합적인 자료 구조(data structure)입니다.
- 원시 타입의 값은 변경 불가능한 값(immutable value)이지만 객체 타입의 값은 변경 가능한 값(mutable value)입니다.
  - 이러한 특성으로 원시 타입의 변수를 다른 변수에 할당하면 해당 값이 복사되어 새로운 변수에 저장됩니다. 반면 객체 타입의 변수를 다른 변수에 할당하면 참조가 복사되어 새로운 변수도 같은 객체를 참조하게 됩니다.
    ```jsx
    // 원시 타입 (변경 불가능한 값)
    let numberValue = 5;
    numberValue = 10; // 새로운 값을 할당

    let stringValue = "Hello";
    stringValue = "Hi"; // 새로운 값을 할당

    // 객체 타입 (변경 가능한 값)
    let objectValue = { name: "B" };
    objectValue.age = 30; // 새로운 속성 추가
    objectValue.name = "Jane"; // 기존 속성 값 변경
    delete objectValue.age; // 속성 제거
    ```
- 객체를 생성하는 다양한 방법
  - **객체 리터럴(Object Literal)**
    - 객체 리터럴은 중괄호({})를 사용하여 객체를 생성하는 방법입니다. 속성-값 쌍을 포함하고 있습니다.
        ```jsx
        const obj = { 
            property1: value1,
            property2: value2,
            // ...
        };
        ```
  - **Object 생성자 함수**
    - JavaScript에 내장된 Object 생성자 함수를 사용하여 객체를 생성할 수 있습니다.
        ```jsx
        const obj = new Object();
        obj.property1 = value1;
        obj.property2 = value2;
        // ...
        ```
  - **생성자 함수(Constructor Function)**
    - 사용자 정의 생성자 함수를 작성하여 객체를 생성할 수 있습니다. 생성자 함수는 new 키워드와 함께 호출됩니다.
        ```jsx
        function MyObject(property1, property2) {
            this.property1 = property1;
            this.property2 = property2;
            // ...
        }

        const obj = new MyObject(value1, value2);
        ```
  - **Object.create() 메서드**
    - Object.create() 메서드를 사용하여 새 객체를 생성하고, 해당 객체의 프로토타입을 다른 객체로 지정할 수 있습니다.
        ```jsx
        const prototypeObj = {
        // ...
        };

        const obj = Object.create(prototypeObj);
        obj.property1 = value1;
        obj.property2 = value2;
        // ...
        ```
  - **클래스 (ES6 이상)**
    - ES6부터 도입된 클래스를 사용하여 객체를 생성할 수 있습니다. 클래스는 생성자 함수를 정의하고, 프로토타입 기반 상속과 같은 기능을 제공합니다.
        ```jsx
        class MyClass {
            constructor(property1, property2) {
                this.property1 = property1;
                this.property2 = property2;
                // ...
            }
            // ...
        }

        const obj = new MyClass(value1, value2);
        ```

- 자바스크립트는 객체지향 프로그래밍(OOP)을 완벽하게 구현한 언어는 아니지만, 객체와 프로토타입 기반의 특징을 가지고 있어 객체지향적인 프로그래밍을 수행할 수 있습니다. 또한, ES6(ES2015)부터는 객체를 생성하고 상속할 수 있는 `클래스(Class)`와 `extends` 키워드를 도입하여 좀 더 명시적인 객체지향 프로그래밍을 지원합니다.
  - 객체 지향 프로그래밍에서 객체는 클래스(Class)와 인스턴스(Instance)를 포함합니다.
    - 클래스(Class)는 객체를 생성하기 위한 템플릿 또는 청사진으로 생각할 수 있습니다. 클래스는 객체의 속성(attribute)과 메서드(method)를 정의합니다. 속성은 객체의 상태를 나타내는 변수들이며, 메서드는 객체의 동작을 정의하는 함수들입니다. 클래스는 객체를 생성하기 위한 설계도 역할을 합니다.
    - 인스턴스(Instance)는 클래스의 실체화된 개별 객체입니다. 클래스로부터 생성된 객체는 인스턴스라고도 부릅니다. 클래스를 기반으로 만들어진 인스턴스는 클래스에 정의된 속성과 메서드를 상속받습니다. 각 인스턴스는 독립적인 상태를 가지며, 동일한 클래스로부터 생성되었더라도 각각의 인스턴스는 서로 다른 데이터를 가질 수 있습니다.
    ```jsx
    class Car {
        constructor(make, model) {
            this.make = make;
            this.model = model;
        }

        start() {
            console.log('The car has started.');
        }

        stop() {
            console.log('The car has stopped.');
        }
    }

    // Car 클래스로부터 두 개의 인스턴스 생성
    let car1 = new Car('Honda', 'Civic');
    let car2 = new Car('Toyota', 'Corolla');

    console.log(car1.make); // 'Honda' 출력
    console.log(car2.model); // 'Corolla' 출력

    car1.start(); // 'The car has started.' 출력
    car2.stop(); // 'The car has stopped.' 출력
    ```
    > 클래스는 객체를 생성하기 위한 설계도이고, 인스턴스는 실제로 그 설계도를 바탕으로 만들어진 객체입니다. 객체 지향 프로그래밍에서 객체는 클래스와 인스턴스를 포함하여 상태와 동작을 하나의 단위로 구조화하는 개념입니다.
- 객체의 속성(property)은 키와 값으로 구성됩니다.
  - 키는 문자열 형태이며, 값은 어떤 데이터 타입이든 될 수 있습니다. 속성(property)은 객체의 상태를 나타내며, 객체의 속성이나 기능을 정의합니다.
    ```jsx
    let object = {
        key1: value1,
        key2: value2,
        // 추가적인 프로퍼티들...
    };
    ```
  - 자바스크립트에서 함수는 객체이므로, 다른 데이터 타입과 마찬가지로 속성(property)으로 사용할 수 있습니다. 함수를 속성 값으로 할당하면 해당 함수는 객체의 메서드(method)로 사용될 수 있습니다. 메서드는 객체에 속한 함수로서, 해당 객체의 상태를 참조하거나 수정하는 동작을 수행합니다.
    ```jsx
    let zoo = {
        name: 'London Zoo', // 문자열 타입의 값으로 name 프로퍼티 정의
        numberOfAnimals: 20329, // 숫자 타입의 값으로 numberOfAnimals 프로퍼티 정의
        isSale: false, // 불리언 타입의 값으로 isSale 프로퍼티 정의
        address: {
            street: 'NW1 4RY', // 문자열 타입의 값으로 address 객체의 street 프로퍼티 정의
            city: 'London' // 문자열 타입의 값으로 address 객체의 city 프로퍼티 정의
        },
        sayHello: function() { // 함수 타입으로 sayHello 메서드 정의
            console.log('Hello!');
        }
    };
    ```
  - 자바스크립트 함수는 일급 객체(First-class object)이므로 값으로 취급할 수 있습니다.
    <details>
        <summary>일급 객체(First-class object)</summary>
        일급 객체(First-class object)는 프로그래밍 언어에서 다음과 같은 특징을 갖는 객체를 가리킵니다. 
        
        1. 변수에 할당할 수 있어야 합니다.
        2. 다른 함수의 인자로 전달할 수 있어야 합니다.
        3. 다른 함수의 반환값으로 사용할 수 있어야 합니다.
        4. 동적으로 프로퍼티를 할당할 수 있어야 합니다.
    </details>
    
    - 자바스크립트에서 함수는 변수에 할당할 수 있고, 다른 함수의 인자로 전달할 수 있으며, 다른 함수의 반환값으로 사용할 수 있습니다. 또한, 함수는 객체이기 때문에 동적으로 프로퍼티를 할당할 수 있습니다.
        ```jsx
        // 1. 변수에 할당
        let add = function(a, b) {
            return a + b;
        };

        // 2. 다른 함수의 인자로 전달
        function executeOperation(operation, a, b) {
            return operation(a, b);
        }

        let result = executeOperation(add, 3, 5); // add 함수를 executeOperation 함수의 인자로 전달
        console.log(result); // 8 출력

        // 3. 다른 함수의 반환값으로 사용
        function createMultiplier(factor) {
            return function(number) {
                return number * factor;
            };
        }

        let double = createMultiplier(2); // createMultiplier 함수가 함수를 반환
        result = double(7); // 반환된 함수를 호출하여 사용
        console.log(result); // 14 출력

        // 4. 동적으로 프로퍼티 할당
        add.language = 'JavaScript';
        console.log(add.language); // 'JavaScript' 출력
        ```
- 상태와 동작을 하나의 단위로 구조화할 수 있어 유용합니다.
  - 객체는 데이터와 해당 데이터를 조작하는 동작을 함께 포함하는 개념적인 컨테이너입니다. 객체를 사용하면 관련된 데이터와 동작을 논리적으로 그룹화하여 하나의 단위로 구조화할 수 있습니다.
  - **상태**는 객체의 데이터를 나타내며, 객체의 속성(attribute)으로 표현됩니다. 객체의 속성은 객체가 가진 특징, 특성, 상태를 나타내는 변수로 볼 수 있습니다.
  - **동작**은 객체의 기능이나 동작을 나타내며, 객체의 메서드(method)로 표현됩니다. 메서드는 객체가 수행하는 작업이나 동작을 정의하는 함수로 볼 수 있습니다.
 
<br>

## 10-2. 객체 리터럴에 의한 객체 생성
- 객체 리터럴에 의한 객체 생성은 중괄호(`{}`)를 사용하여 객체를 정의하는 방법입니다.
  - 객체 리터럴 내에는 0개 이상의 프로퍼티를 정의할 수 있습니다. 
  - 프로퍼티는 키(key)와 값(value)의 쌍으로 구성되며, 키는 문자열이나 심벌 값이 될 수 있습니다.
- 객체 리터럴을 변수에 할당할 때, 자바스크립트 엔진은 객체 리터럴을 해석하여 객체를 생성합니다. 객체 리터럴을 평가하는 시점에 객체가 생성되며, 이후에는 해당 변수를 통해 객체에 접근할 수 있습니다.
  ```jsx
    // 객체 리터럴을 사용하여 person 객체를 생성
    // : 객체 리터럴 내에는 name과 age라는 프로퍼티를 정의하였고, sayHello라는 메서드를 추가하였습니다.
    let person = {
        name: 'B',
        age: 30,
        sayHello: function() {
            console.log('Hello, my name is ' + this.name);
        }
    };

    console.log(person.name); // 출력: 'B' - person.name을 통해 name 프로퍼티에 접근
    person.sayHello(); //  출력: 'Hello, my name is B' - person.sayHello()를 호출하여 메서드를 실행
  ```
- 객체 리터럴 내에 프로퍼티를 정의하지 않으면 빈 객체가 생성됩니다.
  ```jsx
  // 책 예제 10-2
  var empty = {} // 빈 객체
  console.log(typeof empty) // object
  ```
- 객체 리터럴을 사용하면 클래스를 먼저 정의하고 `new 연산자`를 사용하여 객체를 생성할 필요가 없습니다.
- 프로퍼티를 포함하여 객체를 생성하거나, 객체를 생성한 이후에 동적으로 프로퍼티를 추가할 수 있습니다.

<br>

## 10-3. 프로퍼티
- 프로퍼티는 키(key)와 값(value)으로 구성됩니다.
- 프로퍼티를 나열할 때는 쉼표(`,`)로 구분하여 작성합니다.
- 프로퍼티 키와 프로퍼티 값으로 사용할 수 있는 값은 다양합니다.
  - 프로퍼티 키는 식별자 네이밍 규칙을 따르지 않아도 됩니다. 심지어 숫자나 기타 특수 문자도 프로퍼티 키로 사용할 수 있습니다. 그러나 일반적으로 문자열을 가장 많이 사용합니다.
  - 프로퍼티 값은 어떤 데이터 타입이든 될 수 있습니다.
- 프로퍼티 키로 식별자 네이밍 규칙을 따르지 않는 값이 사용될 때와 식별자 네이밍 규칙을 따르는 값이 사용될 때에는 미묘한 차이가 있을 수 있습니다.
  - 일반적으로, 식별자 네이밍 규칙을 따르는 값은 따옴표 없이 사용하고 접근할 수 있습니다. 이는 값이 유효한 식별자로 취급되어 변수명과 동일한 역할을 할 수 있기 때문입니다. 반면에 프로퍼티 키로 식별자 네이밍 규칙을 따르지 않는 값이 사용될 때에는 해당 키를 따옴표로 감싸야 합니다. 이는 값이 식별자로 해석되지 않고 문자열로 취급되어야 함을 나타내기 위한 것입니다.
    ```jsx
    // 식별자 네이밍 규칙을 따르는 프로퍼티 키
    let obj = {
        name: 'B',
        age: 30
    };

    console.log(obj.name); // 'B' 출력
    console.log(obj.age); // 30 출력
    ```
    ```jsx
    // 식별자 네이밍 규칙을 따르지 않는 프로퍼티 키
    // : 숫자를 프로퍼티 키로 사용할 때는 따옴표로 감싸야 합니다
    let obj = {
        '42': 'Age'
    };

    console.log(obj['42']); // 'Age' 출력
    ```

- 심벌(Symbol) 값도 프로퍼티 키로 사용할 수 있습니다. 심벌은 고유하고 변경 불가능한 값으로, 다른 어떤 심벌 값과도 일치하지 않습니다.
  - 심벌 값을 프로퍼티 키로 사용할 때에는 대괄호(`[]`)를 사용하여 접근해야 합니다.
    ```jsx
    let key = Symbol('uniqueKey');

    let obj = {
        [key]: 'Symbol Property'
    };

    console.log(obj[key]); // 'Symbol Property' 출력
    ```

- 문자열 또는 문자열로 평가되는 표현식을 사용하여 프로퍼티 키를 동적으로 결정할 수 있습니다.
    ```jsx
    let key1 = 'name';
    let key2 = 42;

    let obj = {
        [key1]: 'B', // 동적으로 결정된 프로퍼티 키
        [key2]: 'Age' // 동적으로 결정된 프로퍼티 키
    };

    console.log(obj.name); // 'B' 출력
    console.log(obj[42]); // 'Age' 출력
    ```

    <details>
        <summary>계산된 프로퍼티 이름(computed property name)</summary>

    계산된 프로퍼티 이름(Computed property name)은 프로퍼티 키를 동적으로 생성하기 위해 사용되는 기능입니다.
    계산된 프로퍼티 이름은 객체 리터럴 내부에서 대괄호([])를 사용하여 작성됩니다. 대괄호 내에는 프로퍼티 키를 결정하기 위한 표현식을 작성할 수 있습니다.

    ```jsx
    let prefix = 'pre';
    let suffix = 'fix';
    let counter = 0;

    let obj = {
        // 대괄호 내에 표현식을 사용하여 계산된 프로퍼티 이름을 작성
        [prefix + suffix]: 'Computed Property Name', // 계산된 프로퍼티 이름
        ['prop' + ++counter]: counter // 계산된 프로퍼티 이름과 표현식
        // [prefix + suffix]는 prefixfix라는 문자열을 프로퍼티 키로 가지고 있으며, ['prop' + ++counter]는 prop1이라는 프로퍼티 키를 가지고 있습니다.
    };

    console.log(obj['prefixfix']); // 'Computed Property Name' 출력
    console.log(obj.prop1); // 1 출력
    ```

    계산된 프로퍼티 이름은 객체 리터럴 내부뿐만 아니라, 객체의 프로퍼티를 동적으로 정의할 때에도 사용될 수 있습니다.

    ```jsx
    let obj = {};

    // addProperty 함수를 통해 객체 obj의 프로퍼티를 동적으로 정의
    function addProperty(key, value) {
        obj[key] = value; // obj[key] = value와 같이 대괄호 내에 변수 key를 사용하여 계산된 프로퍼티 이름을 설정
    }

    addProperty('dynamicKey', 'Dynamic Property');
    console.log(obj.dynamicKey); // 'Dynamic Property' 출력
    ```
    </details>


<br>

## 10-4. 메서드
- 메서드(Method)는 객체의 프로퍼티 값으로 함수가 할당된 경우를 의미합니다. 즉, 객체에 속한 함수를 메서드라고 부릅니다.
    ```jsx
    let person = {
        name: 'B',
        age: 30,
        // sayHello은 person 객체의 메서드
        sayHello: function() {
            console.log('Hello, my name is ' + this.name);
        }
    };

    person.sayHello(); // 'Hello, my name is B' 출력
    ```
- 메서드는 객체에 묶여있기 때문에 해당 객체의 상태를 참조하거나 수정할 수 있습니다.
- 메서드 내부에서 `this` 키워드를 사용하여 해당 메서드를 호출한 객체에 접근할 수 있습니다.
- 메서드를 사용함으로써 객체의 동작을 캡슐화하고 객체의 상태를 참조 또는 수정하는 동작을 구현할 수 있습니다. 객체 지향 프로그래밍에서는 객체의 상태와 동작을 함께 묶어 객체의 책임을 구성하는 것을 지향하는데, 메서드를 사용하여 이러한 책임을 객체 내부로 캡슐화할 수 있습니다.
  - 객체의 상태를 나타내는 데이터와 해당 데이터를 조작하는 동작을 함께 묶어 관리하는 것이 객체 지향 프로그래밍의 핵심 개념입니다. 객체의 상태를 캡슐화하고 외부에서 직접 접근하지 못하도록 보호함으로써 데이터의 일관성과 무결성을 유지할 수 있습니다.
    - 메서드를 사용하면 객체의 상태에 접근하거나 상태를 수정하기 위한 동작을 객체 내부로 캡슐화할 수 있습니다. 메서드는 객체에 속한 함수로써 객체의 상태를 참조하거나 수정하는 데 필요한 로직을 구현할 수 있습니다. 이를 통해 객체의 캡슐화와 정보 은닉을 달성하고, 외부에서 객체의 상태를 무작위로 변경하는 것을 방지할 수 있습니다.
        <details>
            <summary>객체 지향 프로그래밍(OOP)</summary>
        객체 지향 프로그래밍은 객체를 기반으로 한 모듈화, 추상화, 상속 등의 개념을 활용하여 프로그램을 구조화하는 방법론입니다. 객체의 상태와 동작을 함께 묶어 객체의 책임을 지정함으로써 코드의 가독성과 재사용성을 높이고, 유지보수를 용이하게 합니다. 
        </details>
- ES6부터는 메서드 축약 표현(Method Shorthand)을 사용하여 객체 리터럴의 메서드를 간편하게 정의할 수 있습니다.
    ```jsx
    let person = {
        name: 'B',
        age: 30,
        sayHello() { // 메서드 축약 표현
            console.log('Hello, my name is ' + this.name);
        }
    };

    person.sayHello(); // 'Hello, my name is B' 출력
    ```
  - 메서드 축약 표현 시 함수 키워드인 `function`과 콜론(`:`)을 생략하고 메서드 이름과 함수 바디만 작성하면 됩니다.
  - 메서드 축약 표현 시 자동으로 함수의 이름은 메서드의 이름으로 설정됩니다.
  - 메서드 축약 표현은 객체 리터럴 내에서만 사용할 수 있으며, 일반 함수나 메서드 외부에서는 사용할 수 없습니다.
  - 메서드 축약 표현을 사용하여 메서드를 정의하면 해당 메서드는 객체의 프로퍼티로 할당되며, 객체의 다른 프로퍼티와 동일한 방식으로 접근할 수 있습니다.

<br>

## 10-5. 프로퍼티 접근
|   | 프로퍼티 접근 방법             |                                            |
|:-:|--------------------------------|--------------------------------------------|
| 1 | 마침표 표기법(dot notation)    | 마침표 프로퍼티 접근 연산자(`.`)을 사용    |
| 2 | 대괄호 표기법(braket notation) | 대괄호 프로퍼티 접근 연산자( `[]` )을 사용 |
- 대괄호 표기법을 사용하는 경우 대괄호 프러퍼티 연산자 내부에 지정하는 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 한다.
- 객체에 존재하지 않는 프로퍼티에 접근하면 `undefined` 를 반환한다.

<br>

## 10-6. 프로퍼티 값 갱신
- 이미 존재하는 프로퍼티에 새로운 값을 할당하면 해당 프로퍼티의 값이 갱신됩니다. 객체의 프로퍼티는 변수와 유사하게 동작하여 값을 변경할 수 있습니다.
- 프로퍼티 값 갱신은 이미 존재하는 프로퍼티에 대해서만 적용됩니다.
- 존재하지 않는 프로퍼티에 값을 할당하면 해당 프로퍼티가 생성되며, 이미 존재하는 프로퍼티에 값을 할당하면 해당 프로퍼티의 값이 갱신됩니다.

```jsx
let obj = {
  name: 'B',
  age: 30
};

console.log(obj); // { name: 'B', age: 30 } 출력

obj.age = 40; // 프로퍼티 값 갱신

console.log(obj); // { name: 'B', age: 40 } 출력
```

<br>

## 10-7. 프로퍼티 동적 생성
- 객체의 프로퍼티 값은 언제든지 변경할 수 있으므로, 객체를 사용하여 동적인 데이터를 표현하거나 상태를 관리할 수 있습니다. 
- 프로퍼티 값 갱신을 통해 객체의 상태를 업데이트하고, 필요에 따라 객체의 동작을 조절할 수 있습니다. 이는 객체지향 프로그래밍의 핵심 개념 중 하나인 캡슐화와 상태 관리를 가능하게 합니다.

<br>

## 10-8. 프로퍼티 삭제
- `delete` 연산자는 객체의 프로퍼티를 삭제할 수 있습니다.
  - `delete` 연산자로 프로퍼티를 삭제하더라도 해당 프로퍼티의 값은 삭제되지 않고 `undefined`로 설정됩니다.
    ```jsx
    delete object.property;
    // 'object'는 삭제하고자 하는 프로퍼티를 포함하는 객체를 가리키는 변수나 표현식,
    // 'property'는 삭제하고자 하는 프로퍼티의 이름이나 키
    ```
    ```jsx
    let obj = {
        name: 'B',
        age: 30
    };

    console.log(obj); // { name: 'B', age: 30 } 출력

    // obj의 name 프로퍼티를 delete 연산자를 사용하여 삭제
    delete obj.name;

    console.log(obj); // { age: 30 } 출력
    console.log(obj.name); // undefined
    ```
    > delete 연산자로 삭제할 수 있는 프로퍼티는 객체의 고유한 속성인 일반 프로퍼티일 때에만 해당됩니다.
    
    **delete 연산자로 프로퍼티를 삭제할 수 없는 경우**
    - 객체의 메서드 (메서드는 객체에 속한 함수이므로 삭제할 수 없습니다.)
    - 상위 객체에 속한 상속받은 프로퍼티
    - 내장 객체 (예: `Math`, `Array` 등)의 일부 프로퍼티

<br>

## 10-9. ES6에서 추가된 객체 리터럴의 확장 기능
ES6(ES2015)에서는 객체 리터럴에 여러 가지 확장 기능이 추가되었습니다.

1. **속성 축약 (Property Shorthand)**: 객체의 속성명과 값이 동일한 경우, 속성 이름을 생략하고 값만 사용할 수 있습니다.
    ```jsx
    const a = "foo";
    const b = 42;
    const c = {};

    const o = {
        a: a,
        b: b,
        c: c,
    };
    ```
    ```jsx
    const a = "foo";
    const b = 42;
    const c = {};

    // 속성 축약 (Property Shorthand)
    const o = { a, b, c };
    console.log(o.a === { a }.a); // true
    ```
2. **계산된 속성 이름 (Computed Property Names)**: 객체의 속성 이름을 동적으로 계산할 수 있습니다. 속성 이름을 대괄호로 감싸고, 그 안에 식을 넣으면 됩니다.
   ```jsx
   let key = 'name';
   let obj = {
        [key]: 'B'
   }
   ```
3. **메소드 축약 (Method Shorthand)**: 객체에 메소드를 추가할 때, function 키워드를 생략할 수 있습니다. 대신에 메소드 이름과 매개변수, 함수 본문만 작성하면 됩니다.
   ```jsx
   let obj = {
        sayHello() {
            console.log('Hello')
        }
   }
   ```
4. **객체 속성명 동적 할당 (Dynamic Property Assignment)**: 객체의 속성명을 동적으로 할당할 수 있습니다. 속성 이름을 대괄호로 감싸고, 그 안에 변수나 식을 넣어서 할당할 수 있습니다.
   ```jsx
    let propName = 'age';
    let obj = {
        [propName]: 25
    };
    ````

<br>

## 자바스크립트는 객체지향 프로그래밍(OOP)을 완벽하게 구현한 언어가 아닌 이유
자바스크립트가 전통적인 OOP의 엄격한 이해에 완벽하게 부합하지 않더라도, 객체, 프로토타입, 재사용 가능하고 확장 가능한 코드 구조를 통해 강력한 객체지향 기능을 제공합니다.

|   | 자바스크립트는 객체지향 프로그래밍(OOP)을 완벽하게 구현한 언어가 아닌 이유 |                                                                                                                                                                                                                                                                                                                                        |
|:-:|:--------------------------------------------------------------------------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | 클래스 기반 상속 부재                                                      | 전통적인 OOP 언어에서 클래스는 객체 생성을 위한 청사진이며, 상속은 주로 클래스 기반으로 이루어집니다. 그러나 자바스크립트는 프로토타입 기반 상속을 사용합니다. 이는 객체가 클래스 대신 다른 객체로부터 직접 속성과 메서드를 상속받을 수 있게 합니다.                                                                                   |
| 2 | 동적 타이핑                                                                | 자바스크립트는 동적 타입 언어로, 변수는 어떤 유형의 값도 보유할 수 있으며 실행 중에 변경될 수 있습니다. 이 동적인 특성은 전통적인 OOP 언어와 연결되는 엄격한 타입 강제와는 다릅니다.                                                                                                                                                   |
| 3 | 객체 구조의 유연성                                                         | 자바스크립트는 객체 구조를 동적으로 정의하고 수정하는 유연성을 제공합니다. 객체는 생성 후에도 속성과 메서드를 동적으로 추가하거나 제거할 수 있습니다. 이 동적인 특성은 더 유연하고 적응 가능한 코드를 가능하게 하지만, 전통적인 클래스 기반 구조와는 다릅니다.                                                                         |
| 4 | 함수형 프로그래밍 패러다임                                                 | 자바스크립트는 객체지향 프로그래밍과 함께 함수형 프로그래밍 개념을 포용합니다. 함수는 자바스크립트에서 일급 시민(first-class citizens)으로 취급되며, 고차 함수(higher-order functions), 클로저(closures) 등 함수형 프로그래밍 기능이 널리 사용됩니다. 이러한 패러다임의 결합은 자바스크립트를 단일한 OOP 언어로만 볼 수 없게 만듭니다. |

<br>

## 요약

자바스크립트에서는 객체를 생성하기 위해 객체 리터럴 문법을 사용합니다. 객체 리터럴은 객체의 속성과 값을 한 곳에 정의하는 간단한 구문입니다. 프로퍼티 값을 갱신하거나 동적으로 프로퍼티를 추가 및 삭제할 수 있습니다.

ES6부터는 객체 리터럴의 기능이 확장되었습니다. 프로퍼티 축약 표현(property shorthand)을 사용하여 프로퍼티 이름을 생략할 수 있고, 계산된 프로퍼티 이름(computed property names)을 사용하여 동적으로 프로퍼티 이름을 계산할 수 있습니다. 메서드 축약 표현(method shorthand)을 사용하여 함수 키워드를 생략하고 메서드를 정의할 수 있습니다.

<br>

## 키워드

|    | 키워드           |                                                                                |
|:--:|:-------------------------|--------------------------------------------------|
|  1 | Object                  | JavaScript에서 기본적인 데이터 타입으로, 키-값 쌍의 컬렉션을 나타냅니다.                                                       |
|  2 | Object Literal          | 중괄호 {}를 사용하여 JavaScript에서 객체를 생성하는 구문입니다. 객체 선언 내에서 직접적으로 속성과 그 값을 정의할 수 있습니다. |
|  3 | Property                | 객체 내에서 값이 저장되는 명명된 속성입니다. 키와 해당하는 값으로 구성됩니다.                                                  |
|  4 | Method                  | 객체의 속성 중 함수인 속성입니다. 메서드는 객체와 관련된 동작이나 기능을 정의하는 데 사용됩니다.                               |
|  5 | Key                     | 객체 내 속성의 식별자 또는 이름입니다. 문자열, 심벌, 또는 계산된 값일 수 있습니다.                                             |
|  6 | Value                   | 객체 속성에 할당된 실제 데이터 값입니다.                                                                                       |
|  7 | Property Shorthand      | ES6에서 제공하는 기능으로, 변수 이름과 일치하는 경우 속성 이름을 생략할 수 있습니다.                                           |
|  8 | Computed Property Names | ES6에서 제공하는 기능으로, 대괄호 []를 사용하여 속성 이름을 동적으로 계산할 수 있습니다.                                       |
|  9 | Prototype               | 다른 객체를 생성하기 위한 템플릿으로 사용되는 객체입니다. 객체는 프로토타입으로부터 속성과 메서드를 상속할 수 있습니다.        |
| 10 | Inheritance             | 객체가 다른 객체로부터 속성과 동작을 상속받는 메커니즘입니다. JavaScript에서는 프로토타입 기반의 상속을 통해 이를 구현합니다.  |



<br>

## Reference
- [**Object literals - MDN Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals)
- [**Object: Shorthand property - MDN Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#property_definitions)