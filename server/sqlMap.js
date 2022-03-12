// declaración sql
var sqlMap = {
  user: {
    // Agregar usuario
    add: "insert into user(name, age) values (?, ?)",
    // consulta al usuario
    select:
      'select * from usuario_administrador where nombre_usuario like "%"?"%"',
  },
};

module.exports = sqlMap;
