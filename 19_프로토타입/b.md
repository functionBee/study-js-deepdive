# 19장. 프로토타입(prototype)
JavaScript는 실제로 다중 패러다임 프로그래밍 언어로, 명령형, 함수형, 프로토타입 기반, 객체지향 프로그래밍을 지원합니다.

**[목차]**
19장. 프로토타입(prototype)
- [19장. 프로토타입(prototype)](#19장-프로토타입prototype)
	- [19-1. 객체지향 프로그래밍](#19-1-객체지향-프로그래밍)
	- [19-2. 상속과 프로토타입](#19-2-상속과-프로토타입)
	- [19-3. 프로토타입 객체](#19-3-프로토타입-객체)
		- [19-3-1. `__proto__` 접근자 프로퍼티](#19-3-1-__proto__-접근자-프로퍼티)
			- [1. `__proto__`는 접근자 프로퍼티다](#1-__proto__는-접근자-프로퍼티다)
			- [2. `__proto__` 접근자 프로퍼티는 상속을 통해 사용된다.](#2-__proto__-접근자-프로퍼티는-상속을-통해-사용된다)
			- [3. `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유](#3-__proto__-접근자-프로퍼티를-통해-프로토타입에-접근하는-이유)
			- [4. `__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.](#4-__proto__-접근자-프로퍼티를-코드-내에서-직접-사용하는-것은-권장하지-않는다)
		- [19-3-2. 함수 객체의 prototype 프로퍼티](#19-3-2-함수-객체의-prototype-프로퍼티)
		- [19-3-3. 프로토타입의 `constructor` 프로퍼티와 생성자 함수](#19-3-3-프로토타입의-constructor-프로퍼티와-생성자-함수)
	- [19-4. 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입](#19-4-리터럴-표기법에-의해-생성된-객체의-생성자-함수와-프로토타입)
	- [19-5. 프로토타입의 생성 시점](#19-5-프로토타입의-생성-시점)
		- [19-5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점](#19-51-사용자-정의-생성자-함수와-프로토타입-생성-시점)
		- [19-5-2. 빌트인 생성자 함수와 프로토타입 생성 시점](#19-5-2-빌트인-생성자-함수와-프로토타입-생성-시점)
	- [19-6. 객체 생성 방식과 프로토타입의 결정](#19-6-객체-생성-방식과-프로토타입의-결정)
		- [19-6-1. 객체 리터럴에 의해 생성된 객체의 프로토타입](#19-6-1-객체-리터럴에-의해-생성된-객체의-프로토타입)
		- [19-6-2. Object 생성자 함수에 의해 생성된 객체의 프로토타입](#19-6-2-object-생성자-함수에-의해-생성된-객체의-프로토타입)
		- [19-6-3. 생성자 함수에 의해 생성된 객체의 프로토타입](#19-6-3-생성자-함수에-의해-생성된-객체의-프로토타입)
	- [19-7. 프로토타입 체인](#19-7-프로토타입-체인)
	- [19-8. 오버라이딩과 프로퍼티 새도잉](#19-8-오버라이딩과-프로퍼티-새도잉)
	- [19-9. 프로토타입의 교체](#19-9-프로토타입의-교체)
	- [19-10. `instanceof` 연산자](#19-10-instanceof-연산자)
	- [19-11. 직접 상속](#19-11-직접-상속)
	- [19-12. 정적 프로퍼티/메서드](#19-12-정적-프로퍼티메서드)
	- [19-13. 프로퍼티 존재 확인](#19-13-프로퍼티-존재-확인)
	- [19-14. 프로퍼티 열거](#19-14-프로퍼티-열거)

<br>

## 19-1. 객체지향 프로그래밍
- 객체지향 프로그래밍은 전통적인 명령형 프로그래밍의 절차지향적 관점에서 벗어나, 프로그램을 여러 개의 독립적인 단위인 객체의 집합으로 표현하는 프로그래밍 패러다임입니다.

- 객체지향 프로그래밍에서는 프로그램을 명령어나 함수의 목록으로 보는 것이 아니라, 실체를 철학적 사고로 인식하는 과정입니다. 이를 통해 객체의 속성과 동작을 중심으로 프로그램을 구성합니다.

**[객체지향 프로그래밍에서 주요한 개념]**
1. **속성 (Properties)**: 객체의 특징이나 성질을 나타내는 것으로, 객체가 가지는 데이터를 의미합니다.
2. **추상화 (Abstraction)**: 다양한 속성 중 프로그램에 필요한 속성만을 간추려내어 표현하는 과정입니다. 객체를 필요한 정보와 동작으로 단순화하는 것을 의미합니다.
3. **객체 (Object)**: 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조입니다. 객체는 상태 데이터와 동작을 하나의 논리적 단위로 묶어 표현합니다.
   - 상태 (State): 객체가 가지는 데이터를 나타냅니다. 객체의 속성은 상태를 나타내며, 객체가 가지고 있는 데이터 값들을 말합니다.
   - 동작 (Behavior): 객체의 상태 데이터를 조작하거나 다른 객체와의 상호작용을 통해 수행하는 동작을 나타냅니다. 객체의 동작은 메서드라는 함수 형태로 표현되며, 객체 간의 상호작용을 통해 프로그램이 실행됩니다.

```jsx
// 19-1
// 이름과 주소 속성을 갖는 객체
const person = {
  name: 'Lee',
  address: 'Seoul'
};

console.log(person); // {name: "Lee", address: "Seoul"}
```

```jsx
// 19-2
const circle = {
  radius: 5, // 반지름

  // 원의 지름: 2r
  getDiameter() {
    return 2 * this.radius;
  },

  // 원의 둘레: 2πr
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  },

  // 원의 넓이: πrr
  getArea() {
    return Math.PI * this.radius ** 2;
  }
};

console.log(circle);
// {radius: 5, getDiameter: ƒ, getPerimeter: ƒ, getArea: ƒ}

console.log(circle.getDiameter());  // 10
console.log(circle.getPerimeter()); // 31.41592653589793
console.log(circle.getArea());      // 78.53981633974483
```

<br>

## 19-2. 상속과 프로토타입
- 상속 : 상속은 한 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용하는 것을 말합니다.
- JavaScript에서 상속은 프로토타입(prototype)을 기반으로 구현됩니다.
- JavaScript에서는 프로토타입(prototype)을 기반으로 상속을 구현하여 기존의 코드를 적극적으로 재사용하고 중복을 제거합니다.
- 생성자 함수가 생성한 모든 인스턴스는 자신의 상위 객체인 프로토타입(Prototype)의 모든 프로퍼티와 메서드를 상속받습니다.

```jsx
// 19-3
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    // Math.PI는 원주율을 나타내는 상수다.
    return Math.PI * this.radius ** 2;
  };
}

// 반지름이 1인 인스턴스 생성
const circle1 = new Circle(1);
// 반지름이 2인 인스턴스 생성
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
// getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
// getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
console.log(circle1.getArea === circle2.getArea); // false

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```
> `19-3`는 생성자 함수 내에서 `getArea` 메서드를 생성하므로
> 인스턴스를 생성할 때마다 중복으로 생성되어 메모리 낭비가 발생합니다.

<br>

```jsx
// 19-4
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를
// 공유해서 사용할 수 있도록 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
// 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받는다.
// 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```
> `19-4`는 생성자 함수의 프로토타입(prototype)에 `getArea` 메서드를 추가하여 모든 인스턴스가 하나의 메서드를 공유합니다.
> 이렇게 하면 메모리를 효율적으로 사용할 수 있습니다.

<br>

## 19-3. 프로토타입 객체
- 프로토타입 객체는 객체지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용됩니다.
- 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고, `[[prototype]]`이라는 내부 슬롯에 저장됩니다.
- 객체 리터럴에 의해 생성된 객체의 프로토타입은 `Object.prototype`입니다.
- 생성자 함수에 의해 생성된 객체의 프로토타입은 해당 생성자 함수의 `prototype` 프로퍼티에 바인딩된 객체입니다.

<br>

### 19-3-1. `__proto__` 접근자 프로퍼티
모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입 내부 슬롯에 간접적으로 접근할 수 있다. 

```jsx
// 19-5
const person = { name: 'Lee' };
```

<br>

#### 1. `__proto__`는 접근자 프로퍼티다
자바스크립트는 원칙적으로 내부 슬록과 내부 메서드에 직접적으로 접근하거나 호출 할 수 있는 방법을 제공하지 않는다. `[[Prototype]]` 내부 슬록에도 직접 접근할 수 없ㅇ며, `__proto__` 접근자 프로퍼티를 통해 간접적으로 접근할 수 있게 된다. 
`__proto__`는 getter/setter 함수를 통해 프로토타입을 취득하거나 할당한다. 

```jsx
const obj = {};
const parent = { x: 1 };

// getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
obj.__proto__;
// setter함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;

console.log(obj.x); // 1
```

<br>

#### 2. `__proto__` 접근자 프로퍼티는 상속을 통해 사용된다.
모든 객체는 상속을 통해 `Object.prototype.__proto__` 접근자 프로퍼티를 사용할 수 있다.

```jsx
const person = { name: 'Lee' };

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty('__proto__')); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); // true
```

<br>

#### 3. `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 **상호참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해** 단방향 링크드 리스트로 구현되지 않으면 에러를 발생시킨다.

```jsx
// 19-8
const parent = {};
const child = {};

// child의 프로토타입을 parent로 설정
child.__proto__ = parent;
// parent의 프로토타입을 child로 설정
parent.__proto__ = child; // TypeError: Cyclic __proto__ value
```

<br>

#### 4. `__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다. 
모든 객체가 `__proto__` 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문에 권장하지 않는다.
ex) 직접 상속을 통해 객체를 생성하는 경우

-> `__proto__` 접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶은 경우 Object.getPrototypeOf 메서드 사용 권장


```jsx
// 19-9
// obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없다.
const obj = Object.create(null);

// obj는 Object.__proto__를 상속받을 수 없다.
console.log(obj.__proto__); // undefined

// 따라서 __proto__보다 Object.getPrototypeOf 메서드를 사용하는 편이 좋다.
console.log(Object.getPrototypeOf(obj)); // null
```

```jsx
// 19-10
const obj = {};
const parent = { x: 1 };

// obj 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); // obj.__proto__;
// obj 객체의 프로토타입을 교체
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;

console.log(obj.x); // 1
```

<br>

### 19-3-2. 함수 객체의 prototype 프로퍼티
함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성한 인스턴스의 프로토타입을 가리킨다. 

모든 객체가 가지고 있는 `__proto__` 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype은 결국 동일한 프로토타입을 가리키지만, 프로퍼티를 사용하는 주체가 다르다.

| 구분 | 소유 | 값 | 사용 주체 | 사용 목적 |
|-----|----|---|----|---|
| `__proto__` 접근자 프로퍼티 | 모든 객체 | 프로토타입의 참조 | 모든 객체 | 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용 | 
|prototype 프로퍼티 | Constructor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체의 프로토타입을 할당하기 위해 사용|

```jsx
// 19-11
// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}).hasOwnProperty('prototype'); // -> true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}).hasOwnProperty('prototype'); // -> false
```

```jsx
// 19-12
// 화살표 함수는 non-constructor다.
const Person = name => {
  this.name = name;
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(Person.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(Person.prototype); // undefined

// ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor다.
const obj = {
  foo() {}
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(obj.foo.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(obj.foo.prototype); // undefined
```

```jsx
// 19-13
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// 결국 Person.prototype과 me.__proto__는 결국 동일한 프로토타입을 가리킨다.
console.log(Person.prototype === me.__proto__);  // true
```

<br>

### 19-3-3. 프로토타입의 `constructor` 프로퍼티와 생성자 함수
모든 프로토타입은 `constructor` 프로퍼티를 갖는다. 이 프로퍼티는 `prototype` 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다. 
이 연결은 함수 객체가 생성될 때 이뤄진다.

```jsx
// 19-14
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// me 객체의 생성자 함수는 Person이다.
console.log(me.constructor === Person);  // true
```

<br>

## 19-4. 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입
`constructor` 프로퍼티가 가리키는 생성자 함수는 인스턴스를 생성한 생성자 함수


```jsx
// 19-15
// obj 객체를 생성한 생성자 함수는 Object다.
const obj = new Object();
console.log(obj.constructor === Object); // true

// add 함수 객체를 생성한 생성자 함수는 Function이다.
const add = new Function('a', 'b', 'return a + b');
console.log(add.constructor === Function); // true

// 생성자 함수
function Person(name) {
  this.name = name;
}

// me 객체를 생성한 생성자 함수는 Person이다.
const me = new Person('Lee');
console.log(me.constructor === Person); // true
```

```jsx
// 19-16
// 객체 리터럴
const obj = {};

// 함수 리터럴
const add = function (a, b) { return a + b; };

// 배열 리터럴
const arr = [1, 2, 3];

// 정규표현식 리터럴
const regexp = /is/ig;
```

```jsx
// 19-17
// obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했다.
const obj = {};

// 하지만 obj 객체의 생성자 함수는 Object 생성자 함수다.
console.log(obj.constructor === Object); // true
```

```jsx
// 19-18
// 2. Object 생성자 함수에 의한 객체 생성
// 인수가 전달되지 않았을 때 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성한다.
let obj = new Object();
console.log(obj); // {}

// 1. new.target이 undefined나 Object가 아닌 경우
// 인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성된다.
class Foo extends Object {}
new Foo(); // Foo {}

// 3. 인수가 전달된 경우에는 인수를 객체로 변환한다.
// Number 객체 생성
obj = new Object(123);
console.log(obj); // Number {123}

// String  객체 생성
obj = new Object('123');
console.log(obj); // String {"123"}
```

```jsx
// 19-19
// foo 함수는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성했다.
function foo() {}

// 하지만 constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Function 생성자 함수다.
console.log(foo.constructor === Function); // true
```

**<-> 명시적으로 New 연산자를 사용하지 않는 객체 생성 방식**

이런 경우, constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수 없다. 

Object 생성자 함수에 인수를 전달하지 않거나, undefined, null을 인수로 전달하면서 호출하면 내부적으로는 추상 연산 `OrdinaryObjectCreate`를 호출하여 Object.prototype을 프로토타입으로 갖는 빈 객체를 생성한다. 


리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하기 때문에, 생성된 객체도 가상적인 생성자 함수를 갖는다. **프로토타입과 생성자 함수는 단독으로 존재할 수 없고 항상 쌍으로 존재한다.**

<br>

## 19-5. 프로토타입의 생성 시점
프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.

<br>

### 19-5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점
생성자 함수로서 호출할 수 있는 함수(constructor)는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성

`constructor`는 함수 정의가 평가되어 함수 객체를 생성 - `non-contructor`는 프로토타입이 생성되지 않는다. 


```jsx
// 19-20
// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); // {constructor: ƒ}

// 생성자 함수
function Person(name) {
  this.name = name;
}
```

```jsx
// 19-21
// 화살표 함수는 non-constructor다.
const Person = name => {
  this.name = name;
};

// non-constructor는 프로토타입이 생성되지 않는다.
console.log(Person.prototype); // undefined
```

<br>

### 19-5-2. 빌트인 생성자 함수와 프로토타입 생성 시점
모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다.

이후 생성자 함수 또는 리터럴 표시법으로 객체를 생성하면 프로토타입은 생성된 객체의 `[[Prototype]]` 내부 슬롯에 할당된다.

```jsx
// 19-22
// 전역 객체 window는 브라우저에 종속적이므로 아래 코드는 브라우저 환경에서 실행해야 한다.
// 빌트인 객체인 Object는 전역 객체 window의 프로퍼티다.
window.Object === Object // true
```

<br>

## 19-6. 객체 생성 방식과 프로토타입의 결정
객체의 생성 방법
- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스

-> 추상 연산 OrdinaryObjectCreate에 의해 생성된다는 공통점이 있다. 필수적으로 자신이 생성할 객체의 프로토타입을 인수로 전달받고, 생성할 객체에 추가할 프로퍼티 목록을 옵션으로 전달할 수 있다.

즉, 객체가 생성되는 시점에 객체 생성 방식에 의해 결정되는 프로토타입 추상 연산 OrdinaryObjectCreate에 전달되는 인수에 의해 결정된다. 

<br>

### 19-6-1. 객체 리터럴에 의해 생성된 객체의 프로토타입
객체 리터럴을 평가하여 객체를 생성할 때 추상 연산 OrdinaryObjectCreate을 호출하는데, 여기에 전달되는 프로토타입은 Object.prototype이다. -> 객체 리터럴에 의해 생성되는 객체의 프로토타입은 **Object.prototype**이다.

객체 리터럴에 의해 생성된 객체는 constructor 프로퍼티와 hasOwnProperty 메서드 등을 소유하지 않지만, 자신의 프로토타입인 Object.prototype 객체를 상속 받았기 때문에 자신의 자산인 것처럼 자유롭게 사용할 수 있다. 

```jsx
// 19-23
const obj = { x: 1 };
```

```jsx
// 19-24
const obj = { x: 1 };

// 객체 리터럴에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x'));    // true
```


<br>

### 19-6-2. Object 생성자 함수에 의해 생성된 객체의 프로토타입
Object 생성자 함수를 인수없이 호출 시, 빈 객체가 생성된다. Object 생성자 함수를 호출하면 객체 리터럴과 마찬가지로 추상 연산 OrdinaryObjectCreater가 호출되며 Object 생성자 함수에 의해 생성되는 객체의 프로토타입은 **Object.prototype**이다.

객체 리터럴에 의해 생성된 객체와 동일한 구조를 갖지만, 프로퍼티를 추가하는 방식에서 차이가 나타난다. 
- 객체 리터럴 방식 : 객체 리터럴 내부에 프로퍼티를 추가
- Object 생성자 함수 : 일단 빈 객체 생성 후 프로퍼티 추가

```jsx
// 19-25
const obj = new Object();
obj.x = 1;
```

```jsx
// 19-26
const obj = new Object();
obj.x = 1;

// Object 생성자 함수에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x'));    // true
```

<br>

### 19-6-3. 생성자 함수에 의해 생성된 객체의 프로토타입
new 연산자와 함꼐 생성자 함수를 호출하여 인스턴스를 생성하면 OrdinaryObjectCreate가 호출되는데, 이 때 전달되는 프로토타입은 **생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체**이다.
생성자 함수를 토앻 생성된 모든 객체는 프로토타입에 추가된 메서드를 상속 받아 자신의 메서드처럼 사용할 수 있다.

```jsx
// 19-27
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');
```

```jsx
// 19-28
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');
const you = new Person('Kim');

me.sayHello();  // Hi! My name is Lee
you.sayHello(); // Hi! My name is Kim
```


<br>

## 19-7. 프로토타입 체인
자바스크립트는 객체의 프로퍼티에 접근할 때, 해당 객체에 찾는 프로퍼티가 없으면
`[[Prototype]]` 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 

항상 최상위 프로토타입은 Object.prototype이다. 이를 프로토타입 체인의 종점이라고 한다. Object.prototype의 프로토타입은 null이다. 종점에서도 해당 프로퍼티 검색이 안되는 경우 undefined를 반환한다.

> 스코프 체인 vs 프로토타입 체인
> 
> 프로토타입 체인 : 상속과 프로퍼티 검색을 위한 매커니즘
> 스코프 체인 : 식별자 검색을 위한 메커니즘


```jsx
// 19-29
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');

// hasOwnProperty는 Object.prototype의 메서드다.
console.log(me.hasOwnProperty('name')); // true
```

```jsx
// 19-30
Object.getPrototypeOf(me) === Person.prototype; // -> true
```

```jsx
// 19-31
Object.getPrototypeOf(Person.prototype) === Object.prototype; // -> true
```

```jsx
// 19-32
// hasOwnProperty는 Object.prototype의 메서드다.
// me 객체는 프로토타입 체인을 따라 hasOwnProperty 메서드를 검색하여 사용한다.
me.hasOwnProperty('name'); // -> true
```

```jsx
// 19-33
Object.prototype.hasOwnProperty.call(me, 'name');
```

```jsx
// 19-34
console.log(me.foo); // undefined
```


```jsx
// 19-35
me.hasOwnProperty('name');
```

<br>

## 19-8. 오버라이딩과 프로퍼티 새도잉


```jsx
// 19-36 
const Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // 생성자 함수를 반환
  return Person;
}());

const me = new Person('Lee');

// 인스턴스 메서드
me.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};

// 인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
me.sayHello(); // Hey! My name is Lee
```

```jsx
// 19-37
// 인스턴스 메서드를 삭제한다.
delete me.sayHello;
// 인스턴스에는 sayHello 메서드가 없으므로 프로토타입 메서드가 호출된다.
me.sayHello(); // Hi! My name is Lee
```

```jsx
// 19-38
// 프로토타입 체인을 통해 프로토타입 메서드가 삭제되지 않는다.
delete me.sayHello;
// 프로토타입 메서드가 호출된다.
me.sayHello(); // Hi! My name is Lee
```

```jsx
// 19-39
// 프로토타입 메서드 변경
Person.prototype.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};
me.sayHello(); // Hey! My name is Lee

// 프로토타입 메서드 삭제
delete Person.prototype.sayHello;
me.sayHello(); // TypeError: me.sayHello is not a function
```

<br>

## 19-9. 프로토타입의 교체


```jsx
// 19-40
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  // ① 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    }
  };

  return Person;
}());

const me = new Person('Lee');
```

```jsx
// 19-41
// 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
console.log(me.constructor === Object); // true
```

```jsx
// 19-42
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
    constructor: Person,
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    }
  };

  return Person;
}());

const me = new Person('Lee');

// constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false
```

```jsx
// 19-43
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  }
};

// ① me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee
```

```jsx
// 19-44
// 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
console.log(me.constructor === Object); // true
```


```jsx
// 19-45
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {
  // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
  constructor: Person,
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  }
};

// 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결을 설정
Person.prototype = parent;

// me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee

// constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false

// 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다.
console.log(Person.prototype === Object.getPrototypeOf(me)); // true
```

<br>

## 19-10. `instanceof` 연산자

```jsx
// 19-46
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Person); // true

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```


```jsx
// 19-47
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {};

// 프로토타입의 교체
Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않기 때문에 false로 평가된다.
console.log(me instanceof Person); // false

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

```jsx
// 19-48
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {};

// 프로토타입의 교체
Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

// parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩한다.
Person.prototype = parent;

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Person); // true

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

```jsx
// 19-49
function isInstanceof(instance, constructor) {
  // 프로토타입 취득
  const prototype = Object.getPrototypeOf(instance);

  // 재귀 탈출 조건
  // prototype이 null이면 프로토타입 체인의 종점에 다다른 것이다.
  if (prototype === null) return false;

  // 프로토타입이 생성자 함수의 prototype 프로퍼티에 바인딩된 객체라면 true를 반환한다.
  // 그렇지 않다면 재귀 호출로 프로토타입 체인 상의 상위 프로토타입으로 이동하여 확인한다.
  return prototype === constructor.prototype || isInstanceof(prototype, constructor);
}

console.log(isInstanceof(me, Person)); // true
console.log(isInstanceof(me, Object)); // true
console.log(isInstanceof(me, Array));  // false
```

```jsx
// 19-50
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    }
  };

  return Person;
}());

const me = new Person('Lee');

// constructor 프로퍼티와 생성자 함수 간의 연결은 파괴되어도 instanceof는 아무런 영향을 받지 않는다.
console.log(me.constructor === Person); // false

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Person); // true
// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

<br>

## 19-11. 직접 상속

```jsx
// 19-51
// 프로토타입이 null인 객체를 생성한다. 생성된 객체는 프로토타입 체인의 종점에 위치한다.
// obj → null
let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null); // true
// Object.prototype을 상속받지 못한다.
console.log(obj.toString()); // TypeError: obj.toString is not a function

// obj → Object.prototype → null
// obj = {};와 동일하다.
obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// obj → Object.prototype → null
// obj = { x: 1 };와 동일하다.
obj = Object.create(Object.prototype, {
  x: { value: 1, writable: true, enumerable: true, configurable: true }
});
// 위 코드는 다음과 동일하다.
// obj = Object.create(Object.prototype);
// obj.x = 1;
console.log(obj.x); // 1
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

const myProto = { x: 10 };
// 임의의 객체를 직접 상속받는다.
// obj → myProto → Object.prototype → null
obj = Object.create(myProto);
console.log(obj.x); // 10
console.log(Object.getPrototypeOf(obj) === myProto); // true

// 생성자 함수
function Person(name) {
  this.name = name;
}

// obj → Person.prototype → Object.prototype → null
// obj = new Person('Lee')와 동일하다.
obj = Object.create(Person.prototype);
obj.name = 'Lee';
console.log(obj.name); // Lee
console.log(Object.getPrototypeOf(obj) === Person.prototype); // true
```

```jsx
// 19-52
const obj = { a: 1 };

obj.hasOwnProperty('a');       // -> true
obj.propertyIsEnumerable('a'); // -> true
```

```jsx
// 19-53
// 프로토타입이 null인 객체, 즉 프로토타입 체인의 종점에 위치하는 객체를 생성한다.
const obj = Object.create(null);
obj.a = 1;

console.log(Object.getPrototypeOf(obj) === null); // true

// obj는 Object.prototype의 빌트인 메서드를 사용할 수 없다.
console.log(obj.hasOwnProperty('a')); // TypeError: obj.hasOwnProperty is not a function
```

```jsx
// 19-54
// 프로토타입이 null인 객체를 생성한다.
const obj = Object.create(null);
obj.a = 1;

// console.log(obj.hasOwnProperty('a')); // TypeError: obj.hasOwnProperty is not a function

// Object.prototype의 빌트인 메서드는 객체로 직접 호출하지 않는다.
console.log(Object.prototype.hasOwnProperty.call(obj, 'a')); // true
```

```jsx
// 19-55
const myProto = { x: 10 };

// 객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정하여 직접 상속받을 수 있다.
const obj = {
  y: 20,
  // 객체를 직접 상속받는다.
  // obj → myProto → Object.prototype → null
  __proto__: myProto
};
/* 위 코드는 아래와 동일하다.
const obj = Object.create(myProto, {
  y: { value: 20, writable: true, enumerable: true, configurable: true }
});
*/

console.log(obj.x, obj.y); // 10 20
console.log(Object.getPrototypeOf(obj) === myProto); // true
```

```jsx
// 19-56
// 생성자 함수
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

// 정적 프로퍼티
Person.staticProp = 'static prop';

// 정적 메서드
Person.staticMethod = function () {
  console.log('staticMethod');
};

const me = new Person('Lee');

// 생성자 함수에 추가한 정적 프로퍼티/메서드는 생성자 함수로 참조/호출한다.
Person.staticMethod(); // staticMethod

// 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
// 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는 프로토타입 체인 상에 존재해야 한다.
me.staticMethod(); // TypeError: me.staticMethod is not a function
```

```jsx
// 19-57
// Object.create는 정적 메서드다.
const obj = Object.create({ name: 'Lee' });

// Object.prototype.hasOwnProperty는 프로토타입 메서드다.
obj.hasOwnProperty('name'); // -> false
```

```jsx
// 19-58
function Foo() {}

// 프로토타입 메서드
// this를 참조하지 않는 프로토타입 메소드는 정적 메서드로 변경해도 동일한 효과를 얻을 수 있다.
Foo.prototype.x = function () {
  console.log('x');
};

const foo = new Foo();
// 프로토타입 메서드를 호출하려면 인스턴스를 생성해야 한다.
foo.x(); // x

// 정적 메서드
Foo.x = function () {
  console.log('x');
};

// 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있다.
Foo.x(); // x
```

<br>

## 19-12. 정적 프로퍼티/메서드


<br>


## 19-13. 프로퍼티 존재 확인

```jsx
// 19-59
const person = {
  name: 'Lee',
  address: 'Seoul'
};

// person 객체에 name 프로퍼티가 존재한다.
console.log('name' in person);    // true
// person 객체에 address 프로퍼티가 존재한다.
console.log('address' in person); // true
// person 객체에 age 프로퍼티가 존재하지 않는다.
console.log('age' in person);     // false
```

```jsx
// 19-60
console.log('toString' in person); // true
```

```jsx
// 19-61
const person = { name: 'Lee' };

console.log(Reflect.has(person, 'name'));     // true
console.log(Reflect.has(person, 'toString')); // true
```

```jsx
// 19-62
```

```jsx
// 19-59
const person = {
  name: 'Lee',
  address: 'Seoul'
};

// person 객체에 name 프로퍼티가 존재한다.
console.log('name' in person);    // true
// person 객체에 address 프로퍼티가 존재한다.
console.log('address' in person); // true
// person 객체에 age 프로퍼티가 존재하지 않는다.
console.log('age' in person);     // false
```

```jsx
// 19-60
console.log('toString' in person); // true
```

```jsx
// 19-61
const person = { name: 'Lee' };

console.log(Reflect.has(person, 'name'));     // true
console.log(Reflect.has(person, 'toString')); // true
```

```jsx
// 19-63
console.log(person.hasOwnProperty('toString')); // false
```

<br>

## 19-14. 프로퍼티 열거

```jsx
// 19-64
const person = {
  name: 'Lee',
  address: 'Seoul'
};

// for...in 문의 변수 key에 person 객체의 프로퍼티 키가 할당된다.
for (const key in person) {
  console.log(key + ': ' + person[key]);
}
// name: Lee
// address: Seoul
```

```jsx
// 19-65
const person = {
  name: 'Lee',
  address: 'Seoul'
};

// in 연산자는 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인한다.
console.log('toString' in person); // true

// for...in 문도 객체가 상속받은 모든 프로토타입의 프로퍼티를 열거한다.
// 하지만 toString과 같은 Object.prototype의 프로퍼티가 열거되지 않는다.
for (const key in person) {
  console.log(key + ': ' + person[key]);
}

// name: Lee
// address: Seoul
```

```jsx
// 19-66
// Object.getOwnPropertyDescriptor 메서드는 프로퍼티 디스크립터 객체를 반환한다.
// 프로퍼티 디스크립터 객체는 프로퍼티 어트리뷰트 정보를 담고 있는 객체다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, 'toString'));
// {value: ƒ, writable: true, enumerable: false, configurable: true}
```

```jsx
// 19-67
const person = {
  name: 'Lee',
  address: 'Seoul',
  __proto__: { age: 20 }
};

for (const key in person) {
  console.log(key + ': ' + person[key]);
}
// name: Lee
// address: Seoul
// age: 20
```

```jsx
// 19-68
const sym = Symbol();
const obj = {
  a: 1,
  [sym]: 10
};

for (const key in obj) {
  console.log(key + ': ' + obj[key]);
}
// a: 1
```

```jsx
// 19-69
const person = {
  name: 'Lee',
  address: 'Seoul',
  __proto__: { age: 20 }
};

for (const key in person) {
  // 객체 자신의 프로퍼티인지 확인한다.
  if (!person.hasOwnProperty(key)) continue;
  console.log(key + ': ' + person[key]);
}
// name: Lee
// address: Seoul
```

```jsx
// 19-70
const obj = {
  2: 2,
  3: 3,
  1: 1,
  b: 'b',
  a: 'a'
};

for (const key in obj) {
  if (!obj.hasOwnProperty(key)) continue;
  console.log(key + ': ' + obj[key]);
}

/*
1: 1
2: 2
3: 3
b: b
a: a
*/
```

```jsx
// 19-71
const arr = [1, 2, 3];
arr.x = 10; // 배열도 객체이므로 프로퍼티를 가질 수 있다.

for (const i in arr) {
  // 프로퍼티 x도 출력된다.
  console.log(arr[i]); // 1 2 3 10
};

// arr.length는 3이다.
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 1 2 3
}

// forEach 메서드는 요소가 아닌 프로퍼티는 제외한다.
arr.forEach(v => console.log(v)); // 1 2 3

// for...of는 변수 선언문에서 선언한 변수에 키가 아닌 값을 할당한다.
for (const value of arr) {
  console.log(value); // 1 2 3
};
```

```jsx
// 19-72
const person = {
  name: 'Lee',
  address: 'Seoul',
  __proto__: { age: 20 }
};

console.log(Object.keys(person)); // ["name", "address"]
```

```jsx
// 19-73
console.log(Object.values(person)); // ["Lee", "Seoul"]
```

```jsx
// 19-74
console.log(Object.entries(person)); // [["name", "Lee"], ["address", "Seoul"]]

Object.entries(person).forEach(([key, value]) => console.log(key, value));
/*
name Lee
address Seoul
*/
```
