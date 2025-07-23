'use client'
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { LeftArrow, RightArrow } from '../ui/icons';
import TestimonyCard, { TestimonyCardProps } from '../ui/TestimonyCard';

interface SliderProps {
  items: TestimonyCardProps[];
  slidesPerView?: number;
}

const SliderTestimonials = ({ items, slidesPerView }: SliderProps) => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="relative flex w-full flex-col items-center">
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: ".next-arrow", prevEl: ".prev-arrow" }}
        centeredSlides={true}
        slidesPerView={slidesPerView || 3}
        spaceBetween={0}
        initialSlide={1}
        slideToClickedSlide={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onNavigationNext={(swiper) => setActiveIndex(swiper.activeIndex)}
        onNavigationPrev={(swiper) => setActiveIndex(swiper.activeIndex)}
        className='h-full w-full'
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className={`!flex justify-center min-w-min py-4 transition-transform bg-white duration-300 ${activeIndex === index ? 'scale-100' : 'scale-50 opacity-70'
            }`}>
            <TestimonyCard
              title={item.title}
              description={item.description}
              author={item.author}
              imageUrl={item.imageUrl}
              name={item.name}
              age={item.age}
              location={item.location}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-6 flex justify-center gap-4">
        <button
          className="prev-arrow size-10 shadow-main flex cursor-pointer items-center justify-center rounded-full border-2 border-violet-main"
        >
          <LeftArrow className="-ms-1 w-6 text-violet-main" strokeWidth={4} />
        </button>
        <button
          className="size-10 shadow-main flex items-center justify-center rounded-full border-2 border-violet-main"
        >
          <RightArrow className='next-arrow -me-0.5 w-6 cursor-pointer text-violet-main' strokeWidth={4} />
        </button>
      </div>
    </div>
  );
};

export default SliderTestimonials;
