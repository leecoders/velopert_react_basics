# 알게된 내용

## #3

### `return`되는 JSX 태그가 여러 개이면, 반드시 하나의 태그로 감싸져 있어야 한다.

**예시**

```javascript
import React, { Component, Fragment } from "react";

class App extends Component {
  render() {
    return (
      <div>
        <div>Hello</div>
        <div>Bye</div>
      </div>
    );
  }
}
export default App;
```

- 하지만 단순히 감싸기 위해서 `<div>` 를 사용하는게 맘에들지 않을 수도 있다. 예를 들어, 스타일 관련 설정을 하면서 코드가 꼬이게 될 수도 있고, table 관련 태그를 작성 할 때 번거로워질 수도 있다.
  - 그런 상황에서 `<Fragment>`라는 태그로 감싸는 방법이 있다.
  - (수정) 그냥 `<Fragment>`는 안되고 `<React.Fragment>`로 사용해야 한다고 함.
  - (추가) `key`등의 prop을 사용할 필요가 없는 경우 익명의 Fragments 문법인 `<>...</>`로 사용이 가능하다고 함 [react.js 문서 참고](https://ko.reactjs.org/docs/fragments.html)

### 조건부 렌더링

- `삼항 연산자` : 보통의 경우, true 일 때와 false 일 때 다른것들을 보여주고 싶을 때 사용한다.

```javascript
class App extends Component {
  render() {
    return <div>{1 + 1 === 2 ? <div>맞아요!</div> : <div>틀려요!</div>}</div>;
  }
}
```

- `AND 연산자` : 단순히 조건이 true 일 때만 보여주고 false 경우 아무것도 보여주고 싶지 않을 때 사용한다.

```javascript
class App extends Component {
  render() {
    return <div>{1 + 1 === 2 && <div>맞아요!</div>}</div>;
  }
}
```

> short circuit 특성에 의해 first half가 true일 때만 second half로 넘어가는 것을 이용하는 방법이라고 할 수 있다.

- `IIFE(즉시 실행 함수 표현)` : 이외에 좀 더 복잡한 분기가 필요할 때

```javascript
class App extends Component {
  render() {
    const value = 1;
    return (
      <div>
        {(() => {
          if (value === 1) return <div>하나</div>;
          if (value === 2) return <div>둘</div>;
          if (value === 3) return <div>셋</div>;
        })()}
      </div>
    );
  }
}
```

### JSX에서 style을 지정하는 두 가지 방법

1. JS 문법으로 style 객체를 생성해서 지정하는 방법(HTML과 다른 점)

```javascript
class App extends Component {
  render() {
    const style = {
      backgroundColor: "black",
      padding: "16px",
      color: "white",
      fontSize: "12px"
    };

    return <div style={style}>hi there</div>;
  }
}
```

- 만든 style 객체를 `<div>` 태그의 `style` prop에 지정한다.

2. CSS 파일 생성, className을 사용해서 지정하는 방법

App.js

```javascript
class App extends Component {
  render() {
    return <div className="App">리액트</div>;
  }
}
```

App.css

```css
.App {
  background: black;
  color: aqua;
  font-size: 36px;
  padding: 1rem;
  font-weight: 600;
}
```

### 주석

- JSX 내에서 JS 문법을 사용하기 위해서는 `{}`로 감싸야 했다. 마찬가지로 JSX 내에서 주석을 넣기 위해서는 `{/* ... */}` 처럼 사용할 수 있다.

## #4

### `props`는 부모 컴포넌트가 자식 컴포넌트에게 주는 값

**부모 컴포넌트에서 자식 컴포넌트로 props 보내고 받기**

자식 컴포넌트(받는 쪽)

```javascript
import React, { Component } from "react";

class MyName extends Component {
  render() {
    return (
      <div>
        안녕하세요! 제 이름은 <b>{this.props.name}</b> 입니다.
      </div>
    );
  }
}

export default MyName;
```

부모 컴포넌트(주는 쪽)

```javascript
import React, { Component } from "react";
import MyName from "./MyName";

class App extends Component {
  render() {
    return <MyName name="리액트" />;
  }
}

export default App;
```

- 부모 컴포넌트에서는 자식 컴포넌트를 호출하면서 props를 전달한다.
- 자식 컴포넌트에서는 `this.props` 객체를 기본값으로 사용할 수 있고 전달 받은 props 이름과 매칭되는 프로퍼티를 꺼내 쓸 수 있다.

### defaultProps

- 실수로 props를 빠트릴 때, 또는 props를 일부러 비우는 경우 props의 기본값을 지정하여 `props를 넘겨 받지 못했을 때`에 꺼내 쓸 수 있다.

```javascript
class MyName extends Component {
  static defaultProps = {
    name: "기본이름"
  };
  render() {
    return (
      <div>
        안녕하세요! 제 이름은 <b>{this.props.name}</b> 입니다.
      </div>
    );
  }
}
```

```javascript
MyName.defaultProps = {
  name: "기본이름"
};
```

- 위와 같은 방식으로 사용해도 된다.

### 함수형 컴포넌트

- 컴포넌트에 `state`와 `LifeCycle`이 필요하지 않은 경우 단순한 문법으로 사용할 수 있는 방법
- 단순히 props를 받아서 출력하는 용도일 때 사용한다.

```javascript
const MyName = ({ name }) => {
  return <div>안녕하세요! 제 이름은 {name} 입니다.</div>;
};
```

### `state`는 동적인 데이터를 다루기 위해 사용되며, 컴포넌트 내부에서 선언하며 내부에서 값을 변경 할 수 있다.

- `class fields` 문법을 사용해야 한다.
- 값을 변경할 때는 그냥 변경하는 방법은 유효하지 않다.
  - React는 값이 변했을 때 View를 다시 그려주는(render 호출) 프론트엔드 라이브러리이지만, 단순히 값이 변했다고 해서 render를 호출하지는 않는다.
- `setState`를 사용하여 변경된 값들에 대한 새로운 객체를 만들어서 전달하면 내부적으로 해당되는 값들을 비교해서 변경(변경되지 않은 값은 지워지지 않음)한 후 render를 다시 호출하여 View가 갱신된다.

```javascript
import React, { Component } from "react";

class Counter extends Component {
  state = {
    number: 0
  };

  handleIncrease = () => {
    this.setState({
      number: this.state.number + 1
    });
  };

  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1
    });
  };

  render() {
    return (
      <div>
        <h1>카운터</h1>
        <div>값: {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;
```

- 하지만 `setState`는 객체의 깊숙한 곳까지 확인하지는 못한다.
  - 예를 들어, 변경하고자 하는 state의 prop이 `객체`인 경우 그 `객체`의 내부 props까지 알아서 비교하고 수정된 부분을 찾아서 추가하지는 않는다. 단지 새로운 객체로 덮어써 버린다.

```javascript
state = {
  number: 0,
  foo: {
    bar: 0,
    foobar: 1
  }
};
```

위와 같은 state가 존재할 때

```javascript
this.setState({
  foo: {
    foobar: 2
  }
});
```

이 경우에서는, 위와 같이 `setState`에 `foo` 객체의 수정을 시도할 때 `foobar`만을 찾아서 수정하고 기대했던 것처럼 `bar`는 그대로 남아있지는 않는다. 객체 state는 덮어 씌워진다.

```javascript
this.setState({
  number: 0,
  foo: {
    ...this.state.foo,
    foobar: 2
  }
});
```

위와 같이 `...`라는 JS의 문법인 `전개연산자`(또는 `전개 구문`)를 사용하면 해결할 수는 있다.

> 이렇게 하면 새로운 객체에 `foobar` prop이 두 번 정의되는데 어떻게 가능할까?

```javascript
const obj = {
  name: "old",
  name: "new"
};
console.log(obj); // {name: "new"}
```

위와 같이 같은 이름의 prop이 두 번 정의되면 마지막 값으로 결정된다!

> `전개 구문`은 배열에만 사용하는 것이 아니었나?

객체에서도 사용할 수 있다!

```javascript
const obj1 = { x: 1, y: 2 };
console.log(...obj1); // Error!
```

다만 위의 방식처럼 사용할 수는 없다! (iterator에 관련된 에러 메시지 출력)

이렇게 해야된다.

```javascript
const obj1 = { x: 1, y: 2 };
const obj2 = { ...obj1, z: 3 };
console.log(obj2);
```

객체의 prop들에 순차적으로 접근하여 다른 객체 내부에서 할당할 때(?)만 사용가능 한 것 같다.. (추가 공부가 필요함)

**`setState` 내에서 외부 state에 의존하지 않는 좋은 방법**

위에서 값을 변경하는 아래와 같은 코드를 봤다.

```javascript
this.setState({
  number: this.state.number + 1
});
```

위의 코드는 `setState` 내에서 `state`의 값에 의존하는 경향이 있다. 크게 상관은 없지만 더 나은 ES6 문법을 사용할 수 있다.

```javascript
this.setState(state => ({
  number: state.number
}));
```

`비구조화 할당` 문법을 사용하면 더 깔끔하게 처리할 수도 있다.

```javascript
this.setState(({ number }) => ({
  number: number + 1
}));
```

- 객체에서 해당되는 프로퍼티 값을 직접 받아내는 것이 가능하다.

### 버튼에 이벤트 설정하기

HTML 방식

```javascript
<button onclick="alert('hello');">Click Me</button>
```

JSX 방식

```javascript
<button onClick={this.handleDecrease}>-</button>
```

- HTML과 다른 점
  1. 이벤트 이름을 설정 할 때 camelCase 로 설정해야 한다. (`onclick` -> `onClick`, `onmousedown` -> `onMouseDown`)
  2. JSX 내에서 JS 함수를 전달해야 하니 `{}`로 감싼다.
  3. 실행할 함수를 전달할 때 HTML 처럼 `즉시 실행`형태로 전달하지 않는다.
     > React의 특성상 렌더링 -> 함수 호출 -> setState -> 렌더링 -> 함수 호출 -> 무한반복.. 하게 된다.

## #5

리액트 컴포넌트가 사용될 때 각 상황에 따라(각 타이밍에 따라) 호출되는 LifeCycle API가 존재한다.
<br>

### constructor

- 최초 `render` 이전에, 컴포넌트가 생성될 때 1회 호출된다.

### componentDidMount

- 컴포넌트가 화면에 mount(최초로 render)되었을 때 호출된다.
- `render` 이후에 호출된다. (리렌더링 후에는 호출되지 않음!!)

### componentDidUpdate

- 컴포넌트가 다시 render되었을 때 호출된다.
- `render` 이후에 호출된다. (mount - 최초 render되었을 때는 호출되지 않음!!)

## #6 전화번호부 프로젝트 시작

### `onChange`는 데이터 변경 이벤트 처리를 위한 prop

- `prop`으로 함수를 등록하면 이벤트 발생 시 `이벤트 객체`가 이벤트에 등록된 함수의 인자로 넘어간다.

### form 태그의 `action` prop은 페이지 이동, `onSubmit` prop은 submit 이벤트 발생 시 실행할 함수 등록

- React에서는 데이터 변경 시 페이지 이동 또는 새로고침이 아니기 때문에 `onSubmit`을 사용해야 한다.
- `e.preventDefault()` : form 에서 submit 이 발생하면 페이지를 다시 불러오게 되는데, 그렇게 되면 현재 페이지가 지니고있는 상태를 잃어버리게 되기 때문에 이를 통해서 방지해주었습니다.

### 자식 컴포넌트 -> 부모 컴포넌트 데이터 이동하는 방법

1. 부모 컴포넌트에 파라미터가 지정된 함수를 정의하고 자식 컴포넌트를 호출하며 `props`로 함수 객체를 전달한다.
2. 자식 컴포넌트에서는 `this.props`로 넘겨 받은 부모 컴포넌트의 함수에 인자를 전달하며 호출한다.
3. 부모 컴포넌트의 함수가 실행된다.

## #7 배열 다루기

### 불변성 유지

> React에서 불변성 유지가 필요한 이유는 불변성을 유지해야 모든 것들이 적절한 상황에 리렌더링되도록 설계할 수 있기 때문이다. 또한 이것들이 나중에 성능 최적화에 큰 영향을 미친다.

- React에서는 state 내부의 값을 직접적으로 수정하면 절대로 안된다.
  - `Array.prototype`의 배열을 수정하는 함수들은 배열 내부의 값을 직접적으로 수정하기 때문에 사용할 수 없다.

### `전개 구문`과 `Rest 파라미터`를 헷갈리지 말자

> `전개 구문`은 전달(또는 출력)할 때 spread! `Rest 파라미터`는 전달받을(또는 입력) 때 spread!

- 앞에서 `전개 연산자`(또는 `spread 연산자`)라고 설명했던 `...`는 인자를 전달 받는 함수의 `Rest 파라미터`와 비슷하다.
  - `Rest 파라미터`를 사용하면 함수의 파라미터로 오는 값들을 `배열`로 전달받을 수 있다.
  ```javascript
  function foo(num1, num2, ...data) {
    console.log(data); // [3, 4, 5]
  }
  foo(1, 2, 3, 4, 5);
  ```
  - 아래와 같이 사용할 수도 있다.
  ```javascript
  let num1, num2, data;
  [num1, num2, ...data] = [1, 2, 3, 4, 5];
  console.log(data); // [3, 4, 5];
  ```
  - `전개 연산자`는 배열의 가장 바깥 bracket을 제거하여 전개해준다.
  ```javascript
  const data = [1, 2, 3, 4, 5];
  console.log(...data); // 1 2 3 4 5
  ```
  - 아래와 같이 사용할 수도 있다.
  ```javascript
  function foo(a, b, c) {
    const x = a;
    const y = b;
    const z = c;
    console.log(x, y, z); // 1 2 3
  }
  foo(...[1, 2, 3]); // 1 2 3 으로 전개되어 세 개의 인자가 전달된다.
  ```
- 아무튼, 아래 코드에서는 `전개 구문`의 여러 case들 중에서 앞에서 설명했던 `객체에 순차적으로 접근하여 새로운 객체에 할당`의 방식이 적용된 것을 알 수 있다.

```javascript
handleCreate = data => {
  const { information } = this.state;
  this.setState({
    information: information.concat({ id: this.id++, ...data })
  });
};
```

화살표 함수의 파라미터로 전달된 `data`는 `PhoneForm` 컴포넌트의 `state` 객체이다. `...`를 사용해 이 객체를 순차 접근하여 새로운 객체에 할당하는 것을 알 수 있다.

### 클래스 내부 변수 선언이 가능하다.

```javascript
class App extends Component {
  id = 2
  state = {
    information: [
      {
        id: 0,
        name: '김민준',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: '홍길동',
        phone: '010-0000-0001'
      }
    ]
  }
...
```

- 위의 코드처럼 컴포넌트 내부에서는 필요하지만 화면에 렌더링될 필요는 없는 것은 `클래스 내부 변수`로 선언하여 사용한다.

### PhoneInfo: 각 전화번호 정보를 보여주는 컴포넌트

```javascript
class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: "이름",
      phone: "010-0000-0000",
      id: 0
    }
  };

  render() {
    const style = {
      border: "1px solid black",
      padding: "8px",
      margin: "8px"
    };

    const { name, phone, id } = this.props.info; // info가 undefined일 수도 있다.

    return (
      <div style={style}>
        <div>
          <b>{name}</b>
        </div>
        <div>{phone}</div>
      </div>
    );
  }
}
```

- `비구조화 할당` 시에 `his.props.info`의 값이 `undefined`이면 에러 가능성이 있기 때문에 `static defaultProps`을 지정한다.
- `style 객체`를 `<div>`태그의 `style prop`으로 전달하여 CSS를 지정한다.

### PhoneInfoList : 여러 개의 PhoneInfo 컴포넌트들을 보여주는 컴포넌트

- `하나의 컴포넌트에서 여러 개의 자식 컴포넌트를 호출할 때`는 `map`을 사용해서 접근하면 되고, 호출되는 각 컴포넌트들은 React가 구분할 수 있어야 하기 때문에 고유의 `key` prop을 지정해야 한다.
  - 보통의 경우 고유 `id`를 부여하지만 존재하지 않는 경우 `map` 콜백의 두 번째 파라미터인 `index`를 `key` prop으로 지정하는 방법이 있다.

## #8 배열 다루기 (2) 제거와 수정

### `slice`와 `splice`

```javascript
let arr1 = [1, 2, 3, 4, 5];
let arr2 = arr1.slice(3, 5);
console.log(arr1); // [1, 2, 3, 4, 5]
console.log(arr2); // [4, 5]
```

- `slice`는 `반 열린구간`을 지정하여 배열을 반환하는 함수이다. 위의 예시에서는 `[3, 5) 구간`의 값으로 배열을 반환한다.
- `slice`의 target인 `arr1`은 변하지 않는다.

```javascript
let arr1 = [1, 2, 3, 4, 5];
let arr2 = arr1.splice(2, 2);
console.log(arr1); // [1, 2, 5]
console.log(arr2); // [3, 4]
```

- `splice`는 `(startIndex, length)`를 입력 받아 `length` 크기 만큼 배열을 반환한다.
- `splice`의 target인 `arr1`은 destination인 `arr2`만큼 제거된다.

### `slice`와 `concat`

- 이 둘을 활용해서 각 구간을 잘라서 합칠 수 있다.

### `filter`의 활용

- `Array.prototype.filter`는 filter를 통과(`true`가 `return`)되는 요소들만을 배열로 반환하는 함수이다.
- 이를 활용해서 조건에 맞지 않는(`false`가 `return`)배열 요소를 제거할 수 있다.

### 전화번호 제거

- `전화번호부`라는 루트 컴포넌트(?)에 속한 데이터를 `전화번호 목록 1개`라는 최하위 컴포넌트에 의해 수정해야 한다.
  - `수정의 대상`과 `기능의 동작`이 서로 다른 컴포넌트에서 이루어진다.
    - `수정의 대상`은 `App`의 데이터
    - `기능의 동작`은 `PhoneInfo`의 함수 실행
  - 이러한 경우에, `수정의 대상`이 존재하는 컴포넌트에서 함수를 정의하고 `기능의 동작`이 존재하는 컴포넌트까지 `props`로 넘겨 받아서 사용해야 한다.

### Computed property names

- 표현식(변수, 함수 등 모두 가능)을 통해 key를 지정하는 방법

```javascript
handleChange = e => {
  const { name, value } = e.target;
  this.setState({
    [name]: value // Computed property names : 표현식(변수, 함수 등 모두 가능)을 통해 key를 지정하는 방법
  });
};
```

위 코드에서는 `name`이 변수이기 때문에 `setState`에 넘겨줄 객체의 `key`로 지정할 수 없다. 이를 해결하기 위해 ES6 문법으로 `Computed property names`가 등장했다. `[]` 안에 변수나 함수 등의 표현식을 사용하여 `key`를 지정할 수 있게 되었다.

### `componentDidUpdate`의 파라미터 `prevProps`, `prevState`

- componentDidUpdate는 컴포넌트가 최초가 아닌, 업데이트 시의 `render` 직후에 호출되며 `prevProps`, `prevState`를 파라미터로 갖는다.
- `prevProps` : `props`가 수정되었다는 것은 부모 컴포넌트에 의해 다시 호출되었다는 뜻(?). (그래서 잘 변할 것 같지 않은 느낌이지만..) 이번 `props`의 업데이트 이전의 `props`의 값(`setState`와는 관계 없는 듯..)
- `prevState` : 이번 업데이트의 `setState` 직전에 `setState`되었던 값
- `immutable`한 개념인 것 같다.

### `수정 중`인지 여부에 대한 상태를 나타내는 `editing` toggle(상태 변화를 의미)을 통해 다른 화면을 렌더링

- `PhoneInfo` 컴포넌트의 `state`에 `editing`과 함께 유동적인 input 값을 다루기 위해 `name`, `phone`이 존재

```javascript
state = {
  editing: false,
  name: "",
  phone: ""
};
```

- `상태 변화`(`state`의 `editing` 수정) 기능을 동작시킬 toggle 함수

```javascript
handleToggleEdit = () => {
  const { editing } = this.state;
  this.setState({ editing: !editing });
};
```

- `onChange`만으로도 화면이 리렌더링(`setState`에 의해)되지만 `handleToggleEdit`에 의해 리렌더링되었을 때도 `componentDidUpdate`가 호출되는데 어느 경우에 `handleToggleEdit`에 의해 `setState`가 실행되었는지 확인하기 위해 `prevState`와 `this.state`의 `editing`이 다를 때(두 가지 경우 뿐!!)를 체크하도록 했다.
  - (1)의 경우(수정 시작) : `phoneInfo`가 호출될 때 `props`로 넘겨 받은 `info`의 객체로 `name`, `phone`을 지정한다.
  - (2)의 경우(수정 완료) : 마지막 `onChange`에 의해 `setState`된 `state`의 객체로 `name`, `phone`을 지정한다.

```javascript
  componentDidUpdate(prevProps, prevState) {
    const { info, onUpdate } = this.props;
    // 전 상태와 현 상태가 다른 경우(1) - 수정 x -> 수정 중
    if (!prevState.editing && this.state.editing) {
      this.setState({
        name: info.name,
        phone: info.phone
      });
    }
    // 전 상태와 현 상태가 다른 경우(2) - 수정 중 -> 수정 x
    if (prevState.editing && !this.state.editing) {
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    }
  }
```

- `수정 모드` / `일반 모드`로 나누어 다른 화면을 렌더링하도록 한다.

```javascript
const { editing } = this.state; // 현재의 editing 값을 먼저 받아옴

// 수정모드
if (editing) {
  return (
    <div style={style}>
      <div>
        <input
          value={this.state.name}
          name="name"
          placeholder="이름"
          onChange={this.handleChange}
        />
      </div>
      <div>
        <input
          value={this.state.phone}
          name="phone"
          placeholder="전화번호"
          onChange={this.handleChange}
        />
      </div>
      <button onClick={this.handleToggleEdit}>적용</button>
      <button onClick={this.handleRemove}>삭제</button>
    </div>
  );
}

// 일반 모드
const { name, phone } = this.props.info; // info가 undefined일 수도 있다.

return (
  <div style={style}>
    <div>
      <b>{name}</b>
    </div>
    <div>{phone}</div>
    <button onClick={this.handleToggleEdit}>수정</button>
    <button onClick={this.handleRemove}>삭제</button>
  </div>
);
```
