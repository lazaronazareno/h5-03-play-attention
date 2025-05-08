'use client';
import { ICurrentSituation, ILeads, ILeadStatus, ILeadType, IUser } from '@/interfaces/IAdmin.interfaces';
import React from 'react';
import DropdownLead from '../ui/DropdownLead';
import { ChartNoAxesColumn, DollarSign, Heart, Mail, Phone, Smartphone, SquarePen, Trash2, User } from 'lucide-react';
import Typography from '../ui/Typography';
import { LeadComplementTreatmentNames, LeadCurrentSituationNames, LeadStatusNames, LeadTypeNames } from '@/constants/LeadNaming';
import Button from '../ui/Button';
import Image from 'next/image';
import EditLead from './EditLead';
import { useRouter } from 'next/navigation';

interface LeadCardProps {
  data: ILeads | IUser;
}

const UserCard = ({ data }: LeadCardProps) => {
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<ILeads | IUser | null>(data);
  const router = useRouter();

  const handleReload = () => {
    router.refresh();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  const isLead = (data: ILeads | IUser): data is ILeads => {
    return (data as ILeads).leadType !== undefined;
  };

  const currentOptions = isLead(data)
    ? {
      userType: data.leadType,
      status: data.status,
      currentSituation: data.currentSituation,
      complementTreatment: data.complementTreatment,
    }
    : {
      userType: data.userType,
      status: data.status,
    };

  return (
    <div className="shadow-main flex h-min w-[400px] flex-col gap-4 rounded-md border border-violet-main bg-neutral-white2 px-9 py-6">
      <div className='flex items-center gap-3'>
        <Image src="/landing/testimonies/1.png" alt="Lead" width={141} height={141} className="rounded-full bg-green-300" />
        <div>
          <Typography variant='p' color='default' size='base' text={`${data.name} ${data.lastName}`} weight='medium' />
          <Typography variant='p' color='default' size='sm' text={data.country!} weight='medium' />
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Phone size={20} />
        <Typography variant='p' color='default' size='sm' text={"Teléfono: " + data.phoneNumber} weight='medium' />
      </div>
      <div className='flex items-center gap-2'>
        <Mail size={20} />
        <Typography variant='p' color='default' size='sm' text={"E-mail: " + data.email} weight='medium' />
      </div>

      <div className='border-b border-violet-main' />

      {isLead(data) ? (
        <>
          <div className='flex items-center gap-2'>
            <User size={20} />
            <Typography variant='p' color='default' size='sm' text="Usuario" weight='medium' />
            <DropdownLead
              title="Usuario"
              options={Object.values(LeadTypeNames)}
              selectedOption={LeadTypeNames[currentOptions.userType]}
              onSelect={(option) => {
                const selectedKey = Object.keys(LeadTypeNames).find((key) => LeadTypeNames[key as keyof typeof LeadTypeNames] === option);
                if (selectedKey) {
                  setCurrentUser({ ...data, leadType: selectedKey as ILeadType });
                }
              }}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Smartphone size={20} />
            <Typography variant='p' color='default' size='sm' text="Estado" weight='medium' />
            <DropdownLead
              title="Estado"
              options={Object.values(LeadStatusNames)}
              selectedOption={currentOptions.status && currentOptions.status in LeadStatusNames ? LeadStatusNames[currentOptions.status as keyof typeof LeadStatusNames] : ''}
              onSelect={(option) => {
                const selectedKey = Object.keys(LeadStatusNames).find((key) => LeadStatusNames[key as keyof typeof LeadStatusNames] === option);
                if (selectedKey) {
                  setCurrentUser({ ...data, status: selectedKey as ILeadStatus });
                }
              }}
            />
          </div>

          <div className='border-b border-violet-main' />

          {data.currentSituation && (
            <div className='flex items-center gap-2'>
              <Heart size={20} />
              <Typography variant='p' color='default' size='sm' text="Salud" weight='medium' />
              <DropdownLead
                title="Salud"
                options={Object.values(LeadCurrentSituationNames)}
                selectedOption={currentOptions.currentSituation && currentOptions.currentSituation in LeadCurrentSituationNames ? LeadCurrentSituationNames[currentOptions.currentSituation as keyof typeof LeadCurrentSituationNames] : ''}
                onSelect={(option) => {
                  const selectedKey = Object.keys(LeadCurrentSituationNames).find((key) => LeadCurrentSituationNames[key as keyof typeof LeadCurrentSituationNames] === option);
                  if (selectedKey) {
                    setCurrentUser({ ...data, currentSituation: selectedKey as ICurrentSituation });
                  }
                }}
              />
            </div>
          )}

          <div className='flex items-center gap-2'>
            <SquarePen size={20} />
            <Typography variant='p' color='default' size='sm' text="Tratamiento" weight='medium' />
            <DropdownLead
              title="Tratamiento"
              options={Object.values(LeadComplementTreatmentNames)}
              selectedOption={currentOptions.complementTreatment && currentOptions.complementTreatment in LeadComplementTreatmentNames ? LeadComplementTreatmentNames[currentOptions.complementTreatment as keyof typeof LeadComplementTreatmentNames] : ''}
              onSelect={(option) => {
                const selectedKey = Object.keys(LeadComplementTreatmentNames).find((key) => LeadComplementTreatmentNames[key as keyof typeof LeadComplementTreatmentNames] === option);
                if (selectedKey) {
                  setCurrentUser({ ...data, complementTreatment: selectedKey as keyof typeof LeadComplementTreatmentNames });
                }
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div className='flex items-center gap-2'>
            <User size={20} />
            <Typography variant='p' color='default' size='sm' text="Usuario" weight='medium' />
            <DropdownLead
              title="Usuario "
              options={['Niño | Adolescente', 'Adulto', 'Profesional', 'Empresa']}
              selectedOption={'Adulto'}
              onSelect={(option) => console.log(option)}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Smartphone size={20} />
            <Typography variant='p' color='default' size='sm' text="Estado" weight='medium' />
            <DropdownLead title="Estado " options={['Admin', 'Cliente']} selectedOption={data.userType} onSelect={(option) => console.log(option)} />
          </div>
          <div className='flex items-center gap-2'>
            <DollarSign size={20} />
            <Typography variant='p' color='default' size='sm' text="Estado Plan" weight='medium' />
            <DropdownLead title="Estado Plan" options={['Activo', 'Inactivo']} selectedOption={'Activo'} onSelect={(option) => console.log(option)} />
          </div>
          <div className='flex items-center gap-2'>
            <DollarSign size={20} />
            <Typography variant='p' color='default' size='sm' text="Tipo Plan" weight='medium' />
            <DropdownLead title="Tipo Plan" options={['Mensual', 'Anual']} selectedOption={'Mensual'} onSelect={(option) => console.log(option)} />
          </div>

          <div className='border-b border-violet-main' />

          <div className='flex items-center gap-2'>
            <ChartNoAxesColumn size={20} />
            <Typography variant='p' color='default' size='sm' text="Progreso" weight='medium' />
            <DropdownLead title="Progreso" options={['Principiante', 'Intermedio', 'Avanzado']} selectedOption={'Principiante'} onSelect={(option) => console.log(option)} />
          </div>
          <div className='flex items-center gap-2'>
            <Heart size={20} />
            <Typography variant='p' color='default' size='sm' text="Salud" weight='medium' />
            <DropdownLead title="Salud" options={Object.values(LeadCurrentSituationNames)} selectedOption={'En tratamiento'} onSelect={(option) => console.log(option)} />
          </div>
          <div className='flex items-center gap-2'>
            <SquarePen size={20} />
            <Typography variant='p' color='default' size='sm' text="Tratamiento" weight='medium' />
            <DropdownLead title="Tratamiento" options={Object.values(LeadComplementTreatmentNames)} selectedOption={'Investigando'} onSelect={(option) => console.log(option)} />
          </div>

        </>
      )}

      <div className='mt-4 flex h-12 gap-2'>
        <Button variant='primary' text='Editar' icon={<SquarePen size={20} />} iconPosition='right' onClick={() => setOpenEditForm(true)} className='flex-1 items-center justify-center !py-0 font-semibold' />
        <Button variant='secondary' text='Eliminar' icon={<Trash2 size={20} />} iconPosition='right' onClick={() => console.log('Delete')} className='flex-1 items-center justify-center !py-0 font-semibold' />
      </div>

      {openEditForm && (
        <div className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50' onClick={() => setOpenEditForm(false)}>
          <EditLead lead={currentUser as ILeads} externalSubmit={() => {
            setOpenEditForm(false)
            handleReload()
          }} />
        </div>
      )}
    </div>
  );
}

export default UserCard;
