# 31장. RegExp

## 31.1 정규 표현식이란?

- 정규 표현식(RegExp, Regular Expression)은 문자열에서 특정 패턴을 검색, 추출 또는 치환하는 데 사용되는 도구(?)입니다.
- JavaScript에서는 정규 표현식을 다루기 위해 `RegExp` 객체를 사용합니다.
- 정규 표현식은 문자열의 패턴을 정의하며, 이러한 패턴은 문자열 내에서 검색할 때 사용됩니다.
- 정규 표현식 패턴은 `/`로 시작하고 끝나는데, 뒤에 플래그를 추가로 사용할 수도 있습니다.

```javascript
// 31-01
// 사용자로부터 입력받은 휴대폰 전화번호
const tel = "010-1234-567팔";

// 정규 표현식 리터럴로 휴대폰 전화번호 패턴을 정의한다.
const regExp = /^\d{3}-\d{4}-\d{4}$/;

// tel이 휴대폰 전화번호 패턴에 매칭하는지 테스트(확인)한다.
regExp.test(tel); // -> false
```

> 위의 코드에서 사용된 정규 표현식 `^\d{3}-\d{4}-\d{4}$`는 아래와 같은 패턴을 나타냅니다.

> - `^`: 문자열의 시작과 매치합니다.
> - `\d`: 숫자를 의미하는 메타 문자로, `[0-9]`와 동일합니다.
> - `{n}`: 바로 앞에 있는 패턴이 n번 나타날 수 있음을 나타냅니다.
> - ``: 하이픈을 의미하는 문자로, 그대로 매치합니다.
> - `$`: 문자열의 끝과 매치합니다.

> 따라서, 위의 정규 표현식은 `010-1234-5678`과 같은 휴대폰 전화번호 패턴을 찾을 수 있습니다. 하지만 `tel` 변수에 할당된 값은 `'010-1234-567팔'`로서, 맨 끝에 '팔'이라는 문자가 붙어있습니다. 때문에 `regExp.test(tel)`은 `false`를 반환합니다.

```javascript
const validTel = "010-1234-5678";
const isMatchValid = regExp.test(validTel); // -> true
console.log(isMatchValid);
```

> 정상적인 휴대폰 전화번호 패턴에 대해서는 `regExp.test(tel)`이 `true`를 반환하게 됩니다.

<br>

## 31.2 정규 표현식의 생성

자바스크립트에서 정규 표현식을 생성하는 방법은 정규 표현식 리터럴이나 RegExp 생성자를 사용하는 두 가지 방법이 있습니다.

1. **정규 표현식 리터럴 사용:**
   리터럴을 사용하여 정규 표현식을 생성하려면 패턴을 슬래시(`/`)로 둘러싸면 됩니다.

   ```javascript
   // default:
   const regex = /패턴/플래그;
   ```

   ```javascript
   // 31-02
   const target = "Is this all there is?";

   // 패턴: is
   // 플래그: i => 대소문자를 구별하지 않고 검색한다.
   const regexp = /is/i;

   // test 메서드는 target 문자열에 대해 정규표현식 regexp의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.
   regexp.test(target); // -> true
   ```

   ```javascript
   // 31-03
   // RegExp 생성자를 사용하여 정규 표현식을 생성하는 방법으로
   // 정규 표현식 리터럴과 동일한 패턴과 플래그를 전달합니다.
   const target = "Is this all there is?";

   const regexp = new RegExp(/is/i); // 또는 const regexp = new RegExp('is', 'i');
   regexp.test(target); // -> true
   ```

2. **RegExp 생성자 사용:**
   생성자를 사용하여 정규 표현식을 생성하려면 패턴을 문자열로 제공하며, 추가적인 플래그를 사용하여 표현식의 동작을 수정할 수도 있습니다.

   ```javascript
   // default
   const regex = new RegExp("패턴", "플래그");
   ```

   ```javascript
   // 31-04
   // 문자열에서 특정 문자열의 등장 횟수를 세는 함수:
   // RegExp 생성자를 사용하여 동적으로 패턴을 생성하고,
   // match() 메서드를 이용하여 특정 문자열을 찾아 배열로 반환한 뒤 배열의 길이를 세어 횟수를 구합니다.
   const count = (str, char) =>
     (str.match(new RegExp(char, "gi")) ?? []).length;

   count("Is this all there is?", "is"); // -> 3
   count("Is this all there is?", "xx"); // -> 0
   ```

<br>

## 31.3 RegExp 메서드

- 자바스크립트의 정규 표현식은 `test()`, `exec()`, `match()`, `search()`, `replace()`, `split()`과 같은 여러 문자열 메서드와 함께 사용할 수 있습니다.

### 31.3.1 RegExp.prototype.exec

```javascript
regexp.exec(str);
// regexp는 정규 표현식을 나타내는 객체이며,
// str은 검색할 대상 문자열입니다.
```

- `RegExp.prototype.exec` 메서드는 `RegExp` 객체의 인스턴스에서 사용 가능한 메서드 중 하나입니다.
- 이 메서드는 문자열을 검색하여 일치하는 부분을 찾으면 해당 부분에 대한 정보를 배열로 반환합니다. 일치하는 부분이 없을 경우 `null`을 반환합니다.

```javascript
// 31-05
const target = "Is this all there is?";
const regExp = /is/; // 정규 표현식 `/is/`는 target 문자열에서 `is`와 일치하는 첫 번째 부분을 찾습니다.

regExp.exec(target); // -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

- `exec()` 메서드는 정규 표현식의 `g` 플래그를 사용하지 않은 한 번의 호출로는 첫 번째 일치하는 부분만 찾습니다. 여러 번 호출하여 반복적으로 검색하려면 `g` 플래그를 사용해야 합니다.

```javascript
const target = "Is this all there is?";
const regExp = /is/g;

let result;
while ((result = regExp.exec(target)) !== null) {
  console.log(result[0]); // 일치하는 부분 출력
}
```

### 31.3.2 RegExp.prototype.test

```javascript
regexp.test(str);
```

- `RegExp.prototype.test` 메서드는 주어진 문자열에서 정규 표현식과 일치하는 부분을 검사하여 `true` 또는 `false`를 반환합니다.

```javascript
const target = "Is this all there is?";
const regExp = /is/; // 정규 표현식 `/is/`는 `target` 문자열에서 `is`와 일치하는 부분을 찾습니다.

if (regExp.test(target)) {
  // `regExp.test(target)`를 실행하면 정규 표현식 `/is/`와 일치하는 부분이 `target` 문자열에 존재하므로 `true`를 반환합니다.
  console.log('문자열에 "is"가 포함되어 있습니다.');
} else {
  console.log('문자열에 "is"가 포함되어 있지 않습니다.');
}
```

### 31.3.3 String.prototype.match

- `String.prototype.match` 메서드는 문자열에서 정규 표현식 또는 문자열과 일치하는 부분을 찾아 배열로 반환합니다.

```javascript
str.match(regexp)
// `str`은 검색 대상이 되는 문자열이며, 
// `regexp`는 정규 표현식 또는 문자열을 나타내는 값입니다. 
```

- 정규 표현식에 `g` 플래그가 사용되지 않은 경우, 첫 번째 일치하는 부분이 첫 번째 요소로 배열에 포함됩니다. 이후에는 정규 표현식에 `g` 플래그를 사용한 경우와 동일하게 작동합니다.

```javascript
// 31-07
const target = "Is this all there is?";
const regExp = /is/;

target.match(regExp); // -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

- 정규 표현식에 `g` 플래그가 사용된 경우, 일치하는 모든 부분이 배열에 포함됩니다.

```javascript
// 31-08
const target = "Is this all there is?";
const regExp = /is/g;

target.match(regExp); // -> ["is", "is"]
```

<br>

## 31.4 플래그

```javascript
/pattern/flags
// 여기서 `pattern`은 검색할 패턴을 의미하고, `flags`는 플래그(옵션)를 나타냅니다.
```
- 정규 표현식 패턴은 `/`로 시작하고 끝나는데, 뒤에 플래그를 추가로 사용할 수도 있습니다. 
- 주요 플래그로는 `i`(대소문자를 무시하고 검색), `g`(전역 검색), `m`(여러 줄 검색) 등이 있습니다.

```javascript
//  31-09
const target = "Is this all there is?";

// target 문자열에서 is 문자열을 대소문자를 구별하여 한 번만 검색한다.
target.match(/is/);
// -> ["is", index: 5, input: "Is this all there is?", groups: undefined]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 한 번만 검색한다.
target.match(/is/i);
// -> ["Is", index: 0, input: "Is this all there is?", groups: undefined]

// target 문자열에서 is 문자열을 대소문자를 구별하여 전역 검색한다.
target.match(/is/g);
// -> ["is", "is"]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 전역 검색한다.
target.match(/is/gi);
// -> ["Is", "is", "is"]
```

**주요 플래그 의미:**
1. `.` : 임의의 한 문자와 매치
2. `` : 바로 앞에 있는 문자나 표현식이 0번 이상 나타날 수 있음
3. `+` : 바로 앞에 있는 문자나 표현식이 1번 이상 나타날 수 있음
4. `?` : 바로 앞에 있는 문자나 표현식이 0번 또는 1번 나타날 수 있음
5. `\\` : 특수 문자를 이스케이프 (Literal한 의미로 해석)
6. `[]` : 문자 클래스, 괄호 안에 있는 문자 중 하나와 매치
7. `()` : 그룹화, 패턴의 일부를 묶음
8. `|` : OR 연산자, 패턴 중 하나와 매치
9. `^` : 문자열의 시작과 매치
10. `$` : 문자열의 끝과 매치

<br>

## 31.5 패턴

### 31.5.1 문자열 검색

```javascript
// 31-10
const target = "Is this all there is?";

// 'is' 문자열과 매치하는 패턴. 플래그가 생략되었으므로 대소문자를 구별한다.
const regExp = /is/;

// target과 정규 표현식이 매치하는지 테스트한다.
regExp.test(target); // -> true

// target과 정규 표현식의 매칭 결과를 구한다.
target.match(regExp);
// -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

```javascript
// 31-11
const target = "Is this all there is?";

// 'is' 문자열과 매치하는 패턴. 플래그 i를 추가하면 대소문자를 구별하지 않는다.
const regExp = /is/i;

target.match(regExp);
// -> ["Is", index: 0, input: "Is this all there is?", groups: undefined]
```

```javascript
// 31-12
const target = "Is this all there is?";

// 'is' 문자열과 매치하는 패턴.
// 플래그 g를 추가하면 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다.
const regExp = /is/gi;

target.match(regExp); // -> ["Is", "is", "is"]
```

### 31.5.2 임의의 문자열 검색

```javascript
// 31-13
const target = "Is this all there is?";

// 임의의 3자리 문자열을 대소문자를 구별하여 전역 검색한다.
const regExp = /.../g;

target.match(regExp); // -> ["Is ", "thi", "s a", "ll ", "the", "re ", "is?"]
```

### 31.5.3 반복 검색

```javascript
// 31-14
const target = "A AA B BB Aa Bb AAA";

// 'A'가 최소 1번, 최대 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{1,2}/g;

target.match(regExp); // -> ["A", "AA", "A", "AA", "A"]
```

```javascript
// 31-15
const target = "A AA B BB Aa Bb AAA";

// 'A'가 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{2}/g;

target.match(regExp); // -> ["AA", "AA"]
```

```javascript
// 31-16
const target = "A AA B BB Aa Bb AAA";

// 'A'가 최소 2번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /A{2,}/g;

target.match(regExp); // -> ["AA", "AAA"]
```

```javascript
// 31-17
const target = "A AA B BB Aa Bb AAA";

// 'A'가 최소 한 번 이상 반복되는 문자열('A, 'AA', 'AAA', ...)을 전역 검색한다.
const regExp = /A+/g;

target.match(regExp); // -> ["A", "AA", "A", "AAA"]
```

```javascript
// 31-18
const target = "color colour";

// 'colo' 다음 'u'가 최대 한 번(0번 포함) 이상 반복되고 'r'이 이어지는 문자열 'color', 'colour'를 전역 검색한다.
const regExp = /colou?r/g;

target.match(regExp); // -> ["color", "colour"]
```

### 31.5.4 OR 검색

```javascript
// 31-19
const target = "A AA B BB Aa Bb";

// 'A' 또는 'B'를 전역 검색한다.
const regExp = /A|B/g;

target.match(regExp); // -> ["A", "A", "A", "B", "B", "B", "A", "B"]
```

```javascript
// 31-20
const target = "A AA B BB Aa Bb";

// 'A' 또는 'B'가 한 번 이상 반복되는 문자열을 전역 검색한다.
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ...
const regExp = /A+|B+/g;

target.match(regExp); // -> ["A", "AA", "B", "BB", "A", "B"]
```

```javascript
// 31-21
const target = "A AA B BB Aa Bb";

// 'A' 또는 'B'가 한 번 이상 반복되는 문자열을 전역 검색한다.
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ...
const regExp = /[AB]+/g;

target.match(regExp); // -> ["A", "AA", "B", "BB", "A", "B"]
```

```javascript
// 31-22
const target = "A AA BB ZZ Aa Bb";

// 'A' ~ 'Z'가 한 번 이상 반복되는 문자열을 전역 검색한다.
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ... ~ 또는 'Z', 'ZZ', 'ZZZ', ...
const regExp = /[A-Z]+/g;

target.match(regExp); // -> ["A", "AA", "BB", "ZZ", "A", "B"]
```

```javascript
// 31-23
const target = "AA BB Aa Bb 12";

// 'A' ~ 'Z' 또는 'a' ~ 'z'가 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /[A-Za-z]+/g;

target.match(regExp); // -> ["AA", "BB", "Aa", "Bb"]
```

```javascript
// 31-24
const target = "AA BB 12,345";

// '0' ~ '9'가 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /[0-9]+/g;

target.match(regExp); // -> ["12", "345"]
```

```javascript
// 31-25
const target = "AA BB 12,345";

// '0' ~ '9' 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /[0-9,]+/g;

target.match(regExp); // -> ["12,345"]
```

```javascript
// 31-26
const target = "AA BB 12,345";

// '0' ~ '9' 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
let regExp = /[\d,]+/g;

target.match(regExp); // -> ["12,345"]

// '0' ~ '9'가 아닌 문자(숫자가 아닌 문자) 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
regExp = /[\D,]+/g;

target.match(regExp); // -> ["AA BB ", ","]
```

```javascript
// 31-27
const target = "Aa Bb 12,345 _$%&";

// 알파벳, 숫자, 언더스코어, ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
let regExp = /[\w,]+/g;

target.match(regExp); // -> ["Aa", "Bb", "12,345", "_"]

// 알파벳, 숫자, 언더스코어가 아닌 문자 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
regExp = /[\W,]+/g;

target.match(regExp); // -> [" ", " ", ",", " ", "$%&"]
```

### 31.5.5 NOT 검색

```javascript
// 31-28
const target = "AA BB 12 Aa Bb";

// 숫자를 제외한 문자열을 전역 검색한다.
const regExp = /[^0-9]+/g;

target.match(regExp); // -> ["AA BB ", " Aa Bb"]
```

### 31.5.6 시작 위치로 검색

```javascript
// 31-29
const target = "https://poiemaweb.com";

// 'https'로 시작하는지 검사한다.
const regExp = /^https/;

regExp.test(target); // -> true
```

### 31.5.7 마지막 위치로 검색

```javascript
// 31-30
const target = "https://poiemaweb.com";

// 'com'으로 끝나는지 검사한다.
const regExp = /com$/;

regExp.test(target); // -> true
```

<br>

## 31.6 자주 사용하는 정규표현식

### 31.6.1 특정 단어로 시작하는지 검사

```javascript
// 31-31
const url = "https://example.com";

// 'http://' 또는 'https://'로 시작하는지 검사한다.
/^https?:\/\//.test(url); // -> true
```

```javascript
// 31-32
/^(http|https):\/\//.test(url); // -> true
```

### 31.6.2 특정 단어로 끝나는지 검사

```javascript
// 31-33
const fileName = "index.html";

// 'html'로 끝나는지 검사한다.
/html$/.test(fileName); // -> true
```

### 31.6.3 숫자로만 이루어진 문자열인지 검사

```javascript
// 31-34
const target = "12345";

// 숫자로만 이루어진 문자열인지 검사한다.
/^\d+$/.test(target); // -> true
```

### 31.6.4 하나 이상의 공백으로 시작하는지 검사

```javascript
// 31-35
const target = " Hi!";

// 하나 이상의 공백으로 시작하는지 검사한다.
/^[\s]+/.test(target); // -> true
```

### 31.6.5 아이디로 사용 가능한지 검사

```javascript
// 31-36
const id = "abc123";

// 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4 ~ 10자리인지 검사한다.
/^[A-Za-z0-9]{4,10}$/.test(id); // -> true
```

### 31.6.6 메일 주소 형식에 맞는지 검사

```javascript
// 31-37
const email = "ungmo2@gmail.com";

/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
  email
); // -> true
```

```javascript
// 31-38
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
```

### 31.6.7 핸드폰 번호 형식에 맞는지 검사

```javascript
// 31-39
const cellphone = "010-1234-5678";

/^\d{3}-\d{3,4}-\d{4}$/.test(cellphone); // -> true
```

### 31.6.8 특수 문자 포함 여부 검사

```javascript
// 31-40
const target = "abc#123";

// A-Za-z0-9 이외의 문자가 있는지 검사한다.
/[^A-Za-z0-9]/gi.test(target); // -> true
```

```javascript
// 31-41
/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi.test(target); // -> true
```

```javascript
// 31-42
target.replace(/[^A-Za-z0-9]/gi, ""); // -> abc123
```