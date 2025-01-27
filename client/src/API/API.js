import axios from "../axios";

// ***** POST SEND EMAIL ***** //
export const SendEmail = async ({ firstName, lastName, email, phone, message }, { setSend, setLoading }) => {
  try {
    setLoading(true);
    const data = { firstName, lastName, email, phone, message }
    let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/send`, data);

    if (response) {
      setSend(response.data);
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    console.log('ERROR SEND:', error);
  }
};