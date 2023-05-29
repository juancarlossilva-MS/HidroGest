import React from "react";
import { withIronSession } from "next-iron-session";
import { useRouter } from 'next/router';

const PrivatePage = ({ user }) => (
  <div>
    <h1>Hello {user.email}</h1>
    <p>Secret things live here...</p>
  </div>
);

export const getServerSideProps = withIronSession(

  
  async ({ req, res }) => {
    const user = req.session.get("user");
    if (!user) {
      res.setHeader("location", "/Controle/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    return {
      props: { user }
    };
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.APPLICATION_SECRET
  }
);

export default PrivatePage;