import React from "react";

import styles from "./Dashboard.module.css";

import FeedComponent from "../../components/Outlets/FeedComponent";

const Dashboard = props => {
  props.handleStatus(true);

  return (
    <div className={styles.dashboardContainer}>
      <h1>Dashboard</h1>

      {props.userFeedData.length > 0 ? (
        <div className={styles.feedRender}>
          {props.userFeedData
            .filter(f => f.visible)
            .map((f, i) => (
              <FeedComponent feedData={f} key={f.outlet_name} />
            ))}
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Dashboard;

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
