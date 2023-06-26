# 19장. 프로토타입

자바스크립트는 명령형, 함수형, 프로토타입 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 프로그래밍 언어다. <br>
자바스크립트는 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 더 강력한 객체지향 프로그래밍 능력을 지니고 있는 프로그래밍 기반의 객체지향 프로그래밍 언어다. <br>자바스크립트는 객체 기반의 프로그래밍 언어이며 자바스크립트를 이루고 있는 거의 "모든 것"이 객체다. 원시타입의 값을 제외한 나머지 값들(함수, 배열, 정규 표현식)은 모든 객체다.

## 19.1 객체지향 프로그래밍

객체지향 프로그래밍은 여러 개의 독립적 단위, 즉 객체의 집합으로 프로그래밍을 표현하려는 프로그래밍 패러다임이다.

```javascript

const person = {
    name : 'lee',
    address : 'Seoul'
}

console.log(person); // {name : 'lee', address : 'Seoul'}

```

속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체라 하며, 객체지향 프로그래밍은 독립적인 객체의 집합으로 프로그래밍을 표현하려는 프로그래밍 패러다임이다.


```javascript

const circle = {
    radius : 5,
    // 원의 지름
    getDiameter(){
        return 2*this.radius;
    }

    // 원의 둘레
    getPerimeter(){
        return 2*Math.PI *this.radius;
    }

    // 원의 넒이
    getArea(){
        return Math.PI * this.radius **2;
    }
}

console.log(circle);
// {radius:5,getDiameter:f,getPerimeter:f,getArea:f}

console.log(circle.getDiameter()); // 10
console.log(circle.getPermeter()); // 31.4159265
console.log(circle.getArea()); // 78.53981633

```

이처럼 객체지향 프로그래밍은 객체의 상태를 나타내는 데이터와 상태 데이터를 조작할 수 있는 동작을 하나의 논리적인 단위로 묶어 생각한다. 따라서 객체는 상태 테이더와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조라고 할 수 있다. 이때 객체의 데이터를 프로퍼티, 동작을 메서드라고 부른다.<br>

각 객체는 고유의 기능을 갖는 독립적인 부품으로 볼 수 있지만 자신의 고유한 기능을 수행하려면 다른 객체와 관계성을 가질 수 있다. 다른 객체와 메시지를 주고받거나 데이터를 처리할 수도 있다. 또는 다른 객체의 상태 데이터나 동작을 상속받아 사용하기도 한다.



## 19.2 상속과 프로토타입

상속은 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다. <br>
자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거한다. 중복을 제거하는 방법은 기존의 코드를 적극적으로 재사용하는 방법이다.

```javascript

function circle(radius){
    this.radius = radius;
    thi.getArea = function(){
        return Math.PI * this.raidus ** 2;
    }
}

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
console.log(circle1.getArea === circle2.getArea);

console.log(circle1.getArea()); // 3.141592
console.log(circle2.getArea()); // 12.566370

```

함수는 동일한 프로퍼티(메서드 포함) 구조를 갖는 객체를 여러 개 생성할 때 유용하지만 위예제의 생성자 함수는 문제가 있다. circle 생성자 함수는 인스턴스를 생성할 때마다 getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다. 이처럼 중복 소유하는 것은 메모리를 불필요하게 낭비한다. 이런 문제를 해결하기 위해 상속을 통해 불필요한 중복을 제거해보자. **자바스크립트는 프로토타입을 기반으로 상속을 구현한다.**

```javascript

function Circle(radius){
    this.radius = radius;
}

// Circle 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function(){
    return Math.PI * this.raidus ** 2;
}

const circle1 = new Circle(1);
const circle2 = new Cricle(2);

// Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea); // 3.14159265
console.log(circle2.getArea); // 12.5663706

```

Circle 생성자 함수가 생성한 모든 인스턴스는 자신의 프로토타입, 즉 상위 객체 역할을 하는 Circle.prototype의 모든 프로퍼티와 메서드를 상속받는다.<br>
상속은 코드의 재사용이란 관점에서 매우 유용하다. 생성자 함수가 생성할 모든 인스턴스가 공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현해 두면 생성자 함수가 생성할 모든 인스턴스는 별도의 구현없이 상위(부모) 객체인 프로토타입의 자산을 공유하여 사용할 수 있다. 

## 19.3 프로토타입 객체

모든 객체는 [[Prototype]] 이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조다. [[Prototype]]에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다. 즉, 객체가 생성될때 생성방식에 따라 프로토타입이 결정되고 [[Prototype]]에 저장된다.

### 19.3.1 __proto__ 접근자 프로퍼티
모든 객체는 __proto__ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]]내부 슬롯에 간접적으로 접근할 수 있다. <br> 접
**__proto__는 접근자 프로퍼티다**<br>
접근자 프로퍼티는 자체적으로는 값([[Value]] 프로퍼티 어트리뷰트)을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수(accessor function), 즉 [[Get]], [[Set]]프로퍼티 어트리뷰트로 구성된 프로퍼티다. <br>
**__proto__ 접근자 프로퍼티는 상속을 통해 사용된다**<br>
__proto__ 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 최상위 객체인 Object.prototype의 프로퍼티다. 모든 객체는 상속을 통해 Object.prototype.__proto__접근자 프로퍼티를 사용할 수 있다.<br>
**__proto__접근자 프로퍼티를 통해 프로토타입에 접근하는 이유**<br>
상호참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서다. 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다.
```javascript

const parent = {};
const chile = {};

child.__proto__ = parent;
parent.__proto__ = child;

```
위 예제처럼 서로가 자신의 프로토타입이 되는 비정상적인 프로토타입 체인이 만들어기지 때문에 __proto__ 접근자 프로퍼티는 에러를 발생시킨다. <br>

**__proto__접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다**<br>
모든 객체가 __proto__접근자 프로퍼티를 직접 사용할 수 있는 것은 아니기 때문이다. 따라서 __proto__접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶은 경우에는 Object.getPrototypeOf 메서드를 사용하고, 프로토타입을 교체하고 싶은 경우에는 Object.setPrototypeOf메서드를 사용할 것을 권장한다.

```javascript

const obj = {};
const parent = {x:1};

Object.getPrototypeOf(obj); // obj.__proto__;
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;

console.log(obj.x); // 1

```

### 19.3.2 함수 객체의 prototype 프로퍼티

함수 객체만이 소유하는 prototype프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다. <br>
따라서 생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor 인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다.

```javascript

// 화살표 함수는 non-constructor다
const Person = name => {
    this.name = name;
}

console.log(Person.hasOwnProperty('prototype')); // false
console.log(Person.prototype); // undefined

// ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor다.
const obj = {
    foo(){}; 
}

console.log(obj.hasOwnProperty('prototype')) // false
console.log(obj.prototype); // undefined


```

모든 객체가 가지고 있는 (엄밀히 말하면 Object.prototype으로 상속받은) __proto__ 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype프로퍼티는 결국 동일한 프로포타입을 가리킨다.

- __proto__접근자 프로퍼티 : 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용
- prototype프로퍼티 : 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기위해 사용

``` javascript

function Person(name){
    this.name = name;
}

const me = new Person('lee');

// 결국 Person.prototype과 me.__proto__는 결국 동일한 프로토타입을 가리킨다.
console.log(Person.prototpye === me.__proto__); // ture

```

### 19.3.3 프로토타입의 constructor 프로퍼티와 생성자 함수
모든 프로토타입은 constructor 프로퍼티를 갖는다. 이 constructor프로퍼티는 prototype프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다. 
```javascript

function Person(name){
    this.name = name;
}

const me = new Person('lee');
console.log(me.constructor === Person); // ture

```
Person 생성자 함수는 me 객체를 생성했다. me 객체는 프로토타입의 constructor프로퍼티를 통해 생성자 함수와 연결된다. me 객체는 costructor 프로퍼티가 없지만 me 객체의 프로토타입인 Person.prototype에는 constructor 프로퍼티가 있다. 따라서 me 객체는 프로토타입인 Person.prototype.constructor프로퍼티를 상속받아 사용할수 있다.



## 19.4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로 new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는 객체 생성 방식도 있다.<br>
리터럴 표기법에 의해 생성된 객체의 경우 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정지을 수 없다.

```javascript

const obj = {};
console.log(obj.constructor === Object); //ture

```
위 예제의 obj객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴에 의해 생성된 객체다. 하지만 obj객체는 Object 생성자 함수와 constructor 프로퍼티와 연결되어 있다. 그렇다면 객체 리터럴에 의해 생성된 객체는 사실 Object 생성자 함수고 생성되는 것은 아닐까?<br>

Object 생성자 함수에 인수를 전달하지 않거나 undefined 또는 null을 인수로 전달하면서 호출하면 내부적으로는 추상 연산 OrdinaryObjectCreate를 호출하여 Object.prototype을 프로토타입으로 갖는 빈 객체를 생성한다.

> 추상연산은 ECMAScript 사양에서 내부 동작의 구현 알고리즘을 표현한 것이다. 

```javascript

function foo () {}
// foo 함수는 function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성했다.

console.log(foo.constructor === Function); // true
// 하지만 constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 function생성자 함수다.

```
리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하다. 따라서 리터럴 표기법에 의해 생성된 객체도 가상적인 생성자 함수를 갖는다. 프로토타입은 생성자 함수와 더불어 생성되며 prototype, constructor 프로퍼티에 의해 연결되어 있기 때문이다. 다시 말해, 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다. 따라서 프로토타입의 constructor프로퍼티를 통해 연결되어 있는 생성자 함수를 리터럴 표기법으로 생성한 객체를 생성자 함수로 생각해도 크게 무리는 없다.

- 객체 리터럴 : Object.prototype
- 함수 리터럴 : Function.prototype
- 배열 리터럴 : Array.prototype
- 정규 표현식 리터럴 : RegExp.prototype


## 19.5 프로토타입의 생성 시점

프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다. 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재하기 때문이다.

### 19.5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점
생성자 함수로서 호출할 수 있는 함수, 즉 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토 타입도 더불어 생성된다.

```javascript

console.log(Person.prototype); // {constructor:f}

function Person(name){
    this.name = name;
}

```

생성자 함수로서 호출할 수 없는 함수, 즉 non-constroctor는 프로토타입이 생성되지 않는다.

```javascript

const Person = name => {
    this.name = name
}

console.log(Person.prototype); // undefined

```

함수 선언문은 런타임 이전에 자바스크립트 엔진에 의해 먼저 실해되므로 Person 생성자 함수는 어떤 코드보다 먼저 평가되어 함수 객체가 된다. 이때 프로토타입도 더불어 생성된다. 생성된 프로토타입은 Person 생성자 함수의 prototype프로퍼티에 바인딩된다.<br>
이처럼 빌트인 생성자 함수가 아닌 사용자 정의 생성자 함수는 자신이 평가되어 함수 객체로 생성되는 시점에 프로토타입도 더불어 생성되며, 생성된 프로토타입의 프로토타입은 언제나 Object.prototype이다.


### 19.5.2 빌트인 생성자 함수와 프로토타입 생성 시점
Object, String, Number, Function, Array, RegExp, Date, Promise등과 같은 빌트인 생성자 함수도 일반 함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다. 모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다.

## 19.6 객체 생성 방식과 프로토타입의 결정
프로토타입은 추상연산 OrdinaryObjectCreate에 전달되는 인수에 의해 결정된다. 이 인수는 객체가 생성되는 시점에 객체 생성 방식에 의해 결정된다.

### 19.6.1 객체 리터럴에 의해 생성된 객체의 프로토타입
```javascript

const obj = {x:1};

console.log(obj.constructor === Object); //true
console.log(obj.hasOwnProperty('x')); // true

```
객체 리터럴에 의해 생성된 obj객체는 object.prototype을 프로토타입으로 갖게 되며, 이로써 Object.prototype을 상속받는다. obj객체는 constructor 프로퍼티와 hasOwnProperty메서드 등을 소유하지 않지만 자신의 프로토타입인 Object.prototype의 constructor프로퍼티와 hasOwnProperty메서드를 자신의 자산인 것처럼 자유롭게 사용할 수 있다.

### 19.6.2 Object 생성자 함수에 의해 생성된 객체의 프로토타입
Object 생성자 함수에 의해 생성되는 객체의 프로토타입은 Object.prototype이다

```javascript

const obj = new Object();
obj.x = 1;

// Object 생성자 함수에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
console.log(obj.constructor === Object); // ture
console.log(obj.hasOwnProperty('x')); //true

```
위 코드가 실행되면 추상 연산 OrdinaryObjectCreate에 의해 다음과 같이 Object 생성자 함수과 Object.prototype과 생성된 객체 사이에 연결이 만들어진다. 객체 리터럴에 의해 성성된 객체와 동일한 구조를 갖는것을 알 수 있다.<br>
그러나 객체 리터럴과 Object 생성자 함수에 의한 객체 생성 방식의 차이는 프로퍼티를 추가하는 방식에 있다. 객체 리터럴 방식은 객체 리터럴 내부에 프로퍼티를 추가하지만 Object 생성자 함수 방식은 일반 빈 객체를 생성한 이후 프로퍼티를 추가해야 한다.


### 19.6.3 생성자 함수에 의해 생성된 객체의 프로토타입

생성된 함수에 의해 생성되는 객체의 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체다.

```javascript

function Person(name){
    this.name = name;
}

const me = new Person('lee');
```
위 코드가 실행되면 추상 연산 OrdinaryObjectCreate에 의해 생성자 함수와 생성자 함수의 prototype프로퍼티에 바인딩되어 있는 객체와 생성된 객체 사이에 연결이 만들어진다. 표준 빌트인 객체인 Object 생성자 함수와 더불어 생성된 프로토타입 Object.prototype은 다양한 빌트인 메서드(hasOwnProperty, propertyIsEumerable 등)를 갖고 있지만 사용자 정의 생성자 함수 Person과 더불어 생성된 프로토타입 Person.prototype의 프로퍼티는 constructor뿐이다. <br>
프로토타입 Person.prototype에 프로퍼티를 추가하여 하위(자식) 객체가 상속받을 수 있도록 구현해보자.

```javascript
function Person(name){
    this.name = name;
}

Person.prototype.sayHello = function(){
    console.log(`Hi! my name is ${this.name}`);
}

const me = new Person('lee');
const you = new Person('kim;');

me.sayHello(); // Hi! my name is lee
you.sayHello(); // Hi! my name is kim
```
프로토타입은 객체다. 따라서 일반 객체와 같이 프로토타입에도 프로퍼티를 추가/삭제할 수 있다. 그리고 이렇게 추가/삭제된 프로퍼티는 프로토타입 체인에 즉각 반영한다. Person생성자 함수를 통해 생성된 모든 객체는 프로토타입에 추가된 sayHello메서드를 상속받아 자신의 메서드처럼 사용할 수 있다.


## 19.7 프로토타입 체인
```javascript
function Person(name){
    this.name = name;
}

Person.prototype.sayHello = function(){
    console.log(`Hi! my name is ${this.name}`);
}

const me = new Person('lee');
const you = new Person('kim;');

me.sayHello(); // Hi! my name is lee
you.sayHello(); // Hi! my name is kim

console.log(me.hasOwnProperty('name')); // true
```

Person 생성자 함수에 의해 생성된 me 객체는 Object.prototype의 메서드인 hasOwnProperty를 호출할 수 있다. 이것은 me 객체가 Person.protytype뿐만 아니라 Object.prototype도 상속받았다는 것을 의미한다. me 객체인 프로토타입은 Person.prototype이다.


```javascript   
Object.getPrototypeOf(me) === Person.prototype; // ture

Object.getPrototypeOf(Person.prototype) === Object.prototype ; // ture
```

Person.prototype의 프로토타입은 Object.prototype이다. 프로토타입의 프로토타입은 언제나 Object.prototype이다. <br>
**자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할때 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 이를 프로토타입이라고 한다.** 프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘이다.<br><br>

me.hasOwnProperty('name')과 같이 매서드를 호출하면 자바스크립트 엔진은 다음과 같은 과정을 거쳐 메서드를 검색한다. 물론 프로퍼티를 참조하는 경우도 마찬가지다.

1. 먼저 hasOwnProperty 메서드를 호출한 me 객체에서 hasOwnProperty메서드를 검색한다. me 객체에는 hasOwnProperty 메서드가 없으므로 프로토타입 체인을 따라, 다시 말해 [[Prototype]]내부 슬롯에 바인딩되어 있는 프로토타입(위 예제의 Person.prototype)으로 이동하여 hasOwnProperty메서드를 검색한다.
2. Person.prototype에도 hasOwnProperty메서드가 없으므로 프로토타입 체인에 따라, 다시말해 [[Prototype]]내부슬롯에 바인딩되어 있는 프로토타입(위 예제의 경우 Object.prototype)으로 이동하여 hasOwnProperty메서드를 검색한다.
3. Object.prototype에는 hasOwnProperty메서드가 존재한다. 자바스크립트 엔진은 Object.prototype.hasOwnProperty메서드를 호출한다. 이때 Object.prototype.hasOwnProperty메서드의 this에는 me객체가 바인딩된다.

<br>
Object.prototype을 프로토타입 체인의 종점(end of prototype chain)이라 한다. Object.prototype의 프로토타입, 즉 [[prototype]]내부슬롯의 값은 null이다.<br> 프로토타입 체인의 종점인 Object.prototype에서도 프로퍼티를 검색할 수 없는 경우 undefined를 반환한다. 이때 에러가 발생하지 않는 것에 주의하자.

## 19.8 오버라이딩과 프로퍼티 섀도잉

```javascript
const Person = (function(){

    // 생성자 함수
    function Person(name){
        this.name = name;
    }

    // 프로토타입 메서드
    Person.prototype.sayHello = function(){
        console.log(`Hi my name is ${this.name}`);
    }

    return Person;
}());

const me = new Person('lee');

me.sayHello = function(){
    console.log(`hey! my name is ${this.name}`);
}

me.sayHello(); // hey! my name is lee

```

프로토타입이 소유한 프로퍼티(메서드 포함)를 프로토타입 프로퍼티, 인스턴스가 소유한 프로퍼티를 인스턴스 프로퍼티라고 부른다. 프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 프로토타입 체인을 따라 프로토타입 프로퍼티를 검색하여 프로토타입 프로퍼티를 덮어쓰는 것이 아니라 인스턴스 프로퍼티로 추가한다.
 이때 인스턴스 메서드 sayHello는 프로토타입 메서드 sayHello를 오버라이딩했고 프로토타입 메서드 sayHello는 가려진다. 이처럼 상속 관계에 의해 프로퍼티가 가려지는 현상을 **프로퍼티 섀도잉**이라고 한다.

- 오버라이딩(overriding) : 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식이다.
- 오버로딩(overloading) : 함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식이다. 자바스크립트는 오버로딩을 지원하지 않지만 arguments 객체를 사용하여 구현할 수는 있다.

```javascript

// 인스턴스 메서드를 삭제한다.
delete me.sayHello;

// 인스턴스에는 sayHello 메서드가 없으므로 프로토타입 메서드가 호출된다.
me.sayHello(); // Hi my name is lee

```
프로퍼티를 삭제하는 경우도 마찬가지다. 위 예제를 보면 프로토타입 메서드가 아닌 인스턴스 메서드 sayHello가 삭제된다. 다시한번 sayHello 메서드를 삭제를 시도해보자.

```javascript

delete me.sayHello;

me.sayHello(); // Hi my name is lee

```

이와 같이 하위 객체를 통해 프로토타입의 프로퍼티를 변경 또는 삭제하는 것은 불가능하다. 다시 말해 하위 객체를 통해 프로토타입 get 액세스는 허용되나 set액세스는 허용되지 않는다. 프로토타입 프로퍼티를 변경 또는 삭제하려면 직접 접근해야 한다.

```javascript
Person.prototype.sayHello = function(){
    console.log(`hey! my name is ${this.name}`);
}
me.sayHello(); // hey! my name is leee

delete Person.prototype.sayHello;
me.sayHello(); // TypeError
```

## 19.9 프로토타입의 교체

프로토타입은 임의의 다른 객체로 변경할 수 있다. 이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미한다.<br>
이러한 특징을 활용하여 객체 간의 상속 관계를 동적으로 변경할 수 있다. 프로토타입은 생성자 함수 또는 인스턴스에 의해 교체될 수 있다.

### 19.9.1 생성자 함수에 의한 프로토타입의 교체

```javascript

const Person = (function(){
    function Person(name){
        this.name = name;
    }

    Person.prototype = {
        sayHello(){
            console.log(`hi my name is ${this.name}`);
        }
    }
    return Person;
}());

const me = new Person('lee');

console.log(me.constructor === Person); // false
console.log(me.constructor === Object); // ture

```
이처럼 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다. 파괴된 constructor 프로퍼티와 생성자 함수간의 연결을 되살려 보자.

```javascript

const Person = (function(){
    function Person(name){
        this.name = name;
    }

    Person.prototype = {

        // contructor 프로퍼티와 생성자 함수 간의 연결을 설정
        consturctor : Person,
        sayHello(){
            console.log(`hi my name is ${this.name}`);
        }
    }
    return Person;
}());

const me = new Person('lee');

console.log(me.constructor === Person); // ture
console.log(me.constructor === Object); // false

```

### 19.9.2 인스턴스에 의한 프로토타입의 교체
인스턴스의 __proto__ 접근자 프로퍼티(또는 Object.getPrototypeOf메서드)를 통해 프로토타입을 교체할 수 있다.
```javascript

function Person(name){
    this.name = name;
}

const me = new Person('lee');

const parent = {
    sayHello(){
        console.log(`Hi my name is ${this.name}`);
    }
}

// me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);

// me.__proto__ = parent; 위코드와 동일하게 동작한다.

me.sayHello(); // Hi my name is lee

console.log(me.constructor === Person); // false
console.log(me.constructor === Object); // true
```

생성자 함수에 의한 프로토타입의 교체와 마찬가지로 프로토타입으로 교체한 객체에는 constructor 프로퍼티가 없으므로 costructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다. 따라서 me 객체의 생성자 함수를 검색하면 Person이 아닌 Object가 나온다.<br>

프로토타입으로 교체한 객체 리터럴에 constructor 프로퍼티를 추가하고 생성자 함수의 prototype프로퍼티를 재설정하여 파괴된 생성자 함수와 프로토타입 간의 연결을 되살려보자.

```javascript

function Person(name){
    this.name = name;
}

const me = new Person('lee');

const parent = {
    // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
    constructor : Person,
    sayHello(){
        console.log(`Hi my name is ${this.name}`);
    }
}

// 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결을 설정
Person.prototype = parent;

// me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// me.__proto__ = parent; 위코드와 동일하게 동작한다.

me.sayHello(); // Hi my name is lee

console.log(me.constructor === Person); // ture
console.log(me.constructor === Object); // false

console.log(Person.prototype === Object.getPrototypeOf(me)); // true
// 생성자 함수의 프로토타입 프로퍼티가 교체된 프로토타입을 가리킨다.
```

이처럼 프로토타입 교체를 통해 객체 간의 상속관계를 동적으로 변경하는 것은 꽤나 번거롭다. 따라서 프로토타입은 직접 교체하지 않는 것이 좋다. 상속관계를 인위적으로 설정하려면 '직접 상속'이 더 편리하고 안전하다.


## 19.10 instanceof 연산자
instanceof 연산자른 이항 연산자로 좌변에 객체를 가리키는 식별자, 우변에 생성자 함수를 가리키는 식별자를 피연산자로 받는다. 만약 우변의 피연산자가 함수가 아닌 경우 TypeError가 발생한다. <br>

**객체 instanceof 생성자 함수**

```javascript

function Person(name){
    this.name = name;
}

const me = new Person('lee');

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Person); // true
// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true

```

instanceof 연산자가 어떻게 동작하는지 이해하기 위해 프로토타입을 교체 해보자.

```javascript

function Person(name){
    this.name = name;
}

const me = new Person('lee');

// 프로토타입으로 교체할 객체
const parane = {};

Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
console.log(Person.prototype === parent) // false
console.log(parent.constructor === Person) // false

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않기 떄문에 false로 평가된다.
console.log(me instanceof Object); // false
// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true

```

Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않기 때문에 프로토타입으로 교체한 parent 객체를 Person생성자 함수의 prototype프로퍼티에 바인딩 하면 me instanceof Person은 true로 평가될 것이다.

```javascript

function Person(name){
    this.name = name;
}

const me = new Person('lee');

// 프로토타입으로 교체할 객체
const parane = {};

Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
console.log(Person.prototype === parent) // false
console.log(parent.constructor === Person) // false

//  parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩한다.
Person.prototype = parent;

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // ture
// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true

```

instanceof연산자는 프로토타입 constructor 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아니라 생성자 함수의 prototype에 바인딩된 객체가 프로토타입 체인 상에 존재하는지 확인한다.

```javascript

const Person = (function(){
    function Person(name){
        this.name = name;
    }

    Person.prototype = {
        sayHello(){
            console.log(`hi my name is ${this.name}`);
        }
    }
    return Person;
}());

const me = new Person('lee');

//  constructor 프로퍼티와 생성자 함수간의 연결이 파괴되었다.
console.log(me.constructor === Person); // false

//  me 객체의 프로토타입 체인상에 존재하므로 ture로 평가된다.
console.log(me instanceof Person); // ture
console.log(me instanceof Object); // ture

```
## 19.11 직접 상속
### 19.11.1 Object.create에 의한 직접 상속
Object.create 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다. Object.create메서드도 다른 객체 생성방식과 마찬가지로 추상연산 OrdinaryObjectCreate를 호출한다. Object.create 메서드의 첫번째 매개변수에는 생성할 객체의 프로토타입으로 지정할 객체를 전달한다. 두번째 매개변수에는 생성할 객체의 프로퍼티 키와 프로퍼티 디스크립터 객체로 이뤄진 객체를 전달한다. 두번째 인수는 옵션이므로 생략 가능하다.

```javascript


// 프로토타입이 null인 객체를 생성. 생성된 객체는 프로토타입 체인의 종점에 위치한다.
// obj -> null이므로 Object.prototype을 상속받지 못한다.
let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null); // true
console.log(obj.toString()); //TypeError

// obj -> Object.prototype -> null
// obj = {};와 동일하다
obj = object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// obj -> Object.prototype -> null
// obj = {x:1};와 동일하다
obj = Object.create(Object.prototype, {
    x : {value:1, writable:ture, enumerable:true, configurable: true}
})


// obj = Object.create(Object.prototype); 코드와 동일하다
console.log(obj.x); // 1
console.log(Object.getPrototypeof(obj) === Object.prototype); // true


const myProto = {x:10};

Obj = Object.create(myProto);
console.log(obj.x); // 10
console.log(Object.getPrototypeOf(obj) === myProto); // true


function Person(name){
    this.name = name;
}

obj = Object.create(Person.prototype);
obj.name = 'lee';
console.log(obj.name); // name
console.log(Object.getPrototypeOf(obj) === Person.prototype); // true

```

Object.create 메서드는 첫번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성한다. 즉, 객체를 생성하면서 직접적으로 상속을 구현하는 것이다.

- new 연산자 없이도 객체를 생성할 수 있다.
- 프로토타입을 지정하면서 객체를 생성할 수 있다.
- 객체 리터럴에 의해 생성된 객체도 상속받을수 있다.

하지만 Object.prototype의 빌트인 메서드 객체가 직접 호출하는 것을 권장하지 않는다. 그 이유는 Object.create메서드를 통해 프로토타입 체인의 종점에 위치하는 객체를 생성할 수 있기 때문이다. 프로토타입 체인의 종점에 위치하는 객체는 Object.prototype의 빌트인 메서드를 사용할 수 없다.

```javascript

const obj = Object.create(null);
obj.a = 1;

console.log(Object.getPrototypeOf(obj) === null); //true
console.log(obj.hasOwnProperty('a')); // typeError

```
이러한 에러를 없애기 위해 Object.prototype의 빌트인 메서드는 다음과 같이 간접적으로 호추하는 것이 좋다.

```javascript
const obj = Object.create(null);
obj.a = 1;

console.log(Object.prototype.hasOwnProperty.call(obj, 'a')); // true

```

### 19.11.2 객체 리터럴 내부에서 __proto__에 의한 직접 상속
객체를 생성한 이후 프로퍼티를 추가하는 방법도 있지만 이또한 깔끔한 방법은 아니다

```javascript
const myProto = {x:10};

const obj = {
    y : 20,
    __proto__:myProto
}

console.log(obj.x, obj.y); // 10 20
conssole.log(Object.getPrototypeOf(obj) === myProto); // true

```

## 19.12 정적 프로퍼티/메서드
정적 프로퍼티/메서드는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메서드를 말한다.

```javascript

function Person(name){
    this.name = name;
}

Person.prototype.sayHello = function(){
    console.log(`hi my name is ${this.name}`);
}

// 정적 프로퍼티
Person.staticProp = 'static prop';

Person.staticMethod = function(){
    console.log('staticMethod);
}

const me = new Person('lee');

Person.staticMethod(); //staticMethod

// 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
me.staticMethod(); // typeError


```

생성자 함수가 생성한 인스턴스는 자신의 프로토타입 체인에 속한 객체의 프로퍼티/메서드에 접근할 수있지만 정적 프로퍼티/메서드는 인스턴스의 프로토타입 체인에 속한 객체의 프로퍼티/메서드가 아니므로 인스턴스로 접근할 수 없다.

```javascript
function Foo(){

    Foo.prototype.x = function(){
        console.log('x')
    }

    const foo = new Foo();
    foo.x(); // x

    // 정적 메서드
    Foo.x = function(){
        console.log('x');
    }
}

Foo.x(); // x
```

참고로 프로토타입 프로퍼티/메서드를 표기할 때 prototype을 #으로 표기하는 경우도 있으니 알아두도록 하자. <br>
> Object.prototype.isPrototypeOf == Object#isPrototypeOf


## 19.13 프로퍼티 존재 확인
### 19.13.1 in 연산자
in연산자는 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인한다.

```javascript

const Person = {
    name : 'lee',
    address : 'seoul'
}

console.log('name' in Person); //true
console.log('address' in Person); //true
console.log('age' in Person); //false

```
in 연산자는 확인대상 객체의 프로퍼티 뿐만 아니라 확인 대상 객체가 상속한 모든 프로토타입 프로퍼티를 확인하므로 주의가 필요하다.

```javascript
console.log('toString' in Person); // true
```
 in연산자가 Person객체가 속한 프로토타입 체인 상에 존재하는 모든 프로토타입에서 toString프로퍼티를 검색했기 때문에 true값이 나온다.
 toString은 Object.prototype의 메서드다. <br>

 in연산자 대신 ES6에서 도입된 Refleat.has 메서드를 사용할 수도 있다

 ```javascript

const person = {name : 'lee'};
console.log(Refleat.has(person, 'name')) // ture
console.log(Refleat.has(person, 'toString')) // ture

 ```

### 19.13.2 Object.prototype.hasOwnProperty 메서드
Object.prototype.hasOwnProperty 메서드를 사용해도 객체에 특정 프로퍼티가 존재하는지 확인할 수 있다.
```javascript
console.log(person.hasOwnProperty('name')) // true
console.log(person.hasOwnProperty('age')) // false

// 객체 고유의 프로퍼티 키인 경우에만 true로 반환한다.
console.log(person.hasOwnProperty('toString')) // false

```

## 19.14 프로퍼티 열거
### 19.14.1 for...in문
객체의 모든 프로퍼티를 순회하며 열거하려면 for..in문을 사용한다.
>for(변수선언문 in 객체){...}

```javascript
const person = {
    name : 'lee',
    address : 'seoul'
}

for(const key in person){
    console.log(key + ': ' + person[key]);
}

// name : lee
// address : seoul

```

for..in 문은 객체의 프로퍼티 개수만큼 순회하며 for .. in문의 변수 선언문에서 선언한 변수에 프로퍼티 키를 할당한다.<br>
for..in문은 in연산자처럼 순회 대상 객체의 프로퍼티뿐만 아니라 상속받은 프로토타입의 프로퍼티까지 열거한다. 하지만 toString과 같은 Object.prototype의 프로퍼티는 열거되지 않는다. toString메서드가 열거할수 없도록 정의된 프로퍼티이기 때문이다.<br>
Object.prototype.string프로퍼티의 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false이기 때문이다.<br>
**다시 말하자면 for .. in문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트[[Enumerable]]의 값이 true인 프로퍼티를 순회하며 열거한다.**

```javascript

const sym = Symble();
const obj = {
    a : 1;
    [sym] :10
}
for (const key in obj){
    console.log(key+':'+obj[key])
}

// a:1
// 키가 심벌인 프로퍼티는 열거하지 않는다.


// 상속받은 프로퍼티만 열거하려면 Object.prototype.hasOwnProperty메서드를 사용해야한다.
const person = {
    name : 'lee',
    address : 'seoul',
    __proto__ : {age : 20}
}

for(const key in person){
    if(!person.hasOwnProperty(key)) continue;
    console.log(key + ' : ' + person[key]);
}

// name : lee
// address : seoul
```
for ..in문은 프로퍼티를 열거할때 순서를 보장하지 않는다.<br>
배열에는 for..in문을 사용하지 말고 일반적인 for문이나 for...of문 또는 Array.prototype.forEach메서드를 사용하기를 권장한다. 사실 배열도 객체이므로 프로퍼티와 상속받은 프로퍼티가 포함될 수 있다.
```javascript
const arr = [1,2,3];
arr.x = 10; // 배열도 객체이므로 프로퍼티를 가질수 있다.

for(const i in arr){
    console.log(arr[i]); //  1 2 3 10
} 

// arr.length는 3이다
for(let i = 0; i < arr.length; i++){
    console.log(arr[i]); // 1 2 3
}

// forEach메서드는 요소가 아닌 프로퍼티는 제외한다.
arr.forEach(v => console.log(v)); // 1 2 3

// for of는 변수 선언문에서 선언한 변수에 키가 아닌 값을 할당한다.
for(const value of arr){
    console.log(value); // 1 2 3
}

```

### 19.14.2 Object.keys/values/entries 메서드

 객체 자신의 고유 프로퍼티만 열거하기 위해서은ㄴ for ..in 문을 사용하는 것보다 Object.keys/values/entries메서드를 사용하는 것을 권장한다. <br>
 Object.keys 메서드는 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환한다.

 ```javascript

const person = {
    name : 'lee',
    address : 'seoul',
    __proto__ : {age:20}
}

console.log(Object.keys(person)); // [name", "address"]

 ```

  Object.values메서드는 객체 자신의 열거 가능한 프로퍼티 값을 배열로 반환한다.

  ```javascript

console.log(Object.keys(person)); // ["lee", "seoul"]

  ```

  Object.entries메서드는 자신이 열거 가능한 프로퍼티 키와 값의 쌍의 배열을 배열에 담에 반환한다.

  ```javascript

    console.log(Object.entries(person));
    // [["name", "lee"],["address","seoul"]]
    Object.entries(person).forEach(([key, value]) => console.log(key, value));
    // name lee
    // address seoul
  ```