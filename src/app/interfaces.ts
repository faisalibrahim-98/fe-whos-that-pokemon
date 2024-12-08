export interface Pokemon {
  id: number;
  image: string;
  names: string[];
}

export interface Result {
  correct: boolean;
  name: string;
}

export interface VerifyBody {
  id: number;
  choice: string;
}

export interface ModalData {
  showModal: boolean;
  title: string;
  body: string;
  close: string;
}

export interface ScoreState {
  question: number;
  score: number;
}
