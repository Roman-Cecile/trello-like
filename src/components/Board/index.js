import React, { useState } from "react";
// import PropTypes from "prop-types";

// Styles
import "../../styles/Board/index.css";

// Components
import Group from "../Group";

// Context
import { GroupContext } from "../context/group-context";

const Board = () => {
  const [groups, setGroups] = useState([]);
  const groupModel = {
    id: Date.now(),
    title: "Titre",
  };

  const handleClick = () => {
    setGroups((prevState) => [...prevState, groupModel]);
  };
  return (
    <div className="board">
      <GroupContext.Provider value={groups}>
        {groups.map((group) => (
          <Group key={group.id} group={group} setGroups={setGroups} />
        ))}
      </GroupContext.Provider>
      <button onClick={handleClick} className="add-button">
        {" "}
        + Ajouter
      </button>
    </div>
  );
};

// Board.propTypes = {};

export default Board;
