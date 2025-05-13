import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: null,
      errors: {},
      waitForOtpMessage: null,
      loginTimeout:null
    };
  },
  actions: {
    /******************* Get authenticated user *******************/
    async getUser() {
      if (localStorage.getItem("token")) {
        const res = await fetch("/api/user", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          this.user = data;
        }
      }
    },
    /******************* Login or Register user *******************/
    async authenticate(apiRoute, formData) {
      
     
      const res = await fetch(`/api/${apiRoute}`, {
        method: "post",
        body: JSON.stringify(formData),
      });
       if (!res.ok) {
        // If server response is not OK (like 504), throw an error
        if (res.status === 504) {
          this.loginTimeout="login Expired or denied  . Try Again"
          this.waitForOtpMessage=""
          
         // alert("Server is taking too long to respond (504 Gateway Timeout). Please try again later.");
        } else {
          alert(`Error: Server responded with status ${res.status}`);
        }
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.waitForOtpMessage= "An Otp message has been sent to your phone.Kindly approve via portal app";
        this.errors = {};
        localStorage.setItem("token", data.token);
        this.user = data.user;
        this.router.push({ name: "home" });
      }
    },
    /******************* Logout user *******************/
    async logout() {
      const res = await fetch("/api/logout", {
        method: "post",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        this.user = null;
        this.errors = {};
        localStorage.removeItem("token");
        this.router.push({ name: "home" });
        window.location.href = '/';
      }
    },
  },
});
