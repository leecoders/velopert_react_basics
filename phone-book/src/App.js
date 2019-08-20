import React, { Component } from "react";
import PhoneForm from "./components/PhoneForm";
import PhoneInfoList from "./components/PhoneInfoList";

class App extends Component {
  id = 2; // 멤버 변수?
  state = {
    information: [
      {
        id: 0,
        name: "ㅇㅇㅇ",
        phone: "010-0000-0000"
      },
      {
        id: 1,
        name: "ㅋㅋㅋ",
        phone: "010-0000-0001"
      }
    ],
    keyword: ""
  };
  handleChange = e => {
    this.setState({
      keyword: e.target.value
    });
  };
  handleCreate = data => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data })
    });
  };
  handleRemove = id => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  };
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(info =>
        id === info.id ? { ...info, ...data } : info
      )
    });
  };
  render() {
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1 // keyword를 통해 필터링 진행
    );
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />

        <p>
          <input
            placeholder="검색할 이름을 입력하세요.."
            onChange={this.handleChange}
            value={keyword}
          />
        </p>
        <hr />
        <PhoneInfoList
          data={filteredList} // 필터링된 결과를 전달! (keyword가 공백이면 모든 문자열에 공백이 포함되어 있으니 원본 전송됨)
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
