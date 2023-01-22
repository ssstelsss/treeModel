interface ITreeProps {
  adaltAge?: number
  maxAge?: number
}

export class Tree {
  public age = 1
  public adaltAge = 10
  public maxAge = 200

  constructor(props?: ITreeProps) {
    this.adaltAge = props?.adaltAge ?? 10
    this.maxAge = props?.maxAge || 200
  }

  get isAdult() {
    return this.age >= this.adaltAge
  }

  get isTimeToDie() {
    return this.age >= this.maxAge
  }

  public grow() {
    this.age += 1
  }
}
