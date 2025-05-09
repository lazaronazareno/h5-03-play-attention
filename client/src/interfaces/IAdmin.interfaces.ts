export type IComplementTreatment =
  | "NEUROFEEDBACK"
  | "THERAPY"
  | "BRAINAPP"
  | "OTHER"

export type ILeadStatus =
  | "NEW"
  | "CONTACTED"
  | "AFTER_SALES"
  | "CLIENT"
  | "CANCELED"

export type ILeadType = "PROFESSIONAL" | "INDIVIDUAL" | "CORPORATE" | "ADMIN"

export type ICurrentSituation =
  | "INVESTIGATING"
  | "ADHD_DIAGNOSED"
  | "PRESCRIPTION_MEDICATION"
  | "NO_TREATMENT"
  | "IN_TREATMENT"
  | "OTHER"

export type IUserRole =
  | "ROLE_USER"
  | "ROLE_PROFESSIONAL"
  | "ROLE_CORPORATE"
  | "ROLE_ADMIN"
  | "ROLE_SUPER_ADMIN"

export type LeadCountry = "Argentina" | "Brasil" | "Chile" | "Uruguay" | "Otro"
export type LeadTargetUsers = "Children" | "Adult" | "Patient" | "Professional"
export interface ILeads {
  id: string
  name: string
  lastName: string
  email: string
  institution?: string
  phoneNumber?: string
  complementTreatment?: IComplementTreatment
  profession?: string
  targetUsers?: LeadTargetUsers
  newsletterSubscription?: boolean
  usageContext?: string
  createdAt?: string
  lastUpdated?: string
  status: ILeadStatus
  leadType: ILeadType
  notes?: string
  country?: LeadCountry
  currentSituation?: ICurrentSituation
}

export type IUserStatus = "ACTIVE" | "INACTIVE"

export interface IUser {
  id: string
  username: string
  name: string
  lastName: string
  email: string
  password: string
  phoneNumber?: string
  institution?: string
  profession?: string
  newsletterSubscription?: boolean
  roles: IUserRole
  userType: ILeadType
  imageurl?: string
  country?: string
  status?: IUserStatus
}

export type IContentType =
  | "DOCUMENT"
  | "VIDEO"
  | "IMAGE"
  | "ARTICLE"
  | "TUTORIAL"
  | "MARKETING"
  | "ACTIVITY"
  | "EVENT"

export type IContentCategory =
  | "EDUCATIONAL_MATERIAL"
  | "TUTORIAL"
  | "MEDICAL_ARTICLE"
  | "SAMPLE_VIDEO"
  | "MARKETING_MATERIAL"
  | "INTERACTIVE_ACTIVITY"
  | "EVENT_NOTIFICATION"
  | "INSTALLATION_GUIDE"
  | "USER_MANUAL"
  | "SUCCESS_CASE"
  | "RESEARCH"

export interface IContent {
  id: number
  title: string
  description: string
  filePath: string
  thumbnailPath: string
  contentType: IContentType
  category: IContentCategory
  active: boolean
  createdAt: string
  lastUpdated: string
  createdBy: number
  languageCode: string
  originalContentId?: number
}
