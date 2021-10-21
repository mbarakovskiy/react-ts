import React, { useState, useRef, useEffect } from 'react';
import ReactDom from 'react-dom';
import './styles.css';

/**
    Сделай так, чтобы в приложении все классы заменились на функциональные компоненты, для этого используй Hooks

    Импортировать нужные хуки можно так:
        import React, { useState } from "react";

    Список хуков, которые могут пригодиться: useState, useRef, useEffect
 */

function App() {
  const lastBlockId = useRef(0);
  const [blockIds, setBlockIds] = useState<number[]>([]);

  const addNew = () => {
    lastBlockId.current++;
    setBlockIds(ids => [...ids, lastBlockId.current]);
  };

  const removeLast = () => {
    setBlockIds(ids => ids.slice(0, blockIds.length - 1));
  };

  return (
      <div className="page">
        <div className="controlPanel">
          <button type="button" onClick={removeLast} className="actionButton">
            -
          </button>
          <button type="button" onClick={addNew} className="actionButton">
            +
          </button>
        </div>
        <div className="container">
          {blockIds.map(blockId => (
              <CounterBlock key={blockId} />
          ))}
        </div>
      </div>
  );
}

function CounterBlock() {
  const [value, setValue] = useState(0);
  const timer = useRef<number | undefined>();

  useEffect(() => {
    timer.current = window.setInterval(() => setValue(value => value + 1), 1000);
    return () => {
      window.clearInterval(timer.current);
    };
  }, []);

  return <div className="block">{value}</div>;
}

ReactDom.render(<App />, document.getElementById('app'));
