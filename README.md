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
