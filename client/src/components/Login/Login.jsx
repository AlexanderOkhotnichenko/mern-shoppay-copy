import React, { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { TailSpin } from "react-loading-icons";
import styles from "./login.module.scss";

export function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [disabledButton, setDisabledButton] = useState(false);
  const [error, setError] = useState(false);
  const cookies = new Cookies();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setDisabledButton(true);
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;
      const { data: res } = await axios.post(url, data);
      cookies.set('token', res.data);
      cookies.set('user', data.email);
      setDisabledButton(false);
      if (cookies.getAll()) {
        window.location.reload('/');
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setDisabledButton(false);
      }
    }
  };

  return (
    <section className={styles.login}>
      <div className={styles.login__content}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Login</h1>
          <div className={styles.label}>
            <div className={styles.label__content}>
              <label className={styles.label__label}>
                <MdMail className={styles.label__icon} />
                <input type="email" name={"email"} value={data.email} onChange={handleChange} required placeholder={"Email"} className={styles.label__input} />
              </label>
              <label className={styles.label__label}>
                <FaLock className={styles.label__icon} />
                <input type="password" name={"password"} value={data.password} onChange={handleChange} required placeholder={"Password"} className={styles.label__input} />
              </label>
            </div>
            {error && <div className={styles.error_message}>{error}</div>}
          </div>
          <div className={styles.submit_buttons}>
            <Link to={"/signup"} className={styles.link}>Sign Up</Link>
            <button type="submit" disabled={disabledButton} className={styles.submit}>{disabledButton ? <TailSpin className={styles.submit_loading} /> : "Login"}</button>
          </div>
        </form>
      </div>
    </section>
  )
}
