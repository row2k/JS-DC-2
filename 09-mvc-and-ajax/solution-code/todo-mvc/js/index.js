// Model
var todos = [];

// View

function renderTodos() {
  $('#todoList').html('');
  $('#todoInput').val('');
  var source = $('#to-do-template').html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < todos.length; i++) {
    var li = template(todos[i]);
    $('#todoList').append(li);
  }
}

// Controller

function setup() {
  // Setup the styles
  renderTodos();

  // Setup the event listeners
  $('#todoList').on('click', '.complete', markCompleted);
  $('#todoList').on('click', '.delete', deleteTodo);
  $('#submit').on('click', addTodo);
  $('#load').on('click', loadTodos);
}

function markCompleted() {
  var todoIndex = $(this).parent().index();
  todos[todoIndex].completed = true;

  renderTodos();
}

function deleteTodo() {
  var todoIndex = $(this).parent().index();
  todos.splice(todoIndex, 1);

  renderTodos();
}

function addTodo() {
  todos.push({
    text: $('#todoInput').val(),
    completed: false
  });

  renderTodos();
}

function loadTodos() {
  $.get('http://jacobfriedmann.com:3000/todos', function(data) {
    todos = todos.concat(data);
    renderTodos();
  });
}

$(document).ready(setup);
