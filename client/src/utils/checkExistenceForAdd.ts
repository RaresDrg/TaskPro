type Item = {
  title: string;
};

/**
 * Checks if an item with the same title already exists in the provided list.
 *
 * @param {Array<Item> | null} list - The list of items in which to check for existence. Can be null or an array of items.
 * @param {Item} targetedItem - The targeted item containing the `title` property for the check.
 * @returns {boolean} Returns `true` if an item with the same title exists in the list, `false` otherwise.
 */
function checkExistenceForAdd(list: Array<Item> | null, targetedItem: Item) {
  if (!list || list.length === 0) {
    return false;
  } else {
    return list.some((item) => item.title === targetedItem.title);
  }
}

export { checkExistenceForAdd };
