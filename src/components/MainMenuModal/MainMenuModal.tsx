import React, { FC, useState } from 'react'
import Modal from '../Modal/modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import styles from './MainMenuModal.module.css'

interface IMainMenuModalProps {
  onApprove: (options: IModelOptionsProps) => void
  onClose: () => void
}

export interface IModelOptionsProps {
  maxAge: number
  lumberjackCount: number
  treeCount: number
  chopCount: number
  plantCount: number
}

export const MainMenuModal: FC<IMainMenuModalProps> = ({
  onApprove,
  onClose,
}) => {
  const [options, setOptions] = useState({
    maxAge: 100,
    lumberjackCount: 20,
    treeCount: 100,
    chopCount: 1,
    plantCount: 1,
  })

  function onChangeMaxAge(event: any) {
    setOptions(oldOptions => ({
      ...oldOptions,
      [event.target.name]: +event.target.value,
    }))
  }

  return (
    <Modal header={'Настройки'} onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.optionsContainer}>
          <TextField
            id='max-age'
            label='Количество иттераций'
            type='number'
            value={options.maxAge}
            name={'maxAge'}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeMaxAge}
          />
          <TextField
            id='max-age'
            label='Количество дровосеков'
            type='number'
            value={options.lumberjackCount}
            name={'lumberjackCount'}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeMaxAge}
          />
          <TextField
            id='max-age'
            label='Количество деревьев'
            type='number'
            value={options.treeCount}
            name={'treeCount'}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeMaxAge}
          />
          <TextField
            id='max-age'
            label='Количество вырубаемых деревьев'
            type='number'
            value={options.chopCount}
            name={'chopCount'}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeMaxAge}
          />
          <TextField
            id='max-age'
            label='Количество сажаемых деревьев'
            type='number'
            value={options.plantCount}
            name={'plantCount'}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeMaxAge}
          />
        </div>
        <Button
          onClick={() => {
            onApprove(options)
            onClose()
          }}
        >
          Создать новую модель
        </Button>
      </div>
    </Modal>
  )
}
