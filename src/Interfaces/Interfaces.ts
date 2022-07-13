export interface ITask {
  id: string;
  task: string;
  complete: boolean;
}

export interface IMode {
  on: boolean;
  id: string;
  currentValue: string;
}