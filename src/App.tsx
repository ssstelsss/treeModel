import { Layer, Rect, Stage, Text } from 'react-konva'
import { LocalImage } from './components/LocalImage/LocalImage'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { WorldManager } from './models/WorldManager'
import {
  IModelOptionsProps,
  MainMenuModal,
} from './components/MainMenuModal/MainMenuModal'
import styles from './App.module.css'

const CELL_SIZE = 50

function App() {
  const [itteration, setItteration] = useState(1)

  const [manager, setManager] = useState<WorldManager>()
  const [height, setHeight] = useState(window.innerHeight)
  const [width, setWidth] = useState(window.innerWidth)
  const [amountCellX, setAmountCellX] = useState(1)
  const [amountCellY, setAmountCellY] = useState(1)

  const intervalIDRef = useRef<NodeJS.Timer>()
  const [isMainMenuModal, setIsMainMenuModal] = useState(false)

  useEffect(() => {
    intervalIDRef.current && clearInterval(intervalIDRef.current)

    const id = setInterval(() => {
      manager?.doLifeItteration()
      setItteration(prevItteration => prevItteration + 1)
    }, 1000)

    intervalIDRef.current = id

    return () => {
      clearInterval(intervalIDRef.current)
    }
  }, [manager])

  useLayoutEffect(() => {
    const _width = window.innerWidth
    const _height = window.innerHeight

    const _amountCellX = _width / CELL_SIZE
    const _amountCellY = _height / CELL_SIZE

    setAmountCellX(~~_amountCellX)
    setAmountCellY(~~_amountCellY)
    setHeight(~~_amountCellY * CELL_SIZE)
    setWidth(~~_amountCellX * CELL_SIZE)

    setManager(
      new WorldManager({
        boardSizes: { x: ~~_amountCellX, y: ~~_amountCellY },
        cellSize: CELL_SIZE,
      })
    )
  }, [])

  function renderBoardAgents() {
    const result: React.ReactElement[] = []

    if (!manager) {
      return null
    }

    for (let indexX = 0; indexX < manager.boardSizes.x; indexX++) {
      for (let indexY = 0; indexY < manager.boardSizes.y; indexY++) {
        manager.board[indexX][indexY].trees.length &&
          result.push(
            <LocalImage
              key={`tree_${indexX}_${indexY}`}
              src='images/tree.png'
              x={indexX * manager.cellSize}
              y={indexY * manager.cellSize}
              width={manager.cellSize / 2}
              height={manager.cellSize / 2}
            />
          )

        manager.board[indexX][indexY].agents.lumberjacks.length &&
          result.push(
            <LocalImage
              key={`lumberjack_${indexX}_${indexY}`}
              src='images/lamberjack.png'
              x={indexX * manager.cellSize}
              y={indexY * manager.cellSize + manager.cellSize / 2}
              width={manager.cellSize / 2}
              height={manager.cellSize / 2}
            />
          )

        manager.board[indexX][indexY].trees.length &&
          result.push(
            <Text
              fontSize={12}
              text={`${manager.board[indexX][indexY].trees.length}`}
              wrap='char'
              align='center'
              x={indexX * manager.cellSize + manager.cellSize / 2}
              y={indexY * manager.cellSize + manager.cellSize / 4}
              width={manager.cellSize / 2}
              height={manager.cellSize / 2}
            />
          )

        manager.board[indexX][indexY].agents.lumberjacks.length &&
          result.push(
            <Text
              fontSize={12}
              text={`${manager.board[indexX][indexY].agents.lumberjacks.length}`}
              wrap='char'
              align='center'
              x={indexX * manager.cellSize + manager.cellSize / 2}
              y={
                indexY * manager.cellSize +
                manager.cellSize / 2 +
                manager.cellSize / 4
              }
              width={manager.cellSize / 2}
              height={manager.cellSize / 2}
            />
          )
      }
    }

    return result
  }

  function renderBoard() {
    const result: React.ReactElement[] = []

    if (!manager) {
      return null
    }
    for (let indexX = 0; indexX < manager.boardSizes.x; indexX++) {
      for (let indexY = 0; indexY < manager.boardSizes.y; indexY++) {
        result.push(
          <Rect
            key={`${indexX}_${indexY}`}
            x={indexX * CELL_SIZE}
            y={indexY * CELL_SIZE}
            width={CELL_SIZE}
            height={CELL_SIZE}
            fill='transparent'
            stroke='black'
            drawBorder={true}
          />
        )
      }
    }

    return result
  }

  function newWorld(options: IModelOptionsProps) {
    setManager(
      new WorldManager({
        boardSizes: { x: ~~amountCellX, y: ~~amountCellY },
        cellSize: CELL_SIZE,

        maxAge: options.maxAge,
        oldTreeAge: options.oldTreeAge,
        chopCount: options.chopCount,
        plantCount: options.plantCount,
        initAgentNumbers: {
          lumberjack: options.lumberjackCount,
          tree: options.treeCount,
        },
      })
    )
  }

  if (manager?.isModelEnd()) {
    clearInterval(intervalIDRef.current)
    console.log('result: ', manager.modelStatistic)
  }

  return (
    <>
      {manager?.isModelEnd() ? (
        <div className={styles.resultWrapper}>
          <h3>Результаты</h3>
          <span>{JSON.stringify(manager.modelStatistic, undefined, 4)}</span>
        </div>
      ) : (
        <Stage width={width} height={height}>
          <Layer>{renderBoard()}</Layer>
          <Layer>{renderBoardAgents()}</Layer>
        </Stage>
      )}
      <div className={styles.optionsContainer}>
        <img
          src='images/option.png'
          alt='options'
          onClick={() => {
            setIsMainMenuModal(true)
          }}
        />
      </div>
      {isMainMenuModal && (
        <MainMenuModal
          onApprove={newWorld}
          onClose={() => setIsMainMenuModal(false)}
        />
      )}
    </>
  )
}

export default App
