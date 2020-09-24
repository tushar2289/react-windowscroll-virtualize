import React, { useState } from "react";
import {
  List,
  WindowScroller,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import { generateRandomList } from "./utils";
import Child from "./child";
import "./App.css";

function App() {
  const list = generateRandomList();
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [_windowScroller, setWindowScroller] = useState(null);
  const [nameOpened, setNameOpened] = useState({});

  const _cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 10,
  });

  const _handleOpen = (key) => {
    setNameOpened({
      ...nameOpened,
      [key]: !nameOpened[key],
    });
  };

  const _rowRenderer = ({
    index,
    isScrolling,
    isVisible,
    key,
    style,
    parent,
  }) => {
    const row = list[index];

    return (
      <CellMeasurer
        cache={_cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ measure, registerChild }) => (
          <div ref={registerChild} style={style}>
            <Child
              row={row}
              open={_handleOpen}
              isOpened={nameOpened[index]}
              measure={measure}
            />
          </div>
        )}
      </CellMeasurer>
    );
  };

  const _setRef = (windowScroller) => {
    setWindowScroller(windowScroller);
  };

  const _onScrollToRowChange = () => {
    console.log(list.length);
    setTimeout(() => {
      setScrollToIndex(list.length);
    }, 0);
  };

  return (
    <>
      <button onClick={_onScrollToRowChange}>Go to end</button>
      <WindowScroller ref={_setRef} scrollElement={window}>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <div className="WindowScrollerWrapper">
            <AutoSizer disableHeight>
              {({ width }) => (
                <div ref={registerChild}>
                  <List
                    ref={(el) => {
                      window.listEl = el;
                    }}
                    autoHeight
                    className="List"
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    overscanRowCount={2}
                    rowCount={list.length}
                    rowRenderer={_rowRenderer}
                    scrollToIndex={scrollToIndex}
                    scrollTop={scrollTop}
                    width={width}
                    deferredMeasurementCache={_cache}
                    rowHeight={_cache.rowHeight}
                  />
                </div>
              )}
            </AutoSizer>
          </div>
        )}
      </WindowScroller>
    </>
  );
}

export default App;
