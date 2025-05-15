import React, { use, useState } from "react";
import { Link } from "react-router-dom";

function Uesrs() {
  const [users, setUsers] = useState([
    {
      owner: "Ahmad Rasolli",
      name: "my shop",
      phone: "123456789",
      email: "ahmad@gmail.com",
      address: "kabul,1th part",
    },
  ]);
  return (
    <>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-60 bg-white rounded p-3">
          <Link className="btn btn-success" to="/register">
            create
          </Link>
          <table className="table">
            <thead>
              <tr>
                <td>Business Owner</td>
                <td>Business Name</td>
                <td>Phone Number </td>
                <td>Email Address</td>
                <td>Address</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={100000}>
                    <td key={1}>{user.owner}</td>
                    <td key={2}>{user.name}</td>
                    <td key={3}>{user.phone}</td>
                    <td key={4}>{user.email}</td>
                    <td key={5}>{user.address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Uesrs;
