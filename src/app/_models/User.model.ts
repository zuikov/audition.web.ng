export interface UserIntarface {
  username: string;
  email: string;
  lastName?: string;
}

export class User implements UserIntarface {
  username = '';
  email = '';
  lastName? = '';

    constructor(data?: UserIntarface) {
        Object.assign(this, data);
    }
}
