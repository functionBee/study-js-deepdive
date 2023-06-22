# 17. 생성자 함수에 의한 객체 생성

객체 리터럴 이외에도 다양한 방법으로 객체를 생성할 수 있습니다.

- 객체 리터럴을 사용해 객체를 생성하는 방식 
- 생성자 함수를 사용하여 객체를 생성하는 방식의 장단점

## 17.1 Object 생성자 함수

생성자 함수란 `new` 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말합니다. 생성자 함수에 의해 생성된 객체를 인스턴스라 합니다.

- `new` 연산자와 함께 `Object` 생성자 함수를 호출하면 빈 객체를 생성하여 반환합니다.

  ```jsx
  // 빈 객체의 생성
  const person = new Object();

  // 프로퍼티 추가
  person.name = "Juyeong";
  person.sayHello = function () {
    console.log("Hi! My name is " + this.name);
  };

  console.log(person); // {name: "Juyeong", sayHello: f}
  person.sayHello(); // Hi! My name is Juyeong
  ```

- 자바스크립트는 `Object` 생성자 함수 이외에도 `String`, `Number`, `Boolean`, `Function`, `Array`, `Date`, `RegExp`, `Promise` 등의 빌트인 생성자 함수를 제공합니다.

- 특별한 이유가 없다면 별로 유용하지 않은 객체 생성 방법입니다. (객체 리터럴 `{}`을 사용하는 것이 더 간편)

- `new` 연산자와 함께 호출하지 않으면 생성자 함수가 아니라 일반 함수로 동작합니다.

  ```jsx
  const circle3 = Circle(15);
  console.log(circle3); // undefined
  console.log(radius); // 15
  ```

## 17.2 생성자 함수

### 17.2.1 객체 리터럴에 의한 객체 생성 방식의 문제점

객체 리터럴에 의한 객체 생성은 직관적이고 간편하지만, 단 하나의 객체만 생성한다는 단점이 있습니다.
따라서 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우 매번 같은 프로퍼티를 기술해야 하기 때문에 비효율적입니다.

```jsx
const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  },
};

console.log(circle1.getDiameter()); // 10

const circle2 = {
  radius: 10,
  getDiameter() {
    return 2 * this.radius;
  },
};

console.log(circle2.getDiameter()); // 20
```

### 17.2.2 생성자 함수에 의한 객체 생성 방식의 장점

생성자 함수에 의한 객체 생성 방식은 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있습니다.

```jsx
function Circle(radius) {
  this.radius: 5,
  this.getDiameter() {
    return 2 * this.radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

### this

  - `this`는 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수입니다.
  - `this` 바인딩은 함수 호출 방식에 따라 동적으로 결정됩니다.
    | 함수 호출 방식       | this가 가리키는 값(this 바인딩)        |
    | -------------------- | ------------------------------------- |
    | 일반 함수로서 호출   | 전역 객체                              |
    | 메서드로서 호출      | 메서드를 호출한 객체(마침표 앞의 객체) |
    | 생성자 함수로서 호출 | 생성자 함수가 생성할 인스턴스          |
    
    ```js
    function foo() {
      console.log(this);
    }

    foo(); // window

    const obj = { foo };
    obj.foo(); // obj;

    const inst = new foo(); // inst
    ```

### 17.2.3 생성자 함수의 인스턴스 생성 과정

- 생성자 함수의 역할

  - 인스턴스 생성
  - 생성된 인스턴스를 초기화(인스턴스 프로퍼티 추가 및 초기값 할당)

- 자바스크립트 엔진은 암묵적인 처리를 통해 인스턴스를 생성하고 반환합니다.
  
  ```jsx
  function Circle(radius) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩됩니다.
  
  console.log(this); // Circle {}

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
  
  // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환됩니다.
  // 명시적으로 다른 객체를 반환하면 암묵적인 this 반환이 무시됩니다.
  // 명시적으로 원시 값을 반환하면 무시하고 this가 반환됩니다.
  }

  // 인스턴스 생성. Circle 생성자 함수는 암묵적으로 반환한 객체를 반환합니다.
  const circle1 = new Circle(5);
  console.log(circle); // Circle { radius: 1, gitDiameter: f}
  ```
  
  > **바인딩**이란 식별자와 값을 연결하는 과정을 의미합니다.
  
### 17.2.4 내부 메서드 [[Call]]과 [[Construct]]



