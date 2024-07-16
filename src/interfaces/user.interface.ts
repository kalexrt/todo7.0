export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  permissions:string[];
}

export interface getUserQuery {
  q?: string;
}