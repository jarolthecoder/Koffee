 // helper functions
const MathUtils = {
    // map number x from range [a, b] to [c, d]
    map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,
    // linear interpolation
    lerp: (a, b, n) => (1 - n) * a + n * b
};

// body element
const body = document.body;

// calculate the viewport size
let winsize;
const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
calcWinsize();
// and recalculate on resize
window.addEventListener('resize', calcWinsize);

// scroll position and update function
let docScroll;
const getPageYScroll = () => docScroll = window.pageYOffset || document.documentElement.scrollTop;
window.addEventListener('scroll', getPageYScroll);

// Item
class Item {
    constructor(el) {
        // the .item element
        this.DOM = {el: el};
        // the inner image
        this.DOM.image = this.DOM.el.querySelector('.item__img');
        this.renderedStyles = {
            innerTranslationY: {
                // interpolated value
                previous: 0, 
                // current value
                current: 0, 
                // amount to interpolate
                ease: 0.1,
                // the maximum value to translate the image is set in a CSS variable (--overflow)
                maxValue: parseInt(getComputedStyle(this.DOM.image).getPropertyValue('--overflow'), 10),
                // current value setter
                setValue: () => {
                    const maxValue = this.renderedStyles.innerTranslationY.maxValue;
                    const minValue = -1 * maxValue;
                    return Math.max(Math.min(MathUtils.map(this.props.top - docScroll, winsize.height, -1 * this.props.height, minValue, maxValue), maxValue), minValue)
                }
            }
        };
        // set the initial values
        this.update();
        // use the IntersectionObserver API to check when the element is inside the viewport
        // only then the element translation will be updated
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => this.isVisible = entry.intersectionRatio > 0);
        });
        this.observer.observe(this.DOM.el);
        // init/bind events
        this.initEvents();
    }
    update() {
        // gets the item's height and top (relative to the document)
        this.getSize();
        // sets the initial value (no interpolation)
        for (const key in this.renderedStyles ) {
            this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
        }
        // translate the image
        this.layout();
    }
    getSize() {
        const rect = this.DOM.el.getBoundingClientRect();
        this.props = {
            // item's height
            height: rect.height,
            // offset top relative to the document
            top: docScroll + rect.top 
        }
    }
    initEvents() {
        window.addEventListener('resize', () => this.resize());
    }
    resize() {
        // on resize rest sizes and update the translation value
        this.update();
    }
    render() {
        // update the current and interpolated values
        for (const key in this.renderedStyles ) {
            this.renderedStyles[key].current = this.renderedStyles[key].setValue();
            this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
        }
        // and translates the image
        this.layout();
    }
    layout() {
        // translates the image
        this.DOM.image.style.transform = `translate3d(0,${this.renderedStyles.innerTranslationY.previous}px,0)`;
    }
}

// SmoothScroll
class SmoothScroll {
    constructor() {
        this.DOM = {main: document.querySelector('main')};
        this.DOM.scrollable = this.DOM.main.querySelector('div[data-scroll]');

        this.items = [];
        [...this.DOM.main.querySelectorAll('.content > .item')].forEach(item => this.items.push(new Item(item)));t
        this.renderedStyles = {
            translationY: {
                // interpolated value
                previous: 0, 
                // current value
                current: 0, 
                // amount to interpolate
                ease: 0.1,
                // current value setter
                setValue: () => docScroll
            }
        };
        // set the body's height
        this.setSize();
        // set the initial values
        this.update();
        // the <main> element's style needs to be modified
        this.style();
        // init/bind events
        this.initEvents();
        // start the render loop
        requestAnimationFrame(() => this.render());
    }
    update() {
        // sets the initial value (no interpolation) - translate the scroll value
        for (const key in this.renderedStyles ) {
            this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
        }   
        // translate the scrollable element
        this.layout();
    }
    layout() {
        // translates the scrollable element
        this.DOM.scrollable.style.transform = `translate3d(0,${-1*this.renderedStyles.translationY.previous}px,0)`;
    }
    setSize() {
        // set the heigh of the body in order to keep the scrollbar on the page
        body.style.height = `${this.DOM.scrollable.scrollHeight}px`;
    }
    style() {
         
        this.DOM.main.style.position = 'fixed';
        this.DOM.main.style.width = this.DOM.main.style.height = '100%';
        this.DOM.main.style.top = this.DOM.main.style.left = 0;
        this.DOM.main.style.overflow = 'hidden';
    }
    initEvents() {
        // on resize reset the body's height
        window.addEventListener('resize', () => this.setSize());
    }
    render() {
        // update the current and interpolated values
        for (const key in this.renderedStyles ) {
            this.renderedStyles[key].current = this.renderedStyles[key].setValue();
            this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
        }
        // and translate the scrollable element
        this.layout();
        
        for (const item of this.items) {
            if ( item.isVisible ) {
                item.render();
            }
        }
        
        requestAnimationFrame(() => this.render());
    }
}

/***********************************/
/********** Preload stuff **********/


// And then..
window.onload = () => {
    if(window.innerWidth > 800) {
        // Get the scroll position
        getPageYScroll();
        // Initialize the Smooth Scrolling
        new SmoothScroll();
    }
};
