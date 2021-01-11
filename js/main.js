
const createNewElem = (elemName, classNames) => {
    const elem = document.createElement(elemName);
    if(classNames) elem.className = classNames;
    return elem;
}
const addChildToPer = (parent, arrChild) => {                   
    {  /* structure arrChild
        arr =   [
                    {
                        elemName: 'tag',
                        className: 'class list',

                        textBefore: 'any inner text', - start node
                        textAfter: 'any inner text', - end node

                        ListChild: [
                            {
                                elemName: 'tag',
                                className: 'list class',

                                listChild[...]
                            }
                        ]
                    }
                ]
        */
    }

    arrChild.forEach(element => { 

    let elemChild = createNewElem(element.elemName, element.className);
   
    if(element.listChild && element.listChild.length > 0){
        addChildToPer(elemChild, element.listChild);
    }
    if(element.textBefore){
       elemChild.prepend(element.textBefore);
    }
    if(element.textAfter){
        elemChild.append(element.textAfter);
    }
    parent.appendChild(elemChild);
   
    });

    return parent;
}  
const createElemCard = () => {
    
    let arrChildCard =
    [     
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

                    /*listChild: [
                        {
                            //    elemName: 'img',
                        }
                    ]*/
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

    let card = createNewElem('div', 'card');

    let device = addChildToPer(card , arrChildCard);

    device.getElem = function(className){
        return this.querySelector(className);
    }
    
    return  device;
}
const renderElem = (container,  listElem)=>{

    let patternCard;

    container = document.querySelector('.'+container);

    container.innerHTML = "";

    listElem.forEach(element => {
        
        patternCard = createElemCard();
        patternCard.getElem('.device__img').style.backgroundImage =  `url(img/${element.imgUrl})`;
        patternCard.getElem('.device__title').append(element.name);
        patternCard.getElem('.device__price-number').append(element.price);
        patternCard.getElem('.device__count-number').append(element.amount);
        patternCard.getElem('.device__orders-count').append(element.orders);
        patternCard.getElem('.device__positive-percent').append(~~(element.like/element.orders * 100)+'% ');
        
        container.append(patternCard)        

    })
         
}

renderElem('list-device', items);

let filterBtn = document.querySelectorAll('.filter__title');

for (const instanse of filterBtn) {
    instanse.addEventListener('click', (e) => {
        e.target.classList.toggle('arrow__open');
        e.target.classList.toggle('arrow__close');
    }) 
}    



 



