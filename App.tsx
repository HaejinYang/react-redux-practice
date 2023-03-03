import * as React from 'react';

import './style.css';

export default function App() {
  const [num, setNum] = React.useState(0);

  return (
    <div id="container">
      Root : {num}
      <div id="grid">
        <Left1 num={num} />
        <Right1 onIncrease={() => {
          setNum(num + 1);
        }}/>
      </div>
    </div>
  );
}

const Left1 = ({ num }) => {
  return (
    <div>
      Left1 : {num}
      <Left2 num={num} />
    </div>
  );
};

const Left2 = ({ num }) => {
  return (
    <div>
      Left2 : {num}
      <Left3 num={num} />
    </div>
  );
};

const Left3 = ({ num }) => {
  return (
    <div>
      Left3 : {num}
    </div>
  );
};

const Right1 = (props) => {
  return (
    <div>
      Right1
      <Right2 onIncrease={()=>{
        props.onIncrease();
      }}  />
    </div>
  );
};

const Right2 = (props) => {
  return (
    <div>
      Right2
      <Right3 onIncrease={() => {
        props.onIncrease();
      }} />
    </div>
  );
};

const Right3 = (props) => {
  return (
    <div>
      Right3
      <input type="button" value="1" onClick={() => {
        props.onIncrease();
      }}></input>
    </div>
  );
};

// 이런 상황에서 상상을 해보자...
// Root에서 Left1억, Root에서 Right1억까지 수정하는 광경을
// 마치 이것은 유선으로 연결되어 있어 하나라도 끊기면 안되는 것이랑 같다.
// 만약 유선이 아니라 무선이라면, 블루투스라면 이 선을 끊고 직접 연결할 수 있을 것이다.