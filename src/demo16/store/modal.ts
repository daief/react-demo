export interface TodoValue {
  id: number;
  text: string;
  completed: boolean;
};

export interface ActionValue {
  type: string;
}

export interface ActionValue {
  type: string;
  filter: string;
}

export interface ActionValue {
  type: string;
  id?: number;
  text?: string;
  completed?: boolean;
}