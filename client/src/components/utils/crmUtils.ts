export const getFileType = (filePath: string) => {
  const fileExtension = filePath.split(".").pop()?.toLowerCase()
  switch (fileExtension) {
    case "pdf":
      return "application/pdf"
    case "png":
      return "image/png"
    case "jpg":
    case "jpeg":
      return "image/jpeg"
    case "mp4":
      return "video/mp4"
    case "doc":
      return "application/msword"
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    default:
      return "application/pdf"
  }
}

export const getActivityType = (type: string) => {
  switch (type) {
    case "DOCUMENT":
    case "ARTICLE":
    case "ACTIVITY":
      return "document"
    case "VIDEO":
    case "TUTORIAL":
      return "video"
    case "IMAGE":
    case "MARKETING":
    case "EVENT":
    default:
      return "image"
  }
}
