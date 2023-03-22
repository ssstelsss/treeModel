import { getRandomInt } from '../helpers/getRandomInt'
import { Lumberjack } from './Lumberjack'
import { Tree } from './Tree'
import {
  IBoardSizes,
  IInitAgentNumbers,
  INode,
  IWorldManagerProps,
} from './WorldManager.interface'

export class WorldManager {
  public boardSizes: IBoardSizes
  public cellSize: number

  public chopCount: number
  public plantCount: number

  public board: INode[][] = []
  private maxAge: number
  private oldTreeAge: number
  private itterationNumber: number = 1

  constructor({
    boardSizes,
    cellSize,
    maxAge = 100,
    oldTreeAge = 10,
    chopCount = 1,
    plantCount = 1,
    initAgentNumbers = { lumberjack: 20, tree: 100 },
  }: IWorldManagerProps) {
    this.boardSizes = boardSizes
    this.maxAge = maxAge
    this.oldTreeAge = oldTreeAge
    this.cellSize = cellSize || 50

    this.chopCount = chopCount
    this.plantCount = plantCount

    this.initBoard(initAgentNumbers)
  }

  private initBoard(initAgentNumbers: IInitAgentNumbers) {
    for (let indexX = 0; indexX < this.boardSizes.x; indexX++) {
      this.board[indexX] = []
      for (let indexY = 0; indexY < this.boardSizes.y; indexY++) {
        this.board[indexX][indexY] = { agents: { lumberjacks: [] }, trees: [] }
      }
    }

    for (let indexTree = 0; indexTree < initAgentNumbers.tree; indexTree++) {
      const x = getRandomInt(0, this.boardSizes.x - 1)
      const y = getRandomInt(0, this.boardSizes.y - 1)

      this.board[x][y].trees.push(new Tree({ oldAge: this.oldTreeAge }))
    }

    for (
      let indexLumberJack = 0;
      indexLumberJack < initAgentNumbers.lumberjack;
      indexLumberJack++
    ) {
      const x = getRandomInt(0, this.boardSizes.x - 1)
      const y = getRandomInt(0, this.boardSizes.y - 1)

      this.board[x][y].agents.lumberjacks.push(
        new Lumberjack({
          x,
          y,
          board: this.board,
          chopCount: this.chopCount,
          plantCount: this.plantCount,
        })
      )
    }
  }

  doLifeItteration() {
    if (this.itterationNumber >= this.maxAge) {
      return
    }

    for (let indexX = 0; indexX < this.boardSizes.x; indexX++) {
      for (let indexY = 0; indexY < this.boardSizes.y; indexY++) {
        // chop and plant trees in cell
        this.board[indexX][indexY].agents['lumberjacks'].forEach(lumberjack => {
          lumberjack.increaseResource()
          lumberjack.splitIfEnoughResource()
          lumberjack.chopTrees()
          lumberjack.plantTrees()
          lumberjack.moveAgentToRandomNearestCell()
        })

        // grow trees in cell
        this.board[indexX][indexY].trees.forEach(tree => tree.grow())

        // Kill maxAged trees in cell
        this.board[indexX][indexY].trees.forEach((tree, index) => {
          if (tree.isTimeToDie) {
            this.board[indexX][indexY].trees.splice(index, 1)
          }
        })
      }
    }

    return (this.itterationNumber += 1)
  }
}
