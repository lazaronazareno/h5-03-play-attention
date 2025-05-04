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

export interface ItemFileProps extends UserPanelItem {
  type: "document" | "video" | "image"
  icon?: React.ReactNode
  fileUrl: string
  fileType:
    | "application/pdf"
    | "video/mp4"
    | "image/jpeg"
    | "image/png"
    | "application/msword"
    | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  transcription?: ApiResponse
}

export interface ModalProps {
  fileType: string
  fileUrl: string
  isOpen: boolean
  handleClick: () => void
  title?: string
}
