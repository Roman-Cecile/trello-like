/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Styles
import "../../styles/Group/index.css";

// Components
import Card from "../Card";

// Context
import { GroupContext } from "../context/group-context";
import { CardContext } from "../context/card-context";

// GenericFunctions
import {
  removeCurrentTarget,
  toggleEditTarget,
  updateTarget,
} from "../../utils/genericFunctions";

const Group = ({ group, setGroups }) => {
  const groups = React.useContext(GroupContext);
  const [cards, setCards] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [editedGroup, setEditedGroup] = useState(group);

  const createCard = () => {
    setCards((prevState) => [
      {
        id: Date.now(),
        title: "Titre",
        text: "Description",
      },
      ...prevState,
    ]);
  };

  const handleEditGroup = (event) => {
    setEditedGroup((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  useEffect(() => {
    if (!isDisabled) {
      document.getElementById(`input-group-${group.id}`).focus();
    }
  }, [isDisabled]);

  return (
    <div id={`group-${group.id}`} className="group">
      <div className="nodrag-group-header">
        <div className="group-header">
          <input
            id={`input-group-${group.id}`}
            disabled={isDisabled}
            value={isDisabled ? group.title : editedGroup.title}
            className="input-title"
            onChange={handleEditGroup}
          />

          {isDisabled ? (
            <button
              onClick={() => toggleEditTarget(setIsDisabled, isDisabled)}
              className="edit-button">
              Edit
            </button>
          ) : (
            <button
              onClick={() => {
                updateTarget(groups, group, editedGroup, setGroups);
                toggleEditTarget(setIsDisabled, isDisabled);
              }}
              className="edit-button">
              Valider
            </button>
          )}
          <button
            onClick={() => removeCurrentTarget(setGroups, groups, group)}
            className="delete-button">
            X
          </button>
        </div>
        <button className="add-button" onClick={createCard}>
          + Ajouter
        </button>
      </div>
      <CardContext.Provider value={cards}>
        {cards.map((card) => (
          <Card key={card.id} card={card} setCards={setCards} />
        ))}
      </CardContext.Provider>
    </div>
  );
};

Group.propTypes = {
  group: PropTypes.object,
  setGroups: PropTypes.func.isRequired,
};

Group.defaultProps = {
  group: {},
};

export default Group;
