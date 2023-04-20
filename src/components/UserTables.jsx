import './Tables.css'

export default function UserTable({data, showColors, deleteUsers }) {
 
    return (
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Pais</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? '#111' : '#333';
            const color = showColors ? backgroundColor : 'transparent';
            return (
              <tr key={user.email} style={{ backgroundColor: color }}>
                <td>
                  <img src={user.picture.thumbnail} alt="imagen" />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => deleteUsers(user.email)}>
                    Borrar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  