import React, { useState, useEffect } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import './Grid.css'
const ReactGridLayout = WidthProvider(RGL)


const Grid = (props) => {
   // const [layout, setLayout] = useState([]);

    // const defaultProps = {
    //   // className: "layout",
    //   items: [ 1, 2, 3, 4, 5, 6, 7],
    //   // rowHeight: 10,
    //   // onLayoutChange: () => {},
    //   // cols: 4,
    // }

    const generateDOM = () => {
      // console.log(props.userData.user);
      // const userInfo = props.userData.user.preferences;
        props.userData.user.preferences.map( (pref, i) => {
          // console.log(pref.outlet_name)
          pref.categories.map( (category) => {
            // console.log(category.category_name)
              return (
                <div key={i}>

                  <p>pref.outlet_name</p>
                    <br/>
                  <p>category.category_name</p>

                </div>
              )
          })
        })
    }// generateDOM

    // useEffect( () => {
    //   setLayout( generateLayout() )
    // }, [])
    //


    // const generateLayout = () => {
    //   return {
    //          x: 5,
    //          y: 3,
    //          w: 10,
    //          h: 1,
    //          // i: i.toString()
    //        };
    // }


    // const generateLayout = () => {
    //    const p = [ 1, 2, 3, 5];
    //     return p.map(function(item, i) {
    //       console.log('item', item);
    //       console.log(i);
    //      const y = Math.ceil(Math.random() * 4) + 1;
    //      console.log('y', y);
    //      return {
    //        x: 5,
    //        y: y,
    //        w: 10,
    //        h: 1,
    //        i: i.toString()
    //      };
    //
    //    });
    //  }




    // const layout = generateLayout(); //save to state
    // const onLayoutChange = (layout) => {
    //
    //    onLayoutChange(layout);
    //
    //  }

    //
    //

    //


    let outletContent;

    if( !props.userData.user ){

      outletContent = <div>Loading outlet content...</div>

    } else {
        // console.log(outlets);

        outletContent = <ReactGridLayout>{ generateDOM() }</ReactGridLayout>

    } //content if

    // layout={ layout }

    return(

      <div>
          { outletContent }
      </div>
    )
}

export default Grid
