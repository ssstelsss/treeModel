import { Lumberjack } from './Lumberjack'
import { Tree } from './Tree'

export interface IBoardSizes {
  x: number
  y: number
}

export interface IInitAgentNumbers {
  lumberjack: number
  tree: number
}

export interface IWorldManagerProps {
  boardSizes: IBoardSizes
  cellSize?: number
  maxAge?: number
  oldTreeAge?: number
  initAgentNumbers?: IInitAgentNumbers

  chopCount?: number
  plantCount?: number
}

export interface INodeAgents {
  lumberjacks: Lumberjack[]
}

export interface INode {
  trees: Tree[]
  agents: INodeAgents
}
