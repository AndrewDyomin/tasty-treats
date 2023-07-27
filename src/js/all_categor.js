 
  const url = 'https://tasty-treats-backend.p.goit.global/api/categories';
  const categoriesContainer = document.getElementById('categories');
  const overallButton = document.querySelector('.categorBt');
  
  function createCategoryList(categories) {
    const categoryList = document.createElement('ul');
    // categoryList.style.overflow = 'auto';
    
    categories.forEach(category => {
      const listItem = document.createElement('li');
      const button = document.createElement('button');
      
      button.textContent = category.name;
      button.classList.add('category-button');
      
      button.addEventListener('click', () => {
        button.classList.toggle('active');
        
        if (button.classList.contains('active')) {
          console.log('Category activated:', category);
          // Тут ви можете викликати функцію для подальшої обробки активації категорії
        } else {
          console.log('Category deactivated:', category);
          // Тут ви можете викликати функцію для подальшої обробки деактивації категорії
        }
      });
      
      listItem.appendChild(button);
      categoryList.appendChild(listItem);
    });
    
    return categoryList;
  }
  // функція знімання фільтрів і категорій натисканням на загальну кнопку
  function clearActiveStates() {
    const categoryButtons = categoriesContainer.querySelectorAll('.category-button');
    categoryButtons.forEach(button => {
      button.classList.remove('active');
    });
   
  }
  
  overallButton.addEventListener('click', clearActiveStates);
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const categoryList = createCategoryList(data);
      categoriesContainer.appendChild(categoryList);
    })
    .catch(error => {
      console.error('Error:', error);
    });