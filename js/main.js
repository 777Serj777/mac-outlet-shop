
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
                    className: 'device__reviews',

                    listChild: [
                        {
                            elemName: 'div',
                            className: 'device__positive',
                        
                            listChild: [
                                {
                                    elemName: 'p',
                                    textAfter: 'positive reviews',
                                
                                    listChild: [
                                        {
                                            elemName: 'span',
                                            className: 'device__positive-percent'
                                        }
                                    ]
                                },

                                {
                                    elemName: 'p',
                                    textAfter: 'above avarage'
                                }
                            ]
                        },

                        {
                            elemName: 'p',
                            className: 'device__orders',
                            textAfter: 'order',
                        
                            listChild: [
                                {
                                    elemName: 'span',
                                    className: 'device__orders-count'
                                }
                            ]
                        }       
                    ]
                    }
                ]
            }  
        ]  
};

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
    
};

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

            for (const listClassName of arrClassName) {
                
                let reg = /[-_]/g;
          
                let key = listClassName.split('__');
             
                key = (key.length > 1) ? key.reduce((prevVelue, nextVelue) => {
                
                    return prevVelue + (nextVelue[0].toUpperCase() + nextVelue.slice(1));
                
                }) : key[0];

              
                key = key.split(reg);
              
                key = (key.length>1) ? key[0] + key[1][0].toUpperCase() + key[1].slice(1)  : key[0];
            
                listElem[key] = item;
            }  

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
           pattern.textBefore && element.prepend(pattern.textAfter);
        
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
            rangeFilter = new Elem(patternRange).listElem;
            rangeFilter.label.htmlFor = 'text';
            rangeFilter.label.innerText = item;
            rangeFilter.input.type = 'text';
            elements.filterWrap.appendChild(rangeFilter.filterInput)
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

        let regex = /\d./g;

        arrFilters.forEach(item => {
                      
            listFilter[item.title] = item.changed.map(item =>{
                                 
              return (regex.test(item)) ? +item.match(regex) : item;
             
            }); 
                      
        });
       
        let  filteredItems = items.filter(item => {

            for (const key in listFilter) {

              let category =  item[key] instanceof Array ?  item[key] : [item[key]]              
              let result; 

                for (const value of category) {            
                    result = listFilter[key].includes(value);                   
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
        this.listElem.deviceOrdersCount.append(this.#item.orders);
        this.listElem.devicePositivePercent.append(~~(this.#item.like/this.#item.orders * 100)+"% ");

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
const filter = new Filter();








