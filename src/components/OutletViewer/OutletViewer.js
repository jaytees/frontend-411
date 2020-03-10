import React from 'react';
import axios from 'axios';

import styles from './OutletViewer.module.css'

const OutletViewer = ( props ) => {


  //makes post request to backend on every click and passes response to top level
  const handleCategorySelect = ( action, category_name, category_url ) => {

    let selections = {
      outlet_name: props.outletInfo.outlet_name,
      category_name,
      category_url,
      action,
    }

      //ajax post
      let url = process.env.REACT_APP_API;

      axios.post(`${url}/user/outlets/update`,{
          selections
      })
        .then( res => {
          
          props.handleSelection( res.data )
        })
        .catch( err => console.warn( err ))

  } //handleCategorySelect



  let outletID = props.outletInfo.outlet_name.split(' ').join('-');

  return(
    <div className={ styles.container } key={ props.outletInfo.outlet_name}>
      <div className={ styles.header }>
        <img src={require(`../../assets/${outletID}.png`)} id={ styles.outletID } className={ styles.circle } alt={ props.outletInfo.outlet_name }></img>
          <div className={ styles.headerText }>
            <h2>{ props.outletInfo.outlet_name }</h2>
          </div>
      </div>
      <div className={ styles.categoryContainer }>
      <div className={ styles.categoriesTitle }>
          <h2>Available Categories</h2>
      </div>
        {
          props.outletInfo.categories.map( (c, i) => {
            return (
              <div className={ styles.categoryType } key={i}>
                <h4 className={ styles.categoryTitle}>{ c.category_name }</h4>
                <div className={styles.buttons}>
                    <div className={ styles.btn } onClick={ () => handleCategorySelect( 'add', c.category_name, c.category_url ) }>Add</div>
                    <div className={ styles.btn } onClick={ () => handleCategorySelect( 'remove', c.category_name, c.category_url ) }>Remove</div>
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
};

export default OutletViewer

// for passing selections back to profile



// <button onClick={ () => handleSubmit( props.outletInfo.outlet_name, selections ) }>Submit Subscriptions</button>

  // <button onClick={ () => props.submitSelections( props.outletInfo.outlet_name, selections ) }>Submit Subscriptions</button>
