# 17장. 생성자 함수에 의한 객체 생성

- 다양한 객체 생성 방식 중 생성자 함수를 사용하여 객체를 생성하는 방식
- 객체 리터럴을 사용하여 객체를 생성하는 방식과 생성자 함수를 사용하여 객체를 생성하는 방식과의 장단점

<br>

## 17-1. Object 생성자 함수

- `new` 연산자와 함께 `Object` 생성자 함수를 호출하면 빈 객체를 생성하여 반환합니다.

```jsx
const obj = new Object();
console.log(obj); // {}
```

- 빈 객체를 생성한 이후에는 프로퍼티 또는 메서드를 추가하여 객체를 완성할 수 있습니다. 객체 리터럴 문법을 사용하여 프로퍼티를 추가하거나, `.` 또는 `[ ]` 표기법을 사용하여 프로퍼티 값을 할당할 수 있습니다.

```jsx
// 17-1
// 프로퍼티를 추가하여 객체를 완성
const obj = new Object();
obj.name = 'John';
obj.age = 30;

console.log(obj); // { name: 'John', age: 30 }
```

```jsx
// 17-1
// 메서드를 추가하여 객체를 완성
const obj = new Object();
obj.sayHello = function() {
  console.log('Hello!');
};

obj.sayHello(); // Hello!
```

- 생성자 함수(Constructor)는 `new` 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 의미합니다.
- 생성자 함수는 일반적으로 대문자로 시작하여 명명되며, 객체를 초기화하고 프로퍼티와 메서드를 설정하는 역할을 합니다.
- 생성자 함수를 호출하여 생성된 객체는 해당 생성자 함수의 인스턴스(Instance)라고 합니다.
- 생성자 함수를 통해 객체를 생성하면 해당 객체는 생성자 함수의 프로토타입 객체에 연결된 프로퍼티와 메서드를 상속받습니다.

```jsx
// 생성자 함수
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 생성자 함수를 통한 객체(인스턴스) 생성
const person1 = new Person('John', 30);
const person2 = new Person('Jane', 25);

console.log(person1); // Person { name: 'John', age: 30 }
console.log(person2); // Person { name: 'Jane', age: 25 }
```
> `Person`이라는 생성자 함수를 정의하였습니다. `Person` 생성자 함수는 `name`과 `age`라는 매개변수를 받아 객체를 초기화합니다. `this.name = name;`과 `this.age = age;`를 통해 객체의 프로퍼티를 설정합니다.
> 그리고 `new Person('John', 30)`과 `new Person('Jane', 25)`을 통해 `Person` 생성자 함수를 호출하여 객체(인스턴스) `person1`과 `person2`를 생성합니다. 이러한 객체는 `Person` 생성자 함수의 인스턴스이며, 생성자 함수의 프로토타입 객체에 정의된 메서드 등을 상속받을 수 있습니다.

- 자바스크립트는 Object 생성자 함수 이외에도 여러 가지 빌트인(Built-in) 생성자 함수를 제공합니다. 이러한 빌트인 생성자 함수들은 자주 사용되는 데이터 타입에 대한 객체(인스턴스)를 생성하기 위해 사용됩니다.

  - `String`: 문자열을 생성하는 데 사용됩니다.
  - `Number`: 숫자를 생성하는 데 사용됩니다.
  - `Boolean`: 불리언 값을 생성하는 데 사용됩니다.
  - `Function`: 함수 객체를 생성하는 데 사용됩니다.
  - `Array`: 배열 객체를 생성하는 데 사용됩니다.
  - `Date`: 날짜와 시간 정보를 다루는 데 사용됩니다.
  - `RegExp`: 정규표현식 객체를 생성하는 데 사용됩니다.
  - `Promise`: 비동기 작업을 처리하기 위한 프로미스 객체를 생성하는 데 사용됩니다.


```jsx
// 17-2
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee');
console.log(typeof strObj); // object
console.log(strObj);        // String {"Lee"}

// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(123);
console.log(typeof numObj); // object
console.log(numObj);        // Number {123}

// Boolean 생성자 함수에 의한 Boolean 객체 생성
const boolObj= new Boolean(true);
console.log(typeof boolObj); // object
console.log(boolObj);        // Boolean {true}

// Function 생성자 함수에 의한 Function 객체(함수) 생성
const func = new Function('x', 'return x * x');
console.log(typeof func); // function
console.dir(func);        // ƒ anonymous(x)

// Array 생성자 함수에 의한 Array 객체(배열) 생성
const arr = new Array(1, 2, 3);
console.log(typeof arr); // object
console.log(arr);        // [1, 2, 3]

// RegExp 생성자 함수에 의한 RegExp 객체(정규 표현식) 생성
const regExp = new RegExp(/ab+c/i);
console.log(typeof regExp); // object
console.log(regExp);        // /ab+c/i

// Date 생성자 함수에 의한 Date 객체 생성
const date = new Date();
console.log(typeof date); // object
console.log(date);        // Mon May 04 2020 08:36:33 GMT+0900 (대한민국 표준시)
```

- 반드시 `Object` 생성자 함수를 사용해 빈 객체를 생성할 필요는 없습니다. 
- 객체를 생성하는 방법 중에서 가장 간편하고 널리 사용되는 방법은 객체 리터럴(Literal)을 사용하는 것입니다. 객체 리터럴은 중괄호(`{}`)를 사용하여 객체를 직접 정의하는 방법으로, 프로퍼티와 그 값을 지정하여 객체를 생성합니다.

```jsx
const obj = {}; // 객체 리터럴을 사용한 빈 객체 생성
console.log(obj); // {}
```

- 실제로 대부분의 경우에는 객체 리터럴을 사용하여 객체를 생성하는 것이 더욱 간편하고 가독성이 좋습니다. `Object` 생성자 함수를 사용하여 객체를 생성하는 방식은 특별한 이유가 없는 한 그다지 유용해 보이지 않습니다. 객체 리터럴은 필요한 프로퍼티와 값을 직접 명시하여 객체를 생성하므로 코드가 간결하고 명확해집니다. 따라서 일반적인 경우에는 객체를 생성할 때 `Object` 생성자 함수보다 객체 리터럴을 사용하는 것이 더욱 권장됩니다.
- 동적으로 프로퍼티 이름을 지정해야 할 때나, `Object` 생성자 함수의 추가 기능을 활용해야 할 때와 같이 특별한 경우에는 `Object` 생성자 함수를 사용하여 객체를 생성해야 할 필요가 있을 수 있습니다.

    1. 동적으로 프로퍼티 이름을 지정해야 할 때: 객체 리터럴을 사용하는 경우, 프로퍼티 이름은 정적으로 지정되어야 합니다. 하지만 `Object` 생성자 함수를 사용하면 동적으로 프로퍼티 이름을 지정할 수 있습니다.

    ```jsx
    const dynamicPropertyName = 'age';
    const person = new Object();
    person[dynamicPropertyName] = 30;

    console.log(person); // { age: 30 }
    ```
    > `dynamicPropertyName` 변수에 동적으로 프로퍼티 이름을 할당하고, `person` 객체에 해당 프로퍼티를 추가하였습니다. 이렇게 함으로써 동적으로 프로퍼티 이름을 지정할 수 있습니다.


    2. Object 생성자 함수의 추가 기능 활용: `Object` 생성자 함수는 몇 가지 추가 기능을 제공합니다. 예를 들어, `Object.create()` 메서드를 사용하여 프로토타입을 지정한 새로운 객체를 생성할 수 있습니다. 또는 `Object.assign()` 메서드를 사용하여 여러 개의 객체를 병합할 수 있습니다. 이러한 추가 기능을 활용해야 할 때에는 `Object` 생성자 함수를 사용하여 객체를 생성하는 것이 유용할 수 있습니다.

    ```jsx
    const protoObj = { name: 'John' };
    const newObj = Object.create(protoObj);

    console.log(newObj); // {}
    console.log(newObj.name); // 'John'
    ```
    > `Object.create()` 메서드를 사용하여 `protoObj` 객체를 프로토타입으로 갖는 `newObj` 객체를 생성하였습니다.

    ```jsx
    const obj1 = { prop1: 1 };
    const obj2 = { prop2: 2 };
    const mergedObj = Object.assign({}, obj1, obj2);

    console.log(mergedObj); // { prop1: 1, prop2: 2 }
    ```
    > `Object.assign()` 메서드를 사용하여 `obj1`과 `obj2` 객체를 병합하여 `mergedObj` 객체를 생성하였습니다.


<br>

## 17-2. 생성자 함수

<br>

## 17-2-1. 객체 리터럴에 의한 객체 생성 방식의 문제점

- 객체 리터럴을 사용한 객체 생성 방식은 직관적이고 간편하지만, 동일한 프로퍼티를 갖는 여러 개의 객체를 생성해야 하는 경우에는 매번 같은 프로퍼티를 기술해야 하기 때문에 비효율적입니다. 이는 중복된 코드를 작성하게 되어 유지보수성을 저하시킬 수 있습니다.

```jsx
// 17-3
const circle1 = {
    radius : 5,
    getDiameter(){
        return 2 * this.radius;
    }
};

console.log(circle1.getDiameter()); // 10

const circle2 = {
    radius : 10,
    getDiameter(){
        return 2 * this.radius;
    }
};

console.log(circle2.getDiameter()); // 20
```
>  `circle1`과 `circle2`라는 두 개의 원 객체를 생성하고 있습니다. 두 객체는 동일한 프로퍼티 `radius`와 메서드 `getDiameter`를 갖고 있지만, 매번 같은 내용을 반복하여 작성해야 합니다. 이러한 경우에는 생성자 함수를 활용하여 객체를 생성하는 것이 효율적일 수 있습니다. 생성자 함수를 사용하면 동일한 프로퍼티와 메서드를 가진 객체를 간편하게 생성할 수 있습니다.

```jsx
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function() {
    return 2 * this.radius;
  };
}

// 객체 생성
const circle1 = new Circle(5);
console.log(circle1.getDiameter()); // 10

const circle2 = new Circle(10);
console.log(circle2.getDiameter()); // 20
```
> `Circle`이라는 생성자 함수를 정의하고, `radius` 프로퍼티와 `getDiameter` 메서드를 가진 객체를 생성하고 있습니다. 이렇게 생성자 함수를 사용하면 동일한 구조를 가진 객체를 간편하게 생성할 수 있습니다.

- 동일한 프로퍼티를 갖는 여러 개의 객체를 생성해야 하는 경우에는 객체 리터럴보다 생성자 함수를 사용하는 것이 효율적입니다.

<br>

## 17-2-2. 생성자 함수에 의한 객체 생성 방식의 장점

- 생성자 함수는 new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말합니다. 
- 생성자 함수를 통해 생성된 객체는 해당 생성자 함수의 인스턴스라고 부릅니다.
- 생성자 함수에 의한 객체 생성 방식은 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 동작하여, 프로퍼티 구조가 동일한 객체를 간편하게 생성할 수 있습니다.

```jsx
// 17-4
// 생성자 함수
function Circle(radius) {
    // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius;
    };
}

// 인스턴스의 생성
const circle1 = new Circle(5); // 반지름이 5인 Circle 객체를 생성
const circle2 = new Circle(10); // 반지름이 10인 Circle 객체를 생성

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```
> `Circle`이라는 생성자 함수를 정의하고, `radius` 프로퍼티와 `getDiameter` 메서드를 가진 객체를 생성하고 있습니다. 이렇게 생성자 함수를 사용하면 동일한 구조를 가진 객체를 간편하게 생성할 수 있습니다. 생성자 함수 내부에서 `this`는 생성자 함수가 생성할 인스턴스를 가리키며, `new Circle(...)`으로 호출할 때마다 새로운 인스턴스가 생성됩니다.

- 인스턴스는 생성자 함수를 통해 생성된 객체로, 해당 생성자 함수의 프로토타입 객체와 연결되어 있습니다. 이를 통해 인스턴스는 생성자 함수의 프로토타입 객체에 정의된 메서드나 프로퍼티를 상속받을 수 있습니다.

```jsx
// new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않는다.
// 즉, 일반 함수로서 호출된다.
const circle3 = Circle(15);

// 일반 함수로서 호출된 Circle은 반환문이 없으므로 암묵적으로 undefined를 반환한다.
console.log(circle3);

// 일반 함수로서 호출된 Circle 내의 this는 전역 객체를 가리킨다.
console.log(radius)
```

<br>

**this**
- this는 함수가 호출될 때 동적으로 결정되는 자기 참조 변수(self-referencing variable)입니다.
- this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 따라 달라집니다. this는 해당 함수를 어떻게 호출하느냐에 따라 다른 객체를 참조할 수 있습니다.
- 함수 호출 방식에 따라 `this`가 동적으로 결정되기 때문에 같은 함수라도 다른 호출 방식에 따라 `this`의 값이 달라질 수 있습니다. 이를 활용하여 함수 내부에서 동적으로 객체의 프로퍼티나 메서드를 참조하거나 조작할 수 있습니다.

| 함수 호출 방식       	|     this가 가리키는 값(this 바인딩)    	|
|----------------------	|:--------------------------------------:	|
| 일반 함수로서 호출   	| 전역 객체                              	|
| 메서드로서 호출      	| 메서드를 호출한 객체(마침표 앞의 객체) 	|
| 생성자 함수로서 호출 	| 생성자 함수가 (미래에) 생성할 인스턴스 	|

- 일반 함수 호출: 일반 함수에서 `this`는 `전역 객체(window 객체 또는 global 객체)`를 참조합니다. `'use strict'` 모드에서는 전역 객체 대신 `undefined`가 할당됩니다.
- 메서드 호출: 객체의 메서드 내부에서 `this`는 해당 메서드를 호출한 객체를 참조합니다.
- 생성자 함수 호출: `new` 연산자와 함께 생성자 함수를 호출할 때 `this`는 생성된 인스턴스를 참조합니다.
- `call`, `apply`, `bind` 메서드를 사용한 호출: `call`, `apply`, `bind` 메서드를 사용하여 함수를 호출할 때 `this`를 직접 지정할 수 있습니다.
- 화살표 함수: 화살표 함수에서 `this`는 화살표 함수가 정의된 위치에서 상위 스코프의 `this`를 그대로 참조합니다.

```jsx
// 17-5
// 함수는 다양한 방식으로 호출될 수 있다.
function foo(){
    console.log(this);
}

// 일반적인 함수로서 호출
// 전역 객체는 브라우저 환경에서는 window, node.js 환경에서는 global을 가리킨다.
foo();

const obj = { foo }; // es6 프로퍼티 축약 표현

// 메서드로서 호출
obj.foo();

// 생성자 함수로서 호출
const inst = new foo()
```


<br>

## 17-2-3. 생성자 함수의 인스턴스 생성과정

- 생성자 함수의 주요 역할은 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿(클래스)으로 동작하는 것입니다. 생성자 함수는 인스턴스를 생성하는 것과 인스턴스를 초기화하는 것 두 가지 책임을 가지고 있습니다.
  1. 인스턴스 생성: 생성자 함수를 new 연산자와 함께 호출하면 해당 생성자 함수의 인스턴스가 생성됩니다. 이때 생성자 함수의 코드가 실행되어 인스턴스가 생성되며, 생성된 인스턴스는 해당 생성자 함수의 프로토타입 객체와 연결됩니다.
  2. 인스턴스 초기화: 생성된 인스턴스를 초기화하는 것은 옵션이며, 생성자 함수의 역할 중 일부입니다. 생성자 함수 내부에서 인스턴스에 프로퍼티를 추가하고 초기값을 할당함으로써 인스턴스를 초기화할 수 있습니다. 이를 통해 생성된 인스턴스는 공통된 프로퍼티를 가지며 초기값이 설정된 상태가 됩니다.

- 하지만 인스턴스 초기화는 선택 사항이며, 생성자 함수를 정의할 때 반드시 초기화 코드를 작성할 필요는 없습니다. 생성자 함수를 단순히 인스턴스를 생성하기 위한 템플릿으로 사용하고, 필요한 경우에만 인스턴스를 초기화하는 것도 가능합니다.

```jsx
// 17-7
function Circle(radius) {
  // 인스턴스 생성 (필수)
  this.radius = radius;

  // 인스턴스 초기화 (옵션)
  this.init = function() {
    console.log('Initializing...');
    // 인스턴스 초기화 로직 작성
  };

  // 생성된 인스턴스 초기화 (옵션)
  this.init();
}

// 인스턴스 생성 및 초기화
const circle = new Circle(5);
```
> `Circle` 생성자 함수를 사용하여 `circle` 인스턴스를 생성하고 초기화하는 것을 볼 수 있습니다. `this.radius`를 통해 인스턴스에 프로퍼티를 추가하고, `this.init()`을 호출하여 초기화 로직을 실행합니다.

- 자바스크립트 엔진은 암묵적인 처리를 통해 인스턴스를 생성하고 반환한다. new 연산자와 함께 생성자 함수를 호출하면 자바스크립트 엔진은 다음과 같은 과정을 거쳐 암묵적으로 인스턴스를 생성하고 인스턴스를 초기화한 후 암묵적으로 인스턴스를 반환한다.

**바인딩(name binding)**
- 바인딩이란 식별자와 값을 연결하는 과정을 의미한다. 예를 들어 변수 선언은 변수 이름(식별자)과 확보된 메모리 공간의 주소를 바인딩 하는 것이다. this 바인딩은 this(키워드로 분류되지만 식별자 역할을 한다.)와 this가 가리킬 객체를 바인딩 하는 것이다.


1. 인스턴스 생성과 this 바인딩
   - . 생성자 함수가 호출되면 암묵적으로 빈 객체가 생성되고, 이 빈 객체가 생성자 함수가 생성한 인스턴스입니다. 이 인스턴스는 this에 바인딩됩니다.
   - 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리키는 이유입니다. 이 처리는 함수 몸체의 코드가 실행되기 이전에 발생합니다.

   ```jsx
   // 17-8
   function Circle(radius) {
       // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
       console.log(this); // Circle {}

       this.radius = radius;
       this.getDiameter = function() {
           return 2 * this.radius;
       };
   }
   ```

2. 인스턴스 초기화
   - 인스턴스 초기화는 this에 바인딩된 인스턴스를 통해 이루어집니다. 즉, 생성자 함수 내부에서 this를 사용하여 인스턴스에 프로퍼티나 메서드를 추가하고, 생성자 함수가 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화할 수 있습니다.

    ```jsx
    // 17-9
    function Circle(radius) {
        console.log(this); // Circle {}

        // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
        this.radius = radius;
        this.getDiameter = function() {
            return 2 * this.radius;
        };
    }
    ```

3. 인스턴스 반환
   - 생성자 함수 내부에서 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환됩니다.

   ```jsx
   // 17-10
   function Circle(radius) {
       // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

       // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
       this.radius = radius;
       this.getDiameter = function() {
           return 2 * this.radius;
       };

       // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
   }

   // 인스턴스 생성. Circle 생성자 함수는 암묵적으로 this를 반환한다.
   const circle = new Circle(1);
   console.log(circle); // Circle {radius: 1, getDiameter: f}
   ```
   - 생성자 함수 내부에서 `this`가 아닌 다른 객체를 명시적으로 반환하면, `this`가 반환되지 않고 `return`문에 명시한 객체가 반환됩니다. 생성자 함수는 일반적으로 암묵적으로 `this`를 반환하여 인스턴스를 생성하고 초기화하는데 사용됩니다. 하지만 명시적으로 다른 객체를 반환하면 `this` 대신 해당 객체가 반환되어 생성자 함수의 기본 동작이 변경됩니다.

    ```jsx
    // 17-11
    function Circle(radius) {
        this.radius = radius;
        this.getDiameter = function() {
            return 2 * this.radius;
        };

        // 다른 객체를 반환하면 this가 아닌 해당 객체가 반환됩니다.
        return { customProp: 'Custom Property' };
    }

    const circle = new Circle(1);
    console.log(circle); // { customProp: 'Custom Property' }
    ```
   - 생성자 함수 내부에서 명시적으로 원시값을 반환하면 원시값 반환은 무시되고 암묵적으로 `this`가 반환됩니다. 생성자 함수는 인스턴스를 생성하고 초기화하기 위해 사용되는데, 암묵적으로 `this`를 반환하여 인스턴스를 반환하는 것이 일반적입니다. 그러나 명시적으로 원시값을 반환하면 `this` 대신에 암묵적인 반환이 이루어집니다.

    ```jsx
    function Circle(radius) {
        this.radius = radius;
        this.getDiameter = function() {
            return 2 * this.radius;
        };

        // 원시값을 반환하더라도 무시되고 암묵적으로 this가 반환됩니다.
        return 42;
    }

    const circle = new Circle(1);
    console.log(circle); // Circle { radius: 1, getDiameter: [Function] }
    ```

<br>

## 17-2-4. 내부 메서드 [[Call]]과 [[Construct]]

<br>

## 17-2-5. constructor와 non-constructor의 구분

- JavaScript 엔진은 함수 정의를 평가하여 함수 객체를 생성할 때 함수 정의 방식에 따라 함수를 "constructor"와 "non-constructor"로 구분합니다.
- "constructor"로 분류되는 함수 정의 방식은 new 연산자와 함께 호출하여 인스턴스를 생성할 수 있습니다. 이러한 함수는 생성자 함수로서 동작하며, prototype 객체를 가지고 있어서 프로토타입 상속과 같은 기능을 활용할 수 있습니다.
- "non-constructor"로 분류되는 함수 정의 방식은 new 연산자와 함께 호출할 수 없으며, 객체의 메서드 또는 단순한 함수로 사용됩니다.
- 화살표 함수는 자체적인 this를 가지지 않고, 외부 스코프의 this를 사용하기 때문에 "non-constructor"로 분류됩니다.

**"constructor"로 분류되는 함수 정의 방식**

1. 함수 선언문 (Function Declaration):
    ```jsx
    function functionName() {
    // 함수의 본문
    }
    ```
    
2. 함수 표현식 (Function Expression):
    ```jsx
    const functionName = function() {
    // 함수의 본문
    };
    ```

3. 클래스 (Class):
    ```jsx
    class ClassName {
        constructor() {
            // 생성자 메서드의 본문
        }

        methodName() {
            // 다른 메서드의 본문
        }
    }
    ```

**"non-constructor"로 분류되는 함수 정의 방식**
1. 메서드 (Method):
    ```jsx
    const object = {
        methodName() {
            // 메서드의 본문
        }
    };
    ```
2. 화살표 함수 (Arrow Function):
    ```jsx
    const functionName = () => {
        // 함수의 본문
    };
    ```

<br>

## 17-2-6. new 연산자

<br>

## 17-2-7. new.target
- ES6에서 도입된 `new.target`은 constructor 함수 내부에서 사용되는 메타 프로퍼티입니다.
- `new.target`은 함수 내부에서 암묵적으로 사용되는 지역 변수와 비슷한 역할을 합니다.
- `new.target`은 constructor 함수 내부에서 사용될 때, 그 함수 자체를 가리킵니다. 즉, `new` 연산자와 함께 호출되는 경우 `new.target`은 생성자 함수 자체를 참조합니다. 이를 통해 생성자 함수가 new 연산자 없이 일반 함수처럼 호출되는 것을 방지할 수 있습니다.

```jsx
// 17-19
function Circle(radius) {
  if (!new.target) {
    throw new Error('Circle must be called with new');
  }

  this.radius = radius;
}
```

**스코프 세이프 생성자 패턴(scope-safe contructor)**
- 스코프 세이프 생성자 패턴은 생성자 함수가 new 연산자와 함께 호출되지 않을 경우에도 오류 없이 인스턴스를 생성하는 패턴입니다. 이 패턴은 생성자 함수 내부에서 자동으로 new 연산자를 사용하여 인스턴스를 생성하도록 보장하는 방법입니다.
- 생성자 함수 내부에서 자동으로 new 연산자를 사용하여 인스턴스를 생성하고, 이를 강제화하기 위해 new.target을 사용합니다.

<br>

## 요약

<br>

## 키워드

<br>

## Reference

<br>
