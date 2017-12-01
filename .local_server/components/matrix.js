/**
 * 
 * 
 * Web Component for the matrix filter
 */

 'use strict';

 customElements.define('matrix-img', class extends HTMLElement {


    static get observedAttributes() {

    }

    /**
     * Start the main class
     */
    constructor() {
        super();
    }


    connectedCallback() {
        // first setup the canvas and img
        var canvas = document.createElement('canvas');
        var img = document.getElementById('test-image');

        // Then allocate
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

        // Then define
        this.canvas = canvas;
        this.img = img;
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
        var pixelData = [];
        // go through the first 10 pixels
        for(var i = 0; i < this.img.width; i++) {
            pixelData.push(this.canvas.getContext('2d').getImageData(i, (1), 1, 1).data);
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