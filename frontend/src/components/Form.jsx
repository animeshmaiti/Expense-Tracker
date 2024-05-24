import React from 'react';
import styled from 'styled-components';

export const Form = () => {
    const [input, setInput] = useState({
        title:'',
        amount:'',
        category:'',
        description:'',
        date:''
    });
    const {title,amount,category,description,date} = input;
    const handleChange = (e) => {
        setInput({...input,[e.target.name]:e.target.value});
    }
  return (
    <FormStyled>
        <div className="input-control">
            <input
                type="text"
                value={title}
                name='title'
                placeholder='Income Title'
                onChange={handleChange}
            />
        </div>
    </FormStyled>
  )
}

const FormStyled = styled.div`

`;