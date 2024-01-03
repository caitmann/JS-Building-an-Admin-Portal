async function main(){

    let response = await fetch('http://localhost:3001/listBooks');
    let books = await response.json();
    console.log(books);

    let bookList = document.createElement('ul');
    books.forEach(listBook);

    function listBook(book) {
        bookList.innerHTML += `
            <li id=${book.id}>${book.title} <input type="text" id="input-quantity" value=${book.quantity} name="book-quantity" size="8"><button id="submit-button">Submit</button></li>
            `;
        document.body.appendChild(bookList);
        const submitButton = document.querySelector('#submit-button');
        submitButton.addEventListener('click', updateQuantity);
    };

    async function updateQuantity(bookId){
        let updatedQuantity = document.getElementById("input-quantity").value;
        const update = await fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": bookId,
                "quantity": updatedQuantity
            })
        });
        let books = await response.json();
        console.log(books);
    }

}

main()