# 22장: `this`

## 1. this 키워드
## 2. 함수 호출 방식과 this 바인딩
### 2.1 일반 함수 호출
### 2.2 메서드 호출
### 2.3 생성자 함수 호출
### 2.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출

## 요약
- JavaScript에서 `this`는 함수가 실행되는 컨텍스트를 가리킵니다.
- `this`의 값은 함수가 호출되는 방식에 따라 결정되며, 컨텍스트에 따라 다를 수 있습니다.
- `this`를 호출하는 방식(5):
    1. **전역공간 (Global Space)**: 함수가 전역 공간에서 호출될 때, `this`는 전역 객체를 가리킵니다. 브라우저 환경에서는 전역 객체가 `window`입니다.
    ```js
    console.log(this); // 출력: Window
    ```
    2. **함수호출 (Function Call)**: 함수가 독립적으로 호출될 때, `this`도 전역 객체를 가리킵니다. 그러나 `strict mode`에서는 `this`는 `undefined`가 됩니다.
    ```js
    function sayHello() {
        console.log(this);
    }
    sayHello(); // 출력: Window 또는 undefined (strict mode에서)
    ```
    3. **메서드호출 (Method Call)**: 함수가 객체의 메소드로 호출될 때, `this`는 해당 객체를 가리킵니다.
    ```js
    const person = {
        name: 'John',
        sayHello: function() {
            console.log(this.name);
        }
    };

    person.sayHello(); // 출력: John
    ```
       - `Function.prototype.apply/call/bind 메서드`를 사용하여 함수를 간접적으로 호출할 수 있습니다. 이들 메서드는 함수를 호출하는 방식을 명시적으로 지정하고, `this`의 값을 설정할 수 있습니다.
    4. `callback` 호출 (Callback Call): 함수가 콜백으로 전달되고 호출될 때, `this`는 콜백 함수가 호출된 방식에 따라 달라집니다. 대부분의 경우, `this`는 전역 객체를 가리킵니다.
    ```js
    function handleClick() {
        console.log(this);
    }

    document.addEventListener('click', handleClick); // 출력: Window
    ```
    5. 생성자 함수 호출 (Constructor Function Call): 함수가 생성자 함수로 사용되어 `new` 키워드로 호출될 때, this는 새로 생성된 객체를 가리킵니다.
    ```js
    function Person(name) {
        this.name = name;
    }

    const john = new Person('John');
    console.log(john.name); // 출력: John
    ```
    이렇게 상세한 설명과 코드 예제가 JavaScript에서의 this 바인딩 개념을 명확히 이해하는 데 도움이 되었으면 좋겠습니다! 추가 질문이 있으시면 언제든지 물어보세요.


- `Function.prototype.apply/call/bind` 메서드를 사용하여 함수를 간접적으로 호출할 수 있습니다.
  - 이 메서드들은 `this` 바인딩을 명시적으로 제어하는 데 유용합니다.
  1. **Function.prototype.apply() 메서드**: `apply()` 메서드는 함수를 호출하면서 `this` 값을 설정하고, **인수를 배열로 전달**합니다.
    ```js
    function sayHello(message) {
        console.log(message + ' ' + this.name);
    }

    const person = {
        name: 'John'
    };

    sayHello.apply(person, ['Hello']); // 출력: Hello John
    ```

  2. **Function.prototype.call() 메서드**: `call()` 메서드는 함수를 호출하면서 `this` 값을 설정하고, **인수를 개별적으로 전달**합니다.
    ```js
    function sayHello(message) {
        console.log(message + ' ' + this.name);
    }

    const person = {
        name: 'John'
    };

    sayHello.call(person, 'Hello'); // 출력: Hello John
    ```

  3. **Function.prototype.bind() 메서드**: `bind()` 메서드는 함수를 호출할 때 `this` 값을 설정하고, 새로운 함수를 반환합니다. 이후에 반환된 함수를 호출하면 원본 함수가 호출됩니다.
    ```js
    function sayHello(message) {
        console.log(message + ' ' + this.name);
    }

    const person = {
        name: 'John'
    };

    const sayHelloToPerson = sayHello.bind(person);
    sayHelloToPerson('Hello'); // 출력: Hello John
    ```


## 키워드
## Reference