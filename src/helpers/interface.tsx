export interface SignUpArgs {
  e: React.MouseEvent<HTMLButtonElement>;
}

export interface SignInArgs {
  e: React.MouseEvent<HTMLButtonElement>;
}

export interface YourUserType {
  uid: string,
  email: string,
  password?: string,
}

export interface Publication {
  id: string,
  author: string,
  title: string,
  text: string,
  comments: [{
    id?: string,
    author?: string,
    text?: string
  }]
}