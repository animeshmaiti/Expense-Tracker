import {useState} from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../context/globalContext";

export const Form = () => {
    const {addIncome} = useGlobalContext();

  const [input, setInput] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const { title, amount, category, description, date } = input;

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(input);
    setInput({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <input
          required
          type="text"
          value={title}
          name="title"
          placeholder="Income Title"
          onChange={handleChange}
        />
      </div>
      <div className="input-control">
        <input
          required
          type="text"
          value={amount}
          name="amount"
          placeholder="Earned Amount"
          onChange={handleChange}
        />
      </div>
      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investiments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">Youtube</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <DatePicker
          required
          id="date"
          selected={date}
          placeholderText="Income Date"
          dateFormat={"dd/MM/yyyy"}
          onChange={(date) => setInput({ ...input, date })}
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          value={description}
          name="description"
          placeholder="Income Description"
          onChange={handleChange}
        />
      </div>
      <div className="submit-btn">
        <button type="submit">Add Income</button>
      </div>
    </FormStyled>
  );
};

const FormStyled = styled.form``;
