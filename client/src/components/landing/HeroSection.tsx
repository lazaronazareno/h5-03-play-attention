import React from 'react';
import Button from '../ui/Button';
import { RightArrow } from '../ui/icons';
import HeroImage from '../ui/HeroImage';
import Typography from '../ui/Typography';

interface HeroSectionProps {
  imageUrl: string;
  title: string;
  description: string;
  button1Text: string;
  button2Text?: string;
}

const HeroSection = ({ imageUrl, title, description, button1Text, button2Text }: HeroSectionProps) => {
  return (
    <div id="herosection" className="h-full p-8 lg:p-20 flex flex-col items-start lg:items-center justify-center lg:flex-row gap-8 lg:gap-24 mx-auto">
      <div className='flex flex-col gap-7 max-w-[568px]'>
        <Typography variant='h1' size='title' color='violet' weight='medium' text={title} />
        <Typography variant='p' size='base' color='default' weight='medium' text={description} />
        <div className='flex flex-wrap gap-4 lg:gap-8'>
          <Button
            text={button1Text}
            variant='primary'
            icon={<RightArrow />}
            iconPosition='right'
          />
          {button2Text && (
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