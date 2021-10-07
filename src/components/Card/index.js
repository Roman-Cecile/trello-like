/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Styles
import "../../styles/Card/index.css";

// Context
import { CardContext } from "../context/card-context";

// GenericFunctions
import {
  removeCurrentTarget,
  toggleEditTarget,
  updateTarget,
} from "../../utils/genericFunctions";

const Card = ({ setCards, card }) => {
  const cards = React.useContext(CardContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [editedCard, setEditedCard] = useState(card);

  const handleEditCard = (key, value) => {
    setEditedCard((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!isDisabled) {
      document.getElementById(`input-card-${card.id}`).focus();
    }
  }, [isDisabled]);

  return (
    <div className="card" id={card.id}>
      <div className="card-header">
        <input
          id={`input-card-${card.id}`}
          disabled={isDisabled}
          value={isDisabled ? card.title : editedCard.title}
          className="input-title"
          onChange={(event) => handleEditCard("title", event.target.value)}
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
              updateTarget(cards, card, editedCard, setCards);
              toggleEditTarget(setIsDisabled, isDisabled);
            }}
            className="edit-button">
            Valider
          </button>
        )}
        <button
          onClick={() => removeCurrentTarget(setCards, cards, card)}
          className="delete-button">
          X
        </button>
      </div>
      <input
        disabled={isDisabled}
        value={isDisabled ? card.text : editedCard.text}
        className="input-title input-text"
        onChange={(event) => handleEditCard("text", event.target.value)}
      />
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object,
  setCards: PropTypes.func.isRequired,
};

Card.defaultProps = {
  card: {},
};

export default Card;
