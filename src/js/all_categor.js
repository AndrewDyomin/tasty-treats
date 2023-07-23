
const url = 'https://tasty-treats-backend.p.goit.global/api/categories';
const categoriesContainer = document.getElementById('categories');

function createCategoryList(categories) {
  const categoryList = document.createElement('ul');
  
  
  categories.forEach(category => {
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    
    button.textContent = category.name;
    button.addEventListener('click', () => {
        button.classList.add('active')
      console.log('Category clicked:', category);
      // Тут потрібо добавити вже дії на сортування елементів
    });
    
    listItem.appendChild(button);
    categoryList.appendChild(listItem);
  });
  
  return categoryList;
}

fetch(url)
  .then(response => response.json())
  .then(data => {
    const categoryList = createCategoryList(data);
    categoriesContainer.appendChild(categoryList);
  })
  .catch(error => {
    console.error('Error:', error);
  });