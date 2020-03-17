import React, {useState} from 'react'
import {useDrop} from 'react-dnd'
import ItemTypes from './ItemTypes'
import Node from './Node'
import update from 'immutability-helper'
import config from '../options/config'
import Modal from "@skbkontur/react-ui/Modal";
import Button from '@skbkontur/react-ui/Button';
import './Field.css';
import areVectorsCrossed from '../utils/findIntersection';

const Field = () => {
    const [nodes, setNodes] = useState(config.nodes);
    const [edges, setEdges] = useState(config.edges);
    const [isModalOpen, showModal] = useState(false);
    const fieldSize = 555;
    const radius = 20;

    const [, drop] = useDrop({
        accept: ItemTypes.NODE,
        drop() {
            const checked = [];

            for (let edge1 of edges) {
                for (let edge2 of edges) {
                    if (checked.includes(edge2)) {
                        continue;
                    }

                    if (areVectorsCrossed(nodes[edge1[0]], nodes[edge1[1]],
                        nodes[edge2[0]], nodes[edge2[1]])) {

                        return
                    }
                }

                checked.push(edge1);
            }

            showModal(true);

        },
        hover(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();
            let left = Math.round(item.left + delta.x);
            let top = Math.round(item.top + delta.y);
            top = top < 0 ? 0 : top > fieldSize ? fieldSize : top;
            left = left < 0 ? 0 : left > fieldSize ? fieldSize : left;

            moveNode(item.id, left, top);
        }
    });

    const moveNode = (id, left, top) => {
        setNodes(
            update(nodes, {
                [id]: {
                    $merge: {left, top},
                },
            }),
        );
    };

    return (
        <div className={'field'} ref={drop}>

            <svg className={'edge'}>
                {edges.map(([a, b]) => {

                    return (
                        <line x1={nodes[a].left + radius}
                              y1={nodes[a].top + radius}
                              x2={nodes[b].left + radius}
                              y2={nodes[b].top + radius}
                        />
                    );
                })}
            </svg>

            {Object.keys(nodes).map(key => {
                const {left, top} = nodes[key];

                return (
                    <Node
                        key={key}
                        id={key}
                        left={left}
                        top={top}
                    >
                        {key}
                    </Node>
                )
            })}
            {isModalOpen && <Modal width={'200px'} noClose={true}>
                <Modal.Body>
                    <p>Вы выиграли!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        showModal(false);
                        setNodes(config.nodes);
                        setEdges(config.edges);
                    }}>Начать заново</Button>
                </Modal.Footer>
            </Modal>}
        </div>
    )
};

export default Field;
