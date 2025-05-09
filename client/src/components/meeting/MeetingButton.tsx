'use client'
import { PopupButton } from 'react-calendly'
import Button from '@/components/ui/Button'
import { CalendarIcon } from 'lucide-react'

const MeetingButton = () => {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL

  // Verificamos si la URL está definida
  if (!calendlyUrl) {
    console.error('La URL de Calendly no está definida en el archivo .env')
    return null
  }

  return (
    <PopupButton
      url='https://calendly.com/mjparedes2505'
      rootElement={document.body}
      text='Reservar Turno'
    >
      {/* Aquí simplemente usas el Button directamente */}
      <Button
        text='Reservar Turno'
        variant='primary'
        icon={<CalendarIcon size={18} />}
        iconPosition='left'
      />
    </PopupButton>
  )
}

export default MeetingButton
