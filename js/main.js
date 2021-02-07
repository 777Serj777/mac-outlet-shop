const patterReviews = {

    elemName: 'div',
    className: 'reviews',

    listChild: [
        {
            elemName: 'div',
            className: 'reviews__positive',
        
            listChild: [
                {
                    elemName: 'p',
                    textAfter: 'Positive reviews',
                
                    listChild: [
                        {
                            elemName: 'span',
                            className: 'reviews__positive-percent'
                        }
                    ]
                },
            
                {
                    elemName: 'p',
                    textAfter: 'Above avarage'
                }
            ]
        },
    
        {
            elemName: 'p',
            className: 'reviews__orders',
            textAfter: 'orders',
        
            listChild: [
                {
                    elemName: 'span',
                    className: 'reviews__orders-count'
                }
            ]
        }       
    ]
}
const patternCard = 

    {
        elemName: 'div',
        className: 'card',

        listChild:[
            {
                elemName: 'div',
                className: 'device',

                listChild: [
                    {
                    elemName: 'div',
                    className: 'device__like',

                    listChild: [
                        {
                            elemName: 'img',
                        }
                    ]
                    }, 

                    {
                    elemName: 'div',
                    className:'device__img',
                    },

                    {
                    elemName: 'div',
                    className: 'device__info',

                    listChild: [
                        {
                            elemName: 'h3',
                            className: 'device__title'
                        },

                        {
                            elemName: 'p',
                            className: 'device__count',
                            textAfter: ' left in stock',

                            listChild: [
                                {
                                    elemName: 'span',
                                    className: 'device__count-number',
                                }
                            ]
                        },
                        {
                            elemName: 'p',
                            className: 'device__price',
                            textBefore: 'Price: ',
                            textAfter: ' $',
                        
                            listChild: [
                                {
                                    elemName: 'span',
                                    className: 'device__price-number',
                                }
                            ]
                        },
                        {
                            elemName: 'button',
                            className: 'device__btn',
                            textAfter: 'add to cart'
                        }
                    ]
                    },

                    {
                        elemName: 'div',
                        className: 'device__reviews reviews',

                        listChild :  patterReviews.listChild
                    } 
                ]
            }  
        ]  
}
const patternFilter = 
{
    
    elemName: 'div',
    className: 'filter',

    listChild: [
        {
            elemName: 'form',
            className: 'filter__form',
        }
    ]
    
}
const patternModalWindow = {

    elemName: 'div',
    className: 'modal-window',

    listChild: [
        {
            elemName: 'div',
            className: 'modal-window__img modal-window__column',
            
            listChild: [
                {
                    elemName: 'img'
                }
            ]
        },
        {
            elemName: 'div',
            className: 'modal-window__data modal-window__column',
            
            listChild: [
                {
                    elemName: 'div',
                    className: 'modal-window__wrap',

                    listChild: [
                        {
                            elemName: 'h2',
                            className: 'modal-window__title'
                        },
                        {
                            elemName: 'div',
                            className: 'modal-window__reviews reviews',

                            listChild: patterReviews.listChild                                                      
                        },
                        {
                            elemName: 'ul',
                            className: 'modal-window__info'
                        }

                    ]
                }
            ]
        },
        {
            elemName: 'div',
            className: 'modal-window__buy modal-window__column',
            
            listChild: [
                {
                    elemName: 'p',
                    className: 'modal-window__price'
                },
                {
                    elemName: 'p',
                    className: 'modal-window__amount',
                    textBefore: 'Stock: ',
                    textAfter: ' pcs.',

                    listChild: [
                        {
                            elemName: 'span',
                            className: 'modal-window__stock'
                        }
                    ]
                },
                {
                    elemName: 'button',
                    className: 'modal-window__btn',
                    textAfter: 'add to cart'
                }
            ]
        }
    ]

}
const patternCart = {

    elemName: 'div',
    className: 'list-cart',

    listChild: [
        {   // title
            elemName: 'h3',
            className: 'list-cart__title',
            textAfter: 'Shopping Cart'
        },
        {   // text
            elemName: 'p',
            className: 'list-cart__text',
            textAfter: 'Checkout is almost done!'
        },
        {   // list device
            elemName: 'ul',
            className: 'list-cart__wrap-items',
        },
        {   // total price & amount
            elemName: 'div',
            className: 'list-cart__total',

            listChild: [
                {
                    elemName: 'p',
                    className: 'list-cart__amount',
                    textBefore: 'Total amount: ',

                    listChild: [
                        {
                            elemName: 'span',
                            textAfter: '0 ptc'
                        }
                    ]
                },
                {
                    elemName: 'p',
                    className: 'list-cart__price',
                    textBefore: 'Total price: ',

                    listChild: [
                        {
                            elemName: 'span',
                            textAfter: '0$'
                        }
                    ]
                }
            ]
        },
        {   // button
            elemName: 'button',
            className: 'list-cart__btn-buy',
            textAfter: 'buy'
        }
    ]
}

class Utils {

    constructor(){
        this.colors = this._getColors;
        this.rams = this._getRam;
        this.os = this._getOS;
        this.display = this._getDisplay;
        this.price = this._getPrice;
    }

    get _getPrice(){
        return this._getItem('price').sort((a, b) => {return a-b;});
    }

    get _getDisplay(){
        return this._getItem('display', ' inch');
    }

    get _getOS(){   
        return this._getItem('os');
    }
    
    get _getRam(){
        return this._getItem('ram', ' GB');
    }

    get _getColors(){
        
        let result = []

        items.forEach(item => {
           result.push(...item.color)
     
        })
        return result.filter((item, index, arr) => {
            return  arr.indexOf(item) === index;
        })
        
    }

    _getItem(key, text){

        let result = [];

        items.forEach(item => {
            item[key] && result.push(item[key] + ( text || "" ));
        });
        return result.filter((item, index, arr) => {
            return  arr.indexOf(item) === index;
        });

    }
}

class Elem {

    constructor(pattern){
        this.arrElem = this._createElemnts(pattern);
        this.listElem =  this._getListElem;
    }

    get _getListElem (){

        const listElem = {};
       
        for (const item of this.arrElem) {
            
            if(item.className === '') {
                let title = item.tagName.toLowerCase();
                listElem[title] = item;
                continue;
            };
          
            let arrClassName = item.className.split(' ');
           
            let reg = /[-_]+/g;
        
            let key = arrClassName[0].split(reg);
            
            key = (key.length > 1) ? key.reduce((prevVelue, nextVelue) => {
            
                return prevVelue + (nextVelue[0].toUpperCase() + nextVelue.slice(1));
            
            }) : key[0];
            
            listElem[key] = item;
            
        }
  
        return listElem;
    }

    _cElem = (pattern) => {
      
        const element = document.createElement(pattern.elemName);
       
        pattern.className && (element.className = pattern.className);
      
        return element;
    }

    _createElemnts (pattern) {

        let arrChild = [];
  
        const addElem = (pattern) => {

           let element  = this._cElem(pattern);
           
           arrChild.push(element);

           if(pattern.listChild && pattern.listChild.length > 0){
                pattern.listChild.forEach(item => {
                   element.appendChild(addElem(item));
               });   
           }
           pattern.textBefore && element.prepend(pattern.textBefore);
        
           pattern.textAfter && element.append(pattern.textAfter);

           return element;
        }

        addElem(pattern);

        return arrChild;
    }
}

class Filter extends Elem{

    constructor(){
        super(patternFilter);

        this.container = 
            { 
                elemName: 'fieldset',
                className: 'filter__container',

                listChild: [
                    {
                        elemName: 'legend',
                        className: 'filter__title arrow__open'
                    },
                    {
                        elemName: 'div',
                        className: "filter__wrap"
                    }
                ]
        }
        
        this.filterItems = [

            {
                type: 'range',
                title: 'price',
                variants : new Utils(items).price,
                changed : []
            },
            {
                type: 'check',
                title: 'color',
                variants: new Utils(items).colors,
                changed : []
            },
            {
                type: 'check',
                title: 'ram',
                variants: new Utils(items).rams,
                changed : []
            },
            {
                type: 'check',
                title: 'os',
                variants: new Utils(items).os,
                changed : []
            }
            
        ]
       this._renderFilter('column');
  
    }

    _createFilterRange(){

        let patternRange = 
        {
            elemName: 'p',
            className: 'filter__input',
            
            listChild: [
                {
                    elemName: 'label'
                },
                {
                    elemName: 'input'
                },
                   
            ]
        }
        let rangeFilter;
        const range =  this.filterItems.find(item => { return item.type === 'range'});
        const elements = new Elem(this.container).listElem;

        elements.filterTitle.append(range.title);
       
        ['from', 'to'].forEach(item => {

            let from = +range.variants[0];
            let to = +range.variants[range.variants.length - 1];

            (item === 'from') && range.changed.push(from); 
            (item === 'to') && range.changed.push(to); 

            rangeFilter = new Elem(patternRange).listElem;
            rangeFilter.label.htmlFor = 'text';
            rangeFilter.label.innerText = item;
            rangeFilter.input.type = 'text';
            rangeFilter.input.value = (item === 'from') ? from : to; 
            
            rangeFilter.input.addEventListener('input', (e) => {
           
                let text = e.target.value;
                let reg = /^\d+$/;

                if(!reg.test(text)){
                    e.target.value = text.slice(0, text.length - 1);
                }     
            });

            rangeFilter.input.addEventListener('keyup', (e) => {
           
                if(!(e.key === 'Enter' || e.keyCode === 13) || (e.target.value === '')) return;

                let value = +e.target.value;
                let index = +(item === 'to');
          
                if(value >= from && value <= to){
                    range.changed[index] = value;
                }
                else{
                    range.changed[index] = (!index) ? from : to;
                    e.target.value = range.changed[index];
                }
                            
                this.renderItemWithFilter() 
            });

            elements.filterWrap.appendChild(rangeFilter.filterInput);

        });

        elements.filterTitle.addEventListener('click', (e) => {
            e.target.classList.toggle('arrow__open');
            e.target.classList.toggle('arrow__close');
        });
 
        return elements.filterContainer;
    }

    _createFilterCheck(){
   
        let patternCheck = 
        {
            elemName: 'p',
            className: 'filter__checkbox',
            
            listChild: [
                {
                    elemName: 'input'
                },
                {
                    elemName: 'label'
                },
                   
            ]
        }
        const arrCheck =  this.filterItems.filter(item => { return item.type === 'check'});
        let arrCheckboxes = []; 
 
        arrCheck.forEach(item => {
       
            const elements = new Elem(this.container).listElem;
            elements.filterTitle.append(item.title)

            elements.filterTitle.addEventListener('click', (e) => {
         
            e.target.classList.toggle('arrow__open');
            e.target.classList.toggle('arrow__close');
        });
            

            for (const variant of item.variants) {
                
                patternCheck.textAfter = variant;
                let check = new Elem(patternCheck).listElem;
                        
                check.input.type = 'checkbox';         
                let name = variant.toLowerCase().replace(/ /g, '_')
                
                check.input.id = name;
                check.label.htmlFor = name;
        
                check.label.addEventListener('click', (e) => {
                    
                    let title = elements.filterTitle.textContent;
                    let checkText = check.label.parentElement.textContent; 

                    if(!check.input.checked){
                        this._addChanged(title, checkText);
                    }
                    else{
                        this._removeChanged(title, checkText);
                    }

                    this.renderItemWithFilter();
                })

                elements.filterWrap.append(check.filterCheckbox);             
            }
         
            arrCheckboxes.push(elements);
             
        });

        return arrCheckboxes;
       
    }

    _addChanged(title, check){
          
        let filterItem = this.filterItems.find(item => {
           return item.title === title.toLowerCase();
        });
        filterItem.changed.push(check);
            
    }

    _removeChanged(title, check){
        let filterItem = this.filterItems.find(item => {
            return item.title === title.toLowerCase();
        });
        let index = filterItem.changed.indexOf(check);
        filterItem.changed.splice(index, 1)

    }

    _renderFilter(container){
        
        const wrap = document.querySelector('.' + container);
        const range = this._createFilterRange();
        const arrCheck =  this._createFilterCheck();

        wrap.innerHTML = "";

        this.listElem.filter.appendChild(range);

        arrCheck.forEach(item => {
            this.listElem.filter.appendChild(item.filterContainer);
        });
       
        wrap.appendChild(this.listElem.filter)
     
    }

    renderItemWithFilter(){ 

        let arrFilters = this.filterItems.filter(item => {
           return item.changed.length > 0
        })
        let listFilter = {};

        let regex = /^[a-z\sA-Z]+$/;

        arrFilters.forEach(item => {
                         
            listFilter[item.title] = item.changed.map(item =>{
             
              return (regex.test(item) || typeof item === 'number') ? item : +item.match(/\d+/);
             
            }); 
            
        });
       
        let  filteredItems = items.filter(item => {
 
            for (const key in listFilter) {
             
              let category =  item[key] instanceof Array ?  item[key] : [item[key]]              
              let result; 
               
                for (const value of category) {   
                                 
                    result = (key !== 'price') ? listFilter[key].includes(value) : value >= listFilter[key][0] && value <= listFilter[key][1];                                 
                    if(result) break;              
                }

                if(!result) return result; 
            }

            return true;
        });
       
        new ListCards(filteredItems).renderCard('list-device');
    }
}

class Card extends Elem{

    #item;

    constructor(item){
        super(patternCard);        
        this.#item = item;
    }

    renderCard(container){
       
        container = (typeof container === 'object') ? container : document.querySelector('.' + container);
       
        this.listElem.deviceImg.style.backgroundImage =  `url(img/${this.#item.imgUrl})`;
        this.listElem.deviceTitle.append(this.#item.name);
        this.listElem.devicePriceNumber.append(this.#item.price);
        this.listElem.deviceCountNumber.append(this.#item.amount);
        this.listElem.reviewsOrdersCount.append(this.#item.orders);
        this.listElem.reviewsPositivePercent.append(~~(this.#item.like/this.#item.orders * 100)+"% ");

        this.listElem.card.addEventListener('click', (e) => {
            new modalWindow().renderModalWindow('wrap', this.#item);
        })

        this.listElem.deviceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            cart._addToCart(this.#item);
          
        });

        container.append(this.listElem.card) 
      
    }

}

class ListCards {
    
    #arrCards;

    constructor(items){
      this.#arrCards = this._addListCards(items);
    }

    get getCards (){
        return this.#arrCards;
    }
 
    _addListCards(items){
       return items.map(item => {
           return new Card(item);
       })
    }

    renderCard(container){

       container = document.querySelector('.' + container);

       container.innerHTML = "";

       this.getCards.forEach(element => {
           element.renderCard(container);
       });

    }

}

class modalWindow extends Elem{

    constructor(){
        super(patternModalWindow);
    }

    renderModalWindow(container, item){

    const patternInfoItem = {
        elemName: 'li',
        className: 'modal-window__item',

        listChild: [
            {
                elemName: 'span',
                className: 'modal-window__name'
            }
        ]
    }

    let  {
            like,
            orders,
            name,
            imgUrl,
            amount,
            price,
            color,

            chip: {
                name : chip
            },

            size: {

                height,
                width,
                depth,
                weight,
            } 

        } = item;

        let infoDevice = {
            chip,
            color,
            height,
            width,
            depth,
            weight,
        } 
    
        container = (typeof container === 'object') ? container : document.querySelector('.' + container);


        container.innerHTML = "";

        this.listElem.img.src = `img/${imgUrl}`;
        this.listElem.modalWindowPrice.append("$ " + price);
        this.listElem.modalWindowStock.append( + amount);
        this.listElem.modalWindowTitle.append(name);
        this.listElem.reviewsOrdersCount.append(orders)
        this.listElem.reviewsPositivePercent.append(~~(like/orders * 100)+"% ")

        for (const key in infoDevice) {
           
            if(!infoDevice[key]) continue;

            let itemInfo = new Elem(patternInfoItem);

            if(infoDevice[key] instanceof Array){

                itemInfo.listElem.modalWindowName.append((key[0].toUpperCase() + key.slice(1) + ": "));

                let value = "";
                
                infoDevice[key].forEach((item, index, arr) => {

                    if(index >= arr.length-1){
                        value += item;
                        return;
                    }
                    value += item + ", "
               
                });

                itemInfo.listElem.modalWindowItem.append(value);
             
            }          
            else{
                itemInfo.listElem.modalWindowName.append((key[0].toUpperCase() + key.slice(1) + ": ") );
                itemInfo.listElem.modalWindowItem.append(infoDevice[key]);
      
            }
          
            this.listElem.modalWindowInfo.append(itemInfo.listElem.modalWindowItem);
            
            
        }
        
        let closeModalWindow = (e) => {
            if(e.target !== container) return;
            container.classList.toggle('opened'); 
            container.removeEventListener('click', closeModalWindow);         
        }

        container.append(this.listElem.modalWindow);
        container.classList.toggle('opened');
        container.addEventListener('click', closeModalWindow);

    }

}

class Cart extends Elem {

    #gagets = [];

    constructor(){
        super(patternCart);
        this.basket = document.querySelector('.basket');
        this.cart = document.querySelector('.basket .cart');

        this.basket.addEventListener('click', (e) => {
        
            if(e.target.className.includes('list-cart')) return;

            this.cart.classList.toggle('hidden-cart'); 
            this.cart.classList.toggle('show-cart'); 
        });
        
        this.renderCart();
    }

    get _getGagets(){
        return this.#gagets;
    }
    _removeItemFromCart(id){
        this.#gagets = this.#gagets.filter(item => item.id !== id);
    }
    _addToCart(device){
        
        let {
            id,
            imgUrl,
            name,
            price,
            amount,
        } = device
 
        for (const gaget of this.#gagets) {

            if(gaget.id === id){

                if (gaget.count === 4) return;

                gaget.count++;
                this.renderCart();
                return;
            }   
        }
   
        this.#gagets.push({
            id,
            imgUrl,
            name,
            price,
            amount,
            count: 1
        });

        this.renderCart();
    }

    addDeviceToCart(){

        const patterDevice = {

            elemName: 'li',
            className: 'list-cart__item',

            listChild: [
                {
                    elemName: 'div',
                    className: 'list-cart__device',

                    listChild: [

                        {
                            elemName: 'img',
                            className: 'list-cart__img'
                        },

                        {
                            elemName: 'div',
                            className: 'list-cart__container',

                            listChild: [
                                {
                                    elemName: 'h4',
                                    className: 'list-cart__name'
                                },

                                {
                                    elemName: 'p',
                                    className: 'list-cart__cost'
                                }
                            ]
                        }
                    ]
                },
                {
                    elemName: 'div',
                    className: 'list-cart__wrap-count',

                    listChild: [
                        {
                            elemName: 'button',
                            className: 'list-cart__del not-active'
                        },
                        {
                            elemName: 'span',
                            className: 'list-cart__count'
                        },
                        {
                            elemName: 'button',
                            className: 'list-cart__add'
                        }
                    ]
                },
                {
                    elemName: 'button',
                    className: 'list-cart__btn-remove'
                }

            ]
        } 
    
        this.listElem.listCartWrapItems.innerHTML = "";

        this.#gagets.forEach(item => {

            let device = new Elem(patterDevice);

            device.listElem.listCartImg.src = `img/${item.imgUrl}`;
            device.listElem.listCartName.append(item.name);
            device.listElem.listCartCost.append(item.price + '$');
            device.listElem.listCartCount.append(item.count);


            switch(item.count){
                case 1: {
                    device.listElem.listCartDel.classList.add('not-active');
                    device.listElem.listCartAdd.classList.remove('not-active');
                    break;
                }
                case 4: {
                    device.listElem.listCartAdd.classList.add('not-active');
                    device.listElem.listCartDel.classList.remove('not-active');
                    break;
                }
                default: {
                    device.listElem.listCartAdd.classList.remove('not-active');
                    device.listElem.listCartDel.classList.remove('not-active');
                    break;
                }
            }

            this.listElem.listCartWrapItems.append(device.listElem.listCartItem);

            device.listElem.listCartDel.addEventListener('click', (e) => {
                e.stopPropagation();
                if(item.count > 1){
                    item.count--;
                    this.renderCart();                 
                } 
            });
            device.listElem.listCartAdd.addEventListener('click', (e) => {
                e.stopPropagation();
                if(item.count < 4){  
                    item.count++;
                    this.renderCart();
                }
                  
            });
            device.listElem.listCartBtnRemove.addEventListener('click', (e) => {
                e.stopPropagation();
                this.#gagets =  this.#gagets.filter(elem => elem.id !== item.id);
                if(this.#gagets.length === 0) localStorage.clear();
                this.renderCart();
                
            });

        });

    }

    renderCart(){ 
   
        this.cart.innerHTML = "";
        this.addDeviceToCart();
        let countItems = this.#gagets.reduce((prevVelue, nextVelue) => prevVelue + nextVelue.count, 0);
        let priceAll =   this.#gagets.reduce((prevVelue, nextVelue) => prevVelue + nextVelue.price * nextVelue.count, 0);

        this.listElem.listCartAmount.children[0].innerText = countItems + ' ptc';
        this.listElem.listCartPrice.children[0].innerText = priceAll + '$';

        document.querySelector('.basket__count').innerText = countItems;
        
        this.cart.append(this.listElem.listCart);

        this.workWithStorage();
    }

    workWithStorage(){
  
        if(this.#gagets.length > 0){

            localStorage.clear();

            this.#gagets.forEach((element, index) => {

                let json = JSON.stringify(element)
                localStorage.setItem(index, json);
    
            });
        }
        else if(localStorage.length > 0){
            
            for (let index = 0; index < localStorage.length; index++) {         
               this.#gagets.push(JSON.parse(localStorage.getItem(index)));
            }

            this.renderCart();
        }
   
    }
}

const cart = new Cart();
new ListCards(items).renderCard('list-device');
const filter = new Filter();





















