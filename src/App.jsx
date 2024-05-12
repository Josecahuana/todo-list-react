import React, { useState } from 'react'
import './App.css'

const initial = {
  id: 0,
  valor: '',
  check: false,
}

const App = () => {

  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [active, setActive] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleClick = () => {
    if (inputValue !== '') {
      const newChange = {
        id: (messages.length),
        valor: inputValue,
        check: false,
      }
      setMessages([...messages, newChange]);
      setInputValue('');
      setActive(false);
    } else {
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, 2000);
    }
  }

  const handleDelete = (id) => {
    const newMessages = messages.filter((item) => item.id !== id);
    setMessages(newMessages);
  };

  const handleBox = (id) => {
    const newCheck = messages.map(item => {
      if (item.id === id) {
        return {
          ...item,
          check: !item.check
        };
      } else {
        return item;
      }
    }
    );
    setMessages(newCheck);
  }
  return (
    <>
      <h1 className='title'>Todo List</h1>
      <div className='list__text'>
        <input
          className='list__input'
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder='Ingrese la tarea ....'
        />
        <button
          type='button'
          onClick={handleClick}
          className='list__button'
        >AGREGAR
        </button>
      </div>
      {messages.map((message) => {

        return (
          <div
            key={message.id}
            className='list__message'>
            <input
              type="checkbox"
              className=''
              onChange={() => handleBox(message.id)}
            />
            <p
              className={`${message.check ? 'line-checked line-text' : ''}`}
            >{(message.valor === '') ? 'Lista no agregada' : message.valor}</p>
            <button
              className={`buton-click ${message.check ? 'line-checked line-text' : ''}`}
              type='button'
              onClick={() => handleDelete(message.id)}
            >ELIMINAR</button>
          </div>
        )
      })}
      <span
        className={active ? 'list__span-active' : 'list__span-desactive'}
      >DEBE INGRESAR UNA TAREA</span>
    </>
  )
}

export default App
