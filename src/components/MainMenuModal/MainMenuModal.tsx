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
  oldTreeAge: number
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
    oldTreeAge: 20,
    lumberjackCount: 20,
    treeCount: 100,
    chopCount: 1,
    plantCount: 1,
  })

  function onChangeField(event: any) {
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
            InputProps={{ inputProps: { min: 1 } }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeField}
          />
          <TextField
            id='max-age'
            label='Количество дровосеков'
            type='number'
            value={options.lumberjackCount}
            name={'lumberjackCount'}
            InputProps={{ inputProps: { min: 0 } }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeField}
          />
          <TextField
            id='max-age'
            label='Количество деревьев'
            type='number'
            value={options.treeCount}
            InputProps={{ inputProps: { min: 0 } }}
            name={'treeCount'}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeField}
          />
          <TextField
            id='max-age'
            label='Количество вырубаемых деревьев'
            type='number'
            value={options.chopCount}
            name={'chopCount'}
            InputProps={{ inputProps: { min: 0 } }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeField}
          />
          <TextField
            id='max-age'
            label='Возраст дерева, которое можно рубить'
            type='number'
            InputProps={{ inputProps: { min: 1 } }}
            value={options.oldTreeAge}
            name={'oldTreeAge'}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeField}
          />
          <TextField
            id='max-age'
            label='Количество сажаемых деревьев'
            type='number'
            value={options.plantCount}
            InputProps={{ inputProps: { min: 0 } }}
            name={'plantCount'}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeField}
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
