import { IUser } from '@/interfaces/IAdmin.interfaces';
import React from 'react';
import UserContactTable from '../UserContactTable';

interface ContactUserSectionProps {
  user: IUser
}

const ContactUserSection = ({ user }: ContactUserSectionProps) => {

  return (
    <div className={`flex h-[89vh] w-full flex-col gap-8 rounded-md px-4 py-9`}>
      <UserContactTable type='Correo Electrónico' user={user} />
      <UserContactTable type='WhatsApp' user={user} />
      <UserContactTable type='Reuniones' user={user} />
    </div>
  );
};

export default ContactUserSection;
