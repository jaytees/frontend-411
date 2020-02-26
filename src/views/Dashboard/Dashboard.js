import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
// import Loading from './Loading'

import Grid from './Grid'
import styles from './Dashboard.module.css'

import FeedComponent from '../../components/Outlets/FeedComponent'


const Dashboard = ( props ) => {


  return(
    <div className={'dashboard-container'}>
        <h1>Dashboard</h1>

        {
          props.userFeedData
          ?
          <div className={ styles.feedRender }>
            {
             props.userFeedData.filter( f => f.visible ).map( f => (
               <FeedComponent feedData={ f }/>
             ))
           }
          </div>
          :
          <div>loading...</div>
        }


    </div>
  )
};

export default Dashboard;


// user.preferences.map( p => {
//     return (
//       <div>
//       <div key={p.outlet_name}>{p.outlet_name}</div>
//       {
//         p.categories.map( c => {
//           return(
//             <div>
//               <div onClick={ () => onFeedItemClick( p.outlet_name,  c.category_name) } key={ c.category_name }>{c.category_name}</div>
//             </div>
//
//           )
//         })
//       }
//
//       </div>
//     )
//   })

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


//beautiful drag thing

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
