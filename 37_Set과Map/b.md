# 37장. `Set`과 `Map`

**목차**
- 37장. `Set`과 `Map`
  - [37.1 `Set`](#371-set)
    - [37.1.1 `Set` 객체의 생성](#3711-set-객체의-생성)
    - [37.1.2 요소 개수 확인](#3712-요소-개수-확인)
    - [37.1.3 요소 추가](#3713-요소-추가)
    - [37.1.4 요소 존재 여부 확인](#3714-요소-존재-여부-확인)
    - [37.1.5 요소 삭제](#3715-요소-삭제)
    - [37.1.6 요소 일괄 삭제](#3716-요소-일괄-삭제)
    - [37.1.7 요소 순회](#3717-요소-순회)
    - [37.1.8 집합 연산](#3718-집합-연산)
  - [37.2 `Map`](#372-map)
    - [37.2.1 `Map` 객체의 생성](#3721-map-객체의-생성)
    - [37.2.2 요소 개수 확인](#3722-요소-개수-확인)
    - [37.2.3 요소 추가](#3723-요소-추가)
    - [37.2.4 요소 취득](#3724-요소-취득)
    - [37.2.5 요소 존재 여부 확인](#3725-요소-존재-여부-확인)
    - [37.2.6 요소 삭제](#3726-요소-삭제)
    - [37.2.7 요소 일괄 삭제](#3727-요소-일괄-삭제)
    - [37.2.8 요소 순회](#3728-요소-순회)
  - [`Set` 과 `Map` 비교](#set-과-map-비교)


"Set"과 "Map" 데이터 구조를 사용하여 수정된 배열이나 객체 집합과 관련하여 고유한 값의 집합과 키-값 쌍을 저장할 수 있습니다.

```jsx
// Set을 생성하고 값들을 추가합니다
const exampleSet = new Set();
exampleSet.add(1);
exampleSet.add(2);
exampleSet.add(3);

// 값들을 확인합니다
console.log(exampleSet.has(2)); // true
console.log(exampleSet.has(4)); // false

// Set의 크기를 가져옵니다
console.log(exampleSet.size); // 3

// 모든 값을 루프로 순회합니다
exampleSet.forEach((value) => {
  console.log(value);
});

// Map을 생성하고 값들을 추가합니다
const exampleMap = new Map();
exampleMap.set("name", "B");
exampleMap.set("age", 30);
exampleMap.set("isStudent", true);

// 키를 통해 값들에 접근합니다
console.log(exampleMap.get("name")); // "B"
console.log(exampleMap.get("age")); // 30
console.log(exampleMap.get("isStudent")); // true

// Map의 크기를 가져옵니다
console.log(exampleMap.size); // 3

// 모든 키-값 쌍을 루프로 순회합니다
exampleMap.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
```

1. `Set` (집합): 
   - JavaScript `Set`은 고유한 값의 컬렉션을 유지하기 위해 사용됩니다. 따라서 Set에 동일한 값을 여러 번 추가하려고 하더라도 한 번만 추가됩니다. Set의 주요 특징은 중복 요소를 허용하지 않는다는 것입니다.
2. `Map` (맵): 
   - JavaScript `Map`은 키-값 쌍을 저장하기 위해 사용됩니다. 이 구조의 주요 특징은 다른 유형의 키를 사용하여 값을 연결할 수 있다는 것입니다.



## 37.1 `Set`
- `Set`은 자바스크립트의 내장 객체로, 고유한 값들의 컬렉션을 저장하며 중복된 값은 허용하지 않습니다.
-  `Set`은 자바스크립트에서 고유한 값을 관리하기 위한 유용한 데이터 구조입니다.
-  요소의 개수 확인, 추가, 존재 여부 확인, 삭제, 순회 등의 기능을 제공하며, 집합 연산은 배열과 같은 다른 자료 구조로 변환한 뒤에 수행할 수 있습니다.

### 37.1.1 `Set` 객체의 생성
- `Set` 객체는 `new Set()` 생성자를 사용하여 생성합니다. 초기 값을 가진 이터러블(예: 배열)을 전달하거나, 나중에 `add()` 메소드를 사용하여 요소를 추가할 수 있습니다.

```jsx
// Set 생성
const exampleSet = new Set(); // 빈 Set 생성
const exampleSetWithInitialValues = new Set([1, 2, 3]); // 초기 값을 가진 Set 생성
```

### 37.1.2 요소 개수 확인
- `Set` 객체의 요소 개수를 확인하기 위해 `size` 프로퍼티를 사용합니다.

```jsx
// Set의 요소 개수 확인
console.log(exampleSet.size); // 0 (빈 Set의 크기)
```

### 37.1.3 요소 추가
- `add()` 메소드를 사용하여 `Set`에 요소를 추가할 수 있습니다. 중복된 값은 무시됩니다.

```jsx
// Set에 요소 추가
exampleSet.add(1);
exampleSet.add(2);
exampleSet.add(3);
```

### 37.1.4 요소 존재 여부 확인
- `has()` 메소드를 사용하여 특정 값이 `Set`에 존재하는지 확인할 수 있습니다. 존재하면 `true`, 존재하지 않으면 `false`를 반환합니다.

```jsx
// Set에 값이 존재하는지 확인
console.log(exampleSet.has(2)); // true
console.log(exampleSet.has(4)); // false
```

### 37.1.5 요소 삭제
- `delete()` 메소드를 사용하여 `Set`에서 특정 요소를 삭제할 수 있습니다. 값이 `Set`에 존재하면 삭제되고, 삭제 성공 여부에 따라 `true` 또는 `false`를 반환합니다.

```jsx
// Set에서 요소 삭제
exampleSet.delete(1); // Set에서 값 1을 삭제
console.log(exampleSet.size); // 2
```

### 37.1.6 요소 일괄 삭제
- `clear()` 메소드를 사용하여 `Set`에서 모든 요소를 일괄적으로 삭제할 수 있습니다.

```jsx
// Set 비우기
exampleSet.clear(); // Set 에서 모든 요소를 삭제
console.log(exampleSet.size) // 0
```

### 37.1.7 요소 순회
- `Set`은 반복 가능한(iterable) 객체이므로 `forEach`, `for...of` 루프 등을 사용하여 요소들을 순회할 수 있습니다.

```jsx

const exampleSet = new Set([1, 2, 3]);

// forEach 메소드를 사용하여 Set의 요소들을 순회
exampleSet.forEach((value) => {
  console.log(value);
});
// 1
// 2
// 3

// for...of 루프를 사용하여 Set의 요소들을 순회
for (const value of exampleSet) {
  console.log(value);
}
// 1
// 2
// 3
```

### 37.1.8 집합 연산
- `Set`은 집합 연산을 위해 교집합, 합집합, 차집합 등의 메소드를 제공하지는 않지만, 배열과 같은 다른 자료 구조로 변환한 뒤에 집합 연산을 수행할 수 있습니다.

```jsx
const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

// Set을 배열로 변환
const arrayA = [...setA];
const arrayB = [...setB];

// 집합 연산 수행 (교집합, 합집합, 차집합)
const intersection = arrayA.filter((value) => arrayB.includes(value)); // 교집합
const union = new Set([...arrayA, ...arrayB]); // 합집합 (중복된 값은 하나만 유지됨)
const difference = arrayA.filter((value) => !arrayB.includes(value)); // 차집합

console.log("교집합:", intersection); // [3]
console.log("합집합:", union); // Set { 1, 2, 3, 4, 5 }
console.log("차집합:", difference); // [1, 2]
```

<br>

## 37.2 `Map`
### 37.2.1 `Map` 객체의 생성
### 37.2.2 요소 개수 확인
### 37.2.3 요소 추가
### 37.2.4 요소 취득
### 37.2.5 요소 존재 여부 확인
### 37.2.6 요소 삭제
### 37.2.7 요소 일괄 삭제
### 37.2.8 요소 순회


<br>

## `Set` 과 `Map` 비교

```jsx
// Set과 Map을 사용하여 고유 방문자와 방문 횟수 추적
const uniqueVisitors = new Set();
const visitCounts = new Map();

// 웹사이트 방문 시뮬레이션
function visitWebsite(visitorId) {
  // 방문자를 uniqueVisitors Set에 추가합니다.
  uniqueVisitors.add(visitorId);

  // visitCounts Map을 업데이트합니다.
  if (visitCounts.has(visitorId)) {
    const currentCount = visitCounts.get(visitorId);
    visitCounts.set(visitorId, currentCount + 1);
  } else {
    visitCounts.set(visitorId, 1);
  }
}

// 웹사이트 방문 시뮬레이션
visitWebsite(1001);
visitWebsite(1002);
visitWebsite(1001);
visitWebsite(1003);
visitWebsite(1002);
visitWebsite(1002);

// 결과 출력
console.log("고유 방문자:", uniqueVisitors); // Set { 1001, 1002, 1003 }
console.log("방문 횟수:", visitCounts); // Map { 1001 => 2, 1002 => 3, 1003 => 1 }
```

1. **목적**:
   - `Set`: `Set`은 고유한 값들의 컬렉션으로, 각 값은 한 번만 나타납니다. 고유한 요소의 목록을 유지하고 해당 컬렉션에 특정 요소가 있는지 빠르게 확인해야 할 때 사용합니다.
   - `Map`: `Map`은 키-값 쌍들의 컬렉션으로, 각 키는 특정 값과 연관되어 있습니다. 키에 기반하여 값을 빠르고 효율적으로 검색해야 할 때 사용합니다.

2. **데이터 저장**:
   - `Set`: 개별 값들을 저장합니다.
   - `Map`: 키-값 쌍들을 저장합니다.

3. **중복 값**:
   - `Set`: 중복된 요소들을 자동으로 제거하며, 각 값은 `Set` 내에서 고유합니다.
   - `Map`: 중복된 키는 제거하지 않으며, 각 키는 `Map` 내에서 고유하지만 서로 다른 키들이 동일한 값을 가리킬 수 있습니다.

4. **요소 접근**:
   - `Set`: `Set` 내의 요소들은 해당 값으로 직접 접근합니다. `Set` 내의 요소들에는 키가 연관되어 있지 않습니다.
   - `Map`: `Map` 내의 요소들은 해당 키를 통해 접근하며, 이는 값을 빠르고 효율적으로 검색할 수 있게 합니다.

5. **반복**:
   - `Set`: `forEach`, `for...of`, 또는 `forEach` 메소드를 사용하여 반복할 수 있습니다.
   - `Map`: `forEach`, `for...of`, 또는 `forEach` 메소드를 사용하여 반복할 수 있으며, 키, 값 또는 키-값 쌍으로 직접 반복할 수도 있습니다.

6. **크기**:
   - `Set`: `Set`의 크기(요소의 개수)는 size 속성을 사용하여 얻을 수 있습니다.
   - `Map`: `Map`의 크기(키-값 쌍의 개수)는 size 속성을 사용하여 얻을 수 있습니다.
