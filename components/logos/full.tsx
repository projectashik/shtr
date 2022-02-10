import LinkSVG from "./link";

const FullLogo = () => {
  return (
    <div className="flex items-center">
      <LinkSVG />
      <span className="ml-3 self-center text-xl  font-semibold whitespace-nowrap dark:text-white">
        Shtr.tk
      </span>
    </div>
  );
};

export default FullLogo;
