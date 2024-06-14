export enum RabbitMQ {
  UserQueue = 'users',
  RegisterQueue = "registers",
}

export enum UserMSG {
  CREATE = 'CREATE_USER',
  CREATE_ADMIN = 'create_admin',
  FIND_ALL = 'FIND_USERS',
  FIND_ONE = 'FIND_USER',
  UPDATE = 'UPDATE_USER',
  DELETE = 'DELETE_USER',
  VALID_USER = 'VALID_USER',
  PATCH = "PATCH_USER",
}

export enum RegisterMSG {
  CREATE = 'CREATE_REGISTER',
  FIND_ALL = 'FIND_REGISTERS',
  FIND_ONE = 'FIND_REGISTER',
  UPDATE = 'UPDATE_REGISTER',
  DELETE = 'DELETE_REGISTER',
  ADD_USER = 'ADD_REGISTER_USER',
}