import { Menu, Transition } from "@headlessui/react";
import { Button } from "components/ui";
import { useUser } from "hooks";
import useDateRange from "hooks/useDateRange";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FormattedMessage } from "react-intl";

const DateRangeDropdown = () => {
  const { user, logout } = useUser();
  const router = useRouter();
  const { dateRange, saveDateRange } = useDateRange();
  const [selectedLabel, setSelectedLabel] = useState<any>();

  const dropItems = [
    {
      label: <FormattedMessage id="label.date.today" defaultMessage="Today" />,
      value: "1day",
    },
    {
      label: (
        <FormattedMessage id="label.date.24hr" defaultMessage="Last 24 hours" />
      ),
      value: "24hour",
    },
    {
      label: (
        <FormattedMessage id="label.date.week" defaultMessage="This week" />
      ),
      value: "1week",
    },

    {
      label: (
        <FormattedMessage
          id="label.date.lastSevenDays"
          defaultMessage="Last Seven Days"
        />
      ),
      value: "7day",
    },
    {
      label: (
        <FormattedMessage id="label.date.month" defaultMessage="This month" />
      ),
      value: "1month",
    },
    {
      label: (
        <FormattedMessage
          id="label.date.last30Days"
          defaultMessage="Last 30 days"
        />
      ),
      value: "30day",
    },
    {
      label: (
        <FormattedMessage
          id="label.date.last90Days"
          defaultMessage="Last 90 days"
        />
      ),
      value: "90day",
    },
    {
      label: (
        <FormattedMessage id="label.date.thisYear" defaultMessage="This year" />
      ),
      value: "1year",
    },
  ];
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Button rightIcon={<FiChevronDown />} look="alternate">
        <Menu.Button as="span">
          {dropItems.find((item) => item.value === dateRange?.value)?.label}
        </Menu.Button>
      </Button>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right list-none divide-y divide-gray-100 rounded bg-white shadow dark:bg-gray-700">
          <div className="flex flex-col py-1 px-1">
            {dropItems.map((item, index) => (
              <Menu.Item key={index}>
                <button
                  onClick={() => {
                    setSelectedLabel(item.label);
                    saveDateRange({
                      value: item.value,
                    });
                  }}
                  className={`flex items-center rounded-md py-1 px-4 text-gray-700  hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white sm:py-2`}
                >
                  {item.label}
                </button>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DateRangeDropdown;
