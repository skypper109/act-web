export class Login {

}
export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  code: number;
  data:any;
}
