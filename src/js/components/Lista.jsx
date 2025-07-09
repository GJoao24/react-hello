import { use } from "react"
import { useState, useEffect } from "react"

export const Lista = () => {
  const [inputTarea, setinputTarea] = useState("")
  const [listaTarea, setListarea] = useState([])
  const [respuestaOk, setRespuestaOk] = useState(false)
  const [listaUsuario, setListaUsuario] = useState([])

  const myUser = "Joao_Flores";

  useEffect(() => {
    if (respuestaOk) return;
    const existe = listaUsuario.some((usuario) =>
      usuario.name === myUser);
    if (!existe) {
      createusuario(myUser)
    } else {
      console.log("traer las tareas del usuario")
    }

  }, [myUser])


  useEffect(() => {
    obtenerUsuario()
  }, [])

  const createusuario = async (myUser) => {
    try {
      const resultado = await fetch(`https://playground.4geeks.com/todo/users/${myUser}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!resultado.ok) {
        throw new Error("Error al crear el usarios", resultado.status);
      }
      return alert("Usuario creado correctamente")
    } catch (error) {
      console.log(error)

    }

  }
  const obtenerUsuario = async () => {
    const list = await getuser()
    setListaUsuario(list);
    if (listaUsuario) {
      setRespuestaOk(true)
    }
  }

  /*
  const obtenerUsuario = async () => {
    const list = await getUsers()
    setListaUsuario(list);
    if (listaUsuario) {
      setRespuestaOk(true)
    }
  }

  const getUsers = async () => {
    try {
      const resultado = await fetch("https://playground.4geeks.com/todo/users");
      if (!resultado.ok) {
        throw new error("Error al obtener el usuario", resultado.status)
      }
      const data = await resultado.json()
      return data.users
    } catch (error) {
      console.log(error)
    }
  }*/

  const getuser = async () => {
    const resultado = await fetch("https://playground.4geeks.com/todo/users/Joao_Flores");
    const data = await resultado.json()
    setListarea(data.todos);
  }

  const postTodos = async () => {
    await fetch("https://playground.4geeks.com/todo/todos/Joao_Flores", {
      method: "POST",
      body: JSON.stringify({
        "label": inputTarea,
        "is_done": false
      }),
      headers: { "Content-type": "application/json" }
    });

  }


  /*
    function handleSubmit(e) {
      e.preventDefault();
      const newItem = {
        name: inputTarea
  
      }
      setListarea(prev => [...prev, newItem])
      console.log(newItem)
    }*/

  const deleteTodos = async () => {
    if (listaTarea.length === 0) return;
    await fetch(`https://playground.4geeks.com/todo/todos/${listaTarea[0].id}`, {
      method: "DELETE"
    });
    console.log(`Tarea eliminada, ID: "${listaTarea[0].id}`);
    getuser()
  }

  console.log(listaTarea)
  return (
    <div className="container">
      <h1>Lista Tarea Todos </h1>
      <form action=" " onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor=""></label>
        <input type="text"
          id="name"
          placeholder="Añadir cosas en lista"
          aria-describedby="id_Tarea"
          onChange={(e) => setinputTarea(e.target.value)}
          value={inputTarea}/> 
          <button onClick={postTodos}>Subir tarea</button>
      </form>
      <div>
        <div className="lista">
          {
            listaTarea.map((item, index) => {
              return (
                <article key={index} className="mostrarLista">
                  <span >{item.label}</span> <button onClick={() => deleteTodos()}>  eliminar tarea </button>
                </article>
              )
            })
          }
        </div>

      </div>

    </div>
  )

}