import React from "react";
import { Oval } from "react-loading-icons";
import styles from "./loading.module.scss";

export function Loading() {
  return (
    <div className={styles.container}>
      <Oval className={styles.loading} stroke={"#592ff4"} />
    </div>
  );
}
