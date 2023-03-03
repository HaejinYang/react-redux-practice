import * as React from 'react';
import {createStore} from 'redux';
import {Provider, useSelector, useDispatch, connect} from "react-redux";
import './style.css';


const reducer = (state, action) => {
  if(state === undefined) {
    return {
      num: 1,
    };
  }

  const newState = {...state};

  switch(action.type) {
    case 'PLUS':
      newState.num++;
      break;
    default:
      throw Error("can not reached");
  }

  return newState;
}

const store = createStore(reducer);

export default function App() {
  const [num, setNum] = React.useState(0);

  return (
    <div id="container">
      Root : {num}
      <div id="grid">
        <Provider store={store}>
          <Left1/>
          <Right1/>
        </Provider>
      </div>
    </div>
  );
}

const Left1 = () => {
  return (
    <div>
      Left1 
      <Left2/>
    </div>
  );
};

const Left2 = () => {
  return (
    <div>
      Left2
      <Left3/>
    </div>
  );
};

const Left3 = () => {
  const num = useSelector((state: {num}) => state.num); 
  // 그리고 매우 중요한 포인트
  // 이 컴포넌트만 바뀌고 상위 컴포넌트는 렌더링 되지 않는다.
  return (
    <div>
      Left3 : {num}
    </div>
  );
};

const Right1 = () => {
  return (
    <div>
      Right1
      <Right2/>
    </div>
  );
};

const Right2 = () => {
  return (
    <div>
      Right2
      <Right3/>
    </div>
  );
};

const Right3 = () => {
  const dispatch = useDispatch();
  return (
    <div>
      Right3
      <input type="button" value="+" onClick={() => {
        dispatch({type: 'PLUS'});
      }}></input>
    </div>
  );
};

// 이런 상황에서 상상을 해보자...
// Root에서 Left1억, Root에서 Right1억까지 수정하는 광경을
// 마치 이것은 유선으로 연결되어 있어 하나라도 끊기면 안되는 것이랑 같다.
// 만약 유선이 아니라 무선이라면, 블루투스라면 이 선을 끊고 직접 연결할 수 있을 것이다.