/* eslint-disable react/destructuring-assignment */

export const nullOrNumber = (props, propName, componentName) => {
  const prop = props[propName];

  if (prop !== null && typeof prop !== 'number') {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}'. Must be null or number.`
    );
  }
  return null;
};
nullOrNumber.isRequired = nullOrNumber;

export const nullOrString = (props, propName, componentName) => {
  const prop = props[propName];

  if (prop !== null && typeof prop !== 'string') {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}'. Must be null or string.`
    );
  }
  return null;
};
nullOrString.isRequired = nullOrString;
