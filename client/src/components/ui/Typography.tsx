import React, { JSX } from 'react';

interface TypographyProps {
  text: string;
  variant: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  color: 'default' | 'violet' | 'white' | 'green';
  size: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'subtitle' | 'title';
  weight: 'normal' | 'bold' | 'bolder' | 'lighter' | 'thin' | 'extralight' | 'light' | 'medium' | 'semibold' | 'extrabold' | 'black';
}

interface TagProps {
  text: string;
  className?: string;
}
const createTagComponent = (Tag: keyof JSX.IntrinsicElements) => {
  const Component = ({ className, text }: TagProps) => <Tag className={className || ''}>{text}</Tag>;
  Component.displayName = `${String(Tag).charAt(0).toUpperCase()}${String(Tag).slice(1)}`;
  return Component;
};

const sizeClasses = {
  sm: 'text-xs lg:text-lg',
  base: 'text-base lg:text-2xl',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  'subtitle': 'text-3xl lg:text-5xl',
  'title': 'text-3.5xl lg:text-6xl',
}

const weightClasses = {
  normal: 'font-normal',
  bold: 'font-bold',
  bolder: 'font-bolder',
  lighter: 'font-lighter',
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  medium: 'font-medium',
  semibold: 'font-semibold',
  extrabold: 'font-extrabold',
  black: 'font-black',
}

const Typography = ({ text, variant, className, color, size, weight }: TypographyProps) => {
  const colorClass = color === 'white' ? 'text-white' : color === 'green' ? 'text-green-main' : color === 'violet' ? `text-violet-main` : '';
  const sizeClass = sizeClasses[size] || 'text-base';
  const weightClass = weightClasses[weight] || 'font-normal';
  const fontClass = variant === 'p' || variant === 'span' ? 'font-poppins' : 'font-roboto';
  return (
    <>
      {createTagComponent(variant)({
        className: `${className || ''} ${colorClass} ${sizeClass} ${weightClass} ${fontClass}`,
        text: text,
      })}
    </>
  );
};

export default Typography;