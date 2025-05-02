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
