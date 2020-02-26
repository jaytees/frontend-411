import React from 'react';
import styles from './Task.module.css'
import { Draggable } from 'react-beautiful-dnd'


const Task = ( props ) => {
  return(
    <Draggable draggableId={props.task.id} index={props.index}>
    { (provided) => (
      <div className={ styles.container }
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      >
        { props.task.content }
      </div>

    )}
    </Draggable>
  )
}

export default Task;
