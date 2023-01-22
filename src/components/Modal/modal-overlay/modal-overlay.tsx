import React, { FC, useCallback, useEffect } from 'react'
import styles from './modal-overlay.module.css'

interface IModalOverlayProps {
  children: React.ReactNode
  onClose: () => void
}

const ModalOverlay: FC<IModalOverlayProps> = ({ children, onClose }) => {
  const handleClose = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleClose)
    return () => document.removeEventListener('keydown', handleClose)
  }, [handleClose])

  return (
    <div className={styles.root} onClick={onClose}>
      {children}
    </div>
  )
}

export default ModalOverlay
