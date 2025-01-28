import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import YearMonthButton from '../components/YearMonthButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const db = SQLite.openDatabase(
  { name: 'Expenses', location: 'default' },
  () => {
    console.log('Database connected')
  },
  error => console.log('Database error: ', error)
);

const ExpensesList = ({ navigation, route }) => {

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [listChanged, setListChanged] = useState(false);

  const data = [];

  const Item = ({ title }) => (
    <View className="flex mx-1 mb-1">
      <View className="flex-row box-border flex justify-between items-center p-2 h-13 w-full bg-white rounded-t-xl">
        <Text
          className="text-gray-700 text-lg font-semibold"
        >
          {title.category}
        </Text>
        <Text
          className="text-gray-700 text-lg font-semibold"
        >
          {title.date}
        </Text>
      </View>
      <View className="flex-row box-border flex justify-between items-center p-2 h-10 w-full bg-white rounded-b-xl">
        <Text
          className="text-gray-500 text-sm font-norma min-w-[60%]"
        >
          {title.description}
        </Text>
        <Text
          className="text-gray-500 text-lg font-semibold"
        >
          {'$' + title.price}
        </Text>
        <TouchableOpacity onPress={() => deleteItem(title.id)}>
          <MaterialCommunityIcons name="delete" color={'black'} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );


  const firstday = function (year, month) {
    return new Date(year, month, 1);
  };

  const lastday = function (year, month) {
    return new Date(year, month + 1, 0);
  };

  useEffect(() => {
    setListChanged(false);
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT * FROM expenses_record where date BETWEEN ? AND ? ORDER BY date DESC",
        [firstday(selectedYear, selectedMonth).toISOString().slice(0, 10), lastday(selectedYear, selectedMonth).toISOString().slice(0, 10)],
        function (tx, res) {
          for (let i = 0; i < res.rows.length; ++i)
            data.push(res.rows.item(i));
          console.log('Result: ', data);
        },
      );
    });
  }, [navigation, selectedYear, selectedMonth, listChanged]);

  const handleYearMonthChange = (year, month) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  const deleteItem = (deleteId) => {
    db.transaction(function (tx) {
      console.log('delete');
      tx.executeSql(
        'DELETE FROM expenses_record WHERE (id = ?)',
        [deleteId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected == 1) {
            Alert.alert(
              'Success',
              'Entry deleted Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    setListChanged(true);
                    navigation.navigate('List');
                  },
                },
              ],
              { cancelable: false },
            );
          } else Alert.alert('Delete Failed');
        },
      );
    });
  }


  return (
    <View className="flex items-center bg-test1-background h-screen">

      <YearMonthButton onChangeYearMonth={handleYearMonthChange} />

      <FlatList
        data={data}
        renderItem={({ item }) => <Item title={item} />}
        keyExtractor={item => item.id}
        style={{ width: "100%", marginBottom: 130 }}
      />

    </View>
  );
};

export default ExpensesList;