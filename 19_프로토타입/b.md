# 19. 프로토타입 (1)
자바스크립트는 멀티 패러다임 프로그래밍 언어
- 명령형
- 함수형
- 프로토타입 기반
- 객체지향 프로그래밍

자바스크립트는 객체 기반의 프로그래밍 언어이며, 자바스크립트를 이루고 있는 대부분이 객체 (원시 타입 제외)

## 19-1 객체지향 프로그래밍
프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍의 절차지향적 관점에서 벗어나 **여러 개의 독립적 단위(객체)의 집합**으로 프로그램을 표현하려는 프로그래밍 패러다임

실체를 철학적 사고로 인식하는 과정
- 속성 : 실체의 특징이나 성질을 나타냄
- 추상화 : 다양한 속정 중 프로그램에 필요한 속성만 간추려 내 표현하는 것
- 객체 : 속성을 통해 여러개의 값을 하나의 단위로 구성한 복합적인 자료구조 / 상태 데이터와 동작을 하나의 논리적 단위로 묶은 복합적인 자료구조
    - 상태 : 데이터
    - 동작 : 상태 데이터를 조작

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

## 19-2 상속과 프로토타입
상속 : 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것.

자바스크립트는 프로토타입을 기반으로 상속을 구현하여 기존의 코드를 적극적으로 재사용해 불필요한 중복을 제거한다.

생성자 함수가 생성한 모든 인스턴스는 자신의 상위 객체 Prototype의 모든 프로퍼티와 메서드를 상속받는다.

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

## 19-3 프로토타입 객체
객체지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용

객체가 생성될 때 객체 생성방식에 따라 프로토타입이 결정되고, `[[prototype]]`에 저장된다.
- 객체 리터럴에 의해 생성된 객체의 프로토타입 : Object.prototype
- 생성자 함수에 의해 생성된 객체의 프로토타입 : 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체

### 19-3.1 `__proto__` 접근자 프로퍼티
모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입 내부 슬롯에 간접적으로 접근할 수 있다. 

```jsx
// 19-5
const person = { name: 'Lee' };
```

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

### 19-3.2 함수 객체의 prototype 프로퍼티
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

### 19-3.3 프로토타입의 constructor 프로퍼티와 생성자 함수
모든 프로토타입은 constructor 프로퍼티를 갖는다. 이 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다. 이 연결은 함수 객체가 생성될 때 이뤄진다.

```jsx
// 19-14
```

## 19-4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입
constructor 프로퍼티가 가리키는 생성자 함수는 인스턴스를 생성한 생성자 함수


```jsx
// 19-15
```

```jsx
// 19-16
```

```jsx
// 19-17
```

```jsx
// 19-18
```

```jsx
// 19-19
```

**<-> 명시적으로 New 연산자를 사용하지 않는 객체 생성 방식**

이런 경우, constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수 없다. 

Object 생성자 함수에 인수를 전달하지 않거나, undefined, null을 인수로 전달하면서 호출하면 내부적으로는 추상 연산 `OrdinaryObjectCreate`를 호출하여 Object.prototype을 프로토타입으로 갖는 빈 객체를 생성한다. 


리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하기 때문에, 생성된 객체도 가상적인 생성자 함수를 갖는다. **프로토타입과 생성자 함수는 단독으로 존재할 수 없고 항상 쌍으로 존재한다.**

## 19-5 프로토타입의 생성 시점
프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.

### 19-5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점
생성자 함수로서 호출할 수 있는 함수(constructor)는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성

`constructor`는 함수 정의가 평가되어 함수 객체를 생성 - `non-contructor`는 프로토타입이 생성되지 않는다. 


```jsx
// 19-20
```

```jsx
// 19-21
```

### 19-5.2 빌트인 생성자 함수와 프로토타입 생성 시점
모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다.

이후 생성자 함수 또는 리터럴 표시법으로 객체를 생성하면 프로토타입은 생성된 객체의 `[[Prototype]]` 내부 슬롯에 할당된다. 

```jsx
// 19-22
```

## 19-6 객체 생성 방식과 프로토타입의 결정
객체의 생성 방법
- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스

-> 추상 연산 OrdinaryObjectCreate에 의해 생성된다는 공통점이 있다. 필수적으로 자신이 생성할 객체의 프로토타입을 인수로 전달받고, 생성할 객체에 추가할 프로퍼티 목록을 옵션으로 전달할 수 있다.

즉, 객체가 생성되는 시점에 객체 생성 방식에 의해 결정되는 프로토타입 추상 연산 OrdinaryObjectCreate에 전달되는 인수에 의해 결정된다. 

### 19-6.1 객체 리터럴에 의해 생성된 객체의 프로토타입
객체 리터럴을 평가하여 객체를 생성할 때 추상 연산 OrdinaryObjectCreate을 호출하는데, 여기에 전달되는 프로토타입은 Object.prototype이다. -> 객체 리터럴에 의해 생성되는 객체의 프로토타입은 **Object.prototype**이다.

객체 리터럴에 의해 생성된 객체는 constructor 프로퍼티와 hasOwnProperty 메서드 등을 소유하지 않지만, 자신의 프로토타입인 Object.prototype 객체를 상속 받았기 때문에 자신의 자산인 것처럼 자유롭게 사용할 수 있다. 

```jsx
// 19-23
```

```jsx
// 19-24
```


### 19-6.2 Object 생성자 함수에 의해 생성된 객체의 프로토타입
Object 생성자 함수를 인수없이 호출 시, 빈 객체가 생성된다. Object 생성자 함수를 호출하면 객체 리터럴과 마찬가지로 추상 연산 OrdinaryObjectCreater가 호출되며 Object 생성자 함수에 의해 생성되는 객체의 프로토타입은 **Object.prototype**이다.

객체 리터럴에 의해 생성된 객체와 동일한 구조를 갖지만, 프로퍼티를 추가하는 방식에서 차이가 나타난다. 
- 객체 리터럴 방식 : 객체 리터럴 내부에 프로퍼티를 추가
- Object 생성자 함수 : 일단 빈 객체 생성 후 프로퍼티 추가

```jsx
// 19-25
```

```jsx
// 19-26
```

### 19-6.3 생성자 함수에 의해 생성된 객체의 프로토타입
new 연산자와 함꼐 생성자 함수를 호출하여 인스턴스를 생성하면 OrdinaryObjectCreate가 호출되는데, 이 때 전달되는 프로토타입은 **생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체**이다.
생성자 함수를 토앻 생성된 모든 객체는 프로토타입에 추가된 메서드를 상속 받아 자신의 메서드처럼 사용할 수 있다.

```jsx
// 19-27
```

```jsx
// 19-28
```


## 19-7 프로토타입 체인
자바스크립트는 객체의 프로퍼티에 접근할 때, 해당 객체에 찾는 프로퍼티가 없으면
`[[Prototype]]` 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 

항상 최상위 프로토타입은 Object.prototype이다. 이를 프로토타입 체인의 종점이라고 한다. Object.prototype의 프로토타입은 null이다. 종점에서도 해당 프로퍼티 검색이 안되는 경우 undefined를 반환한다.

> 스코프 체인 vs 프로토타입 체인
> 
> 프로토타입 체인 : 상속과 프로퍼티 검색을 위한 매커니즘
> 스코프 체인 : 식별자 검색을 위한 메커니즘


```jsx
// 19-29
```

```jsx
// 19-30
```

```jsx
// 19-31
```

```jsx
// 19-32
```

```jsx
// 19-33
```

```jsx
// 19-34
```


```jsx
// 19-35
```


## 19-8 오버라이딩과 프로퍼티 새도잉


```jsx
// 19-36 
```

```jsx
// 19-37
```

```jsx
// 19-38
```

```jsx
// 19-39
```

## 19-9 프로토타입의 교체


```jsx
// 19-40
```

```jsx
// 19-41
```

```jsx
// 19-42
```

```jsx
// 19-43
```

```jsx
// 19-44
```


```jsx
// 19-45
```

## 19-9 instanceof 연산자

```jsx
// 19-46
```


```jsx
// 19-47
```

```jsx
// 19-48
```


```jsx
// 19-49
```

```jsx
// 19-50
```

## 19-11 직접 상속

## 19-12 정적 프로퍼티/메서드

## 19-13 프로퍼티 존재 확인

## 19-14 프로퍼티 열거


