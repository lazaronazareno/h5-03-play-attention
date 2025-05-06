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

export interface ILeads {
  id: string
  name: string
  lastName: string
  email: string
  institution?: string
  phoneNumber?: string
  complementTreatment?: IComplementTreatment
  profession?: string
  targetUsers?: string
  newsletterSubscription?: boolean
  usageContext?: string
  createdAt?: string
  lastUpdated?: string
  status: ILeadStatus
  leadType: ILeadType
  notes?: string
  country?: string
  currentSituation?: string
}

export interface IUser {
  id: string
  username: string
  fullName: string
  email: string
  password: string
  phoneNumber?: string
  institution?: string
  profession?: string
  newsletterSubscription?: boolean
  roles: IUserRole
  userType: ILeadType
  imageurl?: string
}
