import { Agent, IAgentProps } from './Agent'
import { Tree } from './Tree'

interface ILumberjackProps extends Omit<IAgentProps, 'agentType'> {
  chopCount?: number
  plantCount?: number
  maxResource?: number
  activityRadius?: number
}

export class Lumberjack extends Agent {
  public resource: number = 1

  private chopCount: number
  private plantCount: number
  private maxResource: number
  private activityRadius: number

  constructor({
    x,
    y,
    chopCount,
    plantCount,
    activityRadius,
    maxResource,
    board,
  }: ILumberjackProps) {
    super({ x, y, board, agentType: 'lumberjacks' })
    this.chopCount = chopCount || 1
    this.plantCount = plantCount || 1
    this.activityRadius = activityRadius || 1
    this.maxResource = maxResource || 20
  }

  public plantTrees() {
    for (let index = 0; index < this.plantCount; index++) {
      this.board[this.x][this.y].trees.push(new Tree())
    }
  }

  public increaseResource() {
    const adultTreeIndex = this.board[this.x][this.y].trees.findIndex(
      tree => tree.isAdult
    )

    if (adultTreeIndex > -1) {
      this.resource += 1
    }
  }

  public splitIfEnoughResource() {
    if (this.resource >= this.maxResource) {
      this.resource /= 2
      this.board[this.x][this.y].agents.lumberjacks.push(
        new Lumberjack({ x: this.x, y: this.y, board: this.board })
      )
    }
  }

  public chopTrees() {
    for (let index = 0; index < this.chopCount; index++) {
      const adultTreeIndex = this.board[this.x][this.y].trees.findIndex(
        tree => tree.isAdult
      )

      if (adultTreeIndex > -1) {
        this.board[this.x][this.y].trees.splice(adultTreeIndex, 1)
      } else {
        break
      }
    }
  }
}
