import React, { Component } from "react";

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: "이름",
      phone: "010-0000-0000",
      id: 0
    }
  };

  state = {
    editing: false,
    name: "",
    phone: ""
  };

  shouldComponentUpdate(nextProps, nextState) {
    // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함 (수정 상태에는 리렌더링 해야 함)
    if (
      !this.state.editing &&
      !nextState.editing &&
      nextProps.info === this.props.info
    ) {
      return false;
    }
    // 나머지 경우엔 리렌더링함
    return true;
  }

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  };

  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value // Computed property names : 표현식(변수, 함수 등 모두 가능)을 통해 key를 지정하는 방법
    });
  };

  // componentDidUpdate의 인자인가봄.. props, state의 immutable 값이 prev에 저장되어 있는 듯..
  componentDidUpdate(prevProps, prevState) {
    const { info, onUpdate } = this.props;
    // 전 상태와 현 상태가 다른 경우(1)
    if (!prevState.editing && this.state.editing) {
      this.setState({
        name: info.name,
        phone: info.phone
      });
    }
    // 전 상태와 현 상태가 다른 경우(2)
    if (prevState.editing && !this.state.editing) {
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    }
  }

  render() {
    console.log("render PhoneInfo " + this.props.info.id);
    const style = {
      border: "1px solid black",
      padding: "8px",
      margin: "8px"
    };

    const { editing } = this.state;

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
  }
}

export default PhoneInfo;
