import React from "react";
import no_result from "/src/assets/img/noresult.webp"
import styles from "./noresult.module.scss";

export function NoResult() {
  return (
    <div className={styles.no_result}>
      <img src={no_result} alt={"No Result"} className={styles.no_result__hero} />
      <h1 className={styles.no_result__title}>Sorry, we couldn't find any results</h1>
    </div>
  )
}
