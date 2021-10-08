import React, { useEffect, useState } from "react";
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
      id: 1,
      title: "Titre",
    },
  ]);
  const handleClick = () => {
    setGroups((prevState) => [
      {
        id: Date.now(),
        title: "Titre",
        cards: [],
      },
      ...prevState,
    ]);
  };
  const simpleList = document.getElementById("simpleList");
  if (simpleList) {
    Sortable.create(simpleList, {
      filter: ".add-button, .card, .group-header",
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

  useEffect(() => {
    groups.map((group) => {
      const groupId = document.getElementById(`group-${group.id}`);
      if (groupId !== null) {
        Sortable.create(groupId, {
          group: "shared", // set both lists to same group
          animation: 150,
          filter: ".add-button, .nodrag-group-header",
          draggable: ".card",
          onAdd: function (/**Event*/ evt) {
            var itemEl = evt.item; // dragged HTMLElement
            let origParent = evt.from;
            origParent.appendChild(itemEl);
            // update store
          },
          // onMove: function (evt) {
          //   return evt.related.className.indexOf("nodrag-group-header") === -1;
          // },
        });
      }
    });
  }, [groups]);

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
