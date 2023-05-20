import { useRef } from 'react';
import { Canvas, extend, useThree} from '@react-three/fiber';
import { BoxGeometry, LineBasicMaterial, LineSegments, EdgesGeometry, ArrowHelper, Vector3  } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const Box = ({ position, dimensions, isFrigile }) => {
    const boxRef = useRef();
    const edges = new EdgesGeometry(new BoxGeometry(...dimensions));
    const line = new LineSegments(edges, new LineBasicMaterial({ color: 0x000000 }));

    // Compute the offset for each box
    const offset = dimensions.map(dimension => dimension / 2);

    return (
        <group>
            <mesh position={[position[0] + offset[0], position[1] + offset[1], position[2] + offset[2]]} ref={boxRef}>
                <boxGeometry args={dimensions} />
                <meshBasicMaterial color={isFrigile ? '#be9c6c' : '#a3834f'} />
            </mesh>
            <primitive object={line} position={[position[0] + offset[0], position[1] + offset[1], position[2] + offset[2]]} />
        </group>
    );
};


const Controls = () => {
    const orbitRef = useRef();
    const { camera, gl } = useThree();

    return (
        <orbitControls
            autoRotate
            args={[camera, gl.domElement]}
            ref={orbitRef}
        />
    );
};

const Scene = ({ boxes, containerDimensions }) => {
    const containerEdges = new EdgesGeometry(new BoxGeometry(...containerDimensions));
    const containerLine = new LineSegments(containerEdges, new LineBasicMaterial({ color: 0x000000 }));

    const arrowX = new ArrowHelper(new Vector3(1, 0, 0), new Vector3(0, 0, 0), containerDimensions[0], 'red');
    const arrowY = new ArrowHelper(new Vector3(0, 1, 0), new Vector3(0, 0, 0), containerDimensions[1], 'green');
    const arrowZ = new ArrowHelper(new Vector3(0, 0, 1), new Vector3(0, 0, 0), containerDimensions[2], 'blue');

    // Compute the offset for the container
    const containerOffset = containerDimensions.map(dimension => dimension / 2);

    // Set the size of the grid to be the same as the container's base dimensions
    const gridSize = [containerDimensions[0] + 5, containerDimensions[2] + 5];

    // Position the grid in the bottom quarter of the container
    const gridPosition = [containerOffset[0], 0, containerOffset[2]];

    return (
        <Canvas>
            <ambientLight />
            <Controls />
            <primitive object={containerLine} position={containerOffset} />
            <primitive object={arrowX} />
            <primitive object={arrowY} />
            <primitive object={arrowZ} />
            <gridHelper args={gridSize} position={gridPosition} divisions={40}/>
            {boxes.map((box, i) => (
                <Box key={i} position={[box[0], box[2], box[1]]} dimensions={[box[3], box[5], box[4]]} isFrigile={box[6]} />
            ))}
        </Canvas>
    );
};


export default Scene;
