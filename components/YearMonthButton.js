import React, { useState } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

const YearMonthButton = ({ onChangeYearMonth }) => {
  {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    let updatedYear = year;
    let updatedMonth = month;

    const previousMonth = () => {
      if (month == 1) {
        updatedYear = year - 1;
        updatedMonth = 12;
        setMonth(updatedMonth);
        setYear(updatedYear);
      } else {
        updatedMonth = month - 1;
        setMonth(updatedMonth);
      }
      console.log(updatedYear, updatedMonth);
      onChangeYearMonth(updatedYear, updatedMonth - 1);
    };

    const nextMonth = () => {
      if (month == 12) {
        updatedYear = year + 1;
        updatedMonth = 1;
        setMonth(updatedMonth);
        setYear(updatedYear);
      } else {
        updatedMonth = month + 1;
        setMonth(updatedMonth);
      }
      console.log(updatedYear, updatedMonth);
      onChangeYearMonth(updatedYear, updatedMonth - 1);
    };

    return (
      <View className="flex-row justify-between items-center w-3/4 h-16 bg-test1-first rounded-full my-4">
        <TouchableOpacity onPress={() => previousMonth()}>
          <Text className="ml-5 text-3xl font-bold text-white">{"<"}</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-semibold text-white">
          {month} / {year}
        </Text>
        <TouchableOpacity onPress={() => nextMonth()}>
          <Text className="mr-5 text-3xl font-bold text-white">{">"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default YearMonthButton;