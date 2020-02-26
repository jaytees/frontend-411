import React from 'react';
import styles from './Column.module.css';
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'

const Column = ( props ) => {
  return(
    <div className={ styles.container }>
      <h3 className={ styles.title }>{ props.column.title }</h3>
        <Droppable droppableId={ props.column.id }>
          { (provided) => (
              <div className={ styles.feed } ref={provided.innerRef} {...provided.droppableProps} >

              { props.tasks.map( (task, index) => <Task key={ task.id } task={ task } index={index} />)}

              {provided.placeholder}

              </div>
          )}
        </Droppable>
    </div>
  )
}

export default Column;


// <Droppable droppableId={ props.column.id }>
//   { provided => (
//     <div className={ styles.feed } innerRef={provided.innerRef} {...provided.droppableProps} >
//       { props.tasks.map( task => <Task key={ task.id } task={ task } /> ) }
//
//       {provided.placeholder}
//     </div>
//   )}
// </Droppable>
