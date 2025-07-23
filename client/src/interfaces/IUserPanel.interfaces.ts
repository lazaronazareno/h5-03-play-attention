import { ApiResponse } from "./IVideo.interfaces"

export interface UserPanelItem {
  title: string
  description: string
}

export interface UserPanelProps<T extends UserPanelItem> {
  title: string
  description: string
  imageUrl: string
  items: T[]
}

export type ItemFileType =
  | "application/pdf"
  | "video/mp4"
  | "image/jpeg"
  | "image/png"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

export interface ItemFileProps extends UserPanelItem {
  type: "document" | "video" | "image"
  icon?: React.ReactNode
  fileUrl: string
  fileType: ItemFileType
  transcription?: ApiResponse
  checkbox?: boolean
  isSelected?: boolean
  setSelectedFile?: (id: number | null) => void
  id?: number
}

export interface ModalProps {
  fileType: string
  fileUrl: string
  isOpen: boolean
  handleClick: () => void
  title?: string
}
