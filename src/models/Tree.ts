interface ITreeProps {
  oldAge?: number
  maxAge?: number
}

export class Tree {
  public age = 1
  public oldAge = 10
  public maxAge = 200

  constructor(props?: ITreeProps) {
    this.oldAge = props?.oldAge ?? 10
    this.maxAge = props?.maxAge || 200
  }

  get isAdult() {
    return this.age >= this.oldAge
  }

  get isTimeToDie() {
    return this.age >= this.maxAge
  }

  public grow() {
    this.age += 1
  }
}
