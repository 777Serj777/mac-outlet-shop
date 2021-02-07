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

new ListCards(items).renderCard('list-device');






















