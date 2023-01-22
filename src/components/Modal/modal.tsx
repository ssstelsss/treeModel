import classnames from 'classnames'
import React, { FC, useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import debounce from 'lodash/debounce'
import ModalHeader from './modal-header/modal-header'
import ModalOverlay from './modal-overlay/modal-overlay'
import styles from './modal.module.css'

interface IModalProps {
  children: React.ReactNode
  contentRef?: React.RefObject<HTMLDivElement>
  size?: 'm' | 'l' | 's' | 'fullscreen'
  header?: string
  onClose: () => void
}

const Modal: FC<IModalProps> = ({
  children,
  header,
  contentRef,
  size = 'm',
  onClose,
}) => {
  const _onClose = useCallback(
    debounce(onClose, 2000, {
      leading: true,
      trailing: false,
    }),
    [onClose]
  )

  return ReactDOM.createPortal(
        <>
          <ModalOverlay onClose={_onClose}>
            <div
              className={classnames(styles.modal, {
                [styles.smallSize]: size === 's',
                [styles.middleSize]: size === 'm',
                [styles.largeSize]: size === 'l',
                [styles.fullscreenSize]: size === 'fullscreen',
              })}
              onClick={e => e.stopPropagation()}
            >
              {header ? (
                <ModalHeader onClose={_onClose}>{header}</ModalHeader>
              ) : null}
              <div className={styles.content} ref={contentRef}>
                {children}
              </div>
            </div>
          </ModalOverlay>
        </>,
        document.getElementById('modal-root') as HTMLElement
      )
}

export default Modal
