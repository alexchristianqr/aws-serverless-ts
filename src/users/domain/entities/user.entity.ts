export abstract class UserEntity {
  id?: number
  name?: string
  lastname?: string
  age?: string
}

export interface Model extends UserEntity {}
