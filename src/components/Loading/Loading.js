import React, {useEffect, useState} from 'react';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import ReactLoading from 'react-loading';
import * as scriptLoader from './16574-loading.json'
import * as doneData from './433-checked-done.json'

const defaultOptions2 = {
   loop: false,
   autoplay: true,
   animationData: doneData.default,
   rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
   }
};


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: scriptLoader.default,
  renderSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}



const Loading = (props) => {


  return(
    <FadeIn>
      <Lottie options={defaultOptions} height={300} width={300} />
      <p>your content...</p>
    </FadeIn>
  )
}

export default Loading;


// <FadeIn>
//   {
//     props.isLoading ? (<div>
//       <Lottie options={defaultOptions} height={300} width={300} />
//     </div>)
//     :
//     ( <Lottie options={defaultOptions2} height={150} width={150}/>)
//   }
// </FadeIn>
