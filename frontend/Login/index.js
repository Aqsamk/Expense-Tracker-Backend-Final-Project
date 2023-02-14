async function login(e) {
    try {
      e.preventDefault();
      console.log(e.target.name);
      const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      console.log(loginDetails);
      const response = await axios.post(
        "http://localhost:3000/user/login",
        loginDetails
      );
      alert(response.data.message);
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userDetails", JSON.stringify(response.data.user));
        window.location.href = "../ExpenseTracker/index.html";
      } else {
        throw new Error("Failed to Login");
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      document.body.innerHTML += `<div style='color:red;'>${err.message} </div>`;
    }
  }
  
  function forgotpassword() {
    window.location.href = "../ForgotPassword/index.html";
  }