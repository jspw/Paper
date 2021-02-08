import React from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import Question from "./Question";

const { TabPane } = Tabs;

export default class CreateCourse extends React.Component {
  questionIDs = [];
  newTabIndex = 0;
  quesNo = 2;

  addQuestion = (id) => {
    this.questionIDs.push(id);
    console.log("mcq Question Id !",id);
  };

  initialPanes = [
    {
      title: "Question 1",
      content: <Question onAdd={this.addQuestion} />,
      key: "1",
      closable: false,
    },
  ];

  state = {
    activeKey: this.initialPanes[0].key,
    panes: this.initialPanes,
  };

  onChange = (activeKey) => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `question${this.newTabIndex++}`;
    const newPanes = [...panes];
    newPanes.push({
      title: `Question ${this.quesNo++}`,
      content: <Question onAdd={this.addQuestion} />,
      key: activeKey,
    });
    this.setState({
      panes: newPanes,
      activeKey,
    });
  };

  remove = (targetKey) => {
    const { panes, activeKey } = this.state;
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    this.setState({
      panes: newPanes,
      activeKey: newActiveKey,
    });
  };

  render() {
    const { panes, activeKey } = this.state;
    return (
      <Tabs
        type="editable-card"
        onChange={this.onChange}
        activeKey={activeKey}
        onEdit={this.onEdit}
      >
        {panes.map((pane) => (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}
