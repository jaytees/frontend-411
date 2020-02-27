import React, {useState, useReducer, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './Setup.css';

const Setup = () => {
  const history = useHistory()
  const [selected, setSelected] = useState(false);
  const [outlets, setOutlets] = useState([]);
  const [userPreferences, setUserPreferences] = useState({})



  useEffect( () => {

    const token = localStorage.getItem('x-auth-header');
    if (!token) {
      history.push('/login');
    }

    let url = '';
    if ( process.env.NOSE_ENV !== 'production'){
      url = 'http://localhost:5000';
    }

    axios.get(`${url}/outlet/index`)
      .then( res => {
        // console.log(res.data);

        const results = res.data;

        results.map( (result) => {

          let outletObject = {
              outlet_name: result.outlet_name,
              outlet_route: result.outlet_route,
              categories: result.categories[0]
          }

          setOutlets(outlets => [...outlets, outletObject])

        })
      })
      .catch( err => console.warn(err))

  }, [])


  const handleClick = ( clickedIcon ) => {
    console.log('click', clickedIcon)

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


        console.log(userPreferences);

      }; //handle click






  const handleSubmit = ( event ) => {
    event.preventDefault();

    let url = '';
    if ( process.env.NODE_ENV !== 'production' ) {
      url = 'http://localhost:5000';
    };
    const token = localStorage.getItem('x-auth-header');
    // console.log(token);

    axios.defaults.headers.common['x-auth-header'] = token;

    axios.post(`${url}/user2/setup`, {
      userPreferences
    })
    .then( res => {
      console.log(res);

      history.push('/dashboard');
    })
    .catch( err => console.log(err))
  }



  let outletContent;

  if( outlets.length === 0){

    outletContent = <div>Loading outlet content...</div>

  } else {
      // console.log(outlets);

      outletContent = <div>
            {
              outlets.map( ( outlet ) => {
                // console.log(outlet);

                let outlet_name = outlet.outlet_name.split(' ').join('-');

                return <div onClick={ () => handleClick( outlet_name ) } className="circle animation" id={outlet_name}></div>

              })

            }
              <button onClick={handleSubmit}>Update preferences</button>
          </div>

  } //content if



  return(
    <div className="setup-container">
      <h1> Profile Setup Page </h1>


        { outletContent }


    </div>
  )
}

export default Setup;
