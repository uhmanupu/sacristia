export interface AgendaEvent {
  date: string;
  dayOfWeek: string;
  time: string;
  title: string;
  location: string;
}

export interface LiturgicalInfo {
  colorName: string;
  title: string;
  colors: string[];
}

export interface AgendaData {
  [key: string]: AgendaEvent[];
}

export interface CheckListStatus {
  mass_id: string;
  task_id: string;
  is_checked: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export enum ModelType {
  FLASH = 'gemini-2.5-flash',
  PRO = 'gemini-3-pro-preview'
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface DashboardEvent {
  id: string;
  title: string;
  time: string;
  type: string;
}