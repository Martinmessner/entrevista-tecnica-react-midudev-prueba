import { useEffect, useRef, useState } from 'react';
import './App.css'
import UserTable from './components/UserTables';

function App() {

  const [data, Setdata] = useState([]);
  const [order, Setorder] = useState(false);
  const [showColors, SetshowColors] = useState(false);
  const [filterSearch, SetfilterSearch] = useState(false);
  const [currentPage, SetcurrentPage] = useState(0)
  const originalUser = useRef()

  useEffect(() => {
      fetch(`https://randomuser.me/api?results=10&page=${currentPage}`)
      .then(async res => await res.json())
      .then(res => {
       Setdata(prevData => prevData.concat(res.results));
       originalUser.current = res.results
      })
      .catch(err => {
        console.error(err)
      })
  }, [currentPage])

const toggleColors = () => {
   SetshowColors(!showColors)
}

const resetResults = () => {
  Setdata(originalUser.current)
}

const deleteUsers = (email) => {
  const deleteUser = data.filter((user) => user.email !== email)
  Setdata(deleteUser)
}

const toggleOrderCountry = () => {
    Setorder(!order)
}

const filteredUser = filterSearch
? data.filter((user => {
 return user.location.country.toLowerCase().includes(filterSearch.toLowerCase())
}))
: data

const userOrdered = order
  ? filteredUser.toSorted((a, b) => 
      a.location.country.localeCompare(b.location.country)
    )
  : filteredUser.toSorted((a, b) => 
  a.name.first.localeCompare(b.name.first)
);

  return (
    <div>
      <h1>Prueba Tecnica</h1>
      <div className="div-button-filtro">
        <button onClick={toggleColors}>Colorear Filas</button>

        <button onClick={toggleOrderCountry}>
          {order ? ' Desordenar' : ' Ordenar'}
        </button>

        <button onClick={resetResults}> Reestablecer todo</button>

        <input
          onChange={(e) => SetfilterSearch(e.target.value)}
          placeholder="Buscar Pais"
        ></input>
      </div>

      <UserTable
        data={userOrdered}
        showColors={showColors}
        deleteUsers={deleteUsers}
      />

      <button onClick={() => SetcurrentPage(currentPage + 1)}>
        Cargar mas Resultados
      </button>
    </div>
  );
}

export default App;
