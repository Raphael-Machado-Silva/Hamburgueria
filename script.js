// PEGAR OS ITEMS
const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('cart-modal')
const cartItemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const cartCounter = document.getElementById('cart-count')
const addressInput = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')

let cart = []

// ABRIR O MODAL AO CLICAR NO CARRINHO
cartBtn.addEventListener('click', function (){
    updateCartModal()
    cartModal.style.display = 'flex'
})

// FECHAR O MODAL AO CLICAR FORA DO CARRINHO
cartModal.addEventListener('click', function (evento){
    if(evento.target ===  cartModal || evento.target === closeModalBtn){
        cartModal.style.display = 'none'
    }
})

// ADICIONAR ITENS AO CARRINHO - sabendo se vc clicou no ADD
menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")
    console.log(parentButton)

    if(parentButton){ //pegando o valor do preço e nome
        const name = parentButton.getAttribute('data-name')
        const price = parseFloat(parentButton.getAttribute('data-price'))

        addToCart(name, price)
    }
})

// ADICIONAR AO CARRINHO OS ITEMS

// função para add ao carrinho
function addToCart(name, price){
    const existingItems = cart.find(item => item.name === name)

    if(existingItems){
        //se o item já existe aumenta a quantidade Apenas
        existingItems.quantity += 1
    } else{
        cart.push({ //adicionar dentro da lista
            name, 
            price,
            quantity: 1
        })
    }
    updateCartModal()
}

// Atualiza carrinho mostrando os items
function updateCartModal(){
    cartItemsContainer.innerHTML = ''
    let total = 0

    cart.forEach(item => {
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col')
        
        cartItemElement.innerHTML = `
        <div class = "flex items-center justify-between mb-2">

            <div>
             <p class = "font-bold">${item.name}</p>
             <p>Qtd: ${item.quantity}</p>
             <p class = "font-medium mt-2">R$: ${item.price.toFixed(2)}</p>
            </div>

            
                <button class = "remove-from-cart-btn" data-name = "${item.name}">Remover</button>
        </div>`
        cartItemsContainer.appendChild(cartItemElement)

        total += item.price * item.quantity //colocando o total
    })

    // Atualizar o total fora do loop
    cartTotal.innerHTML = total.toLocaleString('pt-BR', {
        style: "currency",
        currency: "BRL"
    })

    cartCounter.innerText = cart.length // colocando a quantidade
}

// REMOVER ITEM DO CARRINHO
cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")
        

        removeItemCart(name)
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name)

    if (index != -1){
        const item = cart[index]
        
        if(item.quantity > 1){
            item.quantity -= 1
            updateCartModal()
            return
        } 
        cart.splice(index, 1) 
        updateCartModal()
    }
}

// Pegando o endereço
addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value

    if(inputValue != ""){//quando começar a digitar tirar o erro
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }

})

//finalizar o carrinho
checkoutBtn.addEventListener("click", function(){
    if(cart.length === 0){
        return
    } if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return
    }
})

// Validar se o restaurante está aberto 14-20
function checkRestaurantOpen(){
    const data = new Date()
    const hora = data.getHours()

    return hora >= 14 && hora < 20 //true
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen()

if(isOpen){
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-600")
} else{
    spanItem.classList.remove("bg-green-500")
    spanItem.classList.add("bg-red-600")
}

// Função para mover a imagem com a rolagem
window.addEventListener('scroll', function() {
    const img = document.getElementById('entregador');
    
    // Obtenha a quantidade de rolagem na página
    const scrollY = window.scrollY;
    
    // Aplique a transformação na imagem
    img.style.transform = `translateX(${scrollY / 5}px)`; // Ajuste a velocidade do movimento dividindo o scrollY por um valor
});
