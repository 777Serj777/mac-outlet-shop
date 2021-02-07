window.onload = () => {

    class Slider {

        constructor(setting){
            this.slider = document.querySelector('.slider');
            this.item = document.querySelectorAll('slider__item') ;
            this.nextBtn = this.createElem('div', 'slider__next', this.slider);
            this.prevBtn = this.createElem('div', 'slider__prev', this.slider);
   
        }

        createElem(elemName, classNames, elemForChild){

            classNames = classNames.split(' ');
            let element = document.createElement(elemName);

            for (const className of classNames) {
                element.className = className || "";
            }
             
            if(elemForChild) elemForChild.append(element);

            return element       
        }

        moveSlide = (e) => {

            this.nextBtn.onclick = null;
            this.prevBtn.onclick = null;
            let elemItem = document.querySelectorAll('.slider__container>.slider__item');
            let indexActive;
            let itemActive;
            let btnClass  = e.target.classList.value;

            elemItem.forEach((elem, index) => {
                elem.classList.value.includes('active') && (indexActive = index);
            })

            elemItem[indexActive].classList.remove('active');

            const prev = () => {
               
                if(elemItem.length - 1 === indexActive){
                    itemActive = elemItem[0];
                    itemActive.classList.add('prev');
                }
                else {
                    itemActive = elemItem[indexActive + 1];
                    itemActive.classList.add('prev');
                }

                elemItem[indexActive].classList.add('active__left')

                setTimeout(() => {
                    elemItem[indexActive].classList.remove('active__left')
                    itemActive.classList.remove('prev');
                    itemActive.classList.add('active');
                   
                    this.nextBtn.onclick = this.moveSlide;
                    this.prevBtn.onclick = this.moveSlide;
                },500);

            }

            const next = () => {

                if(indexActive === 0){
                    itemActive = elemItem[elemItem.length - 1];
                    itemActive.classList.add('next');
                }
                else {
                    itemActive = elemItem[indexActive - 1];
                    itemActive.classList.add('next');
                }

                elemItem[indexActive].classList.add('active__right')

                setTimeout(() => {
                    elemItem[indexActive].classList.remove('active__right')
                    itemActive.classList.remove('next');
                    itemActive.classList.add('active');
                    this.nextBtn.onclick = this.moveSlide;
                    this.prevBtn.onclick = this.moveSlide;     
                },500);

            }

            if(btnClass.includes('slider__next')){
                next();
            }
            else if(btnClass.includes('slider__prev')){
                prev();
            }

        }

      
        
    }


    slider = function(setting){

        const slide = new Slider()
        slide.nextBtn.onclick = slide.moveSlide;
        slide.prevBtn.onclick = slide.moveSlide;
    
    }
    
    slider({
    
    })


}

