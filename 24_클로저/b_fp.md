# [FP Pattern] 코드의 재사용성과 모듈화 방법: 커링 (Currying) & 부분 적용(Partial Application)

## 커링 (Currying):

```jsx
// 커링 함수 예제
function greetCurried(greeting) {
  return function(name) {
    return function(language) {
      console.log(`${greeting} ${name}, you are speaking ${language}!`);
    };
  };
}

// 커링 함수 사용
let greetInEnglish = greetCurried("Hello");
let greetJohnInEnglish = greetInEnglish("John");
greetJohnInEnglish("English"); // 출력: Hello John, you are speaking English!

let greetInKorean = greetCurried("안녕하세요");
greetInKorean("철수")("한국어"); // 출력: 안녕하세요 철수, you are speaking 한국어!
```

- 커링(Currying)은 다중 인자를 받는 함수를 단일 인자를 받는 일련의 함수로 변환하는 기법입니다.
- 예를 들어, `f(x, y, z)`라는 함수를 커링하면 `f(x)(y)(z)`와 같이 인자를 하나씩 받는 함수들의 연속으로 변환됩니다.


## 부분 적용(Partial Application):

```jsx
// 부분 적용 함수 예제
function greetPartial(greeting, name, language) {
  console.log(`${greeting} ${name}, you are speaking ${language}!`);
}

// 부분 적용 구현
function partial(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

// 부분 적용 함수 사용
let greetInSpanish = partial(greetPartial, "Hola");
greetInSpanish("Maria", "español"); // 출력: Hola Maria, you are speaking español!

let greetJohn = partial(greetPartial, "Hello", "John");
greetJohn("English"); // 출력: Hello John, you are speaking English!
```

- 함수의 일부 인자를 미리 적용하고, 나머지 인자를 나중에 받기 위해 새로운 함수를 만드는 기법입니다.
- 예를 들어, `f(a, b, c)` 함수가 있을 때, `a`와 `b`를 미리 적용하고, `c`만 나중에 받기 위한 새로운 함수 `g(c)`를 만들 수 있습니다.

## 차이
- 커링은 모든 인자에 대해 단계적으로 적용하는 반면, 부분 적용은 특정 인자만을 미리 적용하고 나머지 읹자를 나중에 받을 수 있습니다.

## Articles
- [What is the difference between currying and partial application?](https://stackoverflow.com/questions/218025/what-is-the-difference-between-currying-and-partial-application)

## MDN
- [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
