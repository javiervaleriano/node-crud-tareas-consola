const inquirer = require('inquirer');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
        name: `${'1.'.green} Crear tarea`,
        value: 1,
        short: 'Crear tarea'
      },
      {
        name: `${'2.'.green} Listar tareas`,
        value: 2,
        short: 'Listar tareas',
      },
      {
        name: `${'3.'.green} Listar tareas completadas`,
        value: 3,
        short: 'Listar tareas completadas'
      },
      {
        name: `${'4.'.green} Listar tareas pendientes`,
        value: 4,
        short: 'Listar tareas pendientes'
      },
      {
        name: `${'5.'.green} Completar tarea(s)`,
        value: 5,
        short: 'Completar tarea(s)'
      },
      {
        name: `${'6.'.green} Borrar tarea`,
        value: 6,
        short: 'Borrar tarea'
      },
      {
        name: `${'0.'.green} Salir`,
        value: 0,
        short: 'Salir'
      }
    ]
  }
];

const inquirerMenu = async () => {
  console.clear();
  console.log('========================='.green);
  console.log('  Seleccione una opción  '.white);
  console.log('=========================\n'.green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const pausa = async () => {
  console.log('\n');

  await inquirer.prompt({
    type: 'input',
    name: 'enter',
    message: `Presione ${'ENTER'.green} para continuar`
  });
};

const leerInput = async (message) => {

  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.trim().length === 0) {
          return 'Por favor, ingrese un valor';
        }

        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {

  const choices = tareas.map(({ id, desc }, i) => ({
    value: id,
    name: `${(i + 1 + '.').green} ${desc}`
  })),
    question = [
      {
        type: 'list',
        name: 'id',
        message: '¿Cuál tarea quieres borrar?',
        choices
      }
    ];

  choices.unshift({
    value: 0,
    name: '0.'.green + ' Cancelar'
  });

  const { id } = await inquirer.prompt(question);
  return id;

};

const confirmar = async (message) => {

  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;

};

const listadoChecklist = async (tareas = []) => {

  const choices = tareas.map(({ id, desc, completadoEn }, i) => ({
    value: id,
    name: `${(i + 1 + '.').green} ${desc}`,
    checked: completadoEn ? true : false
  })),
    question = [
      {
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
      }
    ];

  const { ids } = await inquirer.prompt(question);
  return ids;

};


module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  listadoChecklist
};