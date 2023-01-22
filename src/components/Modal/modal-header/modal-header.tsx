import React, { FC } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import styles from './modal-header.module.css'

interface IModalHeaderProps {
  children: React.ReactNode
  onClose: () => void
}

const ModalHeader: FC<IModalHeaderProps> = ({ children, onClose }) => {
  return (
    <div className={styles.root}>
      <span className={styles.text}>{children}</span>
      <div className={styles.closeIcon} onClick={onClose}>
        <CloseIcon />
      </div>
    </div>
  )
}

export default ModalHeader
