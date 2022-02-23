import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Dot.module.css";

function Dot({ color, size, className }: any) {
  return (
    <div className={styles.wrapper}>
      <div
        style={{ background: color }}
        className={classNames(styles.dot, className, {
          [styles.small]: size === "small",
          [styles.large]: size === "large",
        })}
      />
    </div>
  );
}

Dot.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf(["small", "large"]),
  className: PropTypes.string,
};

export default Dot;
