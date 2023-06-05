# 9장. 타입 변환과 단축 평가

- **타입 변환이란?**

자바스크립트의 모든 값은 타입이 있다. 값의 타입은 개발자의 의도에 따라 다른 타입으로 변환할 수 있다.
개발자가 의도적으로 값의 타입을 변환하는 것을 **명시적 타입변환** 또는 **타입 캐스팅**이라 한다.

```javascript

let x = 10;
let str = x.toString();
console.log(typeof str, str); // string 10

// x 변수의 값이 변경된 것은 아니다
console.log(typeof x, x) // number 10

```
<br>

개발자의 의도와는 상관없이 표현식을 평가하는 도중에 자바스크립트 엔진에 의해 암묵적으로 타입이 자동변환되기도 한다.
이를 **암묵적타입변환** 또는 **타입 강제 변환**이라 한다.

```javascript

let x = 10;
let str = x + '';
console.log(typeof str, str); // string 10

// x변수의 값이 변경된 것은 아니다
console.log(typeof x, x); // number 10

```

<br>

명시적 타입 변환이나 암묵적 타입 변환이 기존 원시 값(위 예제의 경우 x변수의 값)을 직접 변경하는 거은 아니다.
원시 값은 변경 불가능한 값이므로 변경할 수 없다. **타입 변환이란 기존 원시 값을 사용해 다른 타입의 새로운 원시값을 생성하는 것**이다.

암묵적 타입 변환은 기본 변수 값을 재할당하여 변경하는 것이 아니다. 자바스크립트 엔진은 표현식을 에러없이 평가하기 위해 피연산자의 값을 암묵적으로 타입 변환해 새로운 타입의 값을 만들어 단 한 번 사용하고 버린다.

암묵적 타입 변환은 코드에 명백하게 나타나지 않으므로 자신이 작성한 코드에서 암묵적 타입 변환이 발생하는지, 발생한다면 어떤 타입의 어떤 값으로 변환되는지, 그리고 타입 변환된 값으로 표현식이 어떻게 평가될 것인지 예측 가능해야 한다. 그렇지 않으면 오류를 생산할 가능성이 높아진다.


- **암묵적 타입 변환**

표현식을 평가할 때 코드의 문맥에 부합하지 않는 다양한 상황이 발생할 수 있다. 이때 프로그래밍 언어에 따라 에러를 발생시키기도 하지만 자바스크립트는 가급적 에러를 발생시키지 않도록 암묵적 타입 변환을 통해 포현식을 평가한다. 암묵적 타입 변환이 발생하면 문자열, 숫자, 불리언과 같은 원시 타입 중 하나로 타입을 자동 변환한다. 

**문자열 타입으로 변환**

문자열 연결 연산자 표현식을 평가하기 위해 문자열 연결 연산자의 피연산자 중에서 문자열 타입이 아닌 피연산자를 문자열 타입으로 암묵적 타입 변환한다.

```javascript

// 숫자 타입
0 + ''; // '0'
-0 + ''; // '0'
1 + ''; // '1;
-1 + ''; // '-1'
NaN + ''; // 'NaN'
Infinity + '' // 'Infinity'
-Infinity + '' // '-Infinity'

// 불리언 타입
true + '' // 'true'
false + '' // 'false'

// null 타입
null + '' // 'null'

// undefined 타입
undefined + '' // 'undefined'

// 십벌타입
(Symbol()) + '' // TypeError

// 객체 타입
({}) + '' // "[object object]"
Math + '' // "[object Math]"
[] + '' // ""
[10, 20] + '' // "10,20"
(function(){}) + '' // "function(){}"
Array + '' // "function Array() { [native code] }"


```

<br>

**숫자 타입으로 변환**

산술연산자는 숫자 값을 만드는 것이므로 산술 연산자의 모든 피연산자는 코드 문맥상 모두 숫자 타입이어야 한다.

```javascript

1 - '1'  // 0
1 * '10' // 10
1 / 'one' // NaN
'1' > 0 // ture

//문자열 타입
+ '' // 0
+ '0' // 0
+ '1' // 1
+ 'string' // NaN

//불리언 타입
+ true // 1
+ false // 0

// null 타입
+ null // 0

// undefined 타입
+ undefined // NaN

// 심벌 타입
+ Symbol() // TypeError

// 객체 타입
+ {} // NaN
+ [] // 0
+[10,20] // NaN
+(function(){}) // NaN

```

<br>

 **불리언 타입으로 변환**

 if문이나 for문과 같은 제어문 또는 삼항 조건 연산자의 조건식은 불리언 값, 논리적 참/거짓으로 평가되어야 하는 표현식이다.
 자바스트립트 엔진은 조건식의 평가 결과를 불리언 타입으로 암묵적 타입 변환 한다.

자바스크립트 엔진은 불리언 타입이 아닌 값을 Truthy값 (참으로 평가되는 값) 또는 Falsy 값(거짓으로 평가되는 값)으로 구분한다.


<br>

- **명시적 타입 변환**

개발자 의도에 따라 타입을 변경하는 방법
*표준 빌트인 생성자 함수와 빌트인 메서드



**문자열 타입으로 변환**

 1. String 생성자 함수를 new 연산자 없이 호출하는 방법
 2. Object.prototype.toString 메서드를 사용하는 방법
 3. 문자열 연결 연산자를 이용하는 방법

 ```javascript

String(2); // '2'
String(NaN); // 'NaN'
String(Infinity) // 'Infinity'
String(true) // 'true'
String(false) // 'false'

(1).toString(); // '1'
(NaN).toString(); // 'NaN'
(Infinity).toString(); // 'Infinity'
(true).toString(); // true
(false).toString(); // false

1 + ''; // '1'
NaN + ''; // 'NaN'
Infinity + ''; // "Infinity"

true + ''; // 'true'
false + ''; // 'false'
```

**숫자 타입으로 변환**

1. Number생성자 함수를 new 연산자 없이 호출하는 방법
2. parseInt, parseFloat 함수를 사용하는 방법 (문자열만 숫자 타입으로 변환 가능)
3. + 단항 산술 연산자를 이용하는 방법
4. * 산술 연산자를 이용하는 방법

 ```javascript

Number('0'); // 0
Number('-1'); // -1
Number('10.53'); // 10.53
Number(true); // 1
Number(false); // 0

parseInt('0'); // 0
parseInt('-1'); // -1
parseInt('10.53'); // 10.53

+'0'; // 0
+'-1'; // -1
+'10.53'; // 10.530
+true // 1
+false // 0

'0'*1; // 0
'-1'* // -1
'10.53'*1; // 10.53

true*1; // 1
false*1; // 0
```

**불리언 타입으로 변환**

1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
2. ! 부정 논리 연산자를 두번 사용하는 방법

```javascript

Boolean('x'); // true
Boolean(''); // false
Boolean('false') // true

Boolean(0); // false
Boolean(1); // true
Boolean(NaN); // false
Boolean(Infinity); // true
Boolean(null); // false
Boolean(undefined); // false
Boolean({}); // true
Boolean([]); // true

!!'x'; //true
!!''; // false
!!'false'; // true

!!0; // false
!!1; // true
!!NaN // false
!!Infinity // true
!!null // false
!!undefined // flase
!!{}; // true
!![]; // true

```
<br>

- **단축 평가**

 **논리 연산자를 사용한 단축 평가**

 논리합(||) 또는 논리곱(&&) 연산자 표현식은 언제나 2개의 피연산자 중 어느 한쪽으로 평가된다.

 ```javascript
 'cat' && 'dog'  // 'dog'
```
 논리곱(&&) 연산자는 두 개의 피연산자가 모두 true로 평가될 때 true로 반환한다. 논리곱 연산자는 좌항에서 우항으로 평가가 진행된다.
 두번째 피연산자까지 평가해 보아야 표현식을 평가할 수 있다. (두번쨰 피연산자가 논리곱 연산자 표현식의 평가 결과를 결정한다.)

  ```javascript
 'cat' || 'dog'  // 'cat'
```
논리합(||) 연산자는 두개의 피연산자 중 하나만 true로 평가되어도 true를 반환한다. 논리합 연산자도 좌항에서 우항으로 평가가 진행된다.
첫번째 연산자 'cat'는 Truthy값이므로 true로 평가된다. 이 시점에서 두번째 피연산자까지 평가해보지 않아도 위 표현식을 평가할 수 있으므로 'cat'으로 반환된다. 

**이처럼 논리합과 논리곱연산자는 피연산자의 타입 변환하지 않고 그대로 반환한다. 이를 단축 평가라고 한다.**
단축평간는 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 말한다.

```javascript

true || anything // true
false || anything /// anything
true && anything // anything
false && anything // false

```
<br>

단축 평가를 사용하면 if문을 대체할 수 있다. 어떤 조건이 Truthy 값(참으로 평가되는 값)일때 무언가를 해야 한다면 논리곱(&&) 연산자 표현식으로 if문을 대체할 수 있다.

```javascript

let done = true;
let message = '';

if (done) message = '완료';

message = done && '완료';
console.log(message); //완료

```

조건이 Falsy값(거짓으로 평가되는 값)일 때 무언가를 해야한다면 논리합(||) 연산자 표현식으로 if문을 대체할 수 있다.

```javascript

let done = false;
let message = '';

if(done) message = '미완료';

message = done || '미완료';
console.log(message); //미완료

```

참고로 삼항 조건 연산자는 if ... else문을 대체할 수 있다.

```javascript   

let done = true;
let message = '';

if(done) message = '완료';
else message = '미완료';
console.log(message); //완료

message = done ? '완료' : '미완료' ;
console.log(message); // 완료

```

**객체를 가리키기를 기대한 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때**

객체는 키와 값으로 구성된 프로퍼티의 집합이다.
만약 객체를 가리키기를 기대하는 변수의 값이 객체가 아니라 null 또는 undefined인 경우 객체의 프로퍼티를 참조하면 타입에러가 발생한다. 에러가 발생하면 프로그램이 강제 종료 된다.

```javascript

let elem = null;
let value = elem.value; // TypeError

//이때 단축형가를 사용하면 에러를 발생시키지 않는다

let value = elem && elem.value; // null

```

<br>

**함수 매개변수에 기본값을 설정할 때**

함수를 호출할 떄 인수를 전달하지 않으면 매개변수에는 undefined가 할당된다. 이때 단축평가를 사용해 매개변수의 기본값을 설정하면 undefined로 인해 발생할 수 있는 에러를 방지할 수 있다.

```javascript

//  단축평가를 사용한 매개변수의 기본값 설정
function getStringLength(str){
    str = str || '';
    return str.length;
}

getStringLength(); //0
getStringLength('hello'); // 5

// ES6의 매개변수 기본값 설정
function getStringLength(str = ''){
    return str.length;
}

getStringLength(); //0
getStringLength('hello'); // 5

```

<br>

**옵셔널 체이닝 연산자**

ES11에서 도입된 옵셔널 체이닝 연산자 ?.는 좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
옵셔널 체이닝 연산자는 객체를 가리키기를 기대한느 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때 유용하다. 이 연산자 도입 이전에는 논리연산자(&&)를 사용한 단축 평가를 통해 변수가 null 또는 undefined인지 확인했다.

```javascript  

let elem = null;
let value = elem?.value;
console.log(value);// undefined

let value = elem && elem.value;
console.log(value); // null

```
논리연산자(&&)는 좌항 피연산자가 false로 평가되는 Falsy값(false, undefined, null, 0, -0, NaN, '')이면 좌항 피연산자를 그대로 반환한다. 좌항 피연산자가 Falsy값인 0이나 ''인 경우도 마찬가지지만 0이나 ''은 객체로 평가될 때도 있다. 
하지만 옵셔널 체이닝 연산자 ?.는 좌항 피연산자가 false로 평가되는 Falsy값이라도 null도는 undefined가 아니면 우항의 프로퍼티 참조를 이어간다.

```javascript  

let str = "";
let length = str && str.length;
console.log(length); // ""

let str = "";
let length = str?.str.length;
console.log(length); // 0

```

<br>

**null병합 연산자**

ES11에서 도입된 null병합 연산자 ??는 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 연산자를 반환한다. null병합연산자 ??는 변수의 기본값을 설정할 때 유용하다.

null 병합 연산자 ??가 도입되지 이전에는 논리연산자(||)를 사용한 단축평가를 통해 변수에 기본값을 설정했다. 좌항의 피연산자가 falsy값이면 우항의 피연산자를 반환한다. 만약 falsy값인 0이나 '도 기본값으로서 유효하다면 예기치 않은 동작이 발생할 수 있다.

```javascript

let foo = null??'defalt string';
console.log(foo); // 'defalt string'

let foo = ''||'defalt string';
console.log(foo); // 'defalt string'

```

하지만 null병합 연산자 ??는 좌항의 피연산자가 falsy값이라도 null또는 undefined가 아니면 좌항의 피연산자를 그대로 반환한다.

```javascript

let foo = ''??'defalt string';
console.log(foo); // ''

```
