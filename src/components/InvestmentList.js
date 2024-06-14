import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllInvestments, createInvestment, updateInvestment, deleteInvestment, getAllUsers } from '../services/api';
import { Outlet } from "react-router-dom";

const InvestmentList = () => {
  const [investments, setInvestments] = useState([]);
  const [users, setUsers] = useState([]);
  const [newInvestment, setNewInvestment] = useState({ userId: '', amount: '' });

  useEffect(() => {
    fetchInvestments();
    fetchUsers();
  }, []);

  const fetchInvestments = async () => {
    const data = await getAllInvestments();
    setInvestments(data);
  };

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleCreate = async () => {
    await createInvestment(newInvestment);
    fetchInvestments();
  };

  const handleUpdate = async (id) => {
    const updatedInvestment = prompt('Enter new amount:', '');
    if (updatedInvestment !== null) {
      await updateInvestment(id, { amount: updatedInvestment });
      fetchInvestments();
    }
  };

  const handleDelete = async (id) => {
    await deleteInvestment(id);
    fetchInvestments();
  };

  const userOptions = users.map(user => ({
    value: user.id,
    label: user.username
  }));

  return (
    <>
      <div className="container">
        <h1>Investments</h1>
        <ul>
          {investments.map((investment) => (
            <li key={investment.id}>
              User ID: {investment.userId}, Amount: {investment.amount}, Matured Amount: {investment.maturedAmount}
              <span>
                <button onClick={() => handleUpdate(investment.id)}>Update</button>
                <button onClick={() => handleDelete(investment.id)}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
        <div>
          <h2>Create Investment</h2>
          <div className="form-container">
            <Select
              className="react-select-container"
              options={userOptions}
              onChange={(selectedOption) => setNewInvestment({ ...newInvestment, userId: selectedOption.value })}
              placeholder="Select User"
            />
            <input
              type="text"
              placeholder="Amount"
              value={newInvestment.amount}
              onChange={(e) => setNewInvestment({ ...newInvestment, amount: e.target.value })}
            />
            <button onClick={handleCreate}>Create</button>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default InvestmentList;
