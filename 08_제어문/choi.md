# 8장. 제어문

조건문 : 조건에 따라 코드 블록을 실행
반복문 : 반복 실행

일반적으로 코드는 위에서 아래 방향으로 순차적으로 실행된다. 제어문을 사용하면 코드의 실행 흐름을 인위적으로 제어할 수 있다.
하지만 코드의 흐름을 이해하기 어렵게 만들어 가독성을 해치는 단점이 있다. 가독성이 좋지 않은 코드는 오류를 발생시키는 원인이 된다.

- **블록문**

0개 이상의 문을 중괄호로 묶은 것. 코드 블록 또는 블록이라한다. 하나의 실행 단위로 취급한다. 일반적으로 제어문이나 함수를 정의할 때 사용한다.
블록문 끝에는 세미콜론을 붙이지 않는다.

```javascript

//블록문
{
    let foo = 10;
}

//제어문
let x = 1;
if(x < 10){
    x++;
}

// 함수 선언문
function sum(a,b){
    return a + b;
}

```
<br>

- **조건문**

주어진 조건식의 평가 결과에 따라 코드 블록의 실행을 결정한다. 조건식은 불리언 값으로 평가될 수 있는 표현식이다.
자바스크립트는 if...else문과 switch문으로 두가지 조건문을 제공한다.

 **if...else문**

주어진 조건식(불리언 값으로 평가될 수 있는 평가식)의 평가 결과, 즉 논리적 참 또는 거짓에 따라 실행할 코드 블록을 결정한다.
조건식의 평가 결과가 true일 경우 if문의 코드 블록이 실행되고 false일 경우 else문의 코드 블록이 실행된다.

```javascript

if (조건식) {
    // 조건식이 참이면 이 코드 블록이 실행된다.
} else {
    // 조건식이 거짓이면 이 코드 블록이 실행된다.
}

if (조건식1) {
    // 조건식1이 참이면 이 코드 블록이 실행된다.
} else if (조건식2) {
    // 조건식2가 거짓이면 이 코드 블록이 실행된다.
} else {
    // 조건식1과 조건식2가 모두 거짓이면 이 코드 블록이 실행된다.
}

let num = 2;
let kind;

if (num > 0){
    kind = '양수'; 
}
console.log(kind) // 양수

if (num > 0){
    kind = '양수';
} else {
    kind = '음수';
}
console.log(kind); // 양수

if (num > 0){
    kind = '양수';
} else if (num < 0) {
    kind = '음수';
} else {
    kind = '영';
}
console.log(kind); // 양수


let a = 2;
let result;

if (a%2){
    result = '홀수';
} else {
    result = '짝수';
}
console.log(result); // 짝수

let ex = 2;
let ex = num ? (num > 0 ? '양수' : '음수') : '영' ;


```

<br>

- **switch문**

주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 case문으로 실행 흐름을 옮긴다.
case문은 상황을 의미하는 표현식을 지정하고 콜론으로 마친다. 그 뒤에 실행할 문들을 위치시킨다.
switch문의 표현식과 일치하는 case문이 없다면 실행 순서는 default문으로 이동한다. default문은 선택사항으로, 사용할 수도 있고 사용하지 않을 수도 있다.
if...else문과 달리 불리언 값보다는 문자열이나 숫자 값인 경우가 많다. 

```javascript

switch(표현식){
    case 표현식1:
        switch 문의 표현식과 표현식1이 일치하면 실행될 문;
        break;
    case 표현식2:
        switch 문의 표현식과 표현식2가 일치하면 실행될 문;
        break;
    default:
        switch 문의 표현식과 일치하는 case문이 없을때 실행될 문;

}

let month = 11;
let monthName;

switch (month) {
    case 1: monthName = 'January';
    case 2: monthName = 'February';
    case 3: monthName = 'March';
    case 4: monthName = 'April';
    case 5: monthName = 'May';
    case 6: monthName = 'June';
    case 7: monthName = 'July';
    case 8: monthName = 'August';
    case 9: monthName = 'September';
    case 10: monthName = 'October';
    case 11: monthName = 'November';
    case 12: monthName = 'December';
    default: monthName = 'Invalid month';
    }
console.log(monthName); // Invalid month

// 표현식의 평가 경과와 일치하는 case문으로 실행 흐름이 이동하여 문을 실행한 것은 맞지만 문을 실행한 후 switch문을 탈출하지 않고 switch문이 끝날 때까지 이후의 모든 case문과 default문을 실행했기 때문에 Invalid month값이 나온것이다. 이를 폴스루라고 한다. 변수 'November'가 할당된 수 switch문을 탈출하지 않고 연이어 'December'가 재할당되고 마지막으로 'Invalid month'가 재할당된것이다. 

switch (month) {
    case 1: monthName = 'January';
    break;
    case 2: monthName = 'February';
    break;
    case 3: monthName = 'March';
    break;
    case 4: monthName = 'April';
    break;
    case 5: monthName = 'May';
    break;
    case 6: monthName = 'June';
    break;
    case 7: monthName = 'July';
    break;
    case 8: monthName = 'August';
    break;
    case 9: monthName = 'September';
    break;
    case 10: monthName = 'October';
    break;
    case 11: monthName = 'November';
    break;
    case 12: monthName = 'December';
    break;
    default: monthName = 'Invalid month';
    }
console.log(monthName); // November

// break키워드로 구성된 break문은 코드 블록에서 탈출하는 역할을 한다. break문이 없다면 case 문의 표현식과 일치하지 않더라도 실행 흐름이 다음 case문으로 연이어 이동한다. 또한 default문에는 break문을 생략하는 것이 일반적이다. 

// break문을 생략한 폴스루가 유용한 경우도 있다. 폴스루를 활용해 여러 개의 case문을 하나의 조건으로 사용할 수도 있다.

var year = 2000;
var month = 2;
var days = 0;

switch(month) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        days = 31;
        break;
    case 4: case 6: case 9: case 11:
        days = 30;
        break;
    case 2:
        days = ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) ? 29 : 28;
        break;
    default:
        console.log('Invalid month');    
}
console.log(days); // 29

```

> C언어를 기반으로 하는 프로그래밍 언어 파이썬같이 switch문을 지원하지 않는 프로그래밍 언어도 있기 때문에 if...else문으로 해결할 수 있다면 switch대신 if...else문을 사용하는 편이 좋다. 


- **반복문**

조건식의 평가 결과가 참인 경우 코드 블룩을 실행한다. 그 후 조건식을 다시 평가하여 여전히 참인 경우 코드 블록을 다시 실행한다. 이는 조건식이 거짓일 때까지 반복된다.

- for문
- while문
- do while문
- 반복문을 대체할 수 있는 다양한 기능 (forEach매서드, for...in문, for...of문)

**for문**

for문은 매우 중요하다.
for문의 변수 선언문, 조건식, 증감식은 모두 옵션이므로 반드시 사용할 필요는 없다. 단, 어떤 식도 선언하지 않으면 무한루프가 된다.
무한루프란 코드 블록을 무한히 반복 실행하는 문이다.
for문 내에 for 문을 중첩해 사용할 수 있다. 이를 중첩 for문이라 한다. 

```javascript

for(변수 선언문 또는 할당문; 조건식; 증감식){
    조건식이 참인 경우 반복 샐행될 문;
}

for (var i = 0; i < 2; i++){
    console.log(i);
}
// 0 1

for(;;){...} // 무한 루프

for(var i = 1; i <= 6; i++){
    for(var j = 1; j <= 6; i++){
        if (i + j === 6) console.log(`[${i}, ${j}]`);
    }
}

// [1,5]
// [2,4]
// [3,3]
// [4,2]
// [5,1]

```
<br>

- **while문**

while문은 주어진 조건식의 평가 경과가 참이면 코드 블록은 계속해서 반복 실행한다.
for문은 반복 횟수가 명확활 때 주로 사용하고 while문은 반복횟수가 불명확할때 주로 사용한다.
조건식 평가 결과가 언제나 참이면 무한루프가 된다.
무한루프에서 탈출하기 위해서는 블록 내에 if문으로 탈출 조건을 만들고 break문으로 코드 블록을 탈출한다.

```javascript

let count = 0;

while (count < 3){
  console.log(count);
  count++;
}

while (true){...} //무한루프

var count = 0;

while(true){
  console.log(count);
  count++;
  if(count === 3)
  break;
}
// 0 1 2

```

<br>

- **do...while문**

do...whild문은 코드 블록을 먼저 실행하고 조건식을 평가한다. 

```javascript

let count = 0;
do {
  console.log(count); // 0 1 2
  count++;
} while(count < 3);

```
<br>


- **break문**

switch문과 while문에서 살펴보았듯이 break문은 코드 블록을 탈출한다. 레이블 문, 반복문, switch문의 코드 블록을 탈출한다.
이외에 break문을 사용하면 SyntaxError(문법에러)가 발생한다.


**break와 return의 차이**
return은 함수 실행을 종료하고, 함수를 빠져 나온다. break는 현재 루프 즉, switch나 for, while문 등을 종료하고 루프에서 빠져나온다. 
만약에 함수 안에 작성된 루프 안에서 break가 쓰였다면, break를 감싸고 있는 루프를 빠져나가고 함수 밖으로는 나가지 않는다.
return은 함수 실행을 종료하고 함수를 호출한 곳으로 실행 흐름을 옮긴다.

```javascript
    // 다음 함수는 i가 3일 때, break문을 만나서, while loop를 종료합니다.
    // 그 후에 while문을 빠져나와서 실행 흐름이  return i * x;로 가서
    //  3 * x 값을 반환합니다.
    function text(x) {
    let i = 0;

    while (i < 6) {
        if (i == 3) {
        break;
        }
        i += 1;
    }
    return i * x;
    }
```

- **continue문**

continue문은 반복문의 코드 블록 실행의 현 시점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킨다.
break문처럼 반복문을 탈출하지 않는다.

```javascript

for(let i = 0; i<5; i++){
    console.log(i)
    continue
    alert(i)
}
// 0 1 2 3 4
// continue키워드를 만나면 바로 다음 반복 작업으로 넘어가므로 alert()함수는 실행되지 않는다.

```


- return과 break의 차이 : https://jihyehwang09.github.io/2019/03/12/js-return-and-break/