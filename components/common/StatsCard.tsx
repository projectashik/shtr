const StatsCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: JSX.Element;
}) => {
  return (
    <div className="flex items-center rounded border bg-white p-2 shadow dark:border-dark102 dark:bg-dark102 dark:shadow-gray-800 md:p-6  ">
      <div>
        <div className="hidden rounded bg-primary-500 p-2  text-2xl font-extralight text-white sm:block md:text-4xl">
          {icon}
        </div>
      </div>
      <div className="ml-4 flex flex-col">
        <h2 className="text-md bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text font-semibold  leading-none text-transparent dark:from-primary-500 dark:to-blue-500 md:text-xl">
          {title}
        </h2>
        <p className="text-md font-semibold text-dark101 dark:text-white md:text-xl">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
