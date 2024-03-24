import { RevealSlides, RevealHandle } from 'react-reveal-slides'
import ReveaMarkdown from 'reveal.js/plugin/markdown/markdown';
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";
import Reveal from "reveal.js";

import './Cards.css'
import { useLayoutEffect, useRef, useState } from 'react';

function Cards({markdown, cardTitles, noBackTitle, backgroundColor="lightgray"}:{markdown: string, cardTitles?: string[], noBackTitle?: boolean, backgroundColor?: string}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesRef = useRef<RevealHandle>(null);

  const handleOnStateChange = (state: Reveal.RevealState) => {
    setCurrentSlide(state.indexh);
  }

  const nextSlide = () => {
    if (slidesRef.current?.getReveal()?.isLastSlide() === false) {
      slidesRef.current?.getReveal()?.next();
    }
  }

  const prevSlide = () => {
    if (slidesRef.current?.getReveal()?.isFirstSlide() === false) {
      slidesRef.current?.getReveal()?.prev();
    }
  }

  useLayoutEffect(() => {
    const currentSlideContents = slidesRef.current?.getReveal()?.getCurrentSlide();
    const parentContainer = currentSlideContents?.parentElement;
    if (parentContainer) {
      const contentHeight = currentSlideContents!.getBoundingClientRect().height;
      const containerHeight = parentContainer!.getBoundingClientRect().height;
      const computedStyleFontSize = window.getComputedStyle(currentSlideContents!).fontSize;
      const computedLineHeight = window.getComputedStyle(currentSlideContents!).lineHeight;
      if (contentHeight > containerHeight) {
        currentSlideContents!.style.fontSize = `calc(${computedStyleFontSize}*${containerHeight/contentHeight} - 1px)`;
        currentSlideContents!.style.lineHeight = `calc(${computedLineHeight}*${containerHeight/contentHeight})`;
      }
      Array.from(currentSlideContents!.getElementsByTagName('img')).forEach((img) => {
        const computedHeight = window.getComputedStyle(img).height;
        img.style.maxHeight = `calc(${computedHeight}*${containerHeight/contentHeight})`;
      });
    }
  }, [currentSlide]);


  return (
    <div className='ctc-font slide-cont' style={{width: "600px", height: "600px", minHeight: "600px"}}>
      <div className="nav top-nav">
        <div className='card-tag' onClick={prevSlide} style={{cursor: "pointer"}}>
          <button style={{background: "none", border: "none", flex: 0, padding: "2px 4px 0 4px", cursor: "pointer"}}>
            <PiCaretLeftBold size={25} />
          </button>
          {!noBackTitle && cardTitles && currentSlide - 1 >= 0 && 
            <h4 className='roboto-medium'>{cardTitles[currentSlide - 1].toUpperCase()}</h4>
          }
        </div>
        {cardTitles && <h4 className='roboto-medium'>{cardTitles[currentSlide].toUpperCase()}</h4>}
      </div>
      <RevealSlides ref={slidesRef} plugins={[ReveaMarkdown]} progress={false} controls={false}  margin={0.15} scrollActivationWidth={0} onStateChange={handleOnStateChange} >
        <section data-markdown="" data-background-color={backgroundColor}>
          <script type="text/template" data-separator-vertical='^\n~~~\n'>
              {markdown}
          </script>
        </section>
      </RevealSlides>
      <div className="nav bottom-nav">
        <div className='card-tag' onClick={nextSlide} style={{cursor: "pointer"}}>
          {cardTitles && currentSlide + 1 < cardTitles.length && 
            <h4 className='roboto-medium'>{cardTitles[currentSlide + 1].toUpperCase()}</h4>
          }
          <button style={{background: "none", border: "none", flex: 0, padding: "2px 4px 0 4px", cursor: "pointer"}}>
            <PiCaretRightBold size={25} />
          </button>
        </div>
        <hr style={{borderColor: "black", flex: 1, marginRight: cardTitles ? "14px" : "4px"}}/>
      </div>
    </div>
  )
}

export default Cards
