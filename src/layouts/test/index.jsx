import React, { useState, memo, useMemo } from 'react';



export default (props = {}) => {
    const [step, setStep] = useState(0);
    const [count, setCount] = useState(0);
    const [number, setNumber] = useState(0);

    const handleSetStep = () => {
        setStep(step + 1);
    }

    const handleSetCount = () => {
        setCount(count + 1);
    }

    const handleCalNumber = () => {
        setNumber(number + 1);
    }


    return (
        <div>
            <button onClick={handleSetStep}>step is : {step} </button>
            <button onClick={handleSetCount}>count is : {count} </button>
            <button onClick={handleCalNumber}>numberis : {number} </button>
            <hr />
            <Child step={step} count={count} number={number} /> <hr />
            <ChildMemo step={step} count={count} number={number} />
            <ChilduseMemo step={step} count={count} number={number} />
        </div>
    );
}

const Child = (props) => {
    console.log(`--- Child re-render ---`);
    return (
        <div>
            {/* <p>step is : {props.step}</p> */}
            {/* <p>count is : {props.count}</p> */}
            <p>number is : {props.number}</p>
        </div>
    )
};

const ChildMemo = memo((props) => {
    console.log(`---  ChildMemo re-render ---`);
    return (
        <div>
            {/* <p>step is : {props.step}</p> */}
            {/* <p>count is : {props.count}</p> */}
            <p>number is : {props.number}</p>
        </div>
    );
}, isEqual);
const isEqual = (prevProps, nextProps) => {
    // if (prevProps.number !== nextProps.number) {
    //     return false;
    // }
    return true;
}
const ChilduseMemo = (props) => {
    // console.log(`--- component re-render ---`);
    return useMemo(() => {
        console.log(`--- useMemo re-render ---`);
        return <div>
            {/* <p>step is : {props.step}</p> */}
            {/* <p>count is : {props.count}</p> */}
            <p>number is : {props.number}</p>
        </div>
    }, [props.number]);
}