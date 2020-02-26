import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
// import Loading from './Loading'

import Grid from './Grid'
import styles from './Dashboard.module.css'

import FeedComponent from '../../components/Outlets/FeedComponent'


const Dashboard = () => {
  // const [user, setUser] = useState({});
  const [user, setUser] = useState({ username: '',
            email: '',
            preferences: [] });
  const [userFeeds, setUserFeeds] = useState([]);
  // const [loading, setLoading] = useState(false)
  // const [loaded, setLoaded] = useState(false)
  const history = useHistory();


  let feedRenders;


  useEffect( () => {

    //check user is authenticated
    const token = localStorage.getItem('x-auth-header');
    if (token){
      // console.log('TOKEN FOUND!', token);
      axios.defaults.headers.common['x-auth-header'] = token ;
      // setTokenHeaderSet( true );
    } else {

      history.push('/login');
    }

      let url = '';
    if (process.env.NODE_ENV !== 'production') {
      url = 'http://localhost:5000';
    }


    axios.get(`${url}/user/dashboard`)
    .then(res => {

      // setLoading(true);
      //    // setTimeout(() => {
      //    //    setLoaded(true);
      //    // }, 3000);


      const user = {
          username: res.data.username,
          email: res.data.email,
          preferences: res.data.preferences
      }

      const feeds = [];
      res.data.preferences.forEach( pref => {

        pref.categories.forEach( cat => {
          feeds.push({
            label: cat.category_name, 
            outlet_name: pref.outlet_name,
            endpoint: cat.category_url,
            visible: true
          });
        }) // categories.forEach

      }); // preferences.forEach

      setUserFeeds( feeds )
      setUser( user )

    })
    .catch( err => console.warn(err))

  }, [] ) //useEffect


  const onFeedItemClick = (outlet, category) => {
    const itemIndex = userFeeds.findIndex( f => f.outlet_name === outlet && f.label === category );
    const feedsCopy = [...userFeeds];
    feedsCopy[itemIndex].visible = !feedsCopy[itemIndex].visible;
    setUserFeeds( feedsCopy );
    console.log(feedsCopy);
  };


  // const componentRender = ( outlet, category ) => {
  //   // console.log( outlet, category );
  //
  //   let feedObj;
  //
  //   userFeeds.forEach( item => {
  //     // console.log(item.outlet_name);
  //     if (item.outlet_name === outlet && item.label === category) {
  //       console.log(item);
  //       feedObj = item;
  //     }
  //
  //   });
  //
  //   // console.log(feedObj);
  //   //one component that renders all outlets
  //   //generas
  //
  //   feedRenders = <FeedComponent feedData={ feedObj } />;
  //
  //
  // } //componentRender;




// <Grid userData={ user }/>

  return(
    <div className={'dashboard-container'}>
        <h1>Dashboard</h1>

        {
          userFeeds
          ?
          user.preferences.map( p => {
              return (
                <div>
                <div key={p.outlet_name}>{p.outlet_name}</div>
                {
                  p.categories.map( c => {
                    return(
                      <div>
                        <div onClick={ () => onFeedItemClick( p.outlet_name,  c.category_name) } key={ c.category_name }>{c.category_name}</div>
                      </div>

                    )
                  })
                }

                </div>
              )
            })

          :
          <div>no feeds</div>
        }

        {
        <div className={ styles.feedRender }>
          {
           userFeeds.filter( f => f.visible ).map( f => (
             // <p>{f.label} ({f.outlet_name})</p>
             <FeedComponent feedData={ f }/>
           ))
         }
        </div>
        }

    </div>
  )
};

export default Dashboard;


// {
//   !loaded ? (<Loading loadState={ loaded }/>)
//   :
//   (
//     <div>
//     <ul>
//     {
//       user.preferences.map( (preference, i) => {
//         return <li key={i}> {preference} </li>
//       })
//     }
//     </ul>
//     </div>
//   )
// }


// user {
//   username:
//   email:
//   preferences: [{
//     outlet_name:
//     outlet_route:
//     categories: [{
//       category_name:
//       category_url:
//     }]
//   },
// ]
// }

// import { DragDropContext } from 'react-beautiful-dnd';
// import Column from './Column'
//
// const initialData = {
//   //outlet
//   tasks: {
//     //article
//     'task-1': { id: 'task-1', content: 'content-task-1'},
//     'task-2': { id: 'task-2', content: 'content-task-2'},
//     'task-3': { id: 'task-3', content: 'content-task-3'},
//     'task-4': { id: 'task-4', content: 'content-task-4'}
//   },
//
//   columns: {
//       'column-1': {
//         id: 'column-1',
//         title: 'NYT',
//         //articles
//         taskIds: ['task-1', 'task-2', 'task-3', 'task-4']    //indicates ownership, what outlet is in the column maybe
//       },
//
//     },
//     // facilitate reordering of the columns
//     columnOrder: [ 'column-1']
//
// };


// const onDragEnd = ( result ) => {
//   //responsible for syncronously updatinn drag and drop state
// }
//
// let outletContent;
//
// if( !initialData ){
//
//   outletContent = <div>Loading content...</div>
//
// } else {
//     // console.log(outlets);
//
//     outletContent = <DragDropContext onDragEnd={ onDragEnd }>
//           {
//             initialData.columnOrder.map( (columnId) => {
//               //gets column out of the state
//               const column = initialData.columns[columnId];
//               //gets task out of the column array
//               const tasks = column.taskIds.map( taskId => initialData.tasks[taskId] )
//
//               return <Column key={ column.id } column={ column } tasks={ tasks } />;
//             })
//           }
//         </DragDropContext>
//
// } //content if
