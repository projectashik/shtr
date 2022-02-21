const StatsCard = ({
  title,
  value,
  icon,
}: {
  title: React.ReactNode;
  value: string;
  icon: JSX.Element;
}) => {
  return (
    <div className="dark:border-dark102 dark:bg-dark102 flex items-center rounded border bg-white p-2 shadow dark:shadow-gray-800 md:p-6  ">
      <div>
        <div className="bg-primary-500 hidden rounded p-2  text-2xl font-extralight text-white sm:block md:text-4xl">
          {icon}
        </div>
      </div>
      <div className="ml-4 flex flex-col">
        <h2 className="text-md from-primary-600 dark:from-primary-500 bg-gradient-to-r to-blue-600 bg-clip-text  font-semibold leading-none text-transparent dark:to-blue-500 md:text-xl">
          {title}
        </h2>
        <p className="text-md text-dark101 font-semibold dark:text-white md:text-xl">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
