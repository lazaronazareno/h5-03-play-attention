export interface IMails {
  to: string
  subject: string
  message: string
}

export interface IEmailTemplate {
  subject: string
  message: string
}

export type IEmailTemplates = Record<string, IEmailTemplate>

export interface IEmailResponse {
  from: string
  id: number
  message: string
  sendDate: string
  subject: string
  to: string
}
