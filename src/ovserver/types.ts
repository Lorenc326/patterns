export type Message = {
  text: string;
  id: string;
  author: string;
  time: string;
};

export type Subscription<T = any> = (data: T) => void;
