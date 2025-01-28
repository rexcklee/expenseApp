import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'Expenses', location: 'default' },
  () => {
    console.log('Database connected')
  },
  error => console.log('Database error: ', error)
);

const NewItem = ({ navigation, route }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(null);
  const [date, setDate] = useState(new Date());
  const [submitDisable, setSubmitDisable] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Date Of Purchase');

  const categories = [
    'Food',
    'Entertainment',
    'Transport',
    'Housing & Utilities',
    'Saving',
    'Miscellaneous',
  ];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    // default values of the new item form, and form will reset to default values after submit
    defaultValues: {
      description: '',
      price: null,
    },
  });

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='expenses_record'",
        [],
        function (tx, res) {
          console.log('Item: ', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS expenses_record(id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(20), description VARCHAR(100), price DECIMAL(10,2), date DATE)',
              [],
            );
          }
        },
      );
    });
  }, []);

  useEffect(() => {
    if (
      description != '' &&
      category != '' &&
      price != '' &&
      selectedDate != 'Date Of Purchase'
    ) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [description, category, price, selectedDate]);

  const onSubmit = () => {
    const formattedDate = date ? date.toISOString().slice(0, 10) : null;

    console.log(description, category, price, date, formattedDate); //date format: 2023-07-19T06:38:01.603Z

    db.transaction(function (tx) {
      console.log('add');
      tx.executeSql(
        'INSERT INTO expenses_record (category, description, price, date) VALUES (?,?,?,?)',
        [category, description, price, formattedDate],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {

            Alert.alert(
              'Success',
              'New entry added Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Summary'),
                },
              ],
              { cancelable: false },
            );
          } else Alert.alert('Registration Failed');
        },
      );
    });
  };



  const handleDateConfirm = date => {
    setOpen(false);
    setDate(date);
    setSelectedDate(date.toDateString().slice(4));
  };

  return (
    <View className="flex-1 relative bg-white">
      <ScrollView
        className="bg-test1-background"
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <SelectDropdown
          className="bg-white rounded-full my-5"
          data={categories}
          onSelect={(selectedItem, index) => {
            setCategory(selectedItem);
          }}
          defaultButtonText={'Categories'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown2BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#000'}
                size={18}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown2DropdownStyle}
          rowStyle={styles.dropdown2RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
        />

        <TextInput
          className="bg-white rounded-full mt-5"
          placeholder="Description"
          onChangeText={description => setDescription(description)}
          value={description}
          style={styles.inputTextStyle}
        />

        <TextInput
          className="bg-white rounded-full mt-5"
          placeholder="Amount"
          onChangeText={price => setPrice(price)}
          value={price}
          style={styles.inputTextStyle}
          keyboardType="numeric"
        />

        <TouchableOpacity
          className="bg-white rounded-full mt-5"
          title="Date"
          onPress={() => setOpen(true)}
          style={styles.inputDateStyle}>
          <Text style={styles.inputDateTextStyle}> {selectedDate}</Text>
        </TouchableOpacity>

        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            handleDateConfirm(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="rounded-full mt-5"
          disabled={submitDisable}
          style={{
            backgroundColor: (submitDisable) ? '#dedede' : '#f5a9e2',
            height: 60,
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text className="text-white text-[18px] font-bold">Add New Expense</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default NewItem;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },
  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 50,
  },
  dropdown2BtnTxtStyle: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  inputTextStyle: {
    marginTop: 20,
    paddingLeft: 10,
    width: '80%',
    height: 50,
    color: '#000000',
    borderRadius: 8,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputDateStyle: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
  },
  inputDateTextStyle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
