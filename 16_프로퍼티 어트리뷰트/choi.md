# 16장 프로퍼티 어트리뷰트


## 16.1 내부 슬롯과 내부 메소드
내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티와 의사 메서드다.
ECMAScript 사양에 등장하는 이중 대괄호([[]])로 감싼 이름들이 내부 슬롯과 내부 메서드다.

내부 슬롯과 내부 메서드는 ECMAScript 사양에 정의된 대로 구현되어 자바스크립트 엔진에서 실제로 동작하지만 개발자가 직접 접근할 수 있도록 외부로 공개된 객체의 프로퍼티는 아니다. 즉, 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 내부 로직이므로 원칙적으로 자바스크립트는 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않는다. 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.

``` javascript

const o = {};

// 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 직접 접근할 수 없다.
o.[[Prototype]] // SyntaxError

// 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.
o.__proto__ // Object.prototype

```
<br>

## 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다. 프로퍼티의 상태란 프로퍼티의 값, 값의 갱신 가능 여부, 열거 기능 여부, 재정의 기능 여부를 말한다.

프로퍼티 어트리뷰트는 자바스크립트 엔진이 관리하는 내부 상태 값인 내부 슬롯[[Value]],[[Writable]],[[Enumerable]],[[Configurable]]이다. 따라서 프로퍼티 어트리뷰트에 직접 접근할 수 없지만 Object.getOwnPropertyDescriptor 메서드를 사용하여 간접적으로 확인할 수 있다.

```javascript
const person = {
	name: 'Lee'
};

console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// { value: "Lee", writable: true, enumerable: true, configurable: true}
// value 이외의 값은 아래에 설명 예정

```
<br>
Object.getOwnPropertyDescriptor 메서드를 호출할 때 첫 번째 매개변수에는 객체의 참조를 전달하고, 두번째 매개변수에는 프로퍼티 키를 문자열로 전달한다. <br>
이때 Object.getOwnPropertyDescriptor 메서드는 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다. 만약 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한 프로퍼티 디스크립터를 요구하면 undefined가 반환된다.

```javascript
const person2 = {
	name: "Lee2"
}

console.log(Object.getOwnPropertyDescriptor(person2, 'name'));
// { value: "Lee", writable: true, enumerable: true, configurable: true}

console.log(Object.getOwnPropertyDescriptor(person123, 'name'));
// Uncaught ReferenceError: person123 is not defined

console.log(Object.getOwnPropertyDescriptor(person2, 'name2'));
// undefined

```
<br>
ES8에서 도입된 Object.getOwnPropertDescriptors 메서드는 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.

```javascript

const person = {
	name: "Lee",
    isMale: true,
}

person.age = 20;

console.log(Object.getOwnPropertyDescriptors(person));

/*
{
	name: { value: "Lee", writable: true, enumerable: true, configurable: true },
    isMale: { value: true, wirtable: true, enumerable: true, configurable: true },
    age: { value: 20, writable: true, enumerable: true, configurable: true }
}
*/
```


## 16.3 데이터 프로퍼티와 접근자 프로퍼티

- 데이터 프로퍼티 (Data Property) : 키와 값으로 구성된 일반적인 프로퍼티다. 지금까지 살펴본 모든 프로퍼티는 데이터 프로퍼티다.
- 접근자 프로퍼티 (Accessor Property) : 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티다.

### 16.3.1 데이터 프로퍼티

### [[Value]] - Value
- 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값
- 프로퍼티 키를 통해 프로퍼티 값을 변경하면 [[value]]에 값을 재할당한다. 이때 프로퍼티가 없으면 프로퍼티를 동적 생성하고 생성된 프로퍼티의 [[Value]]에 값을 저장한다.

### [[Writable]] - writable
- 프로퍼티 값의 변경 가능 여부를 나타내며 불리언 값을 갖는다.
- [[Writable]]의 값이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없는 읽기 전용 프로퍼티가 된다.

### [[Enumerable]] - enumerable
- 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 갖는다.
- [[Enumerable]]의 값이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없는 읽기 전용 프로퍼티가 된다.

### [[Configurable]] - configurable
- 프로퍼티의 재정의 기능 여부를 나타내며 불리언 값을 갖는다.
- [[Configurable]]의 값이 false인 경우 해당 프로퍼티의 삭제, 프로퍼티 어트리뷰트 값의 변경이 금지된다. [[Writable]]이 true인 경우 [[Value]]의 변경과 [[Writable]]을 false로 변경하는 것은 허용된다.


```javascript
const person = {
	name: 'Lee'
};

console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// { value: "Lee", writable: true, enumerable: true, configurable: true}


const person2 = {
	name: "Lee2",
    isMale: true,
}

person2.age = 21;

console.log(Object.getOwnPropertyDescriptors(person2));

/*
{
	name: { value: "Lee2", writable: true, enumerable: true, configurable: true },
    isMale: { value: true, wirtable: true, enumerable: true, configurable: true },
    age: { value: 21, writable: true, enumerable: true, configurable: true }
}
*/
```

프로퍼티가 생성될 때 [[Value]]의 값은 프로퍼티 값으로 초기화되며 [[Writable]],[[Enumerable]],[[Configurable]]의 값은 true로 초기화된다. 이는 프로퍼티를 동적 추가해도 마찬가지다.

### 16.3.2 접근자 프로퍼티

접근자 프로퍼티는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할때 사용하는 접근자 함수로 구성된 프로퍼티다.

###  [[Get]] - get
데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수다. 즉, 접근자 프로퍼티 키로 프로퍼티 값을 접근하면 프로퍼티 어트리뷰트[[Get]]의 값, 즉 getter함수가 호출되고 그 결과가 프로퍼티 값으로 반환된다.

### [[Set]] - set
데이터 프로퍼티의 값을 저장할때 호출되는 접근자 함수다. 즉, 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 프로퍼티 어트리뷰트[[Set]]의 값, 즉 setter함수가 호출되고 그 결과가 프로퍼티 값으로 저장된다.

### [[Enumerable]] - enumerable
데이터 프로퍼티의 [[enumerable]]과 같다.

### [[Configurable]] - configurable
데이터 프로퍼티의 [[Configurable]]과 같다.

```javascript

const person = {
	firstName: 'Ungmo',
    lastName: 'Lee',
    
    get fullName() {
    	return this.firstName + ' ' + this.lastName;
    },
    
    set fullName(name) {
    	this.firstName = name.split(' ')[0];
        this.lastName = name.split(' ')[1];
    }
};

console.log(person.firstName + ' ' + person.lastName); // Ungmo Lee

person.fullName = 'Heegun Lee';

console.log(person); // { firstName: 'Heegun", lastName: "Lee" }

console.log(person.fullName); // Heegun Lee

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');

console.log(descriptor);
// { value: "Heegun", writable: true, enumerable: true, configurable: true }

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');

console.log(descriptor);
// {get: f, set: f, enumerable: true, configurable: true }

```

접근자 프로퍼티 fullName으로 프로퍼티 값에 접근하면 내부적으로 [[Get]] 내부 메서드가 호출되어 다음과 같이 동작한다.
1. 프로퍼티 키가 유효한지 확인한다. 프로퍼티 키는 문자열 또는 심벌이어야한다. 프로퍼티 키 "fullName"은 문자열이므로 유효한 프로퍼티 키다.
2. 프로포타입 체인에서 프로퍼티를 검색한다. person객체에 fullName 프로퍼티가 존재한다.
3. 검색된 fullName 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인한다. fullName프로퍼티는 접근자 프로퍼티다.
4. 접근자 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값, 즉 getter함수를 호출하여 그 결과를 반환한다. 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값은 Object.getOwnPropertyDescriptor 메서드가 반환하는 프로퍼티 디스크립터 객체의 get 프로퍼티 값과 같다.

<br>

#### 접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법은 다음과 같다.

```javascript

// 일반 객체의 __proto__는 접근자 프로퍼티다.
Object.getOwnPropertyDescriptor(Object.prototype,'__proto__')
// {enumerable: false, configurable: true, get: ƒ, set: ƒ}

// 함수 객체의 prototype은 데이터 프로퍼티다.
Object.getOwnPropertyDescriptor(function(){}, 'prototype')
// {value: {…}, writable: true, enumerable: false, configurable: false}

```

<br>

## 16.4 프로퍼티 정의

프로퍼티 값을 갱신 가능하도록 할것인지, 프로퍼티를 열거 가능하도록 할것인지, 프로퍼티를 재정의 가능하도록 할것인지 정의할 수 있다. 이를 통해 객체의 프로퍼티가 어떻게 동작해야 하는지 명확히 정의할 수 있다. <br>

Object.defineProperty 메서드를 사용하면 프로퍼티의 어트리뷰트를 정의할 수 있다. 인수로는 객체의 잠조와 데이터 프로퍼티의 키인 문자열, 프로퍼티 디스크립터 객체를 전달한다.

```javascript
const person = {};

// 데이터 프로퍼티 정의
Object.defineProperty(person, 'firstName', {
	value: 'Ungmo',
    writable: true,
    enumerable: true,
    configurable: true,
});

Object.defineProperty(person, 'lastName', {
	value: 'Lee'
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');

console.log('firstName', descriptor);
// firstName { value: "Ungmo", writable: true, enumerable: true, configurable: true }

// 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.
descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log(descriptor);
// lastName { value: "Lee", writable: false, enumerable: false, configurable: false }


// enumerable 값이 false인 경우 for ..in문이나 Object.keys 등으로 열거할 수 없다.
console.log(Object.keys(person)); // ["firstName"]

// writable값이 false인 경우 해당 프로퍼티 [[Value]]값을 변경할 수 없다. 이때 값을 변경하면 에러는 발생하지 않고 무시된다.
person.lastName = 'Kim';

// configurable값이 false인 경우 해당 프로퍼티를 삭제할 수 없다. 이때 프로퍼티를 삭제하면 에러는 발생하지 않고 무시된다.
delete person.lastName;

// configurable값이 false인 경우 해당 프로퍼티를 재정의할 수 없다. 
descriptor = Object.getOwnPropertyDescriptor(person, 'lastName')
console.log('lastName', descriptor);
// lastName { value: "Lee", writable: false, enumerable: false, configurable: false }


// 접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName', {
	get() {
    	return `${this.firstName} ${this.lastName}`;
    },
    
    set(name) {
    	[this.firstName, this.lastName] = name.split(' ');
    },
    
    enumerable: true,
    configurable: true
});

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log('fullName', descriptor);
// fullName { get: f, set: f, enumerable: true, configurable: true }

person.fullName = 'Heegun Lee';
console.log(person); // { firstName: "Heegun", lastName: "Lee" }

```

<br>

Object.defineProperty 메서드로 프로퍼티를 정의할 때 일부 생략 할 수 있다.<br>
생략했을 때의 기본값은 아래와 같다.

- value - undefined
- get - undefined
- set - undefined
- writable - false
- enumerable - false
- configurable - false

Object.defineProperty 메서드는 한번에 하나의 프로퍼티만 정의할 수 있다.<br>
Object.defineProperties 메서드를 사용하면 여러 개의 프로퍼티를 한 번에 정의할 수 있다.

```javascript

const person = {};

Object.defineProperties(person, {
    firstName : {
        value: "Ungmo",
        writable: true,
        enumerable: true,
        configurable: true
    },
    lastName : {
        value: "lee",
        writable: true,
        enumerable: true,
        configurable: true
    },

    fullName : {
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        set(name) {
            [this.firstName, this.lastName] = name.split(' ');
        },
        enumerable: true,
        configurable: true
    }
})

person.fullName = 'heegun Lee';
console.log(person);
// {firstName : 'heegun', lastName : 'Lee'}

```
<BR>

## 16.5 객체 변경 방지

객체는 변경 가능한 값이므로 재할당 없이 직접 변경할 수 있다. 즉 프로퍼티를 추가하거나 삭제할 수 있고, 프로퍼티 값을 갱신할 수 있으며, Object.defineProperty 또는 Object.defineProperties 메서드를 사용하여 프로퍼티 어트리뷰트를 재정의할 수도 있다.<br>
자바스크립트는 객체의 변경을 방지하는 다양한 메서드를 제공한다. 

### 16.5.1 객체 확장 금지
**Object.preventExtensions**<br>
객체의 확장을 금지한다.
확장이 금지된 객체는 프로퍼티 추가가 금지된다.<br>
확장이 가능한 객체인지 여부는 Object.isExtensible 메서드로 확인할 수 있다.

```javascript
const person = [ name: 'Lee', isMale: true };

console.log(Object.isExtensible(person)) // true

Object.preventExtensions(person);

console.log(Object.isExtensible(person)) // false

person.age = 20 // 무시. strict 모드에서는 에러
console.log(person); // { name: "Lee", isMale: true }

delete person.name;
console.log(person); // { isMale: true }

Object.defineProperty(person, 'age', { value: 20 });
// TypeError: Cannot define property age, object is not extensible

```
<BR>

### 16.5.2 객체 밀봉
**Object.seal**<br>
객체를 밀봉한다. 객체 밀봉이란 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 제정의 금지를 의미한다. 즉, 밀봉된 객체는 읽기와 쓰기만 가능하다.
밀봉된 객체인지 여부는 Object.isSealed 메서드로 확인할 수 있다.

```javascript

const person = { name: 'Lee', isMale: true };

console.log(Object.isSealed(person)); // false

Object.seal(person);

console.log(Object.isSealed(person)); // true

console.log(Object.getOwnPropertyDescriptors(person)); // configurable이 false다.
/*
{
	name: { value: "Lee", writable: true, enumerable: true, configurable: false }
    isMale: { value: true, writable: true, enumerable: true, configurable: false }
}
*/

person.age = 20; // 무시. strict 모드에서는 에러
console.log(person); // { name: "Lee", isMale: true }

delete person.name // 무시. strict 모드에서는 에러
console.log(person); // { name: "Lee", isMale: true }

person.name = 'Kim'; // 값 갱신은 가능하다.
console.log(person); // { name: "Kim", isMale: true }

Object.defineProperty(person, 'name', { configurable: true });
// TypeError: Cannot redefine property: name

```
<br>

### 16.5.3 객체 동결
**Object.freeze**<br>
프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지, 프로퍼티 값 갱신 금지를 의미한다. 즉, 동결된 객체는 읽기만 가능하다.
동결된 객체인지 여부는 Object.isFrozen 메서드로 확인할 수 있다.

```javascript

const person = { name: 'Lee' };

console.log(Object.isFrozen(person)); // false

Object.freeze(person);

console.log(Object.isFrozen(person)); // true

console.log(Object.getOwnPropertyDescriptors(person)); // writable, configurable이 false다
/*
{
	name: { value: "Lee", writable: false, enumerable: true, configurable: false },
    isMale: { value: true, writable: false, enumerable: true, configurable: false }
}
*/

person.age = 20; // 무시. strict 모드에서는 에러
console.log(person); // { name: "Lee", isMale: true }

delete person.name; // 무시. strict 모드에서는 에러
console.log(person); // { name: "Lee", isMale: true }

person.name = 'Kim'; // 무시. strict 모드에서는 에러
console.log(person); // { name: "Lee", isMale: true }

Object.defineProperty(person, 'name', { configurable: true });
// TypeError: Cannot redefine property: name

```
<br>


### 16.5.4 불변 객체

지금까지 살펴본 변경 방지 메서드들은 얕은 변경 방지로 직속 프로퍼티만 변경이 방지되고 중첩 객체까지는 영향을 주지는 못한다. 따라서 Object.freeze 메서드로 객체를 동결하여도 중첩 객체까지 동결할 수 없다. 객체의 중첩 객체까지 동결하여 변경이 불가능한 읽기 전용의 불변 객체를 구현하려면 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 Object.freeze 메서드를 호출해야 한다.

```javascript
const person = {
	name: 'Lee',
    isMale: true,
    address: {
    	city: 'Seoul'
    }
};

Object.freeze(person);

console.log(Object.isFrozen(person)); // true 직속 프로퍼티만 동결
console.log(Object.isFrozen(person.address)); // false 중첩 객체까지 동결하지 못한다.

person.address.city = 'Busan';
console.log(person); // { name: "Lee", isMale: true, address: { city: "Busan" }}


person.address.city = 'Seoul';

function deepFreeze(target) {
    // 객체가 아니거나 동결된 객체는 무시하고 객체이고 동결되지 않은 객체만 동결한다.
	if (target && typeof target === 'object' && !Object.isFrozen(target)) {
    	Object.freeze(target);
        
        // 모든 프로퍼티를 순회하며 재귀적으로 동결한다.
        const keys = Object.keys(target); // ['name', 'isMale', 'address']
        const keyLength = key.length; // 3
        for (let i = 0; i < keyLength; i++) {
        	deepFreeze(target[key]));
        }
    }
    
    return target;
}

deepFreeze(person);

console.log(Object.isFrozen(person)); // true
console.log(Object.isFrozen(person.address)); // true

person.address.city = 'Busan';
console.log(person); // { name: "Lee", isMale: true, address: { city: "Seoul" }}


```
