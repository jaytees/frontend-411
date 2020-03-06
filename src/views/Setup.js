import React, {useState, useReducer, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './Setup.css';

const Setup = ( props ) => {
  const history = useHistory()
  const [selected, setSelected] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [userPreferences, setUserPreferences] = useState({})



  useEffect( () => {

    const token = localStorage.getItem('x-auth-header');
    if (!token) {
      history.push('/login');
    }


    let url = process.env.REACT_APP_API;

    axios.get(`${url}/outlet/index`)
      .then( res => {

        const results = res.data;

        results.map( (result) => {

          let outletObject = {
              outlet_name: result.outlet_name,
              outlet_route: result.outlet_route,
              thumbnail: result.thumbnail,
              categories: result.categories[0]
          }

          setOutlets(outlets => [...outlets, outletObject])

        })
      })
      .catch( err => console.warn(err))

  }, [])


  const handleClick = ( clickedIcon ) => {

    //push outlet name onto the array
    //toggle border color

    // const key = 'outlet_name';
    const value = clickedIcon.split('-').join(' ');

    outlets.forEach( item => {
          // console.log(item);
        if (item.outlet_name === value ) {

            setUserPreferences({...userPreferences,
                    [item.outlet_name]: {
                      [item.categories.category_name]: item.categories.category_url
                    }})
                  }//if
        }) //for each


      }; //handle click



  const handleSubmit = ( event ) => {
    event.preventDefault();

    let url = process.env.REACT_APP_API;

    const token = localStorage.getItem('x-auth-header');
    // console.log(token);

    axios.defaults.headers.common['x-auth-header'] = token;

    axios.post(`${url}/user/setup`, {
      userPreferences
    })
    .then( res => {

      props.handleStatus( true );

      history.push('/dashboard');
    })
    .catch( err => console.log('from catch setup', err))
  }




  let outletContent;

  if( outlets.length === 0){

    outletContent = <div>Loading outlet content...</div>

  } else {


      outletContent = <div className="icons">
            {
              outlets.map( ( outlet ) => {


                let outlet_name = outlet.outlet_name.split(' ').join('-');

                return (

                    <img src={ outlet.thumbnail } onClick={ () => handleClick( outlet_name ) } id={outlet_name} className="circle animation"></img>

                )

              })

            }
          </div>

  } //content if



  return(
    <div className="setup-container">
      <h1> Profile Setup Page </h1>


        { outletContent }

        <div className="btn" onClick={handleSubmit}>Done</div>
    </div>
  )
}

export default Setup;
