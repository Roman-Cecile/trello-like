import React, { useState } from "react";
// import PropTypes from "prop-types";

// DnD
import Sortable from "sortablejs";

// Styles
import "../../styles/Board/index.css";

// Components
import Group from "../Group";

// Context
import { GroupContext } from "../context/group-context";

const Board = () => {
  const [groups, setGroups] = useState([
    {
      id: Date.now(),
      title: "Titre",
    },
  ]);
  const simpleList = document.getElementById("simpleList");
  if (simpleList) {
    Sortable.create(simpleList, {
      filter: ".add-button",
      animation: 150,
      draggable: ".group",
    });
  }

  // Scroll with mouse wheel
  const item = document.getElementById("simpleList");
  window.addEventListener("wheel", function (e) {
    if (item) {
      if (e.deltaY > 0) item.scrollLeft += 3;
      else item.scrollLeft -= 3;
    }
  });

  const handleClick = () => {
    setGroups((prevState) => [
      {
        id: Date.now(),
        title: "Titre",
      },
      ...prevState,
    ]);
  };

  return (
    <div className="board">
      <GroupContext.Provider value={groups}>
        <div id="simpleList" className="drag-list">
          <button id="addButton" onClick={handleClick} className="add-button">
            {" "}
            Ajouter
          </button>
          {groups.map((group) => (
            <Group key={group.id} group={group} setGroups={setGroups} />
          ))}
        </div>
      </GroupContext.Provider>
    </div>
  );
};

// Board.propTypes = {};

export default Board;
