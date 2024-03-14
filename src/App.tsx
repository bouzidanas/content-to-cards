import { RevealSlides, RevealHandle } from 'react-reveal-slides'
import ReveaMarkdown from 'reveal.js/plugin/markdown/markdown';
import { PiCaretCircleRightLight, PiCaretCircleLeftLight } from "react-icons/pi";
import Reveal from "reveal.js";

import './App.css'
import { useRef, useState } from 'react';

function Cards({markdown, cardTitles}:{markdown: string, cardTitles: string[]}) {
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

  return (
    <div className='ctc-font slide-cont' style={{width: "600px", height: "600px"}}>
      <div className="nav top-nav">
        <button style={{background: "none", border: "none", flex: 0}} onClick={prevSlide}>
          <PiCaretCircleLeftLight size={45} />
        </button>
        {currentSlide - 1 >= 0 && <div className='card-tag'>
          <h4 className='roboto-medium'>{cardTitles[currentSlide - 1].toUpperCase()}</h4>
        </div>}
        <h4 className='roboto-medium' style={{transition: "all 0.7s ease-in-out"}}>{cardTitles[currentSlide].toUpperCase()}</h4>
      </div>
      <RevealSlides ref={slidesRef} plugins={[ReveaMarkdown]} progress={false} controls={false}  margin={0.225} scrollActivationWidth={0} onStateChange={handleOnStateChange} >
        <section data-markdown="" data-background-color="#EBE8DE">
          <script type="text/template">
              {markdown}
          </script>
        </section>
      </RevealSlides>
      <div className="nav bottom-nav">
        <button style={{background: "none", border: "none", flex: 0}} onClick={nextSlide} >
          <PiCaretCircleRightLight size={45} />
        </button>
        <hr style={{borderColor: "black", flex: 1}}/>
      </div>
    </div>
  )
}

export default Cards
