import $ from "jquery";
import './lazyload';
import Fancybox from "@fancyapps/ui";
import detectTouch from './detectTouch';
import setScrollbarWidth from './setScrollbarWidth';
import masks from './masks';
import validation from './validation';
import anchorLinks from './anchorLinks';
import accordions from './accordions';
import modals from './modals';
import tabs from './tabs';
import menu from './menu';
import gsap from 'gsap';
import {
    ScrollTrigger
} from 'gsap/ScrollTrigger';
import introSlider from "./my/introSlider";
import headerHeight from "./my/headerHeight";
import map from "./my/map";
import slider from "./my/slider";
import mobileSlider from "./my/mobileSlider";
import marquee from "./my/marquee";
import reviewsSlider from "./my/reviewsSlider";
import catalogSlider from "./my/catalogSlider";
import './vendor/hystmodal.min.js';
import placeholders from "./my/placeholders";
import formRadio from "./my/formRadio";
import quizTabs from "./my/quizTabs";
import rangeSlider from "./my/rangeSlider";
import animations from "./my/animations";
import toggleHeader from "./my/toggleHeader";
import toggleMenuItems from "./my/toggleMenuItems";
import menuTabs from "./my/menuTabs";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {
    detectTouch();
    setScrollbarWidth();
    masks();
    validation();
    anchorLinks();
    accordions();
    modals();
    tabs();
    menu();

    headerHeight();
    introSlider();
    map();
    slider();
    mobileSlider();
    marquee();
    reviewsSlider();
    catalogSlider();
    placeholders();
    formRadio();
    quizTabs();
    rangeSlider();
    animations();
    toggleHeader();
    toggleMenuItems();
    menuTabs();
});

document.addEventListener('lazyloaded', () => {
    ScrollTrigger.refresh();
});

window.addEventListener('load', function () {
    document.body.classList.add('loaded');
    ScrollTrigger.refresh();
    setTimeout(() => document.body.classList.add('animatable'), 300);
});