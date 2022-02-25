import classNames from "classnames";
import { Button } from "components/ui";
import {
  addDays,
  addMonths,
  addYears,
  endOfMonth,
  isAfter,
  isBefore,
  isSameDay,
  setMonth,
  setYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subYears,
} from "date-fns";
import useLocale from "hooks/useLocale";
import { chunk } from "lib/array";
import { dateFormat } from "lib/date";
import { getDateLocale } from "lib/lang";
import { useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

const Calendar = ({
  date,
  minDate,
  maxDate,
  onChange,
}: {
  date: Date;
  minDate: Date;
  maxDate: Date;
  onChange: (date: Date) => void;
}) => {
  const { locale } = useLocale();
  const [selectMonth, setSelectMonth] = useState(false);
  const [selectYear, setSelectYear] = useState(false);

  const month = dateFormat(date, "MMMM", locale);
  const year = date.getFullYear();

  const toggleMonthSelect = () => {
    setSelectYear(false);
    setSelectMonth((state) => !state);
  };

  const toggleYearSelect = () => {
    setSelectMonth(false);
    setSelectYear((state) => !state);
  };

  const handleChange = (value: any) => {
    setSelectMonth(false);
    setSelectYear(false);
    if (value) {
      console.log(value);
      onChange(value);
    }
  };
  return (
    <div>
      <div>
        <div>{date.getDate()}</div>
        <div onClick={toggleMonthSelect}>
          {month}
          {selectMonth ? <FiX /> : <FiChevronDown />}
        </div>
        <div onClick={toggleYearSelect}>
          {year}
          {selectYear ? <FiX /> : <FiChevronDown />}
        </div>
      </div>
      <div>
        {!selectMonth && !selectYear && (
          <DaySelector
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            locale={locale}
            onSelect={handleChange}
          />
        )}
        {selectMonth && (
          <MonthSelector
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            locale={locale}
            onSelect={handleChange}
          />
        )}
        {selectYear && (
          <YearSelector
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            locale={locale}
            onSelect={handleChange}
          />
        )}
      </div>
    </div>
  );
};

const DaySelector = ({
  date,
  minDate,
  maxDate,
  locale,
  onSelect,
}: {
  date: Date;
  minDate: Date;
  maxDate: Date;
  locale: string;
  onSelect: (date: Date) => void;
}) => {
  const dateLocale = getDateLocale(locale);
  const weekStartsOn = dateLocale?.options?.weekStartsOn || 0;
  const startWeek = startOfWeek(date, {
    locale: dateLocale,
    weekStartsOn,
  });
  const startMonth = startOfMonth(date);
  const startDay = subDays(startMonth, startMonth.getDay() - weekStartsOn);
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(addDays(startWeek, i));
  }

  const days = [];
  for (let i = 0; i < 35; i++) {
    days.push(addDays(startDay, i));
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            {daysOfWeek.map((day, i) => (
              <th key={i} className={locale}>
                {dateFormat(day, "EEE", locale)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chunk(days, 7).map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => {
                const disabled =
                  isBefore(day, minDate) || isAfter(day, maxDate);
                return (
                  <td
                    key={j}
                    className={classNames({
                      "text-bold": isSameDay(date, day),
                      "text-red-500":
                        day.getMonth() !== month || day.getFullYear() !== year,
                      "text-gray-500": disabled,
                    })}
                    // @ts-ignore
                    onClick={!disabled ? () => onSelect(day) : null}
                  >
                    {day.getDate()}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MonthSelector = ({
  date,
  minDate,
  maxDate,
  locale,
  onSelect,
}: {
  date: Date;
  minDate: Date;
  maxDate: Date;
  locale: string;
  onSelect: (date: Date) => void;
}) => {
  const start = startOfYear(date);
  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push(addMonths(start, i));
  }

  function handleSelect(value: any) {
    onSelect(setMonth(date, value));
  }

  return (
    <table>
      <tbody>
        {chunk(months, 3).map((row, i) => (
          <tr key={i}>
            {row.map((month, j) => {
              const disabled =
                isBefore(endOfMonth(month), minDate) ||
                isAfter(startOfMonth(month), maxDate);
              return (
                <td
                  key={j}
                  className={classNames(locale, {
                    ["font-bold"]: month.getMonth() === date.getMonth(),
                    ["text-gray-500"]: disabled,
                  })}
                  //   @ts-ignore
                  onClick={
                    !disabled ? () => handleSelect(month.getMonth()) : null
                  }
                >
                  {dateFormat(month, "MMMM", locale)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const YearSelector = ({
  date,
  minDate,
  maxDate,
  locale,
  onSelect,
}: {
  date: Date;
  minDate: Date;
  maxDate: Date;
  locale: string;
  onSelect: (date: Date) => void;
}) => {
  const [currentDate, setCurrentDate] = useState(date);
  const year = date.getFullYear();
  const currentYear = currentDate.getFullYear();
  const minYear = minDate.getFullYear();
  const maxYear = maxDate.getFullYear();
  const years = [];
  for (let i = 0; i < 15; i++) {
    years.push(currentYear - 7 + i);
  }

  function handleSelect(value: any) {
    onSelect(setYear(date, value));
  }

  function handlePrevClick() {
    setCurrentDate((state) => subYears(state, 15));
  }

  function handleNextClick() {
    setCurrentDate((state) => addYears(state, 15));
  }

  return (
    <div>
      <div>
        <Button
          leftIcon={<FiChevronDown />}
          onClick={handlePrevClick}
          disabled={years[0] <= minYear}
          look="alternate"
        >
          First Chevron
        </Button>
      </div>
      <div>
        <table>
          <tbody>
            {chunk(years, 5).map((row, i) => (
              <tr key={i}>
                {row.map((n, j) => (
                  <td
                    key={j}
                    className={classNames({
                      ["text-red-500"]: n === year,
                      ["text-gray-500"]: n < minYear || n > maxYear,
                    })}
                    onClick={() =>
                      n < minYear || n > maxYear ? null : handleSelect(n)
                    }
                  >
                    {n}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Button
          leftIcon={<FiChevronDown />}
          onClick={handleNextClick}
          disabled={years[years.length - 1] > maxYear}
          look="alternate"
        >
          Second Chevron
        </Button>
      </div>
    </div>
  );
};
export default Calendar;
