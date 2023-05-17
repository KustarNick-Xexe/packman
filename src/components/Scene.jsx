import { useRef } from 'react';
import { Canvas, extend, useThree} from '@react-three/fiber';
import { BoxGeometry, LineBasicMaterial, LineSegments, EdgesGeometry, ArrowHelper, Vector3  } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const Box = ({ position, dimensions, isFrigile }) => {
    const boxRef = useRef();
    const edges = new EdgesGeometry(new BoxGeometry(...dimensions));
    const line = new LineSegments(edges, new LineBasicMaterial({ color: 0x000000 }));

    return (
        <group>
            <mesh position={position} ref={boxRef}>
                <boxGeometry args={dimensions} />
                <meshBasicMaterial color={isFrigile ? '#03d9ff' : '#0370ff'} />
            </mesh>
            <primitive object={line} position={position} />
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

    return (
        <Canvas>
            <ambientLight />
            <Controls />
            <primitive object={containerLine} />
            <primitive object={arrowX} />
            <primitive object={arrowY} />
            <primitive object={arrowZ} />
            <gridHelper args={[14, 10]} />
            {boxes.map((box, i) => (
                <Box key={i} position={[box[0], box[1], box[2]]} dimensions={[box[3], box[4], box[5]]} isFrigile={box[6]} />
            ))}
        </Canvas>
    );
};

export default Scene;
