import { getRandomInt } from '../helpers/getRandomInt'
import { INode, INodeAgents } from './WorldManager.interface'

export type TDirection = 'top' | 'bottom' | 'left' | 'right'

export interface IAgentProps {
  x: number
  y: number
  agentType: keyof INodeAgents
  board: INode[][]
}

const DIRECTIONS: TDirection[] = ['top', 'bottom', 'left', 'right']

export class Agent {
  static id = 1

  public x: number
  public y: number
  public agentType: keyof INodeAgents
  public id: number

  protected board: INode[][]

  constructor({ x, y, agentType, board }: IAgentProps) {
    this.x = x || 0
    this.y = y || 0
    this.agentType = agentType
    this.board = board

    this.id = Agent.id
    Agent.id += 1
  }

  public get agentIndex() {
    return this.board[this.x][this.y].agents[this.agentType].findIndex(
      item => item.id === this.id
    )
  }

  isPointExistOnBoard(x: number, y: number) {
    return (
      x >= 0 && x < this.board?.length && y >= 0 && y < this.board[0]?.length
    )
  }

  moveTo(newX: number, newY: number) {
    if (this.isPointExistOnBoard(newX, newY)) {
      const [agent] = this.board[this.x][this.y].agents[this.agentType].splice(
        this.agentIndex,
        1
      )
      this.board[newX][newY].agents[this.agentType].push(agent)

      this.x = newX
      this.y = newY
    }
  }

  moveAgentTowardDirection(direction: TDirection) {
    switch (direction) {
      case 'top':
        this.moveTo(this.x, this.y - 1)
        break
      case 'bottom':
        this.moveTo(this.x, this.y + 1)
        break
      case 'right':
        this.moveTo(this.x + 1, this.y)
        break
      case 'left':
        this.moveTo(this.x - 1, this.y)
        break

      default:
        break
    }
  }

  moveAgentToRandomNearestCell() {
    const direction = DIRECTIONS[getRandomInt(0, 4)]
    this.moveAgentTowardDirection(direction)
  }
}
