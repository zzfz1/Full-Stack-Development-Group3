import React, { useState, useEffect } from "react";

const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Custom hook for handling property-related logic
export const usePropertyLogic = (localCategory, setLocalCategory, categoryProperties) => {
  const [selectedProperties, setSelectedProperties] = useState([]);

  useEffect(() => {
    if (localCategory && localCategory.categoryProperties) {
      setSelectedProperties(localCategory.categoryProperties.map((property) => property._id));
    }
  }, [localCategory]);

  const addNewPropertySelect = () => {
    const newProperty = categoryProperties.find((property) => !selectedProperties.includes(property._id));
    if (newProperty) {
      setLocalCategory({
        ...localCategory,
        categoryProperties: [...localCategory.categoryProperties, newProperty],
      });
      setSelectedProperties([...selectedProperties, newProperty._id]);
    }
  };

  const removeProperty = (index) => {
    const updatedProperties = deepCopy(localCategory.categoryProperties);
    const removedProperty = updatedProperties.splice(index, 1);
    setSelectedProperties(selectedProperties.filter((id) => id !== removedProperty[0]._id));

    setLocalCategory({
      ...localCategory,
      categoryProperties: updatedProperties,
    });
  };

  const handlePropertySelect = (e, index) => {
    const updatedProperties = deepCopy(localCategory.categoryProperties);
    const selectedProperty = categoryProperties.find((prop) => prop._id === e.target.value);
    setSelectedProperties([...selectedProperties, selectedProperty._id]);
    updatedProperties[index] = selectedProperty;
    setLocalCategory({
      ...localCategory,
      categoryProperties: updatedProperties,
    });
  };

  return { selectedProperties, addNewPropertySelect, removeProperty, handlePropertySelect };
};
