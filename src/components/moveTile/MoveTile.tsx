import React, { useMemo } from "react";
import { m } from "framer-motion";

import arrowIcon from "../../assets/images/down_arrow.png";
import { useAppSelector } from "../../services/hooks";
import { gameSpeedValue } from "../../utils/gameHelpers";

import styles from "./MoveTile.module.css";

type Props = {
  direction: string;
  index: number;
};

export function MoveTile({ index, direction }: Props) {
  const { gameSpeed } = useAppSelector((state) => state.game);

  const transitionSpeed = useMemo(() => gameSpeedValue(gameSpeed), [gameSpeed]);

  const arrowPos = useMemo(() => {
    switch (direction) {
      case "up":
        return styles.arrowUp;
      case "left":
        return styles.arrowLeft;
      case "right":
        return styles.arrowRight;

      default:
        return "";
    }
  }, [direction]);

  return (
    <div className={styles.moveTileContainer + " " + arrowPos}>
      <div className={styles.moveTile}></div>
      <m.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.6 + 0.3 * index * transitionSpeed,
          default: { duration: 0.25 },
        }}
        className={styles.tileImage}
        src={arrowIcon}
        alt="arrow"
      />
    </div>
  );
}
