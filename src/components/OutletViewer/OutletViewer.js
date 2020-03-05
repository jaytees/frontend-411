import React from 'react';
import axios from 'axios';

import styles from './OutletViewer.module.css'

const OutletViewer = ( props ) => {


  //makes post request to backend on every click and passes response to top level
  const handleCategorySelect = ( action, category_name, category_url ) => {
    // console.log('handleCategorySelect', action, category_name);

    let selections = {
      outlet_name: props.outletInfo.outlet_name,
      category_name,
      category_url,
      action,
    }

    // console.log(selections);

      //ajax post
      let url;
      if ( process.env.NODE_ENV !== 'production') {
        url = 'http://localhost:5000';
      } else {
        url = 'https://slug-news.herokuapp.com/';
      }


      axios.post(`${url}/user/outlets/update`,{
          selections
      })
        .then( res => {
          console.log('res from post', res.data);

          props.handleSelection( res.data )
        })
        .catch( err => console.warn( err ))


  } //handleCategorySelect



  let outletID = props.outletInfo.outlet_name.split(' ').join('-');

  return(
    <div className={ styles.container } key={ props.outletInfo.outlet_name}>
      <div className={ styles.header }>
        <img src={require(`../../assets/${outletID}.png`)} id={ styles.outletID } className={ styles.circle }></img>
          <div className={ styles.headerText }>
            <h2>{ props.outletInfo.outlet_name }</h2>
          </div>
      </div>
      <div className={ styles.categoryContainer }>
      <div className={ styles.categoriesTitle }>
          <h2>Available Categories</h2>
      </div>
        {
          props.outletInfo.categories.map( c => {
            return (
              <div className={ styles.categoryType }>
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
