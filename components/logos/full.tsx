import LinkSVG from "./link";

const FullLogo = () => {
  return (
    <div className="flex items-center">
      <LinkSVG />
      <span className="ml-3 self-center whitespace-nowrap  text-xl font-semibold dark:text-white">
        Shtr.tk
      </span>
    </div>
  );
};

export default FullLogo;
