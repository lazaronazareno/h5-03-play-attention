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
}
