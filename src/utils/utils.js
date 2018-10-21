export const objectToArray = object => {
  return !!object
    ? Object.keys(object).map(key => ({ id: key, ...object[key] }))
    : [];
};

export const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const objectsAreEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const objectArraysAreEqual = (array1, array2) => {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => objectsAreEqual(value, array2[index]))
  );
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
