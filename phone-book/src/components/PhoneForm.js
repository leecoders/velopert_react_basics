import React, { Component } from "react";

class PhoneForm extends Component {
  state = {
    name: "",
    phone: ""
  };
  handleChange = e => {
    // `e`는 이벤트 객체로 이벤트 발생 시 넘겨 받음
    const { name, value } = e.target;
    this.setState({
      [name]: value // Computed property names : 표현식(변수, 함수 등 모두 가능)을 통해 key를 지정하는 방법
    });
  };
  handleSubmit = e => {
    e.preventDefault(); // 이벤트 발생 -> 페이지 리로드 방지
    this.props.onCreate(this.state); // this.props는 현재 컴포넌트로 넘어온 props를 말함
    this.setState({
      name: "",
      phone: ""
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <button type="submit">등록</button>
      </form>
    );
  }
}

export default PhoneForm;
