import React from 'react';
import axios from 'axios';

import styles from './OutletViewer.module.css'

const OutletViewer = ( props ) => {

  let selections = []

  const handleCategorySelect = ( category_name ) => {
    // console.log('profilehandler', outlet_name, category_name);

    selections.push( category_name )

    console.log(selections);
  }

  // const handleSubmit = ( outlet, selections ) => {
  //
  //
  //   let url;
  //   if ( process.env.NODE_ENV !== 'production') {
  //     url = 'http://localhost:5000';
  //   }
  //
  //
  //   axios.post(`${url}/user/outlets/update`,{
  //
  //   })
  //     .then( res => {
  //       console.log('res from post', res);
  //     })
  //     .catch( err => console.warn( err ))
  //
  // }



  return(
    <div className={ styles.container } key={ props.outletInfo.outlet_name}>
      <div className={ styles.header }>{ props.outletInfo.outlet_name }</div>
      <div className={ styles.categoryContainer }>
      <div className={ styles.categoriesTitle }>
          <h2>Available Categories</h2>
      </div>
        {
          props.outletInfo.categories.map( c => {
            return (
              <div className={ styles.categoryType }>
                <h4 className={ styles.categoryTitle}>{ c.category_name }</h4>
                <div className={ styles.categorySelect } onClick={ () => handleCategorySelect( c.category_name ) }></div>
              </div>
            )
          })
        }
      </div>
        <button onClick={ () => props.submitSelections( props.outletInfo.outlet_name, selections ) }>Submit Subscriptions</button>
    </div>
  )
};

export default OutletViewer

// for passing selections back to profile



// <button onClick={ () => handleSubmit( props.outletInfo.outlet_name, selections ) }>Submit Subscriptions</button>
