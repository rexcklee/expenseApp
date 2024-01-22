import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import { PieChart } from "react-native-gifted-charts";
import SQLite from 'react-native-sqlite-storage';
import YearMonthButton from '../components/YearMonthButton';

const db = SQLite.openDatabase(
    {name: 'Expenses', location: 'default'},
    () => {
      console.log('Database connected')
    },
    error => console.log('Database error: ', error)
  );  

  const pieData = [
    {value: 0, color: 'red', text: ''},
    {value: 0, color: 'orange', text: ''},
    {value: 0, color: 'yellow', text: ''},
    {value: 0, color: 'aquamarine', text: ''},
    {value: 0, color: 'deepskyblue', text: ''},
    {value: 0, color: 'mediumorchid', text: ''},    
];

const Summary = ({navigation, route}) => {  

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [updatedPieData, setUpdatedPieData] = useState(pieData);
    const [updatedTotal, setUpdatedTotal] = useState(0);

    const data = [];

    const firstday = function (year, month) {
      return new Date(year, month, 1);
    };
    
    const lastday = function (year, month) {
      return new Date(year, month + 1, 0);
    };


    useEffect(() => {
        db.transaction(function (txn) {
            const newPieData = [...updatedPieData];
            let newTotal = 0;
          txn.executeSql(
            "SELECT sum(price) FROM expenses_record where (date BETWEEN ? AND ?) AND (category = 'Food')",
            [firstday(selectedYear, selectedMonth).toISOString().slice(0,10), lastday(selectedYear, selectedMonth).toISOString().slice(0,10)], 
            
            function (tx, res) {
            data[0]=res.rows.item(0);
            newPieData[0]["value"]=(data[0]["sum(price)"]==null)?0:data[0]["sum(price)"];
            newPieData[0]['text']= '$'+newPieData[0]["value"];        
              console.log('Result: ', newPieData[0]["value"]);
            },
            (error) => {
                console.log("Error: " + JSON.stringify(error))
                reject(error);
            }
          );
          txn.executeSql(
            "SELECT sum(price) FROM expenses_record where (date BETWEEN ? AND ?) AND (category = 'Entertainment')",
            [firstday(selectedYear, selectedMonth).toISOString().slice(0,10), lastday(selectedYear, selectedMonth).toISOString().slice(0,10)], 
            function (tx, res) {
              data[1]=res.rows.item(0);
              newPieData[1]["value"]=(data[1]["sum(price)"]==null)?0:data[1]["sum(price)"];
              newPieData[1]['text']= '$'+newPieData[1]["value"]; 
              console.log('Result: ', newPieData[1]["value"]);
            },
            (error) => {
                console.log("Error: " + JSON.stringify(error))
                reject(error);
            }
          );
          txn.executeSql(
            "SELECT sum(price) FROM expenses_record where (date BETWEEN ? AND ?) AND (category = 'Transport')",
            [firstday(selectedYear, selectedMonth).toISOString(), lastday(selectedYear, selectedMonth).toISOString().slice(0,10)], 
            function (tx, res) {
              data[2]=res.rows.item(0);
              newPieData[2]["value"]=(data[2]["sum(price)"]==null)?0:data[2]["sum(price)"];
              newPieData[2]['text']= '$'+newPieData[2]["value"]; 
              console.log('Result: ', newPieData[2]["value"]);
            },
            (error) => {
                console.log("Error: " + JSON.stringify(error))
                reject(error);
            }
          );
          txn.executeSql(
            "SELECT sum(price) FROM expenses_record where (date BETWEEN ? AND ?) AND (category = 'Housing & Utilities')",
            [firstday(selectedYear, selectedMonth).toISOString(), lastday(selectedYear, selectedMonth).toISOString().slice(0,10)], 
            function (tx, res) {
              data[3]=res.rows.item(0);
              newPieData[3]["value"]=(data[3]["sum(price)"]==null)?0:data[3]["sum(price)"];
              newPieData[3]['text']= '$'+newPieData[3]["value"]; 
              console.log('Result: ', newPieData[3]["value"]);
            },
            (error) => {
                console.log("Error: " + JSON.stringify(error))
                reject(error);
            }
          );
          txn.executeSql(
            "SELECT sum(price) FROM expenses_record where (date BETWEEN ? AND ?) AND (category = 'Saving')",
            [firstday(selectedYear, selectedMonth).toISOString(), lastday(selectedYear, selectedMonth).toISOString().slice(0,10)], 
            function (tx, res) {
              data[4]=res.rows.item(0);
              newPieData[4]["value"]=(data[4]["sum(price)"]==null)?0:data[4]["sum(price)"];
              newPieData[4]['text']= '$'+newPieData[4]["value"]; 
              console.log('Result: ', newPieData[4]["value"]);
            },
            (error) => {
                console.log("Error: " + JSON.stringify(error))
                reject(error);
            }
          );
          txn.executeSql(
            "SELECT sum(price) FROM expenses_record where (date BETWEEN ? AND ?) AND (category = 'Miscellaneous')",
            [firstday(selectedYear, selectedMonth).toISOString(), lastday(selectedYear, selectedMonth).toISOString().slice(0,10)], 
            function (tx, res) {
              data[5]=res.rows.item(0);
              newPieData[5]["value"]=(data[5]["sum(price)"]==null)?0:data[5]["sum(price)"];
              newPieData[5]['text']= '$'+newPieData[5]["value"]; 
              console.log('Result: ', newPieData[5]["value"]);
              console.log('PieData: ', newPieData);
              setUpdatedPieData(newPieData);
              newTotal=data[0]["sum(price)"]+data[1]["sum(price)"]+data[2]["sum(price)"]+data[3]["sum(price)"]+data[4]["sum(price)"]+data[5]["sum(price)"];
              console.log('Total: ', newTotal);
              setUpdatedTotal(newTotal);
            },
            (error) => {
                console.log("Error: " + JSON.stringify(error))
                reject(error);
            }
          );
        });
      }, [navigation, selectedYear, selectedMonth]);  

    const handleYearMonthChange = (year, month) => {
      setSelectedYear(year);
      setSelectedMonth(month);
    };

    const renderDot = color => {
        return (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: color,
              marginRight: 13,
            }}
          />
        );
      };

      const legendComponent = () => {
        return (
          <>
            <View className="flex-row justify-center mb-2">
              <View className="flex-row items-center w-32 mr-6">
                {renderDot('red')}
                <Text className="text-[14px]">Food</Text>
              </View>
              <View
                className="flex-row items-center w-36">
                {renderDot('orange')}
                <Text className="text-[14px]">Entertainment</Text>
              </View>
            </View>

            <View className="flex-row justify-center mb-2">
              <View className="flex-row items-center w-32 mr-6">
                {renderDot('yellow')}
                <Text className="text-[14px]">Transport</Text>
              </View>
              <View className="flex-row items-center w-36">
                {renderDot('aquamarine')}
                <Text className="text-[14px]">Housing & Utilities</Text>
              </View>
            </View>

            <View className="flex-row justify-center">
              <View className="flex-row items-center w-32 mr-6">
                {renderDot('deepskyblue')}
                <Text className="text-[14px]">Saving</Text>
              </View>
              <View className="flex-row items-center w-36">
                {renderDot('mediumorchid')}
                <Text className="text-[14px]">Miscellaneous</Text>
              </View>
            </View>
          </>
        );
      };

    
  return (
    <>
      <View className="flex w-screen items-center bg-red-100 h-screen">
        <YearMonthButton onChangeYearMonth={handleYearMonthChange} />

        <View className="ml-8 justify-center h-2/3">
          <PieChart
            donut={true}
            showText
            textColor="black"
            radius={140}
            textSize={16}
            data={updatedPieData}
            innerRadius={70}
            labelsPosition="outward"
            innerCircleColor={'steelblue'}
            centerLabelComponent={() => {
              return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                    ${updatedTotal}
                  </Text>
                  <Text style={{fontSize: 18, color: 'white'}}>Total</Text>
                </View>
              );
            }}
          />
          {legendComponent()}
        </View>
      </View>
    </>
  );
};

export default Summary;