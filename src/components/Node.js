import React from 'react'
import {useDrag} from 'react-dnd'
import {DragPreviewImage} from 'react-dnd'
import ItemTypes from './ItemTypes'
import './Node.css'
import {pixel} from '../media/mediaBase64'

const Node = ({id, left, top, children}) => {
    const [, drag, preview] = useDrag({
        item: {id, left, top, type: ItemTypes.NODE},
    });

    return (
        <div className={'node'} ref={drag} style={{left, top}}>
            {children}
            <DragPreviewImage
                src={pixel}
                connect={preview}/>
        </div>
    )
};

export default Node;