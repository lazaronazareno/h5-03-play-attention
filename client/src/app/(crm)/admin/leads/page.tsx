'use client'
import React from "react";
import LeadCard from "@/components/admin/LeadCard";
import LeadsTable from "@/components/admin/LeadsTable";
import Stats from "@/components/admin/Stats";
import Typography from "@/components/ui/Typography";
import { ILeads } from "@/interfaces/IAdmin.interfaces";
import { ChevronDown, Search } from "lucide-react";
import ContactLeadSection from "@/components/admin/ContactLeadSection";

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = React.useState<ILeads | null>(null);
  //TODO: llamado a la API para obtener todos los leads
  const Leads: ILeads[] = [
    {
      id: "1",
      name: "Juan",
      lastName: "Pérez",
      email: "juanperez1@gmail.com",
      institution: "Instituto ABC",
      phoneNumber: "123456789",
      complementTreatment: "NEUROFEEDBACK",
      profession: "Psicólogo",
      targetUsers: "Adultos",
      newsletterSubscription: true,
      usageContext: "Consulta privada",
      createdAt: "2023-10-01",
      lastUpdated: "2023-10-02",
      status: "NEW",
      leadType: "PROFESSIONAL",
      notes: "Interesado en Neurofeedback",
      country: "Argentina",
      currentSituation: "INVESTIGATING",
    },
    {
      id: "2",
      name: "María",
      lastName: "Gómez",
      email: "mariagomez@gmail.com",
      institution: "Centro XYZ",
      phoneNumber: "987654321",
      complementTreatment: "NEUROFEEDBACK",
      profession: "Terapeuta",
      targetUsers: "Niños",
      newsletterSubscription: false,
      usageContext: "Clínica",
      createdAt: "2023-09-15",
      lastUpdated: "2023-09-20",
      status: "CONTACTED",
      leadType: "PROFESSIONAL",
      notes: "Solicitó información adicional",
      country: "Chile",
      currentSituation: "ADHD_DIAGNOSED",
    },
    {
      id: "3",
      name: "Carlos",
      lastName: "López",
      email: "carloslopez@gmail.com",
      institution: "Hospital General",
      phoneNumber: "456123789",
      complementTreatment: "THERAPY",
      profession: "Psiquiatra",
      targetUsers: "Adolescentes",
      newsletterSubscription: true,
      usageContext: "Hospital",
      createdAt: "2023-08-10",
      lastUpdated: "2023-08-15",
      status: "AFTER_SALES",
      leadType: "CORPORATE",
      notes: "Interesado en capacitación",
      country: "Perú",
      currentSituation: "IN_TREATMENT",
    },
    {
      id: "4",
      name: "Ana",
      lastName: "Martínez",
      email: "anamartinez@gmail.com",
      institution: "Clínica Salud",
      phoneNumber: "321654987",
      complementTreatment: "THERAPY",
      profession: "Psicóloga",
      targetUsers: "Adultos",
      newsletterSubscription: false,
      usageContext: "Consulta privada",
      createdAt: "2023-07-01",
      lastUpdated: "2023-07-05",
      status: "CLIENT",
      leadType: "INDIVIDUAL",
      notes: "Cliente recurrente",
      country: "México",
      currentSituation: "OTHER",
    },
    {
      id: "5",
      name: "Luis",
      lastName: "Fernández",
      email: "luisfernandez@gmail.com",
      institution: "Centro de Bienestar",
      phoneNumber: "789123456",
      complementTreatment: "OTHER",
      profession: "Terapeuta Ocupacional",
      targetUsers: "Niños y adolescentes",
      newsletterSubscription: true,
      usageContext: "Centro comunitario",
      createdAt: "2023-06-20",
      lastUpdated: "2023-06-25",
      status: "CANCELED",
      leadType: "PROFESSIONAL",
      notes: "Canceló por falta de presupuesto",
      country: "Colombia",
      currentSituation: "PRESCRIPTION_MEDICATION",
    },
  ]
  //TODO: llamado a la API para obtener todos los clientes y obtener TOTAL CLIENTS y TOTAL USERS Y ACTIVE USERS
  const totalClients = 5423
  const totalUsers = 1893
  //hacer calculo para obtener porcentaje de la cantidad de suscriptos en el ultimo tiempo y el total de clientes
  const porcentageClients = 16
  const porcentageUsers = -1


  return (
    <div className="flex">
      <div className={`flex justify-center px-4`}>
        {selectedLead ? (
          <LeadCard {...selectedLead} />
        ) : (
          <Stats
            totalClients={totalClients}
            porcentageClients={porcentageClients}
            totalUsers={totalUsers}
            porcentageUsers={porcentageUsers}
            activeUsers={[]}
          />
        )}
      </div>
      {selectedLead ? (
        <ContactLeadSection lead={selectedLead} setSelectedLead={setSelectedLead} status={selectedLead.status} />
      ) : (
        <div className="py-9 px-4 bg-violet-main/20 rounded-md w-full min-h-[89vh] max-h-full">
          <div className="bg-neutral-white2 px-4 h-full">
            <div className="flex py-8">
              <Typography variant="h2" color="default" size="2xl" text={"Posibles Clientes"} weight="semibold" />
              <div className="flex gap-4 ms-auto">
                {/* TODO: Reemplazar por componente */}
                <div className="flex items-center gap-2 bg-white border border-violet-main rounded-md p-2">
                  <Search size={20} className="text-violet-main" />
                  <input
                    type="text"
                    placeholder="Buscar"
                    className="outline-none bg-transparent text-gray-700 placeholder-violet-main flex-1"
                  />
                </div>
                {/* TODO: Reemplazar por componente */}
                <div className="flex items-center gap-2 bg-violet-secondary text-white rounded-md p-2">
                  <span>Ordenar por: <strong>Nuevos </strong></span>
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>
            <LeadsTable leads={Leads} totalPages={2} setSelectedLead={setSelectedLead} />
          </div>
        </div>
      )}

    </div>
  );
}