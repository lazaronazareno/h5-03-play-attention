'use client';
import { LeadComplementTreatmentNames, LeadCurrentSituationNames, LeadStatusNames, LeadTypeNames } from '@/constants/LeadNaming';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';

interface DropdownLeadProps {
  title: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  background?: string;
  dropUp?: boolean;
}

const DropdownLead = ({ title, options, selectedOption, onSelect, background, dropUp }: DropdownLeadProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(selectedOption);

  const getMappedOptions = () => {
    switch (title) {
      case "Usuario":
        return LeadTypeNames;
      case "Estado":
        return LeadStatusNames;
      case "Tratamiento":
        return LeadComplementTreatmentNames;
      case "Salud":
        return LeadCurrentSituationNames;
      default:
        return null;
    }
  };

  const mappedOptions = getMappedOptions();

  return (
    <div className="relative">
      <button
        className={`${background ? background : 'bg-violet-secondary/20'} shadow-main rounded-md py-1 px-2 flex items-center gap-2 capitalize cursor-pointer`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.charAt(0).toUpperCase() + selected.slice(1).toLowerCase()}
        <ChevronDown size={20} />
      </button>
      {isOpen && (
        <ul className={`bg-neutral-white2 absolute flex flex-col gap-2 min-w-32 rounded-md shadow-main border p-2 z-10 ${dropUp ? '-top-40' : 'top-0'}`}>
          <li
            className="flex cursor-pointer justify-between border-b border-violet-main/50 font-semibold text-violet-main"
            onClick={() => setIsOpen(!isOpen)}
          >
            {title}
            <ChevronUp size={20} />
          </li>
          {mappedOptions
            ? Object.entries(mappedOptions).map(([key, value]) => (
              <li
                key={key}
                onClick={() => {
                  onSelect(value);
                  setSelected(value);
                  setIsOpen(false);
                }}
                className='cursor-pointer rounded-md hover:bg-violet-secondary/20'
              >
                {value}
              </li>
            ))
            : options.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  onSelect(option);
                  setSelected(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownLead;
