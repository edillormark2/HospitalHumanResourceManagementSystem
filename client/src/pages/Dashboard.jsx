import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { scheduleData } from "../data/dummy";

import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
  earningData,
  notclockin,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
} from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import employee from "../data/employee.jpeg";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Dashboard = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        {/*
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center drop-shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className=" text-gray-400">Upcoming Interviews</p>
              <p className="text-3xl font-bold">10</p>
            </div>
          </div>
          <div className="mt-4">
            <Button
              color="white"
              bgColor={currentColor}
              text="See more"
              borderRadius="10px"
            />
          </div>
        </div>
        
        **/}

        <div className="flex m-3 flex-wrap justify-center gap-1 items-center drop-shadow-md">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780 drop-shadow-md  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <GoDotFill />
                </span>
                <span>Expense</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoDotFill />
                </span>
                <span>Income</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">$93,438</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Total Income</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">$48,487</p>

                <p className="text-gray-500 mt-1">Total Expense</p>
              </div>

              <div className="mt-5">
                <SparkLine
                  currentColor={currentColor}
                  id="line-sparkLine"
                  type="Line"
                  height="80px"
                  width="250px"
                  data={SparklineAreaData}
                  color={currentColor}
                />
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
              <Stacked currentMode={currentMode} width="320px" height="360px" />
            </div>
          </div>
        </div>
        <div>
          <div
            className=" rounded-2xl md:w-400 p-4 m-3 drop-shadow-lg "
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-white text-2xl">Earnings</p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">
                  $63,448.78
                </p>
                <p className="text-gray-200">Monthly revenue</p>
              </div>
            </div>

            <div className="mt-4 drop-shadow-md">
              <SparkLine
                currentColor={currentColor}
                id="column-sparkLine"
                height="100px"
                type="Column"
                data={SparklineAreaData}
                width="320"
                color="rgb(242, 252, 253)"
              />
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10 drop-shadow-md">
            <div>
              <p className="text-2xl font-semibold ">20</p>
              <p className="text-gray-400">Turnover rate</p>
            </div>

            <div className="w-40">
              <Pie
                id="pie-chart"
                data={ecomPieChartData}
                legendVisiblity={false}
                height="160px"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl  drop-shadow-md ">
          <div className="flex justify-between items-center gap-2 ">
            <p className="text-xl font-semibold ">Today's Not Clock In</p>
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color drop-shadow-md"></div>
          <div className="flex justify-between mt-4 text-md font-semibold">
            <p>Name</p> <p>Status</p>
          </div>
          <div className="mt- w-72 md:w-400">
            {notclockin.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center mt-5 border-t-1 border-color"
              >
                <div className="flex flex-col mt-3">
                  <p>{item.name}</p>
                </div>
                <div className="flex flex-col mt-3">
                  <p>{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760 drop-shadow-md">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Calendar</p>
          </div>
          <div>
            <ScheduleComponent
              height="500px"
              eventSettings={{ dataSource: scheduleData }}
              selectedDate={new Date()}
              currentView="Month"
              style={{
                background: currentMode === "Dark" ? "#33373E" : "#fff",
              }}
            >
              <Inject services={[Day, Week, Month, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
      </div>

      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="w-100 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3 drop-shadow-md">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Announcement</p>
            <button
              type="button"
              className="text-xl font-semibold text-gray-500"
            >
              <IoIosMore />
            </button>
          </div>
          <div className="mt-10">
            <img
              className="md:w-96 h-50 justify-center"
              src={employee}
              alt=""
            />
            <div className="mt-8">
              <p className="font-semibold text-lg">
                Enhancing Employee Growth and Collaboration
              </p>
              <p className="text-gray-400 ">By Daniel | Oct 20, 2023</p>
              <p className="mt-8 text-sm text-gray-400">
                We are pleased to announce a new initiative aimed at enhancing
                employee well-being and professional development within our
                hospital.
              </p>
              <div className="mt-3">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Read More"
                  borderRadius="10px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
