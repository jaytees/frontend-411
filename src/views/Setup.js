import React, {useState, useReducer} from 'react';

import './Setup.css';

const Setup = () => {
  const [selected, setSelected] = useState(false);


  const handleClick = ( outlet ) => {
    // console.log('click', outlet)


    // const key = event.target.name;
    // const newValue = event.target.value;
    //
    // setUser({[key]: newValue});

    setSelected(true);

    }


  return(
    <div className="setup-container">
      <h1> Profile Setup Page </h1>


          <div onClick={ () => handleClick('time') }
            className="circle animation time"
            style={ selected ? { border: '4px solid rgb(200, 255, 175)' } : {border: '4px solid #c9c9c9'} }
          ></div>
          <div onClick={ () => handleClick('ny-times') } className="circle animation ny-times"></div>
          <div onClick={ () => handleClick('hs') } className="circle animation hs"></div>
          <div onClick={ () => handleClick('Thrasher') } className="circle animation slam-city"></div>
          <div onClick={ () => handleClick('Thrasher') } className="circle animation pandp"></div>



    </div>
  )
}

export default Setup;
