# 11장. 원시값과 객체의 비교

**[목차]**
- 11장. 원시값과 객체의 비교
  - [11-1. 원시값](#11-1-원시값)
  - [11-2. 객체](#11-2-객체)
  - [요약](#요약)
  - [키워드](#키워드)
  - [Reference](#reference)

<br>

## 11-1. 원시 값

### 11-1.1 변경 불가능한 값(immutable value)
- 원시 값(Primitive values)은 변경 불가능한(immutable) 값입니다. 
- 한 번 생성되면 해당 값을 직접 변경할 수 없으며, 새로운 값을 할당해야 합니다.
- 원시 값은 변수에 할당될 때 변수에 실제 값이 복사됩니다.

```jsx
// 원시 값인 숫자와 문자열을 가지고 있는 num 변수와 str 변수
var num = 5;
var str = "Hello";

num = 10; // 값을 변경하는 것이 아니라, 새로운 값을 할당합니다.
str = "World"; // 역시 값을 변경하는 것이 아니라, 새로운 값을 할당합니다.
```

<br>

### 11-1.2 문자열과 불변성
- 문자열은 원시 값의 한 종류로, 변경할 수 없는 특성을 가지고 있습니다. 즉, 문자열을 수정하려면 새로운 문자열을 생성해야 합니다.
  - JavaScript에서 문자열은 한 번 생성되면 해당 문자열을 직접 수정할 수 없습니다. 대신에, 수정된 새로운 문자열을 생성하여 변수에 할당해야 합니다.

```jsx
var str = "Hello";
var newStr = str + " World"; // 기존의 문자열에 " World"를 추가하여 새로운 문자열을 생성합니다.

console.log(str); // Output: "Hello" (기존 문자열은 변경되지 않습니다.)
console.log(newStr); // Output: "Hello World"
```

<br>

### 11-1.3 값에 의한 전달
원시 값은 "값에 의한 전달" 방식으로 변수 간에 전달됩니다. 이는 변수에 할당된 원시 값이 복사되어 전달된다는 의미입니다. 따라서 변수의 값이 변경되더라도 다른 변수에는 영향을 주지 않습니다.

```jsx
var a = 5;
var b = a; // a에 할당된 값이 b에 복사되어 전달됩니다.

b = 10; // b의 값을 변경해도 a에는 영향을 주지 않습니다. 이는 두 변수가 서로 독립적으로 값이 저장되기 때문입니다.

console.log(a); // Output: 5
console.log(b); // Output: 10
```

<br>

## 11-2. 객체

### 11-2.1 변경 가능한 값(mutable value)
객체는 생성된 후에도 내부의 속성이나 값을 변경할 수 있습니다. 객체는 참조 형태로 저장되며, 해당 참조를 통해 객체의 내용을 수정할 수 있습니다.

```jsx
// 객체 생성
var person = {
  name: "B",
  age: 30,
  city: "New York"
};

// 내부 속성 변경
person.age = 31;
person.city = "London";

console.log(person); // { name: "B", age: 31, city: "London" }

// 속성 추가
person.job = "Engineer";

// 속성 제거
delete person.city;

console.log(person); // { name: "B", age: 31, job: "Engineer" }
```

<br>

### 11-2.2 참조에 의한 전달
- 객체는 변수에 저장되는 것이 아니라, 실제 객체는 힙(heap)에 저장되고 변수에는 객체의 참조(주소)가 저장됩니다. 
- 객체를 다른 변수에 할당하면 동일한 객체에 대한 참조가 복사되어 전달되므로, 한 변수에서 객체를 변경하면 다른 변수에서도 동일한 변경 내용을 확인할 수 있습니다.

```jsx
var obj1 = { name: "S" };
var obj2 = obj1; // obj1의 참조가 obj2에 복사됨

obj2.name = "B"; // obj2를 통해 객체의 속성을 변경

console.log(obj1.name); // "B"
console.log(obj2.name); // "B"
```

<br>

## 요약
원시 값(Primitive values)은 변경 불가능한(immutable) 값으로, 한 번 생성되면 직접 수정할 수 없고 새로운 값을 할당해야 합니다. 원시 값은 변수에 할당될 때 실제 값이 복사되며, 값에 의한 전달 방식으로 변수 간에 전달됩니다.문자열도 원시 값으로, 생성된 후에는 수정할 수 없습니다. 대신에 수정된 새로운 문자열을 생성하여 변수에 할당해야 합니다.

객체는 변경 가능한(mutable) 값으로, 생성된 후에도 내부의 속성이나 값을 변경할 수 있습니다. 객체는 참조 형태로 저장되며, 해당 참조를 통해 객체의 내용을 수정할 수 있습니다.
객체는 변수에 저장되는 것이 아니라, 실제 객체는 힙(heap)에 저장되고 변수에는 객체의 참조(주소)가 저장됩니다. 객체를 다른 변수에 할당하면 동일한 객체에 대한 참조가 복사되어 전달되므로, 한 변수에서 객체를 변경하면 다른 변수에서도 동일한 변경 내용을 확인할 수 있습니다.

<br>

## 키워드

<br>

## Reference
- [**Immutable - MDN Docs**](https://developer.mozilla.org/en-US/docs/Glossary/Immutable)
- [**Mutable - MDN Docs**](https://developer.mozilla.org/en-US/docs/Glossary/Mutable)
- [**Shallow copy - MDN Docs**](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy)
- [**Deep copy - MDN Docs**](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy)
- [**Object - MDN Docs**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [**Primitive Value - MDN Docs**](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
- [**Event Loop**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
- [**Event loops in the HTML standard**](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)
- [**Node.js Event Loop**](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick#what-is-the-event-loop)