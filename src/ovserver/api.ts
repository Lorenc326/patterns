import { v4 } from 'uuid';
import moment from "moment";

import { Publisher } from "./publisher";
import { Message } from "./types";

// kinda mocked implementation of subscription/observer based api library
export class SocketApi {
  chat$ = new Publisher<Message>();

  init() {
    setInterval(() => this.chat$.execute({
      id: v4(),
      author: "Elon Musk",
      text: "Hey, what's up, bro?",
      time: moment().format("M")
    }), 5000)
  }
}

export const socketApi = new SocketApi();
socketApi.init();
