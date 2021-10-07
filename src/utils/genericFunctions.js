// Remove card/group
export const removeCurrentTarget = (setState, arrayTargets, target) =>
  setState(arrayTargets.filter((arrayTarget) => arrayTarget.id !== target.id));

// disabled/enabled edition
export const toggleEditTarget = (setIsDisabled, isDisabled) =>
  setIsDisabled(!isDisabled);

// Update card/group content
export const updateTarget = (arrayTargets, target, editedTarget, setTarget) => {
  let currentTarget = arrayTargets.find(
    (arrayTarget) => arrayTarget.id === target.id
  );
  currentTarget = editedTarget;

  const newArrayTargets = arrayTargets.filter(
    (arrayTarget) => arrayTarget.id !== target.id
  );
  newArrayTargets.push(currentTarget);

  setTarget(newArrayTargets);
};
