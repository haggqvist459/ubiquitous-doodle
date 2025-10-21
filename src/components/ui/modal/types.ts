export type ModalStateType = {
  title: string
  message: string
  isOpen: boolean
  showCancel?: boolean
  onConfirm: () => void
  onCancel?: () => void | undefined
}