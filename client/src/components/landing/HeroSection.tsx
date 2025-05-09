import React from 'react';
import Button from '../ui/Button';
import { RightArrow } from '../ui/icons';
import HeroImage from '../ui/HeroImage';
import Typography from '../ui/Typography';
import Link from 'next/link';

interface HeroSectionProps {
  imageUrl: string;
  title: string;
  description: string;
  button1Text: string;
  button2Text?: string;
  link1?: string;
  link2?: string;
}

const HeroSection = ({ imageUrl, title, description, button1Text, button2Text, link1, link2 }: HeroSectionProps) => {
  return (
    <div id="herosection" className="mx-auto flex h-full flex-col items-start justify-center gap-8 p-8 lg:flex-row lg:items-center lg:gap-24 lg:p-20">
      <div className='flex max-w-[568px] flex-col gap-7'>
        <Typography variant='h1' size='title' color='violet' weight='medium' text={title} />
        <Typography variant='p' size='base' color='default' weight='medium' text={description} />
        <div className='flex flex-wrap gap-4 lg:gap-8'>
          {link1 ? (
            <Link href={link1}>
              <Button
                text={button1Text}
                variant='primary'
                icon={<RightArrow />}
                iconPosition='right'
              />
            </Link>
          ) : (
            <Button
              text={button1Text}
              variant='primary'
              icon={<RightArrow />}
              iconPosition='right'
            />
          )}
          {link2 && button2Text && (
            <Link href={link2}>
              <Button
                text={button2Text}
                variant='primary'
                icon={<RightArrow />}
                iconPosition='right'
              />
            </Link>
          )}
          {button2Text && !link2 && (
            <Button
              text={button2Text}
              variant='secondary'
              icon={<RightArrow />}
              iconPosition='right'
            />
          )}
        </div>
      </div>
      <HeroImage
        imageUrl={imageUrl}
        title='Hero Image'
      />
    </div>
  );
};

export default HeroSection;
