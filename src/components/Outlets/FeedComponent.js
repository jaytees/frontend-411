import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './FeedComponent.module.css'

import Loading from '../Loading/Loading'

const FeedComponent = ( props ) => {
    const [articles, setArticles] = useState([]);

    //url from dashboard via props from top level
    useEffect( () => {
      //set articles to empty for re-render
      if (articles.length !== 0) {
        setArticles([]);
      }


    let url = `${process.env.REACT_APP_API}${props.feedData.endpoint}`;


    axios.get(url)
      .then( res => {
        // console.log(res);

        setArticles(res.data)

      })
      .catch( err => console.warn(err))


    }, [props.feedData]) //useEffect


    let outletID = props.feedData.outlet_name.split(' ').join('-');



  return(
    <div className={ styles.container } id={props.feedData.outlet_name}>
      <div className={styles.header}>
        <img src={require(`../../assets/${outletID}.png`)} alt={props.feedData.outlet_name} className={ styles.circle }></img>
        <div className={ styles.headerText }>
          <h2>{props.feedData.outlet_name}</h2>
          <p>{props.feedData.label}</p>
        </div>
      </div>

      {
        articles.length === 0 ? <Loading />
        :
        <div className={ styles.articleContainer }>
        {
          articles.map( article => {

            return (

              <div className={ styles.articleItem } key={ article.title}>
                <div className={ styles.thumbnailAndtitle }>
                  <img className={ styles.articleImage } src={ article.image } alt={ article.title }/>
                  <h4 className={ styles.articleTitle }>{ article.title }</h4>
                </div>
                <div className={ styles.articleContent}>{ article.content }</div>

                <div className={ styles.articleFooter }>
                  <a className={ styles.articleLink }href={ article.link } target="_blank">Link to Full Article</a>
                  <p className={ styles.articleCategory }>{ article.category }</p>
                </div>

              </div>
            )}
          )
        }
        </div>
        }

    </div>
  )
}

export default FeedComponent;
