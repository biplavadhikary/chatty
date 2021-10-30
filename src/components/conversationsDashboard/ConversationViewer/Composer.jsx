import React from "react";

const emptyFunction = () => {};

function Composer({
  onClickEnter = emptyFunction,
  keyHandlers = emptyFunction,
}) {
  const [value, setValue] = React.useState("");

  const clearDisplayFunc = () => setValue("");

  const keyPressHandler = (e) => {
    if (e.keyCode === 13) {
      onClickEnter(e, value, clearDisplayFunc);
    } else {
      keyHandlers(e, value, clearDisplayFunc);
    }
  };

  return (
    <div className="composer">
      <input
        className="text"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        onKeyDown={keyPressHandler}
      />
    </div>
  );
}

export default Composer;
