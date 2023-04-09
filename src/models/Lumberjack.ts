import { Agent, IAgentProps } from './Agent'
import { Tree } from './Tree'

interface ILumberjackProps extends Omit<IAgentProps, 'agentType'> {
  chopCount?: number
  plantCount?: number
  plantProbability?: number
  oldTreeAge?: number
  resource?: number
  maxResource?: number
  activityRadius?: number
}

export class Lumberjack extends Agent {
  public resource: number = 15

  private chopCount: number
  private oldTreeAge: number
  private plantCount: number
  private plantProbability: number
  private maxResource: number
  private activityRadius: number

  constructor({
    x,
    y,
    chopCount,
    plantCount,
    plantProbability,
    activityRadius,
    maxResource,
    oldTreeAge,
    resource,
    board,
  }: ILumberjackProps) {
    super({ x, y, board, agentType: 'lumberjacks' })
    this.chopCount = chopCount ?? 1
    this.oldTreeAge = oldTreeAge ?? 10
    this.plantCount = plantCount ?? 1
    this.plantProbability = plantProbability ?? 0.4
    this.activityRadius = activityRadius ?? 1
    this.resource = resource || this.resource
    this.maxResource = maxResource || 20
  }

  public plantTrees() {
    for (let index = 0; index < this.plantCount; index++) {
      if (Math.random() < this.plantProbability) {
        this.board[this.x][this.y].trees.push(
          new Tree({ oldAge: this.oldTreeAge })
        )
      }
    }
  }

  public increaseResource() {
    for (
      let x = this.x - this.activityRadius;
      x < this.x + this.activityRadius;
      x++
    ) {
      for (
        let y = this.y - this.activityRadius;
        y < this.y + this.activityRadius;
        y++
      ) {
        if (!this.isPointExistOnBoard(x, y)) {
          continue
        }

        const adultTreeIndex = this.board[x][y].trees.findIndex(
          tree => tree.isAdult
        )

        if (adultTreeIndex > -1) {
          this.resource += 1
          return
        }
      }
    }
    this.resource -= 1
  }

  public splitIfEnoughResource() {
    if (this.resource >= this.maxResource) {
      this.resource /= 2
      this.board[this.x][this.y].agents.lumberjacks.push(
        new Lumberjack({
          x: this.x,
          y: this.y,
          board: this.board,
          oldTreeAge: this.oldTreeAge,
          chopCount: this.chopCount,
          plantCount: this.plantCount,
          resource: ~~(this.resource / 2)
        })
      )
    }
  }

  public chopTrees() {
    for (let index = 0; index < this.chopCount; index++) {
      const adultTreeIndex = this.board[this.x][this.y].trees.findIndex(
        tree => tree.isAdult
      )

      if (adultTreeIndex > -1) {
        this.chopTreeInCellByIndex(this.x, this.y, adultTreeIndex)
      } else {
        break
      }
    }
  }

  public chopTreeInCellByIndex(x: number, y: number, treeIndex: number) {
    this.board[x][y].trees.splice(treeIndex, 1)
  }

  public checkIfAlive() {
    if (this.resource <= 0) {
      this.die()
    }
  }

  public die() {
    const currentLumberjackIndex = this.board[this.x][
      this.y
    ].agents.lumberjacks.findIndex(lumberjack => lumberjack.id === this.id)

    this.board[this.x][this.y].agents.lumberjacks.splice(
      currentLumberjackIndex,
      1
    )
  }
}
