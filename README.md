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

이 경우에서는, 위와 같이 `setState`에 `foo` 객체의 수정을 시도할 때 `foobar`만을 찾아서 수정하고 `bar`는 그대로 남아있지는 않는다. 객체 state는 덮어 씌워진다.

```javascript
this.setState({
  number: 0,
  foo: {
    ...this.state.foo,
    foobar: 2
  }
});
```

위와 같이 `...`라는 JS의 문법인 `전개연산자`를 사용하면 해결할 수는 있다.

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
  1. 이벤트 이름을 설정 할 때 camelCase 로 설정해야 한다. (`onclick` -> `onClick`)
