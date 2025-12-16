# shopify-web-components

A collection of **opinionated, production-ready Web Components** that extend Shopify’s official Web Component library.

This repository exists to fill **gaps in the current Shopify Web Components / Polaris component set**, providing UI primitives and interaction patterns that are commonly needed in real Shopify apps but are not yet available upstream.

All components are designed to:

- Work seamlessly inside **Shopify Admin** and **Shopify embedded apps**
- Follow **Polaris visual and interaction patterns**
- Be framework-agnostic (React, Vue, plain JS, etc.)
- Use modern Web APIs (Custom Elements, Shadow DOM, Pointer Events)

---

## Requirements

This library **requires Polaris Web Components** to be loaded.

Include Polaris before using any components from this repo:

    <script src="https://cdn.shopify.com/shopifycloud/polaris.js"></script>

---

## Components

### Sortable List

A drag-and-drop sortable list built with Pointer Events and Shadow DOM.  
Designed to work reliably across **desktop, mobile, and iOS Safari**.

### Install

[CDN – s-sortable-list.js](https://cdn.jsdelivr.net/gh/NicholasEli/shopify-web-components@main/s-sortable-list.js)

#### Usage

    <s-sortable-list id="sortable-list" sorting="false">
      <s-sortable-list-item slot="item" id="one">One</s-sortable-list-item>
      <s-sortable-list-item slot="item" id="two">Two</s-sortable-list-item>
      <s-sortable-list-item slot="item" id="three">Three</s-sortable-list-item>
      <s-sortable-list-item slot="item" id="four">Four</s-sortable-list-item>
      <s-sortable-list-item slot="item" id="five">Five</s-sortable-list-item>
    </s-sortable-list>

### Events

The sortable list emits a custom event when sorting is complete:

    const list = document.getElementById('sortable-list');

    list.addEventListener('change', (event) => {
      console.log(event.detail.items);
    });

#### Event Payload

    {
      items: ['one', 'three', 'five', 'two', 'four']
    }

If the <s-sortable-list> has an `id`, item IDs are returned in sorted order.

### Carousel

Classic carousel for changing between media items

### Install

[CDN – s-carousel.js](https://cdn.jsdelivr.net/gh/NicholasEli/shopify-web-components@main/s-carousel.js)

#### Usage

    <s-carousel id="carousel" title="Carousel Items">
      <s-carousel-item
        slot="item"
        title="Item 1"
        details="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        image="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png"
      >
      </s-carousel-item>
      <s-carousel-item
        slot="item"
        title="Item 2"
        details="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        image="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-2_large.png"
      >
      </s-carousel-item>
      <s-carousel-item
        slot="item"
        title="Item 3"
        details="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        image="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-3_large.png"
      >
      </s-carousel-item>
    </s-carousel>

### Events

The carousel emits a custom event when visible carousel item is set:

    const carousel = document.getElementById('carousel');

    list.addEventListener('change', (event) => {
      console.log(event.detail.item);
    });

#### Event Payload

    {
      item: {title: '...', details: '...', image: '...'}
    }

---
