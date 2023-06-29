# 20장. strict mode

## 20.1 strict mode란?
```javascript
function foo() {
  x = 10;
}
foo();

console.log(x); // ?
```
1. 자바스크립트 엔진은 우선 foo함수 스코프에서 x 변수의 선언을 검색한다.
2. foo함수의 스코프에는 x변수의 선언이 없으므로 검색에 실패할 것이다.
3. 자바스크립트 엔진은 x변수를 검색하기 위해 foo 함수 컨텍스트의 상위 스코프(예시에서는 전역스코프)에서 x변수의 선언을 검색한다.
4. 전역 스코프에도 x 변수의 선언이 존재하지 않기 때문에 ReferenceError를 발생시킬 것 같다.
5. 하지만 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성한다. 마치 전역변수처럼 사용할 수 있다.(암묵적 전역)
6. console.log(x)의 값은 10이 호출된다.

개발자의 의도와는 상관없이 발생한 암묵적 전역은 오류를 발생시키는 원인이 될 가능성이 크다. 
> 따라서 반드시 var, let, const키워드를 사용하여 변수를 선언한 다음 사용해야 한다.

하지만 실수는 언제나 발생할 수 있으므로 오류를 줄여 안정적인 코드를 생산할 수 있는 방법을 찾아야 하며, 잠재적인 오류를 발생시키기 어려운 개발 환경을 만들고 그 환경에서 개발하는 것이 좀 더 근본적인 해결책이라고 할 수 있다.<br>
이 해결책을 지원하기 위해 ES5부터 **strict mode(엄격모드)**가 추가되었다. <br><br>

strict mode는 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.<br>
ESLint같은 린트 도구를 사용해도 유사한 효과를 얻을 수 있다.

> 린트 도구는 정적 분석기능을 통해 소스코드를 실행하기 전에 소스코드를 스캔하여 문법적 오류만이 아니라 잠재적 오류까지 찾아내고 오류의 원인을 리포팅해주는 유용한 도구다. 린트 도구는 strict mode가 제한하는 오류는 물론 코딩 컨벤션을 설정 파일 형태로 정의하고 강제할 수 있기 때문에 더욱 강력한 효과를 얻을 수 있다.


## 20.2 strict mode의 적용

strict mode를 적용하려면 전역의 선두 또는 함수 몸체의 선두에 'use strict';를 추가한다. 전역 선두에 추가하면 스크립트 전체에 strict mode가 적용된다.

```javascript
'use strict';

function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```

함수 몸체의 선두에 추가하면 해당 함수와 중첩함수에 strict mode가 적용된다.

```javascript
function foo() {
  'use strict';

  x = 10; // ReferenceError: x is not defined
}
foo();
```

코드의 선두에 위치시키지 않으면 strict mode가 제대로 작동하지 않는다.

```javascript
function foo() {
  x = 10; // 에러를 발생시키지 않는다.
  'use strict';
}
foo();
```


## 20.3 전역에 strict mode를 적용하는 것은 피하자

전역에 적용한 strict mode는 스크립트 단위로 적용된다.

```html
<!DOCTYPE html>
<html>
<body>
  <script>
    'use strict';
  </script>
  <script>
    x = 1; // 에러가 발생하지 않는다.
    console.log(x); // 1
  </script>
  <script>
    'use strict';

    y = 1; // ReferenceError: y is not defined
    console.log(y);
  </script>
</body>
</html>
```
다른 스트립트에 영향을 주지 않고 해당 스크립트에 한정되어 적용된다.<br>
하지만 strict mode 스트립트와 non-strict mode스트립트를 혼용하는 것은 오류를 발생시킬 수 있다. 특히 외부 서드파티 라이브러리를 사용하는 경우 라이브러리가 non-srtict mode인 경우도 있기 때문에 전역에 strict mode를 적용하는 것을 바람직하지 않다.<br>
이러한 경우 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용한다.
```javascript
// 즉시 실행 함수의 선두에 strict mode 적용
(function () {
  'use strict';

  // Do something...
}());
```

## 20.4 함수 단위로 strict mode를 적용하는 것도 피하자
어떤 함수는 strict mode를 적용하지 않는 것이 바람직하지 않으며 모든 함수에 일일이 strict mode를 적용하는 것은 번거로운 일이다. 그리고 strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 이 또한 문제가 발생할 수 있다. 따라서 strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

```javascript
(function () {
  // non-strict mode
  var lеt = 10; // 에러가 발생하지 않는다.

  function foo() {
    'use strict';

    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }
  foo();
}());
```

## 20.5 strict mode가 발생시키는 에러
### 20.5.1 암묵적 전역
선언하지 않은 변수를 참조하면 ReferenceError가 발생한다.
```javascript
(function () {
  'use strict';

  x = 1;
  console.log(x); // ReferenceError: x is not defined
}());
```

### 20.5.2 변수, 함수, 매개변수의 삭제
delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError가 발생시킨다.
```javascript
(function () {
  'use strict';

  var x = 1;
  delete x;
  // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a;
    // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo;
  // SyntaxError: Delete of an unqualified identifier in strict mode.
}());
```

### 20.5.3 매개변수 이름의 중복
중복된 매개변수 이름을 사용하면 SyntaxError가 발생한다.
```javascript
(function () {
  'use strict';

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
}());
```


### 20.5.4 with 문의 사용
with문을 사용하면 SyntaxError가 발생한다. with문은 전달된 객체를 스코프 체인에 추가한다. with문은 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간단해지는 효과가 있지만 성능과 가독성이 나빠지는 문제가 있다. 따라서 with문은 사용하지 않는 것이 좋다.

```javascript
(function () {
  'use strict';

  // SyntaxError: Strict mode code may not include a with statement
  with({ x: 1 }) {
    console.log(x);
  }
}());
```


## 20.6 strict mode 적용에 의한 변화
### 20.6.1 일반 함수의 this
strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩된다. 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다. 이때 에러는 발생하지 않는다.
```javascript
(function () {
  'use strict';

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
}());
```

### 20.6.2 arguments 객체
strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.
```javascript
(function (a) {
  'use strict';
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
}(1));
```