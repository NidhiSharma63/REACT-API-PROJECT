import React
, { useState, useEffect }
 from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'

const url = 'https://randomuser.me/api/'

function App() {
  let [theme,setTheme] = useState('light')
  let [title,setTitle] = useState('name');
  let [titleValue,setTitleValue] = useState('');
  let [get,SetGet] = useState(false);
  const [person,setPerson] = useState(null);
  let [data,setData] = useState({});
  let [loading,setLoading] = useState(false);

  const fetchData = async () =>{
    const res = await fetch(url);
    const result = await res.json();
    setData(result);
    SetGet(true);
    const person = result.results[0];

    const { first, last } = person.name;
    const { email, phone } = person;
    const { age } = person.registered;
    const { password } = person.login;
    const { street:{number,name} } = person.location;

    const newPerson = {
      name: `${first} ${last}`,
      email,
      phone,
      age,
      password,
      street:`${number} ${name}`,
    }

    setPerson(newPerson);
    setTitleValue(newPerson.name);
  }
  
  useEffect(()=>{
    fetchData();
  },[loading]);
  
  const handleHover = (e) =>{
    if(e.target.classList.contains('icon')){
      setTitle(e.target.dataset.label);
      setTitleValue(person[e.target.dataset.label]);
    }
  };

  const changeTheme = () =>{
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  return (
    <main dark-theme={theme}>
      <div className='block bcg-black'></div>
      <button onClick={changeTheme}>toggle</button>
      <div className='block'>
          {get &&
            data.results.map((item)=>{
              return(
                <div className='container' key={item.id}>
                  <img src={item.picture.large} alt='img'></img>
                  <p className='user-title'>my {title} is</p>
                  <p className='user-value'>{titleValue}</p>
                  <div className='values-list'>
                    
                    <button style={{border:'2px solid black'}} className='icon' data-label='name' onMouseOver={handleHover}><FaEnvelopeOpen/></button>
                    <button className='icon' data-label='email' onMouseOver={handleHover}><FaUser/></button>
                    <button className='icon' data-label='age' onMouseOver={handleHover}><FaCalendarTimes/></button>
                    <button className='icon' data-label='street' onMouseOver={handleHover}><FaMap/></button>
                    <button className='icon' data-label='phone' onMouseOver={handleHover}><FaPhone/></button>
                    <button className='icon' data-label='password' onMouseOver={handleHover}><FaLock/></button>
                    
                  </div>
                  <button className='btn' type='button' onClick={()=>setLoading(prev=>!prev)}>random user</button>
              </div>
              )
            })
          }
      </div>
    </main>
  )
}

export default App
