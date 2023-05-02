import { trim } from 'lodash';
import Marquee3k from 'marquee3000';

export default function marquee() {
  const contentWrapper = document.querySelector('.marquee__text-block');
  if (contentWrapper && trim(contentWrapper.textContent)) {
    Marquee3k.init({
      selector: 'js-marquee'
    });
  }
}
