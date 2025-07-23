import React from 'react';
import Typography from '../ui/Typography';
import ImageDouble from '../ui/ImageDouble';
import ItemInfo from '../dashboard/ItemInfo';

interface ImpactSectionProps {
  title: string
  description: string
  aditionalDescription?: string
  titlePosition: 'up' | 'down'
  titleAlignament?: 'center' | 'left'
  imageUrl: string
  imageUrl2: string
  imagesPosition: 'left' | 'right'
  color: 'violet' | 'green'
  bgColor?: 'violet' | 'green' | 'white'
  type: 'text' | 'list'
  text1?: string
  text2?: string
  listItems?: {
    title: string;
    description: string;
  }[]
}

const ImpactSection = ({ title, description, aditionalDescription, titlePosition, titleAlignament, imageUrl, imageUrl2, imagesPosition, color, bgColor, type, text1, text2, listItems }: ImpactSectionProps) => {
  return (
    <div id='impact' className={`flex flex-col p-8 lg:p-20 mx-auto ${bgColor === 'violet' ? 'bg-violet-secondary/20' : bgColor === 'green' ? 'bg-green-300/20' : 'bg-white'}`}>
      <div className={`flex ${titlePosition === 'up' ? 'flex-col' : 'flex-col-reverse'} ${titleAlignament === 'center' ? 'items-center' : 'items-start'} gap-2`}>
        <Typography variant='h2' size='subtitle' color='green' weight='semibold' text={title} />
        <Typography variant='p' size='base' color='default' weight='normal' text={description} />
      </div>
      {aditionalDescription && <div className='mt-8 w-full'>
        <Typography variant='p' size='base' color='default' weight='medium' text={aditionalDescription} /></div>}
      <div className={`flex flex-wrap ${imagesPosition === 'left' ? 'flex-row' : 'flex-row-reverse'} gap-8 lg:gap-20 mt-8 lg:mt-16`}>

        <div className='flex flex-1 justify-center'>
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
                <Typography variant='p' size='base' color='default' weight='normal' className='mb-4' text={text1} />
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
