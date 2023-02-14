async function forgotpassword(e) {
    try {
      e.preventDefault();
      console.log(e.target.email.value);
      const userDetails = {
        email: e.target.email.value,
      };
      console.log(userDetails);
      const response = await axios.post(
        "http://localhost:3000/password/forgotpassword",
        userDetails
      );
      if (response.status === 204) {
        document.body.innerHTML += `<div style="color:red;"> Mail Successfully sent </div>`;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      document.body.innerHTML += `<div style="color:red;"> ${err} </div>`;
    }
  }