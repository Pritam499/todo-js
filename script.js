const inputBox      = document.getElementById('input-box');
    const listContainer = document.getElementById('list-container');
    const addBtn        = document.getElementById('add-btn');
    let isEditing = false, editingLi = null;

    document.addEventListener('DOMContentLoaded', () => {
      showPrevTasks();
      normalizeList();
      saveData();
    });

    addBtn.addEventListener('click', () => {
      const text = inputBox.value.trim();
      if (!text) return alert('Write a task to add something!');
      if (isEditing && editingLi) {
        editingLi.querySelector('.task-text').textContent = text;
        addBtn.textContent = 'Add TODO';
        isEditing = false;
        editingLi = null;
      } else {
        const li = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.classList.add('task-text');
        textSpan.textContent = text;
        li.appendChild(textSpan);
        const btnGroup = document.createElement('div');
        btnGroup.classList.add('btn-group');
        const editBtn = document.createElement('span');
        editBtn.classList.add('edit'); editBtn.textContent = '\u270E';
        const delBtn = document.createElement('span');
        delBtn.classList.add('delete'); delBtn.textContent = '\u00D7';
        btnGroup.append(editBtn, delBtn);
        li.appendChild(btnGroup);
        listContainer.appendChild(li);
      }
      inputBox.value = '';
      saveData();
    });

    listContainer.addEventListener('click', e => {
      const target = e.target;
      const li = target.closest('li'); if (!li) return;
      if (target.tagName === 'LI') {
        li.classList.toggle('checked');
      } else if (target.classList.contains('delete')) {
        li.remove();
      } else if (target.classList.contains('edit')) {
        const textSpan = li.querySelector('.task-text');
        inputBox.value = textSpan.textContent;
        inputBox.focus();
        addBtn.textContent = 'Update';
        isEditing = true; editingLi = li;
      }
      saveData();
    });

    function saveData() {
      localStorage.setItem('data', listContainer.innerHTML);
    }

    function showPrevTasks() {
      const data = localStorage.getItem('data');
      if (data) listContainer.innerHTML = data;
    }

    function normalizeList() {
      document.querySelectorAll('#list-container li').forEach(li => {
        if (!li.querySelector('.task-text')) {
          const txt = li.textContent.trim();
          li.innerHTML = '';
          const textSpan = document.createElement('span');
          textSpan.classList.add('task-text');
          textSpan.textContent = txt;
          li.appendChild(textSpan);
          const btnGroup = document.createElement('div');
          btnGroup.classList.add('btn-group');
          const editBtn = document.createElement('span');
          editBtn.classList.add('edit'); editBtn.textContent = '\u270E';
          const delBtn = document.createElement('span');
          delBtn.classList.add('delete'); delBtn.textContent = '\u00D7';
          btnGroup.append(editBtn, delBtn);
          li.appendChild(btnGroup);
        }
      });
    }