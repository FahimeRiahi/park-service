export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
};

export interface Users {
  users: User[];
}
