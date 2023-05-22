# 4장. 변수(Variables)

'모던 자바스크립트: 딥다이브'의 4장에서 변수에 대한 내용과 MDN 문서들을 참고하였습니다. 
참고한 문서의 링크 정보는 아래에서 확인하실 수 있습니다.

<br>
<br>

- **식별자(JavaScript identifier)**
    
    JavaScript에서는 식별자를 사용하여 변수, 함수, 객체 등을 식별합니다. 
    
    ```jsx
    // 변수 식별자
    let firstName = "B";
    const MAX_VALUE = 100;
    
    // 함수 식별자
    function sayHello() {
      console.log("Hello!");
    }
    
    // 객체 식별자
    let person = {
      name: "B",
      age: 25,
    };
    
    console.log(firstName); // 출력: B
    console.log(MAX_VALUE); // 출력: 100
    sayHello(); // 출력: Hello!
    console.log(person.name); // 출력: B
    ```
    <br>

    - **식별자 명명(Identifier Naming)**
        
        ```jsx
        // 식별자 예시
        let _variable = "underscore";
        let $price = 99.99;
        let Number_hits = 10;
        let ångström = 1.5;
        
        console.log(_variable); // 출력: underscore
        console.log($price); // 출력: 99.99
        console.log(Number_hits); // 출력: 10
        console.log(ångström); // 출력: 1.5
        ```
        
        - 특수 문자(예: !, @, #, %)는 식별자 내에서 사용할 수 없습니다. 단, 언더스코어(_)와 달러 기호($)는 사용할 수 있습니다.
        - 식별자는 대소문자를 구분합니다.
            - `myVariable`과 `myvariable`은 서로 다른 식별자입니다.
        - 식별자는 공백을 포함할 수 없습니다.
        - 예약어(reserved keyword)를 식별자로 사용할 수 없습니다. 예약어들은 JavaScript에서 특정한 역할을 수행하기 위해 예약되어 있으므로, 변수 또는 함수 이름으로 사용할 수 없습니다.
            - MDN, 예약어 목록 : [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#reserved_words](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#reserved_words)
        
        <br>
        
    - **식별자 명명(Identifier Naming)  규칙**
        
        식별자는 코드의 가독성과 유지 보수성에 중요한 역할을 합니다. 명확하고 의미 있는 식별자를 사용하여 코드를 작성하는 것이 좋습니다.
        
        ```jsx
        // good
        let age = 5;
        let greetingMessage = "Hello";
        let worldMessage = "World";
        let farewellMessage = "Goodbye";
        let count = 10;
        ```
        
        ```jsx
        // bad
        let a = 5;
        let myVariable = "Hello";
        let MyVariable = "World";
        let my_variable = "Goodbye";
        let myVar1 = 10;
        ```
        <br>

        **좋은 식별자를 선언**
        
        > [구글의 자바스크립트 스타일 가이드, naming rules by identifier type](https://google.github.io/styleguide/jsguide.html#naming-rules-by-identifier-type)
        
        | 명확하고 의미 있는 이름 사용 | 변수 또는 함수의 목적과 역할을 잘 나타내는 이름을 선택해야 합니다. 다른 개발자들도 쉽게 이해할 수 있도록 명확하고 간결한 이름을 사용하는 것이 좋습니다. |
        | --- | --- |
        | 카멜 케이스 (Camel Case) 사용 |  |
        | 의미 있는 변수 접두사 사용 | 변수의 용도를 나타내기 위해 의미 있는 접두사를 사용할 수 있습니다. |
        | 일관성 유지 | 코드에서 식별자를 일관성 있게 사용하는 것이 중요합니다. 변수와 함수에 동일한 규칙과 스타일을 적용하여 일관성 있는 코드를 유지하는 것이 좋습니다. |
        | 자세한 설명 주석 추가 | 식별자의 역할이나 의도를 명확히 이해하기 어려운 경우, 주석을 추가하여 설명해주는 것이 좋습니다. |

        <br>
        
    - **식별자와 메모리의 관계**
        
        식별자는 변수나 함수의 이름으로 사용되며, 유효한 식별자를 사용하여 메모리에 저장된 데이터를 참조할 수 있습니다. 
        
        ```jsx
        // 사각형의 면적을 계산하는 함수 calculateArea
        function calculateArea(length, width) {
          var area = length * width;
        
          return area;
        }
        
        // 사각형 객체인 rectangle1과 rectangle2
        var rectangle1 = {
          length: 5,
          width: 3
        };
        
        var rectangle2 = {
          length: 8, 
          width: 4
        };
        
        var area1 = calculateArea(rectangle1.length, rectangle1.width);
        var area2 = calculateArea(rectangle2.length, rectangle2.width);
        
        console.log(area1); // 15
        console.log(area2); // 32
        ```
        
        각각의 사각형 객체는 `length`와 `width`라는 속성을 가지고 있습니다. 이 속성은 각각의 사각형의 길이와 너비를 나타냅니다.
        
         
        
        `calculateArea` 함수는 `length`와 `width` 매개변수를 받아서 면적을 계산하고, 계산된 면적인 `area`를 반환합니다. 그리고 `rectangle1`과 `rectangle2`를 이용하여 `calculateArea` 함수를 호출하여 면적을 계산하고, `area1`과 `area2` 변수에 각각의 면적을 저장합니다. 이후 `console.log`를 사용하여 `area1`과 `area2`의 값을 출력합니다.
        
        이 예제에서 `rectangle1`과 `rectangle2`는 객체이며, 객체의 속성인 `length`와 `width`는 메모리에 저장된 데이터를 나타냅니다. 이러한 속성들을 식별하기 위해 식별자를 사용합니다. 함수 내부의 `area` 변수 역시 메모리에 저장된 값을 식별하기 위한 식별자입니다.
        
        <br>
    
- **변수(Variable)**
    
    변수(Variable)는 값을 저장하고 참조하기 위해 사용되는 식별자(identifier)입니다. 변수는 데이터를 임시로 저장하거나 필요한 값을 저장하는 데 사용됩니다. 자바스크립트에서 변수는 다양한 데이터 유형(숫자, 문자열, 불리언, 객체, 배열 등)을 저장할 수 있습니다.
    
    ```javascript
    console.log(x); // 출력: undefined
    // 이는 변수 x가 선언되었지만 값을 할당하기 전이기 때문에 undefined 값이 반환됩니다.
    
    // var 키워드로 변수 x를 선언하고 값 10을 할당합니다.
    var x = 10;
    console.log(x); // 출력: 10
    // 변수 x에 10이라는 숫자 값을 할당 받은 뒤 x를 호출하므로 10이 출력됩니다.
    ```
    
    변수의 실행 시점은 변수가 생성되고 값을 할당하는 시점에 따라 달라집니다. JavaScript는 위에서 아래로 순차적으로 코드를 실행하는 동적 언어이기 때문에 코드의 흐름에 따라 변수의 실행 시점이 결정됩니다.
    
    ```jsx
    console.log(x); // 출력: ReferenceError: x is not defined
    // console.log를 이용해 x를 호출할 때, 
    // 변수 x가 아직 선언되지 않았기 때문에 참조 에러(ReferenceError: x is not defined) 오류가 발생합니다.
    
    // let 키워드를 사용하여 변수 x를 선언하고 값 10을 할당
    let x = 10;
    console.log(x); // 출력: 10
    // 변수 x는 이미 선언되어 console.log로 호출되기 이전에 값이 할당되었으므로, 10이 출력됩니다. 
    ```
    
    
    
    > 📍 동적 언어(Dynamic language)란, <br> 프로그램이 실행되는 동안 타입 검사(type checking)와 같은 작업을 수행하는 것이 아니라,
    > 런타임 (runtime) 시에 타입과 관련된 결정을 내리는 프로그래밍 언어를 의미합니다. 동적 언어는 변수의 타입이 프로그램 실행 중에 동적으로 바뀔 수 있으며, 변수에는 다양한 타입의 값을 할당할 수 있습니다.<br>
    > 자바스크립트는 동적 언어로서, 변수의 유연성과 다양한 타입의 값을 다룰 수 있는 특성을 가지고 있습니다. 이는 자바스크립트를 빠르게 프로토타입 및 스크립트 개발에 사용할 수 있게 만들어주고, 유연한 동작을 제공합니다.
    
    <br>
    
    - **변수 선언(Variable Declarations)**
        
        ```jsx
        // 변수 선언과 할당
        let age = 25;
        const PI = 3.14;
        var name = "John";
        
        // 변수를 애플리케이션에서 사용하기
        console.log("제 이름은 " + name + "이고, " + age + "살입니다.");
        ```
        
        JavaScript에서 변수를 사용하려면 먼저 변수를 생성하고, 즉 변수를 선언해야 합니다. 변수를 선언하기 위해 `var`, `let`, 또는 `const` 키워드 중 하나를 사용합니다
        
        <br>
        
        1. `var` 키워드:
            - 예전에 사용되던 변수 선언 방식입니다.
            - 함수 스코프를 가지며, 함수 내부에서 선언된 변수는 해당 함수에서만 유효합니다.
            - 변수의 재선언이 가능합니다.
            
            ```jsx
            var x = 10;
            var y = "Hello";
            ```
            
        2. `let` 키워드:
            - 블록 스코프를 가지며, 중괄호 `{}` 내에서 선언된 변수는 해당 블록 내에서만 유효합니다.
            - 변수의 값은 변경 가능합니다.
            - 변수의 재선언은 허용되지 않습니다.
            
            ```jsx
            let x = 10;
            let y = "Hello";
            ```
            
        3. `const` 키워드:
            - 블록 스코프를 가지며, 중괄호 `{}` 내에서 선언된 변수는 해당 블록 내에서만 유효합니다.
            - 변수의 값은 변경할 수 없습니다. 상수로 취급됩니다.
            - 변수의 재선언과 값의 재할당이 모두 허용되지 않습니다.
            
            ```jsx
            const x = 10;
            const y = "Hello";
            ```
            
        <br>
        
        > **contst와 let 중에 어느 것을 써야 할까요?**<br>
        > 자바스크립트를 사용할 때 한 번 초기화했던 변수에 다른 값을 할당하는 경우는 의외로 적습니다. 따라서 변수 선언시에는 
        > 기본적으로 const 를 사용하고 다른 값을 할당해야 하는 상황이 생겼을 때 let을 사용하면 됩니다.
        
        <br>
        
    - **값의 할당(Assignment)**
        
        일반적으로 **`=`** 기호를 사용하여 변수에 값을 할당합니다.
        
        ```jsx
        let x = 10;
        ```
        
        변수는 값을 할당함으로써 생성되고, 해당 변수는 이후에 참조되거나 변경될 수 있습니다. 변수는 여러 번 재할당할 수도 있으며, 필요에 따라 값을 변경할 수 있습니다.
        
        ```jsx
        // 변수 생성과 초기 값 할당
        let x = 10;
        let y = 5;
        console.log("x:", x); // 출력: x: 10
        console.log("y:", y); // 출력: y: 5
        
        // 변수 값 참조와 계산
        let sum = x + y;
        console.log("sum:", sum); // 출력: sum: 15
        
        // 변수 값 변경
        x = 20;
        y = 8;
        console.log("x:", x); // 출력: x: 20
        console.log("y:", y); // 출력: y: 8
        
        // 변수 값 재할당과 계산
        sum = x + y;
        console.log("sum:", sum); // 출력: sum: 28
        ```
        
        구조 분해 할당(destructuring assignment)을 사용하면 객체의 특정 키에 해당하는 값을 쉽게 변수로 할당할 수 있습니다. 구조 분해 할당은 배열이나 객체와 같은 복합 데이터 구조의 속성을 개별 변수로 분해하여 할당하는 것을 의미합니다.
        
        ```jsx
        // 배열의 구조 분해 할당
        let numbers = [1, 2, 3];
        let [a, b, c] = numbers;
        
        console.log(a); // 출력: 1
        console.log(b); // 출력: 2
        console.log(c); // 출력: 3
        
        // 객체의 분해 할당
        let person = { name: 'John', age: 30 };
        let { name, age } = person;
        
        console.log(name); // 출력: 'John'
        console.log(age); // 출력: 30
        ```
        
        구조 분해 할당을 사용하면 배열이나 객체의 요소를 쉽게 추출하여 변수에 할당할 수 있습니다. 이는 코드를 간결하게 작성하고 가독성을 높이는 데 도움을 줍니다.
        
        ```jsx
        // 객체 foo는 bar와 baz라는 두 개의 key를 가지고 있습니다.
        const foo = {
          bar: "Hello",
          baz: "World",
        };
        
        // 객체의 키에 해당하는 값을 변수로 언팩하여 선언
        const { bar, baz } = foo;
        
        console.log(bar); // 출력: Hello
        console.log(baz); // 출력: World
        
        // bar 변수는 foo 객체의 bar 키에 해당하는 값인 "Hello"가 할당되고, 
        // baz 변수는 foo 객체의 baz 키에 해당하는 값인 "World"가 할당됩니다.
        ```
        <br>
    
    - **변수의 유효 범위(Scope)**
        
        스코프(Scope)는 변수가 유효한 범위를 말합니다. 스코프는 변수가 선언된 위치에 따라 결정되며, 변수가 어디에서 접근 가능한지를 제어합니다.
        
        ```jsx
        function example() {
          // var 키워드를 사용해 변수 x를 선언
          var x = 10;
          
          if (true) {
            let y = 20;
            const z = 30;
            
            console.log(x); // 출력: 10
            console.log(y); // 출력: 20
            console.log(z); // 출력: 30
            
            x = 40;
            // y = 50; // 오류: 블록 외부에서는 y가 정의되지 않음
            // z = 60; // 오류: z는 읽기 전용으로 재할당할 수 없음
          }
          
          console.log(x); // 출력: 40
          // console.log(y); // 오류: 블록 외부에서는 y가 정의되지 않음
          // console.log(z); // 오류: 블록 외부에서는 z가 정의되지 않음
        }
        
        example();
        ```
        
        JavaScript에서는 세 가지 주요한 스코프 유형이 있습니다.
        
        1. **전역 스코프(Global Scope):**
            - 전역 스코프는 코드의 어느 곳에서든 접근 가능한 가장 외부 범위입니다.
            - 함수나 블록 내부가 아닌 곳에서 선언된 변수는 전역 스코프를 갖습니다.
            
            <br>
            
            ```jsx
            var globalVar = "전역 변수입니다";
            // globalVar 변수는 어떤 함수나 블록 내부에 속하지 않고 선언되었으므로 전역 스코프를 갖기 때문에 
            // example 함수 내에서 globalVar 변수에 접근할 수 있습니다.
            
            function example() {
              console.log(globalVar); // 출력: 전역 변수입니다
            	
            }
            
            example();
            ```
            
        2. **함수 스코프(Function Scope):**
            - 함수 스코프는 함수 내에서 선언된 변수의 범위입니다.
            - 함수 내에서 선언된 변수는 해당 함수 내부에서만 접근 가능합니다.
            
            <br>

            ```jsx
            function example() {
              var functionVar = "함수 변수입니다";
              console.log(functionVar); // 출력: 함수 변수입니다
            }
            
            example();
            // console.log(functionVar); // 오류: functionVar는 정의되지 않았습니다
            ```
            
        3. **블록 스코프(Block Scope):**
            - 블록 스코프는 중괄호(**`{}`**)로 둘러싸인 코드 블록 내에서 선언된 변수의 범위입니다.
            - 블록 스코프는 **`if`**, **`for`**, **`while`** 등의 제어문 또는 함수 내부의 코드 블록(`{}`)에서 사용됩니다.
            - 블록 내부에서 **`let`**이나 **`const`**로 선언된 변수는 해당 블록 스코프 내에서만 접근 가능합니다.
            
            <br>
            
            ```jsx
            function example() {
              if (true) {
                let blockVar = "블록 변수입니다";
                console.log(blockVar); // 출력: 블록 변수입니다
              }
              // console.log(blockVar); // 오류: blockVar는 정의되지 않았습니다
            }
            
            example();
            ```
            
            <br>
            
        
        스코프는 변수의 유효성과 접근 가능성을 결정하며, 변수의 이름이 동일하더라도 서로 다른 스코프 내에서 독립적으로 존재할 수 있습니다. 이를 통해 변수 이름의 충돌을 방지하고, 코드의 모듈화와 재사용성을 개선할 수 있습니다.
        
        스코프는 변수의 생명주기와 관련이 있으며, 변수가 해당 스코프를 벗어나면 메모리에서 해제됩니다. 변수의 스코프를 올바르게 이해하고 사용함으로써 변수의 유효 범위를 관리하고 코드의 예상치 못한 동작을 방지할 수 있습니다.
        
        <br>
        
    - 변수 **호이스팅(Variable hoisting)**
        
        변수 호이스팅(Hoisting)은 JavaScript에서 변수 및 함수 선언이 스코프의 최상단으로 "끌어올려지는" 동작을 말합니다. 이는 변수와 함수를 선언하기 이전에도 해당 식별자를 사용할 수 있는 특징을 가지고 있습니다.
        
        ```jsx
        console.log(x); // 출력: undefined
        var x = 10;
        console.log(x); // 출력: 10
        ```
        
        변수 호이스팅은 변수의 선언을 호이스팅하기 때문에 변수를 선언하기 이전에 변수를 사용할 수 있는 특징을 가지고 있습니다. 그러나 변수의 할당은 호이스팅되지 않으므로 초기화 이전에 변수에 접근하면 `undefined`가 됩니다.
        
        ```jsx
        console.log(x === undefined); // true
        // x는 호이스팅되었지만 초기값이 할당되지 않았으므로 undefined입니다
        
        var x = 3;
        // 변수 x의 선언은 해당 스코프의 최상단으로 끌어올려집니다
        
        (function () {
          console.log(x); // undefined
          // 익명 함수 내에서 console.log(x);를 호출하면 변수 x를 참조합니다.
          // 그러나 익명 함수 내에서 var x = "local value"; 
          // 코드를 실행하기 전에 변수 x가 호이스팅됩니다. 
          // 따라서 해당 블록 내에서의 x는 호이스팅된 선언만 존재하고, 
          // 값은 할당되지 않았으므로 undefined입니다.
          var x = "local value";
        })();
        ```
        
<br>
<br>

## 용어

| 변수 (variable) | 변수는 값을 저장하기 위해 사용되는 이름이 있는 메모리 공간입니다. 프로그램에서 데이터를 저장하고 조작하는 데 사용됩니다. 변수는 값을 할당하고 변경할 수 있습니다. |
| --- | --- |
| 상수 (constant) | 상수는 한 번 할당된 후에는 변경할 수 없는 변수입니다. 일반적으로 변하지 않는 값을 저장하기 위해 사용됩니다. |
| 표현식 (expression) | 표현식은 값을 생성하거나 결과를 반환하는 코드 조각입니다. 표현식은 숫자, 문자열, 연산자, 함수 호출 등으로 구성될 수 있습니다. 예를 들어, 2 + 3은 두 개의 숫자를 더하는 표현식입니다. |
| 파싱 (parsing) | 파싱은 프로그램이 소스 코드를 읽고 구문을 분석하여 이해하는 과정을 말합니다. 소스 코드를 해석하여 프로그램이 실행될 수 있도록 구문 트리 또는 추상 구문 트리로 변환됩니다. |
| 식별자 (identifier) | 식별자는 변수, 함수, 객체 등을 식별하기 위해 사용되는 이름입니다. 예를 들어, 변수의 이름, 함수의 이름, 객체의 속성 이름 등이 식별자입니다. |
| 변수 선언 (variable declaration) | 변수 선언은 변수를 생성하고 해당 변수의 이름을 프로그램에 알립니다. 변수를 사용하기 전에 변수를 선언해야 합니다. 예를 들어, let x;는 변수 x를 선언합니다. |
| 가비지 콜렉터 (garbage collector) | 가비지 콜렉터는 사용하지 않는 메모리를 자동으로 회수하는 프로그램의 구성 요소입니다. 가비지 콜렉터는 더 이상 사용되지 않는 객체나 변수를 감지하고, 해당 메모리를 회수하여 자원을 최적화합니다. |
| 쓰레기 값 (garbage value) | 쓰레기 값은 할당되지 않은 또는 초기화되지 않은 변수에 저장된 값을 말합니다. 쓰레기 값은 예상하지 못한 동작을 유발할 수 있으므로 변수를 초기화하거나 할당하는 것이 중요합니다. |
| 런타임 (runtime) | 런타임은 프로그램이 실행되고 동작하는 시간입니다. 프로그램이 실제로 실행되는 동안 발생하는 모든 작업을 포함합니다. |
| 변수 호이스팅 (variable hoisting) | 변수 호이스팅은 변수 선언이 스코프의 상단으로 끌어올려지는 동작을 말합니다. JavaScript에서 변수 선언은 실제 코드 위치와는 관계없이 스코프의 맨 위로 끌어올려집니다. 이로 인해 변수를 선언하기 전에 변수를 사용할 수 있는 독특한 동작이 발생합니다. |
| 할당 (assignment) | 할당은 변수에 값을 할당하는 작업을 말합니다. 예를 들어, x = 10;은 변수 x에 값 10을 할당합니다. |
| 참조 (reference) | 참조는 변수나 값이 메모리 상의 위치를 가리키는 것을 의미합니다. 변수가 객체, 배열, 함수 등을 가리킬 때, 해당 변수는 그 값의 메모리 위치를 참조합니다. 참조를 통해 변수는 실제 데이터에 대한 접근을 가능하게 합니다. |
| 참조 에러 (ReferenceError) | 변수가 선언되지 않았거나 스코프 내에서 사용할 수 없는 경우 발생합니다. 이는 변수가 존재하지 않거나 올바르게 참조되지 않은 경우를 나타냅니다. 예를 들어, 정의되지 않은 변수를 사용하려고 할 때 ReferenceError가 발생합니다. |
| Unmanaged Language vs Managed Language | Unmanaged Language는 개발자가 메모리 관리를 수동으로 처리해야 하는 언어를 의미합니다. 예를 들어, C나 C++는 Unmanaged Language입니다. Managed Language는 메모리 관리를 자동으로 처리하는 언어를 의미합니다. 예를 들어, Java나 C#은 Managed Language입니다. |
| 예약어 (reserved word) | 예약어는 프로그래밍 언어에서 특별한 의미를 가지고 있어 변수나 함수 이름으로 사용할 수 없는 단어입니다. 예를 들어, JavaScript에서 if, for, while과 같은 예약어는 특정 문법 규칙과 관련된 용도로 사용됩니다. |
| 네이밍 컨벤션 (naming convention) | 네이밍 컨벤션은 변수, 함수, 클래스 등의 이름을 정하는 규칙입니다. 일반적으로 카멜 케이스(camel case)나 스네이크 케이스(snake case)와 같은 명명 규칙을 따릅니다. 이는 코드의 가독성과 일관성을 유지하기 위한 것입니다. |

---

<br>
<br>

## Reference
- **[Storing the information you need — Variables](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables)**
- **[JavaScript Variables - CodeGuage](https://www.codeguage.com/courses/js/variables)**
- **[Declaring Variables without Var, Let, Const - What Would Happen?](https://www.youtube.com/watch?v=6UAKBYpUC-Y)**
- **[How to declare variables in different ways in JavaScript?](https://www.geeksforgeeks.org/how-to-declare-variables-in-different-ways-in-javascript/)**
- **[JavaScript Variables](https://javascript.info/variables)**
- **[How to declare variables in different ways in JavaScript?](https://www.geeksforgeeks.org/how-to-declare-variables-in-different-ways-in-javascript/)**
- [**Identifier - MDN Web Docs Glossary**](https://developer.mozilla.org/en-US/docs/Glossary/Identifier)
- [**Variable - MDN Web Docs Glossary**](https://developer.mozilla.org/en-US/docs/Glossary/Variable)
- [**const - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [**var - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
- [**let - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [**Variable (computer science) - Wikipedia**](https://en.wikipedia.org/wiki/Variable_(computer_science))
- [**Declarations - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations)
- [**Variables - Airbnb JavaScript Style Guide**](https://github.com/airbnb/javascript#variables)
- [**Identifier - MDN Web Docs Glossary**](https://developer.mozilla.org/en-US/docs/Glossary/Identifier)
- [**Variable scope - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variable_scope)
- [**Destructuring assignment - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [**Scope - MDN Web Docs Glossary**](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
- [**Hoisting - MDN Web Docs Glossary**](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
- [**Global variables - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#global_variables)
- [**Keywords - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#keywords)

---
