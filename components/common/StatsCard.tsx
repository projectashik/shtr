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
    <div className="shadow border dark:border-dark102 dark:shadow-gray-800 p-2 md:p-6 rounded flex items-center ">
      <div>
        <div className="hidden sm:block md:text-4xl text-2xl  text-white font-extralight bg-primary-500 p-2 rounded">
          {icon}
        </div>
      </div>
      <div className="flex flex-col ml-4">
        <h2 className="text-md leading-none md:text-xl font-semibold text-transparent bg-clip-text  bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-500 dark:to-blue-500">
          {title}
        </h2>
        <p className="text-md md:text-xl font-semibold text-dark101 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
