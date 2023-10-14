// export interface Sample {
//   id: number
//   name: string
// }
export class Sample {
  private _id: number | undefined
  private _name: string | undefined

  constructor(sample?: Sample) {
    this._id = sample?._id
    this._name = sample?._name
  }

  get id(): number | undefined {
    return this._id
  }

  set id(value: number | undefined) {
    this._id = value
  }

  get name(): string | undefined {
    return this._name
  }

  set name(value: string | undefined) {
    this._name = value
  }
}
