import React from 'react';
import moment from 'moment';
import { v4 } from 'uuid';

import { socketApi } from './api';
import { Message } from './types';

class Counter extends React.PureComponent<{}, { count: number }> {
  subscription: any;
  state = { count: 0 };

  componentDidMount() {
    this.subscription = socketApi.chat$.subscribe(() => {
      this.setState({ count: this.state.count + 1 });
    })
  }

  componentWillUnmount() {
    this.subscription();
  }

  render() {
    return (
      <div style={{ padding: 10, border: "green" }}>
        <b>Inbox</b>
        <br/>
        You have {this.state.count} messages
      </div>
    );
  }
}

class Inbox extends React.PureComponent<{}, { input: string; messages: Message[] }> {
  subscription: any;
  state = { input: "", messages: [] };

  componentDidMount() {
    this.subscription = socketApi.chat$.subscribe(data => {
      this.setState({ messages: this.state.messages.concat(data) });
    })
  }

  componentWillUnmount() {
    this.subscription();
  }

  sentMessage() {
    socketApi.chat$.execute({
      id: v4(),
      author: "anonym",
      text: this.state.input,
      time: moment().format("M")
    });
    this.setState({ input: "" });
  }

  render() {
    const { messages, input } = this.state;
    return (
      <div style={{ background: "lightGray", width: 500, height: 500, overflow: "auto" }}>
        {
          messages.map(({ text, author, time, id }) => (
            <div style={{ padding: 10 }} key={id}>
              <p>{author}: {time}</p>
              <p>{text}</p>
            </div>
          ))
        }
        <input value={input} onChange={e => this.setState({ input: (e.target.value)})} />
        <button onClick={() => this.sentMessage()}>Enter</button>
      </div>
    )
  }
}

export const Chat = () => (
  <div>
    <Counter/>
    <Inbox/>
  </div>
);