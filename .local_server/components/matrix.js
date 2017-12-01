/**
 * Needs comments
 * 
 * Web Component for the matrix filter
 */

 'use strict';


 customElements.define('matrix-img', class extends HTMLElement {


    static get observedAttributes() {
        return ['src'];
    }

    /**
     * Start the main class
     */
    constructor() {
        super();
        //
        const doc = document.currentScript.ownerDocument;
        const tmpl = doc.querySelector('#matrix-img-tmpl');

        this._root = this.attachShadow({ mode: 'open' });
        this._root.appendChild(tmpl.content.cloneNode(true));
        this._elementProxy = document.createElement('div');
    }


    connectedCallback() {
        // first setup the canvas and img
        var canvas = document.createElement('canvas');
        var img = document.createElement('img');
        var container = this._root.querySelector('#matrix-img-content');
        
        this.src = this.getAttribute('src');
        img.src = this.src;
        img.onload = () => {

            // Then allocate
            if(img) {
                canvas.width = img.width;
                canvas.height = img.height;
                canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
            } else return;

            // Then define
            this.canvas = canvas;
            this.img = img;

            if(container) container.innerHTML = this.getImageData();
        };       
        
    }

    disconnectedCallback() {

    }

    attributeChangedCallback() {

    }



    /**
     * Get the data from the image, pixel by pixel
     * 
     * @returns [Array]
     */
    getImageData() {
        var pixelData = "";
        var scope = 5;
        var range = 10;

        // go through the first 10 pixels
        for(var i = 0; i < this.img.height; i += scope) {
            var innerPoint = "";

            for(var j = 0; j < this.img.width; j += scope) {
                var imgData = this.canvas.getContext('2d').getImageData(j, i, 1, 1).data;
                if( (imgData[0] < 255 - range || 
                     imgData[1] < 255 - range || 
                     imgData[1] < 255 - range) && 
                    (imgData[0] > 0 + range || 
                     imgData[1] > 0 + range || 
                     imgData[1] < 0 + range)) {
                    innerPoint += "0";
                } else {
                    innerPoint += "-";
                }
            }

            pixelData += innerPoint + "<br>";
        }

        return pixelData;
    }

    /**
     * Turn something into an image of 1 and 0
     * 
     * @returns [String]
     */
    makeGradeImage() {

    }

});