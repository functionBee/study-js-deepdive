# 5장. 표현식과 문

- **값(value)**

  값은 표현식(expression)이 평가되어 생성된 결과를 의미합니다.
  
  > 평가(evaluate)란 식을 해석해서 값을 생성하거나 참조하는 것
   
    ```javascript
    // 10 + 20이 평가되어 생성된 숫자 값 30을 변수 sum에 할당
    var sum = 10 + 20;
    ```
   
  <br>
  
- **리터럴(literal)**

  사람이 이해할 수 있는 문자(아라비아숫자, 알파벳, 한글 등) 또는 약속된 기호('', "", ., [], {}, //)를 사용해 값을 생성하는 표기법을 의미합니다. 즉, 고정된 값을 나타내는 표기법 입니다.
  
  리터럴을 사용하면 다양한 종류의 값을 생성할 수 있습니다.
  
  | 리터럴 | 예시 |
  | :----: | :----: |
  | 정수 리터럴 | 100 |
  | 부동소수점 리터럴 | 10.5 |
  | 2진수 리터럴 | 0b01000001 |
  | 8진수 리터럴 | 0o101 |
  | 16진수 리터럴 | 0x41 |
  | 문자열 리터럴 | 'Hello' "World" |
  | 불리언 리터럴 | true false |
  | null 리터럴 | null |
  | undefined 리터럴 | undefined |
  | 객체 리터럴 | {name: 'Lee', address: 'Seoul'} |
  | 배열 리터럴 | [1, 2, 3] |
  | 함수 리터럴 | function() {} |
  | 정규 표현식 리터럴 | /[A-Z]+/g |

  <br>
  
- **표현식(expression)**

  값으로 평가될 수 있는 문(statement)를 의미합니다. 표현식이 평가되면 새로운 값을 생성하거나 기존 값을 참조합니다.
  
  ```javascript
  var score = 100; // 리터럴 100은 평가되어 값을 생성하므로 표현식
  
  var score = 50 + 50; // 50 + 50은 평가되어 숫자 값 100을 생성하므로 표현식
  
  var sum = score; // 변수 식별자를 참조하여 숫자 값 100으로 평가되므로 표현식
  
  const getScore = () => {
    return 100;
  }
  var score = getScore(); // 함수 식별자를 참조하여 숫자 값 100으로 평가되므로 표현식
  ```
  
  표현식과 표현식이 평가된 값은 동치입니다. 따라서 문법적으로 값이 위치할 수 있는 자리에는 표현식도 위치할 수 있습니다.
  
  ```javascript
  var x = 1 + 2;
  x + 3;
  ```
  
  <br>

- **문(statement)**

  문은 프로그램을 구성하는 기본 단위이자 최소 실행 단위입니다. 문의 집합으로 이뤄진 것이 프로그램이며, 문을 작성하고 순서에 맞게 나열하는 것이 프로그래밍입니다.
  - 문은 여러 **`token`** 으로 구성됩니다. **`token`** 이란 문법적인 의미를 가지며, 문법적으로 더 이상 나눌 수 없는 코드의 기본 요소를 의미합니다.
    **상수, 식별자, 연산자, 구분자, 예약어** 5가지를 **`token`** 이라고 합니다.
    
    ![image](https://github.com/gather-around-and-code/study-js-deepdive/assets/67141218/c0d91559-1736-4be5-8aa5-ac0e5d961d03)
    
  - 문은 선언문, 할당문, 조건문, 반목문 등으로 구분할 수 있습니다.
  
    ```javascript
    // 변수 선언문
    var x; 

    // 할당문
    x = 5;

    // 함수 선언문
    function foo () {}

    // 조건문
    if (x > 1) { console.log(x); }

    // 반복문
    for (var i = 0; i < 2; i++) { console.log(i); }
    ```

  - 문에는 표현식인 문과 표현식이 아닌 문이 있습니다.

    - 표현식인 문: 값으로 평가될 수 있는 문
    - 표현식이 아닌 문: 값으로 평가될 수 없는 문

    ```javascript
    // 표현식이 아닌 문은 값처럼 사용할 수 없다.
    var foo = var x; // SyntaxError
    
    // 표현식인 문은 값처럼 사용할 수 있다.
    var foo = x = 100;
    console.log(foo); // 100
    ```

<br>

## Reference

- [**Value - MDN Web Docs Glossary**](https://developer.mozilla.org/en-US/docs/Glossary/Value)
- [**Literal - MDN Web Docs Glossar**](https://developer.mozilla.org/en-US/docs/Glossary/Literal)
- [**Literal - Wikipedia**](https://en.wikipedia.org/wiki/Literal_(computer_programming))
- [**Statements - MDN Web Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements)
- [**Token - Techterms**](https://techterms.com/definition/token)
