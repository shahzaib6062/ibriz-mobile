import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

const Picker = ({ onFilterChange }) => {
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    const generateLast12Months = () => {
      const months = [];
      const date = new Date();
      for (let i = 0; i < 12; i++) {
        const month = new Date(date.getFullYear(), date.getMonth() - i, 1);
        const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
        const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59, 999);

        months.push({
          key: month.toISOString().slice(0, 7),
          label: month.toLocaleString('default', { month: 'long', year: 'numeric' }),
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        });
      }
      return months;
    };

    const generatedOptions = generateLast12Months();
    setFilterOptions(generatedOptions);

    const currentMonth = generatedOptions.find(option => option.key === new Date().toISOString().slice(0, 7));
    if (currentMonth) {
      setSelectedValue(currentMonth.label);
      onFilterChange({ startDate: currentMonth.startDate, endDate: currentMonth.endDate });
    }

  }, []);

  return (
      <ModalSelector
        data={filterOptions}
        initValue={selectedValue ? selectedValue.slice(0, 3) : new Date().toLocaleString('default', { month: 'short' })}
        onChange={(option) => {
          setSelectedValue(option.label);
          onFilterChange({startDate: option.startDate,  endDate: option.endDate});
        }} 
        
        style={styles.selector}
        // selectTextStyle={styles.selectText}
        optionTextStyle={styles.optionText}
        overlayStyle={styles.overlay}
        sectionStyle={styles.section}
        optionContainerStyle={styles.optionContainer}
        animationType="none" 
        backdropPressToClose={true} 
        initValueTextStyle={styles.initValueText} // Add this line
        selectTextStyle={styles.selectText} // Add this line
      />
  );
};

const styles = StyleSheet.create({
  initValueText: {  
    color: 'black',
    fontWeight: '400',
  },
  selectText: {   
    color: 'black',
    fontWeight: '400',
    border: 'none',
  },
  selector: {
    width: 100,
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 0,
    padding: 0,
  },
  selectText: {
  },
  optionText: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  section: {
    padding: 10,
    backgroundColor: '#FFF',
  },
  optionContainer: {
    maxHeight: 300,
    borderWidth: 0,  
    borderColor: 'transparent',
  },
  selectedValue: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default Picker;
