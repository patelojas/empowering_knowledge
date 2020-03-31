import windmill from './Photos/Windmills.jpeg'; // Photo by Pixabay on Pexels
import legislation from './Photos/Legislation.jpeg'; //Photo by Helloquence on Unsplash
import congress from './Photos/Congress.jpeg'; // Photo by Matt 📸 on Unsplash 
import React, { useState } from 'react';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators, 
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: congress,
    // altText: 'Slide 1',
    // caption: 'Slide 1'
  },
  {
    src: windmill,
    // altText: 'Slide 2',
    // caption: 'Slide 2'
  },
  {
    src: legislation,
    // altText: 'Slide 3',
    // caption: 'Slide 3'
  }
];

export const Slideshow = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        style={{height: "50%"}}
      >
          <img src={item.src} alt={item.altText} style={imgStyle}/>
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

const imgStyle = {
  height: "800px",
  width: "100%",
  
}

export default Slideshow;