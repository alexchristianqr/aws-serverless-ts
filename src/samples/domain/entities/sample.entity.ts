export abstract class SampleEntity {
  id?: number
  name?: string
  lastname?: string
  age?: string
}

export interface Model extends SampleEntity {}
