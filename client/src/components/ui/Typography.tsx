import React, { JSX } from 'react';

interface TypographyProps {
  text: string;
  variant: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  color: 'default' | 'violet' | 'white';
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
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

const Typography = ({ text, variant, className, color, size, weight }: TypographyProps) => {
  const colorClass = color === 'white' ? 'text-white' : color === 'violet' ? `text-violet-main` : '';
  const sizeClass = 'text-' + size;
  const weightClass = 'font-' + weight;
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