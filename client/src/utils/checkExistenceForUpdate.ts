type Item = {
  title: string;
  _id: string;
};

/**
 * Determines whether there is a different item in the list that shares the same title as the targeted item, thus preventing duplicate titles during an update operation.
 *
 * @param {Array<Item>} list - The list of items in which to check for existence.
 * @param {Item} targetedItem - The targeted item containing the `title` and `_id` properties. This item is the one being updated.
 * @returns {boolean} Returns true if another item with the same title is found in the list, indicating a potential conflict; false otherwise.
 */
function checkExistenceForUpdate(list: Array<Item>, targetedItem: Item) {
  return list.some(
    (item) => item.title === targetedItem.title && item._id !== targetedItem._id
  );
}

export { checkExistenceForUpdate };
