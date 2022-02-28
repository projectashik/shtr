import Skeleton from "react-loading-skeleton";

const UrlCardSkeleton = () => {
  return (
    <>
      <div className="dark:border-dark102 dark:bg-dark102 my-3 flex flex-col rounded border bg-white p-2 shadow dark:shadow-gray-800 md:p-6">
        <div className="flex  justify-between">
          <div>
            <Skeleton width="300px" height="25px" />
            <Skeleton width="500px" height="20px" />
            <Skeleton width="200px" height="20px" />
            <div className="flex gap-2">
              <Skeleton width="55px" height="35px" />
              <Skeleton width="55px" height="35px" />
              <Skeleton width="55px" height="35px" />
              <Skeleton width="55px" height="35px" />
              <Skeleton width="55px" height="35px" />
              <Skeleton width="55px" height="35px" />
              <Skeleton width="55px" height="35px" />
            </div>
          </div>
          <Skeleton width="20px" height="20px" />
        </div>
      </div>
    </>
  );
};

export default UrlCardSkeleton;
