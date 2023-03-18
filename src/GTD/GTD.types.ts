export type Topic = {
  id: number;
  name: string;
}

export type Tag = {
  name: string,
  id: number,
  color: string,
}

export type Option = {
  label: string;
  value: number | string;
}

export type Project = {
  id: number;

  name: string;

  deadline: number;

  active: boolean;

  done: boolean;

  topic: number;
}

export type NextActionType = {
  id: number;
  name: string;
  deadline: number;
  tags: number[];
  done: boolean;
  description: string;
  project: number;
}