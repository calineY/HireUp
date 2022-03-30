

import React from 'react'
import { useContext } from 'react';

import SelectDropdown from 'react-native-select-dropdown'
import { categoriesContext } from '../context/categoriesContext';

const dropdown = (prop) => {
    const { categoriesArray, setCategoriesArray } = useContext(categoriesContext);
  return (
    <SelectDropdown
	data={categoriesArray.categories}
	onSelect={(selectedItem) => {
		prop.selectedCategory(selectedItem.id);
	}}
	buttonTextAfterSelection={(selectedItem) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem.name
	}}
	rowTextForSelection={(item) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item.name
	}}
    buttonStyle={{borderRadius:30,width:365}}
    dropdownStyle={{borderRadius:30}}
   
/>
  )
}

export default dropdown