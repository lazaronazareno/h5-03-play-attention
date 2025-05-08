import { IUser } from '@/interfaces/IAdmin.interfaces';
import React from 'react';
import UserContactTable from '../UserContactTable';

interface ContactUserSectionProps {
  user: IUser
}

const ContactUserSection = ({ user }: ContactUserSectionProps) => {

  return (
    <div className={`py-9 px-4 flex flex-col gap-8 w-full h-[89vh] rounded-md`}>
      <UserContactTable type='Correo Electrónico' user={user} />
      <UserContactTable type='WhatsApp' user={user} />
      <UserContactTable type='Reuniones' user={user} />
    </div>
  );
};

export default ContactUserSection;