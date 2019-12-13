
function CssLib() { }
CssLib.prototype = {
    // This method add new class for selected elements
    addClass: function (userClassName) {
        this.forEach((domEl) => domEl.classList.add(userClassName));
    },
    // This method remove class for selected elements
    removeClass: function (userClassName) {
        this.forEach((domEl) => domEl.classList.remove(userClassName));
    },
    // This method switch class for selected elements
    toggleClass: function (userClassName) {
        this.forEach((domEl) => domEl.classList.toggle(userClassName));
    }
}

function EventLib() {

}

EventLib.prototype = {
    scrollUpDn: function (Heigh = 1) {
        let scrollUp = new Event("scrollUp");
        let scrollDn = new Event("scrollDn");
        let windowHeigh = Heigh;
        window.addEventListener("scroll", () => {
            this.forEach(domEl => {
                elPosTop = domEl.getBoundingClientRect().top;
                if (elPosTop <= window.innerHeight * windowHeigh)
                    domEl.dispatchEvent(scrollUp);
                else
                    domEl.dispatchEvent(scrollDn);
            });
        });
        return this;
    },

    on: function (eventName, listener) {
        this.forEach((domEl) => {
            domEl.addEventListener(eventName, listener);
        });
        return this;
    }
}

/**
 * The constructor a DOM elements array
 */
function DomEl() { }
//Prototype DOM elements is array
DomEl.prototype = Array.prototype;

for (let i in CssLib.prototype) {
    DomEl.prototype[i] = CssLib.prototype[i];
}
for (let i in EventLib.prototype) {
    DomEl.prototype[i] = EventLib.prototype[i];
}

/**
 * The function wich returns Array selected DOM elements
 * @param {string or HTML element} selectorName 
 */
function $(selectorName) {
    //Create a new DOM elements array
    let domElements = new DomEl;
    // Check "selectorName" for a string
    if (typeof selectorName === "string" && selectorName.indexOf(" ") === -1) {
        document.querySelectorAll(selectorName)
            .forEach((domEl) => { domElements.push(domEl) });
    }
    // Check "selectorName" for a Object
    else if (selectorName instanceof HTMLElement) {
        domElements.push(selectorName);
    } else return;
    // Check that something is selected
    if (domElements.length === 0) return;
    else return domElements;
}

