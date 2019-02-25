export interface UserEntity {
  id: number,
  name: string,
  age: number,
  comment: string
};

export interface ReturnId {
  id: number;
}

export interface ReturnUser {
  userData: UserEntity;
}

export interface NotiFicationInterface {
  type: string,
  title: string,
  message: string,
}

export interface UserListDataEntity {
  userList: {
    users: UserEntity[],
    totalRecord: number
  },
};

export interface UserInfo {
  info: any[],
  key: number,
  createDate:string
};