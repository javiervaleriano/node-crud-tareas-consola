require('colors');
const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArr(tareas = []) {
    tareas.forEach((tarea) => this._listado[tarea.id] = tarea);
  }

  listadoCompleto() {
    console.log();

    const completado = 'Completada'.green,
      pendiente = 'Pendiente'.red;

    this.listadoArr.forEach(({ desc, completadoEn }, i) => {
      const index = `${i + 1}.`.green;

      console.log(`${index} ${desc} :: ${completadoEn ? completado : pendiente}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();

    const pendiente = 'Pendiente'.red;
    let contador = 0;

    this.listadoArr.forEach(({ desc, completadoEn }) => {
      if (completadas && completadoEn) {
        contador += 1;
        console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.toString().green}`);

      } else if (!completadas && !completadoEn) {
        contador += 1;
        console.log(`${(contador + '.').green} ${desc} :: ${pendiente}`);
      }
    });

  }

  toggleCompletadas(ids = []) {

    ids.forEach((id) => {
      const tarea = this._listado[id];

      if (!tarea.completadoEn) tarea.completadoEn = new Date().toISOString();
    });

    this.listadoArr.forEach(({ id }) => {
      if (!ids.includes(id)) this._listado[id].completadoEn = null;
    });

  }

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

}

module.exports = Tareas;