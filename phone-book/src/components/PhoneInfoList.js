import React, { Component } from "react";
import PhoneInfo from "./PhoneInfo";

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.log("onRemove not defined"),
    onUpdate: () => console.log("onUpdate not defined")
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data; // true일 때 업데이트 진행 (필터링 동작하면 매번 다른 데이터 오니 무의미하긴 함..)
  }

  render() {
    const { data, onRemove, onUpdate } = this.props;
    const list = data.map(info => (
      <PhoneInfo
        key={info.id}
        info={info}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    ));
    return <div>{list}</div>;
  }
}

export default PhoneInfoList;
