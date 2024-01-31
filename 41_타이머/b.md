# 41장 타이머

<br>

- [41장 타이머](#41장-타이머)
  - [41-1. 호출 스케줄링(Scheduling a call)](#41-1-호출-스케줄링scheduling-a-call)
  - [타이머 생성 함수](#타이머-생성-함수)
  - [타이머 제거 함수](#타이머-제거-함수)
  - [41-2. 타이머 함수](#41-2-타이머-함수)
  - [41-2..1 `setTimeout` / `clearTimeout`](#41-21-settimeout--cleartimeout)
  - [41-2..2 `setInterval` / `clearInterval`](#41-22-setinterval--clearinterval)
  - [41-3. 디바운스와 스로틀](#41-3-디바운스와-스로틀)
  - [41-3..1 디바운스](#41-31-디바운스)
  - [41-3..2 스로틀](#41-32-스로틀)

<br>

## 41-1. 호출 스케줄링(Scheduling a call)

<u>호출 스케줄링(Scheduling a call)은 JavaScript에서 특정 함수나 코드 블록을 즉시 실행하지 않고, 지정된 시간이 지난 후에 실행하도록 예약하는 것을 의미합니다.</u>

## 타이머 생성 함수

| 함수 이름     | 설명                                             | 사용 예시                                   |
| ------------- | ------------------------------------------------ | ------------------------------------------- |
| `setTimeout`  | 일정 시간이 지난 후에 함수를 한 번만 실행합니다. | `let timerId = setTimeout(함수, 지연시간);` |
| `setInterval` | 지정된 시간 간격으로 함수를 반복 실행합니다.     | `let intervalId = setInterval(함수, 간격);` |

```javascript
// setTimeout 함수를 사용하여
// 커피 주문 후 일정 시간이 지난 뒤에 커피가 준비되었다는
// 메시지를 출력하도록 스케줄링합니다.
/**
 *
 * @param {string} coffee
 * @param {number} order
 * @param {number} callback
 *
 * @returns {void}
 */
function orderCoffee(coffee, order, callback) {
  setTimeout(callback, order * 1000, coffee);
}

orderCoffee("아메리카노", 3, (coffee) => {
  console.log(`${coffee}가 준비되었습니다!`);
});
```

```javascript
// setInterval 함수를 사용하여
// 1초 간격으로 현재 시각을 출력하도록 스케줄링합니다.
/**
 *
 * @param {number} callback
 *
 * @returns {void}
 */
function showCurrentTime(callback) {
  setInterval(callback, 1000);
}

showCurrentTime(() => {
  const now = new Date();
  console.log(
    `${now.getHours()}시 ${now.getMinutes()}분 ${now.getSeconds()}초`
  );
});
```

## 타이머 제거 함수

| 함수 이름       | 설명                                         | 사용 예시                    |
| --------------- | -------------------------------------------- | ---------------------------- |
| `clearTimeout`  | `setTimeout`으로 설정된 타이머를 제거합니다. | `clearTimeout(timerId);`     |
| `clearInterval` | `setInterval`로 설정된 타이머를 제거합니다.  | `clearInterval(intervalId);` |

```javascript
// setTimeout 함수를 사용하여
// 커피 주문 후 일정 시간이 지난 뒤에 커피가 준비되었다는
// 메시지를 출력하도록 스케줄링합니다.
/**
 *
 * @param {string} coffee
 * @param {number} order
 * @param {number} callback
 *
 * @returns {void}
 */
function orderCoffee(coffee, order, callback) {
  setTimeout(callback, order * 1000, coffee);
}

const coffeeOrder = orderCoffee("아메리카노", 3, (coffee) => {
  console.log(`${coffee}가 준비되었습니다!`);
});

// 커피 주문을 취소합니다.
if (coffeeOrder) {
  clearTimeout(coffeeOrder);
}
```

```javascript
// setInterval 함수를 사용하여
// 1초 간격으로 현재 시각을 출력하도록 스케줄링합니다.
/**
 *
 * @param {number} callback
 *
 * @returns {void}
 */
function showCurrentTime(callback) {
  setInterval(callback, 1000);

  // 10초 후에 showCurrentTime 함수를 중단합니다.
  setTimeout(() => {
    clearInterval(intervalId);
  }, 10000);
}

const intervalId = showCurrentTime(() => {
  const now = new Date();
  console.log(
    `${now.getHours()}시 ${now.getMinutes()}분 ${now.getSeconds()}초`
  );
});
```

<br>

## 41-2. 타이머 함수

<br>

## 41-2..1 `setTimeout` / `clearTimeout`

<br>

## 41-2..2 `setInterval` / `clearInterval`

<br>

## 41-3. 디바운스와 스로틀

<br>

## 41-3..1 디바운스

<br>

## 41-3..2 스로틀

```

```
