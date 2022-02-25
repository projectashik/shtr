import Calendar from "components/common/Calendar";
import { Button } from "components/ui";
import { endOfYear, isAfter, isBefore, isSameDay } from "date-fns";
import { getDateRangeValues } from "lib/date";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

const FILTER_DAY = 0;
const FILTER_RANGE = 1;

const DatePickerForm = ({
  startDate: defaultStartDate,
  endDate: defaultEndDate,
  minDate,
  maxDate,
  onChange,
  onClose,
}: {
  startDate: Date;
  endDate: Date;
  minDate: Date;
  maxDate: Date;
  onChange: (value: any) => void;
  onClose: () => void;
}) => {
  const [date, setDate] = useState(defaultStartDate);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [selected, setSelected] = useState(
    isSameDay(defaultStartDate as Date, defaultEndDate as Date)
      ? FILTER_DAY
      : FILTER_RANGE
  );

  const disabled =
    selected === FILTER_DAY
      ? isAfter(minDate, date) && isBefore(maxDate, date)
      : isAfter(startDate, endDate);

  function handleSave() {
    if (selected === FILTER_DAY) {
      onChange({ ...getDateRangeValues(date, date), value: "custom" });
    } else {
      onChange({ ...getDateRangeValues(startDate, endDate), value: "custom" });
    }
  }
  return (
    <div className="bg-white p-5">
      <div className="flex items-center justify-center gap-3">
        <Button look="alternate" onClick={() => setSelected(FILTER_DAY)}>
          <FormattedMessage id="label.single-day" defaultMessage="Single Day" />
        </Button>
        <Button look="alternate" onClick={() => setSelected(FILTER_RANGE)}>
          <FormattedMessage id="label.date-range" defaultMessage="Date Range" />
        </Button>
      </div>
      {selected === FILTER_DAY && (
        <Calendar
          minDate={new Date(2000, 0, 1)}
          maxDate={endOfYear(new Date())}
          date={date as Date}
          onChange={setDate}
        />
      )}

      {selected === FILTER_RANGE && (
        <>
          <Calendar
            minDate={new Date(2000, 0, 1)}
            maxDate={endOfYear(new Date())}
            date={date as Date}
            onChange={setStartDate}
          />
          <Calendar
            minDate={new Date(2000, 0, 1)}
            maxDate={endOfYear(new Date())}
            date={date as Date}
            onChange={setEndDate}
          />
        </>
      )}

      <Button look="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default DatePickerForm;
