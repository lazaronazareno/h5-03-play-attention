import React from 'react';
import Typography from '../ui/Typography';
import ImageDouble from '../ui/ImageDouble';
import ItemInfo from '../dashboard/ItemInfo';

interface ImpactSectionProps {
  title: string
  description: string
  titlePosition: 'up' | 'down'
  imageUrl: string
  imageUrl2: string
  imagesPosition: 'left' | 'right'
  color: 'violet' | 'green'
  type: 'text' | 'list'
  text1?: string
  text2?: string
  listItems?: {
    title: string;
    description: string;
  }[]
}

const ImpactSection = ({ title, description, titlePosition, imageUrl, imageUrl2, imagesPosition, color, type, text1, text2, listItems }: ImpactSectionProps) => {
  return (
    <div className='flex flex-col p-8 lg:p-20 mx-auto'>
      <div className={`flex ${titlePosition === 'up' ? 'flex-col' : 'flex-col-reverse'} gap-2`}>
        <Typography variant='h2' size='subtitle' color='green' weight='semibold' text={title} />
        <Typography variant='p' size='base' color='default' weight='normal' text={description} />
      </div>
      <div className={`flex flex-wrap ${imagesPosition === 'left' ? 'flex-row' : 'flex-row-reverse'} gap-8 lg:gap-20 mt-8 lg:mt-16`}>
        <div className='flex flex-1'>
          <ImageDouble
            imageUrl1={imageUrl}
            imageUrl2={imageUrl2}
            color={color}
          />
        </div>
        <div className='flex flex-1 flex-wrap'>
          {type === 'text' && (
            <>
              {text1 && (
                <Typography variant='p' size='base' color='default' weight='normal' text={text1} />
              )}
              {text2 && (
                <Typography variant='p' size='base' color='default' weight='normal' text={text2} />
              )}
            </>
          )}
          {type === 'list' && (
            <>
              <ul className='flex flex-col gap-4 lg:gap-9'>
                {listItems?.map((item, index) => (
                  <li key={index} className='flex items-center gap-2'>
                    <ItemInfo
                      title={item.title}
                      description={item.description}
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImpactSection;