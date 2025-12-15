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

    list.addEventListener('sort-change', (event) => {
      console.log(event.detail.items);
    });

#### Event Payload

    {
      items: ['one', 'three', 'five', 'two', 'four']
    }

If the <s-sortable-list> has an `id`, item IDs are returned in sorted order.

---
