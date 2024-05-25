import { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../context/globalContext";
import Button from "./Button";
import { plus } from "../utils/icons";

export const Form = () => {
  const { addIncome } = useGlobalContext();

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
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
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
      <div className="select-date">
        <div className="input-control">
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
            <option value="investments">Investments</option>
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
        <Button
          name={"Add Income"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent)"}
          color={"#fff"}
        />
      </div>
    </FormStyled>
  );
};

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .select-date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;
